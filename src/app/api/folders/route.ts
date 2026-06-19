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

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Janitor: clear expired folder permissions before listing (throttled)
    await cleanupExpiredPermissionsIfDue();

    const isAdmin = user.role === 'ADMIN';
    const trash = req.nextUrl.searchParams.get('trash') === '1';

    // Trash listing: deleted folders within the recovery window. Owners see
    // their own trashed folders; admins see everything in their active
    // department (or everything when ?all=1).
    if (trash) {
      try { await runTrashJanitor(); } catch (e) { console.warn('[trash] janitor failed', (e as any)?.message); }

      const viewAll = req.nextUrl.searchParams.get('all') === '1';
      const scopeWhere: any = {};
      if (!isAdmin) {
        scopeWhere.userId = user.id;
      } else if (!viewAll && user.activeDeptId) {
        scopeWhere.departmentId = user.activeDeptId;
      }

      const trashed = await prisma.folder.findMany({
        where: { deletedAt: { not: null }, ...scopeWhere },
        include: {
          department: { select: { id: true, name: true } },
          parent: { select: { id: true, name: true, deletedAt: true } },
          _count: { select: { documents: true, children: true } }
        },
        orderBy: { deletedAt: 'desc' }
      });

      // Only expose the "root" of each delete event - a folder whose parent
      // is not also trashed in the same event. That collapses nested cascades
      // into one Trash item.
      const visible = trashed.filter(f => {
        if (!f.parent) return true;
        if (!f.parent.deletedAt) return true;
        return f.parent.deletedAt.getTime() !== f.deletedAt!.getTime();
      });

      const enriched = visible.map(f => ({
        ...f,
        daysRemaining: daysRemainingInTrash(f.deletedAt),
        retentionDays: TRASH_RETENTION_DAYS
      }));

      return NextResponse.json(enriched);
    }

    // Admins may opt into a cross-department view with ?all=1; otherwise they are
    // scoped to the department they currently have active. Everyone else sees
    // folders in their active dept + folders shared with them.
    const viewAll = req.nextUrl.searchParams.get('all') === '1';
    const where: any = (isAdmin && viewAll)
      ? {}
      : isAdmin
        ? (user.activeDeptId ? { departmentId: user.activeDeptId } : {})
        : {
            OR: [
              user.activeDeptId ? { departmentId: user.activeDeptId } : null,
              { permissions: { some: { sharedWithUserId: user.id } } }
            ].filter(Boolean) as any[]
          };
    // Always exclude soft-deleted folders from the active listing.
    where.deletedAt = null;

    const folders = await prisma.folder.findMany({
      where,
      include: {
        department: { select: { id: true, name: true } },
        permissions: {
          where: { sharedWithUserId: user.id },
          select: { permissionLevel: true, expiresAt: true, sharedAt: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const enriched = folders.map(f => {
      const sharedGrant = f.permissions[0] || null;
      const isShared = !!sharedGrant && f.departmentId !== user.activeDeptId && user.role !== 'ADMIN';
      return { ...f, sharedGrant, isShared };
    });

    return NextResponse.json(enriched);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.activeDeptId) {
      return NextResponse.json({ error: 'Unauthorized or no department context' }, { status: 401 });
    }

    // Only admins and heads of department may create folders.
    const isHod = user.role === 'HOD' || user.deptRole === 'HOD';
    if (user.role !== 'ADMIN' && !isHod) {
      return NextResponse.json(
        { error: 'Only administrators and heads of department can create folders.' },
        { status: 403 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const parentId = typeof body?.parentId === 'string' && body.parentId ? body.parentId : null;

    if (!name) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }
    if (name.length > 120) {
      return NextResponse.json({ error: 'Folder name must be 120 characters or fewer' }, { status: 400 });
    }

    // When nesting, the parent must exist and live in the same department.
    let departmentId = user.activeDeptId;
    if (parentId) {
      const parent = await prisma.folder.findUnique({
        where: { id: parentId },
        select: { departmentId: true }
      });
      if (!parent) {
        return NextResponse.json({ error: 'Parent folder not found.' }, { status: 404 });
      }
      if (user.role !== 'ADMIN' && parent.departmentId !== user.activeDeptId) {
        return NextResponse.json(
          { error: 'Cannot create a sub-folder in another department.' },
          { status: 403 }
        );
      }
      // Inherit the parent's department so sub-folders never drift across departments.
      departmentId = parent.departmentId;
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        departmentId,
        userId: user.id,
        parentId
      }
    });

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  }
}
