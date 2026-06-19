import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import { TRASH_RETENTION_DAYS, trashCutoffDate } from '@/lib/trash';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (!doc.deletedAt) return NextResponse.json({ error: 'Document is not in Trash.' }, { status: 400 });

    const isAdmin = user.role === 'ADMIN';
    const isOwner = doc.userId === user.id;
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (doc.deletedAt && doc.deletedAt < trashCutoffDate()) {
      return NextResponse.json(
        { error: `This document is older than the ${TRASH_RETENTION_DAYS}-day recovery window and can no longer be restored.` },
        { status: 410 }
      );
    }

    // If the document still references a folder, that folder must not itself
    // be in Trash - otherwise the restored document would be orphaned.
    if (doc.folderId) {
      const folder = await prisma.folder.findUnique({ where: { id: doc.folderId }, select: { deletedAt: true, name: true } });
      if (folder?.deletedAt) {
        return NextResponse.json(
          { error: `The parent folder "${folder.name}" is in Trash. Restore the folder first.` },
          { status: 409 }
        );
      }
    }

    const restored = await prisma.document.update({
      where: { id },
      data: { deletedAt: null, deletedByUserId: null }
    });

    await recordAuditLog(user.id, 'FILE_RESTORE', { documentId: id, fileName: doc.name }, request);

    return NextResponse.json({ success: true, document: restored });
  } catch (error: any) {
    console.error('Restore error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
