import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { recordAuditLog } from '@/lib/audit';
import { getCurrentUser } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

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

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  const currentUserId = user.id;
  
  try {
    const doc = await prisma.document.findUnique({
      where: { id },
      include: {
        permissions: {
          where: { sharedWithUserId: currentUserId }
        },
        folder: {
          include: {
            permissions: { where: { sharedWithUserId: currentUserId } }
          }
        }
      }
    });

    if (!doc) {
      console.error(`[PREVIEW] Document not found in DB: ${id}`);
      return new Response('Not found', { status: 404 });
    }
    if (doc.deletedAt && user.role !== 'ADMIN' && doc.userId !== currentUserId) {
      return new Response('Document is in Trash', { status: 410 });
    }

    // Security Check: Owner, document-shared user, dept member, folder-shared user, or ADMIN
    const isAdmin = user.role === 'ADMIN';
    const isOwner = doc.userId === currentUserId;
    const isDocShared = doc.permissions.length > 0;
    const isFolderShared = !!doc.folder && doc.folder.permissions.length > 0;
    const isDeptMember = !!user.activeDeptId && user.activeDeptId === doc.departmentId;

    if (!isAdmin && !isOwner && !isDocShared && !isFolderShared && !isDeptMember) {
      console.warn(`[PREVIEW] Unauthorized access attempt to ${id} by ${currentUserId}`);
      return new Response('Unauthorized', { status: 403 });
    }

    // Log the view action
    await recordAuditLog(currentUserId, 'FILE_VIEW', { documentId: id, fileName: doc.name }, request);

    if (!fs.existsSync(doc.path)) {
      console.error(`[PREVIEW] File not found on disk at ${doc.path} for doc ${id}`);
      return new Response('File not found', { status: 404 });
    }

    const stats = fs.statSync(doc.path);
    const fileBuffer = fs.readFileSync(doc.path);

    // If stored mimeType is generic, try to refine it by extension
    let contentType = doc.mimeType;
    if (!contentType || contentType === 'application/octet-stream') {
      contentType = getMimeType(doc.name, 'application/octet-stream');
    }

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', stats.size.toString());
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Cache-Control', 'no-store, must-revalidate');

    console.log(`[PREVIEW] Serving doc ${id} (${doc.name}) as ${contentType}, size: ${stats.size}`);

    // Returning a standard Response with the buffer is usually fine in Route Handlers
    return new Response(fileBuffer, {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error(`[PREVIEW] Internal error for ${id}:`, error);
    return new Response('Internal error', { status: 500 });
  }
}
