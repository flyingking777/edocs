import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import { PERMISSION_PRESETS } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

const VALID_PRESET_IDS = new Set(PERMISSION_PRESETS.map(p => p.id));

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const dept = await prisma.department.findUnique({ where: { id } });
    if (!dept) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const data: { name?: string; defaultPermissionPreset?: string | null } = {};

    if (typeof body?.name === 'string') {
      const name = body.name.trim();
      if (!name) return NextResponse.json({ error: 'Department name cannot be empty' }, { status: 400 });
      if (name.length > 80) {
        return NextResponse.json({ error: 'Department name must be 80 characters or fewer' }, { status: 400 });
      }
      if (name !== dept.name) {
        const clash = await prisma.department.findFirst({
          where: { name, tenantId: dept.tenantId, NOT: { id } }
        });
        if (clash) {
          return NextResponse.json({ error: 'Another department already uses this name' }, { status: 409 });
        }
        data.name = name;
      }
    }

    // defaultPermissionPreset can be set to a valid preset id, "" / null to clear.
    if (Object.prototype.hasOwnProperty.call(body || {}, 'defaultPermissionPreset')) {
      const raw = body.defaultPermissionPreset;
      if (raw === null || raw === '' || typeof raw === 'undefined') {
        data.defaultPermissionPreset = null;
      } else if (typeof raw === 'string') {
        const id = raw.trim().toLowerCase();
        if (!VALID_PRESET_IDS.has(id)) {
          return NextResponse.json({ error: 'Invalid default permission preset' }, { status: 400 });
        }
        data.defaultPermissionPreset = id;
      } else {
        return NextResponse.json({ error: 'Invalid default permission preset' }, { status: 400 });
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(dept);
    }

    const updated = await prisma.department.update({ where: { id }, data });

    await recordAuditLog(user.id, 'DEPARTMENT_UPDATE', {
      departmentId: id,
      changes: Object.keys(data),
      defaultPermissionPreset: 'defaultPermissionPreset' in data ? data.defaultPermissionPreset : undefined,
      name: 'name' in data ? data.name : undefined
    }, req);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Department PATCH error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update department' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const dept = await prisma.department.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            folders: { where: { deletedAt: null } },
            documents: { where: { deletedAt: null } },
            users: true
          }
        }
      }
    });
    if (!dept) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    // Refuse to delete if the department still owns folders or documents.
    // Cascading those would silently wipe a lot of content; we'd rather force
    // the admin to move them first. (UserDepartment join rows DO cascade
    // because they're cheap to recreate.)
    if (dept._count.folders > 0 || dept._count.documents > 0) {
      return NextResponse.json(
        {
          error: 'Department still contains content',
          message:
            `This department has ${dept._count.folders} folder(s) and ` +
            `${dept._count.documents} document(s). Move or delete them first.`,
          folders: dept._count.folders,
          documents: dept._count.documents
        },
        { status: 409 }
      );
    }

    await prisma.department.delete({ where: { id } });

    await recordAuditLog(user.id, 'DEPARTMENT_DELETE', {
      departmentId: id,
      name: dept.name,
      membersRemoved: dept._count.users
    }, req);

    return NextResponse.json({ ok: true, id });
  } catch (error: any) {
    console.error('Department DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete department' }, { status: 500 });
  }
}
