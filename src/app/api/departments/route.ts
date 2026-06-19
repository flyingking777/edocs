import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { canAccessAuditLogs, hodManagedDepartmentIds } from '@/lib/audit-query';
import { PERMISSION_PRESETS } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

const VALID_PRESET_IDS = new Set(PERMISSION_PRESETS.map(p => p.id));

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'HOD' && !canAccessAuditLogs(user))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hodDepts = hodManagedDepartmentIds(user);
    const departments = await prisma.department.findMany({
      where: user.role === 'ADMIN' ? undefined : { id: { in: hodDepts } },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { users: true, folders: true, documents: true }
        }
      }
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const rawName = typeof body?.name === 'string' ? body.name.trim() : '';
    const rawPreset = typeof body?.defaultPermissionPreset === 'string'
      ? body.defaultPermissionPreset.trim().toLowerCase()
      : '';

    if (!rawName) {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
    }
    if (rawName.length > 80) {
      return NextResponse.json({ error: 'Department name must be 80 characters or fewer' }, { status: 400 });
    }
    if (rawPreset && !VALID_PRESET_IDS.has(rawPreset)) {
      return NextResponse.json({ error: 'Invalid default permission preset' }, { status: 400 });
    }

    const existing = await prisma.department.findFirst({
      where: { name: rawName, tenantId: 'tenant_1' }
    });
    if (existing) {
      return NextResponse.json({ error: 'A department with this name already exists' }, { status: 409 });
    }

    const department = await prisma.department.create({
      data: {
        name: rawName,
        defaultPermissionPreset: rawPreset || null
      }
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
