import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import {
  TRASH_RETENTION_DAYS,
  collectFolderSubtree,
  runTrashJanitor
} from '@/lib/trash';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });

    const isAdmin = user.role === 'ADMIN';
    const isOwner = folder.userId === user.id;
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden: only ADMINs or the folder owner can rename this folder.' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const newName = typeof body?.name === 'string' ? body.name.trim() : '';
    if (!newName) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }
    if (newName.length > 120) {
      return NextResponse.json({ error: 'Folder name must be 120 characters or fewer' }, { status: 400 });
    }
    if (newName === folder.name) {
      return NextResponse.json(folder);
    }

    const updated = await prisma.folder.update({
      where: { id },
      data: { name: newName }
    });

    await recordAuditLog(user.id, 'FOLDER_RENAME', {
      folderId: id,
      previousName: folder.name,
      newName
    }, request);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Folder PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });

    const isAdmin = user.role === 'ADMIN';
    const isOwner = folder.userId === user.id;
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden: only ADMINs or the folder owner can delete this folder.' }, { status: 403 });
    }

    const permanent = request.nextUrl.searchParams.get('permanent') === '1';

    if (!permanent) {
      // Opportunistic janitor pass.
      try { await runTrashJanitor(); } catch (e) { console.warn('[trash] janitor failed', (e as any)?.message); }

      // Soft delete: cascade the same timestamp across the entire subtree so
      // the folder + every descendant restores together (or expires together).
      const subtreeIds = await collectFolderSubtree(id);
      const stamp = new Date();
      await prisma.folder.updateMany({
        where: { id: { in: subtreeIds }, deletedAt: null },
        data: { deletedAt: stamp, deletedByUserId: user.id }
      });

      await recordAuditLog(user.id, 'FOLDER_TRASH', {
        folderId: id,
        folderName: folder.name,
        cascadedFolderCount: subtreeIds.length,
        retentionDays: TRASH_RETENTION_DAYS
      }, request);

      return NextResponse.json({
        success: true,
        soft: true,
        retentionDays: TRASH_RETENTION_DAYS,
        cascadedFolderCount: subtreeIds.length
      });
    }

    // Permanent delete: only ADMIN may bypass the recovery window.
    if (!isAdmin) {
      return NextResponse.json({ error: 'Only admins may permanently delete folders.' }, { status: 403 });
    }

    // Hard-delete the entire subtree of folders + documents inside them.
    const subtreeIds = await collectFolderSubtree(id);
    const docs = await prisma.document.findMany({
      where: { folderId: { in: subtreeIds } },
      select: { id: true, path: true, name: true }
    });
    for (const d of docs) {
      try { await prisma.document.update({ where: { id: d.id }, data: { labels: { set: [] } } }); }
      catch { /* noop */ }
    }
    if (docs.length) {
      await prisma.document.deleteMany({ where: { id: { in: docs.map(d => d.id) } } });
      for (const d of docs) {
        if (d.path) { try { await fs.unlink(d.path); } catch { /* noop */ } }
      }
    }
    // Delete deepest folders first to satisfy parent FKs.
    const ordered = await prisma.folder.findMany({
      where: { id: { in: subtreeIds } },
      select: { id: true, parentId: true }
    });
    const depth = new Map<string, number>();
    const calcDepth = (fid: string): number => {
      if (depth.has(fid)) return depth.get(fid)!;
      const f = ordered.find(x => x.id === fid);
      if (!f || !f.parentId || !subtreeIds.includes(f.parentId)) { depth.set(fid, 0); return 0; }
      const d = calcDepth(f.parentId) + 1;
      depth.set(fid, d);
      return d;
    };
    const sorted = [...subtreeIds].sort((a, b) => calcDepth(b) - calcDepth(a));
    for (const fid of sorted) {
      try { await prisma.folder.delete({ where: { id: fid } }); }
      catch (e) { console.warn('[folder:purge] failed to delete', fid, (e as any)?.message); }
    }

    await recordAuditLog(user.id, 'FOLDER_DELETE', {
      folderId: id,
      folderName: folder.name,
      permanent: true,
      purgedDocumentCount: docs.length,
      purgedFolderCount: subtreeIds.length
    }, request);

    return NextResponse.json({ success: true, soft: false });
  } catch (error: any) {
    console.error('Folder DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
