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

    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    if (!folder.deletedAt) {
      return NextResponse.json({ error: 'Folder is not in Trash.' }, { status: 400 });
    }

    const isAdmin = user.role === 'ADMIN';
    const isOwner = folder.userId === user.id;
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden: only admins or the folder owner can restore.' }, { status: 403 });
    }

    // Reject restore if past the recovery window.
    if (folder.deletedAt < trashCutoffDate()) {
      return NextResponse.json(
        { error: `This folder is older than the ${TRASH_RETENTION_DAYS}-day recovery window and can no longer be restored.` },
        { status: 410 }
      );
    }

    // If the parent folder is in Trash and was deleted as part of a different
    // event (i.e. different timestamp), restoring this child without restoring
    // the parent would orphan it. In that case require the parent be restored
    // first to keep the tree consistent.
    if (folder.parentId) {
      const parent = await prisma.folder.findUnique({ where: { id: folder.parentId } });
      if (parent && parent.deletedAt) {
        const sameEvent = parent.deletedAt.getTime() === folder.deletedAt.getTime();
        if (!sameEvent) {
          return NextResponse.json(
            { error: 'Parent folder is in Trash. Restore the parent folder first.' },
            { status: 409 }
          );
        }
      }
    }

    // Restore this folder AND every descendant that was trashed in the same
    // event (matching deletedAt timestamp). Walk the subtree manually.
    const stampMs = folder.deletedAt.getTime();
    const restoredIds: string[] = [];
    const queue: string[] = [id];
    const seen = new Set<string>();
    while (queue.length) {
      const fid = queue.shift()!;
      if (seen.has(fid)) continue;
      seen.add(fid);
      restoredIds.push(fid);
      const children = await prisma.folder.findMany({
        where: { parentId: fid, deletedAt: { not: null } },
        select: { id: true, deletedAt: true }
      });
      for (const child of children) {
        if (child.deletedAt && child.deletedAt.getTime() === stampMs) {
          queue.push(child.id);
        }
      }
    }

    await prisma.folder.updateMany({
      where: { id: { in: restoredIds } },
      data: { deletedAt: null, deletedByUserId: null }
    });

    await recordAuditLog(user.id, 'FOLDER_RESTORE', {
      folderId: id,
      folderName: folder.name,
      restoredFolderCount: restoredIds.length
    }, request);

    return NextResponse.json({
      success: true,
      restoredFolderCount: restoredIds.length
    });
  } catch (error: any) {
    console.error('Folder restore error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
