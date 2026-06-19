import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser, userHasPermission } from '@/lib/auth';
import { indexDocument } from '@/lib/indexer';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'node:crypto';

// Hard upload constraints
const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB
const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg',
  '.txt', '.csv', '.md', '.json', '.xml',
  '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.zip', '.mp3', '.mp4'
]);
// Block known dangerous executables/scripts even if someone whitelists weird MIME.
const FORBIDDEN_EXTENSIONS = new Set([
  '.exe', '.bat', '.cmd', '.com', '.msi', '.ps1', '.sh', '.app',
  '.js', '.mjs', '.ts', '.html', '.htm', '.php', '.jsp', '.asp', '.aspx'
]);

function sanitizeFilename(name: string): string {
  // strip path separators + control chars, collapse whitespace, cap length
  const base = name.replace(/[\\/\x00-\x1f]/g, '_').trim().slice(0, 200);
  return base || 'unnamed';
}

function getMimeType(filename: string, fallback: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeMap: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
  };
  return mimeMap[ext] || fallback;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string | null;

    // Optional metadata
    const requestedDeptId = (formData.get('departmentId') as string | null)?.trim() || '';
    const rawTitle = (formData.get('displayName') as string | null) || '';
    const rawCreatedAt = (formData.get('createdAt') as string | null) || '';

    // Resolve target department: explicit one if provided, otherwise active.
    const targetDeptId = requestedDeptId || user.activeDeptId;
    if (!targetDeptId) {
      return NextResponse.json({ error: 'No department selected.' }, { status: 400 });
    }

    // Permission check scoped to the chosen department (not just the active one).
    const isAdmin = user.role === 'ADMIN';
    let canUploadHere = isAdmin;
    if (!canUploadHere) {
      const membership = (user.departments as any[]).find((d: any) => d.departmentId === targetDeptId);
      if (!membership) {
        return NextResponse.json({ error: 'You are not a member of that department.' }, { status: 403 });
      }
      const perms: string[] = Array.isArray(membership.permissionsList)
        ? membership.permissionsList
        : String(membership.permissions || '').split(',').map((p: string) => p.trim()).filter(Boolean);
      canUploadHere = perms.includes('UPLOAD');
    }
    if (!canUploadHere) {
      return NextResponse.json(
        { error: 'You do not have UPLOAD permission in that department.' },
        { status: 403 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 1. Size guard (in addition to whatever the platform enforces)
    if (file.size <= 0) {
      return NextResponse.json({ error: 'File is empty.' }, { status: 400 });
    }
    if (file.size > MAX_FILE_BYTES) {
      const mb = Math.round((MAX_FILE_BYTES / (1024 * 1024)) * 10) / 10;
      return NextResponse.json(
        { error: `File exceeds the ${mb} MB maximum upload size.` },
        { status: 413 }
      );
    }

    // 2. Extension/safety guard
    const safeName = sanitizeFilename(file.name);
    const ext = path.extname(safeName).toLowerCase();
    if (FORBIDDEN_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type ${ext || '(unknown)'} is not permitted.` },
        { status: 415 }
      );
    }
    if (ext && !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type ${ext} is not on the allow list. Contact an administrator if you need it permitted.` },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const docId = crypto.randomUUID();

    const detectedMimeType =
      file.type && file.type !== 'application/octet-stream'
        ? file.type
        : getMimeType(safeName, 'application/octet-stream');

    // Resolve final title (display name) and upload date.
    const title = rawTitle.trim().slice(0, 200) || safeName;
    let createdAt: Date | undefined;
    if (rawCreatedAt) {
      const parsed = new Date(rawCreatedAt);
      if (isNaN(parsed.getTime())) {
        return NextResponse.json({ error: 'Invalid upload date.' }, { status: 400 });
      }
      // Don't allow future-dating the upload (would corrupt audit timelines).
      if (parsed.getTime() > Date.now() + 60_000) {
        return NextResponse.json({ error: 'Upload date cannot be in the future.' }, { status: 400 });
      }
      // Sanity guard against absurd backdates (>50 years).
      const earliest = Date.now() - 50 * 365 * 24 * 60 * 60 * 1000;
      if (parsed.getTime() < earliest) {
        return NextResponse.json({ error: 'Upload date is too far in the past.' }, { status: 400 });
      }
      createdAt = parsed;
    }

    // If the folder belongs to a different department than the upload target, reject.
    let resolvedFolderId: string | null = null;
    if (folderId && folderId !== 'null') {
      const folder = await prisma.folder.findUnique({ where: { id: folderId }, select: { departmentId: true } });
      if (!folder) {
        return NextResponse.json({ error: 'Folder not found.' }, { status: 404 });
      }
      if (folder.departmentId !== targetDeptId) {
        return NextResponse.json(
          { error: 'Cannot upload into a folder that belongs to a different department.' },
          { status: 400 }
        );
      }
      resolvedFolderId = folderId;
    }

    // Create Document record in DB first to get UUID
    const doc = await prisma.document.create({
      data: {
        id: docId,
        name: safeName,
        displayName: title,
        mimeType: detectedMimeType,
        userId: user.id,
        departmentId: targetDeptId,
        folderId: resolvedFolderId,
        path: '', // Will update
        ...(createdAt ? { createdAt } : {})
      }
    });

    const storageDir = path.join(process.cwd(), 'data', 'storage');
    await fs.mkdir(storageDir, { recursive: true });
    // Store by docId only — sanitized name is kept for display, not for the on-disk path.
    const storagePath = path.join(storageDir, `${doc.id}${ext}`);
    await fs.writeFile(storagePath, buffer);

    // Update DB with the correct path
    await prisma.document.update({
      where: { id: doc.id },
      data: { path: storagePath }
    });

    // Build the search index for this new doc (best-effort; never blocks the response).
    try { await indexDocument(doc.id); }
    catch (e) { console.warn('[upload] indexDocument failed', (e as any)?.message); }

    return NextResponse.json({ success: true, document: doc });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
