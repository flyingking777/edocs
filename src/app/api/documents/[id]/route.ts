import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { recordAuditLog } from '@/lib/audit';
import { getCurrentUser, userHasPermission } from '@/lib/auth';
import { indexDocument } from '@/lib/indexer';
import fs from 'fs/promises';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!userHasPermission(user, 'EDIT')) {
    return NextResponse.json({ error: 'You do not have EDIT permission in this department.' }, { status: 403 });
  }
  const userId = user.id;

  try {
    const { name, displayName, labelIds, status } = await request.json();

    // First verify ownership
    const existing = await prisma.document.findUnique({
      where: { id }
    });

    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 403 });
    }

    const doc = await prisma.document.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(displayName && { displayName }),
        ...(status && { status }),
        ...(labelIds && {
          labels: {
            set: labelIds.map((lid: string) => ({ id: lid }))
          }
        })
      },
      include: { labels: true }
    });

    // Logging
    if (name || displayName) await recordAuditLog(userId, 'FILE_RENAME', { documentId: id, oldName: existing.displayName, newName: displayName }, request);
    if (labelIds) await recordAuditLog(userId, 'TAG_FILTER', { documentId: id, labelIds }, request);
    if (status) await recordAuditLog(userId, 'STATUS_UPDATE', { documentId: id, status }, request);

    // Re-index whenever name/displayName or labels change (best-effort).
    try { await indexDocument(id); }
    catch (e) { console.warn('[patch] indexDocument failed', (e as any)?.message); }

    return NextResponse.json(doc);
  } catch (error: any) {
    console.error(`[API PATCH ERROR] ${id}:`, error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!userHasPermission(user, 'DELETE')) {
    return NextResponse.json({ error: 'You do not have DELETE permission in this department.' }, { status: 403 });
  }
  const userId = user.id;
  const permanent = request.nextUrl.searchParams.get('permanent') === '1';

  try {
    const existing = await prisma.document.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const isOwner = existing.userId === userId;
    const isAdmin = user.role === 'ADMIN';
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!permanent) {
      // Soft delete → moves to Trash. Recoverable via PATCH restore endpoint.
      const updated = await prisma.document.update({
        where: { id },
        data: { deletedAt: new Date(), deletedByUserId: userId }
      });
      await recordAuditLog(userId, 'FILE_TRASH', { documentId: id, fileName: existing.name }, request);
      return NextResponse.json({ success: true, soft: true, document: updated });
    }

    // Permanent delete: only ADMIN, or an owner permanently emptying their own trash.
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Only admins or the owner may permanently delete.' }, { status: 403 });
    }

    await recordAuditLog(userId, 'FILE_DELETE', { documentId: id, fileName: existing.name, permanent: true }, request);

    await prisma.document.update({ where: { id }, data: { labels: { set: [] } } });
    await prisma.document.delete({ where: { id } });

    if (existing.path) {
      try { await fs.unlink(existing.path); }
      catch (e) { console.error('Failed to delete file from disk:', e); }
    }

    return NextResponse.json({ success: true, soft: false });
  } catch (error: any) {
    console.error(`[API DELETE ERROR] ${id}:`, error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
