import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { cleanupExpiredPermissionsIfDue } from '@/lib/janitor';
import {
  TRASH_RETENTION_DAYS,
  daysRemainingInTrash,
  runTrashJanitor
} from '@/lib/trash';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Janitor: cleanup expired share permissions (throttled — not every request)
    await cleanupExpiredPermissionsIfDue();

    const folderId = request.nextUrl.searchParams.get('folderId');
    const folderIdFilter = folderId && folderId !== 'null' ? folderId : null;

    const trash = request.nextUrl.searchParams.get('trash') === '1';

    // Trash view: caller's own deleted docs only (admins see all in active dept).
    if (trash) {
      // Enforce the 30-day recovery window before listing.
      try { await runTrashJanitor(); } catch (e) { console.warn('[trash] janitor failed', (e as any)?.message); }

      const docs = await prisma.document.findMany({
        where: {
          deletedAt: { not: null },
          ...(user.role === 'ADMIN' ? {} : { userId: user.id })
        },
        include: { labels: true, permissions: true, folder: { select: { id: true, name: true, deletedAt: true } } },
        orderBy: { deletedAt: 'desc' }
      });
      const enriched = docs.map(d => ({
        ...d,
        daysRemaining: daysRemainingInTrash(d.deletedAt),
        retentionDays: TRASH_RETENTION_DAYS
      }));
      return NextResponse.json(enriched);
    }

    // If browsing into a specific folder, check that the user can see it.
    if (folderIdFilter) {
      const folder = await prisma.folder.findUnique({
        where: { id: folderIdFilter },
        include: {
          permissions: { where: { sharedWithUserId: user.id } }
        }
      });
      if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
      if (folder.deletedAt) return NextResponse.json({ error: 'Folder is in Trash' }, { status: 404 });

      const isAdmin = user.role === 'ADMIN';
      const isOwnDept = user.activeDeptId === folder.departmentId;
      const isShared = folder.permissions.length > 0;
      if (!isAdmin && !isOwnDept && !isShared) {
        return NextResponse.json({ error: 'You do not have access to this folder.' }, { status: 403 });
      }

      const docs = await prisma.document.findMany({
        where: { folderId: folderIdFilter, deletedAt: null },
        include: { labels: true, permissions: true },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(docs);
    }

    // Root listing: scope to the active department.
    if (!user.activeDeptId && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No active department' }, { status: 400 });
    }

    // Admins may opt into a cross-department view with ?all=1; otherwise even
    // admins are scoped to the department they currently have active.
    const viewAll = request.nextUrl.searchParams.get('all') === '1';
    const deptScope = (user.role === 'ADMIN' && viewAll)
      ? {}
      : (user.activeDeptId ? { departmentId: user.activeDeptId } : {});

    const docs = await prisma.document.findMany({
      where: {
        ...deptScope,
        folderId: null,
        deletedAt: null
      },
      include: { labels: true, permissions: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
