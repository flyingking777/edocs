import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import {
  ALL_PERMISSIONS,
  defaultPermissionsForDeptRole,
  parsePermissions,
  serializePermissions
} from '@/lib/permissions';

const ALLOWED_PERMS = new Set<string>(ALL_PERMISSIONS);

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'HOD')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId } = await params;
    const userDepts = await prisma.userDepartment.findMany({
      where: { userId },
      include: { department: true }
    });

    const enriched = userDepts.map(ud => ({
      ...ud,
      permissionsList: parsePermissions(ud.permissions)
    }));

    return NextResponse.json(enriched);
  } catch (error) {
    console.error('Error fetching user departments:', error);
    return NextResponse.json({ error: 'Failed to fetch user departments' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'HOD')) {
      await recordAuditLog(currentUser?.id || 'unknown', 'HIGH_RISK_ALERT', {
        detail: 'Unauthorized user assignment attempt',
        ip: req.headers.get('x-forwarded-for') || 'unknown'
      }, req);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: targetUserId } = await params;
    const { assignments } = await req.json();

    // 1. Identify managed departments
    let managedDeptIds: string[] = [];
    if (currentUser.role === 'ADMIN') {
      const allDepts = await prisma.department.findMany();
      managedDeptIds = allDepts.map(d => d.id);
    } else {
      managedDeptIds = currentUser.departments
        .filter((ud: any) => ud.role === 'HOD')
        .map((ud: any) => ud.departmentId);
    }

    // 2. Security Check: Did the user try to touch any department they don't manage?
    const attemptedDeptIds = (assignments as any[]).map((a: any) => a.departmentId);
    const unauthorizedDepts = attemptedDeptIds.filter((id: string) => !managedDeptIds.includes(id));

    if (unauthorizedDepts.length > 0) {
      await recordAuditLog(currentUser.id, 'HIGH_RISK_ALERT', {
        detail: 'Unauthorized assignment attempt to foreign departments',
        attemptedDepts: unauthorizedDepts,
        ip: req.headers.get('x-forwarded-for') || 'unknown'
      }, req);
      return NextResponse.json({ error: 'Security Violation: Cannot manage foreign departments' }, { status: 403 });
    }

    // 3. Normalize incoming assignments (role + permissions)
    let normalized: Array<{ departmentId: string; role: string; isPrimary: boolean; permissions: string }>;
    try {
      normalized = (assignments as any[]).map((a: any) => {
        const role = String(a.role || 'MEMBER').toUpperCase();
        if (role !== 'MEMBER' && role !== 'HOD') throw new Error('INVALID_DEPT_ROLE');
        let permsArr: string[];
        if (Array.isArray(a.permissions)) {
          permsArr = a.permissions.map((p: any) => String(p).toUpperCase());
          for (const p of permsArr) {
            if (!ALLOWED_PERMS.has(p)) throw new Error('INVALID_PERMISSION');
          }
          if (!permsArr.includes('VIEW')) permsArr.push('VIEW');
        } else {
          permsArr = defaultPermissionsForDeptRole(role);
        }
        return {
          departmentId: a.departmentId,
          role,
          isPrimary: !!a.isPrimary,
          permissions: serializePermissions(permsArr)
        };
      });
    } catch (e: any) {
      if (e?.message === 'INVALID_DEPT_ROLE') {
        return NextResponse.json({ error: 'Invalid department role. Must be MEMBER or HOD.' }, { status: 400 });
      }
      if (e?.message === 'INVALID_PERMISSION') {
        return NextResponse.json({ error: 'Invalid permission code.' }, { status: 400 });
      }
      throw e;
    }

    // 4. Update logic: Silo-aware replace
    await prisma.$transaction(async (tx) => {
      // Clear only managed assignments
      await tx.userDepartment.deleteMany({
        where: {
          userId: targetUserId,
          departmentId: { in: managedDeptIds }
        }
      });

      // Add new assignments
      if (normalized.length > 0) {
        await tx.userDepartment.createMany({
          data: normalized.map(a => ({
            userId: targetUserId,
            departmentId: a.departmentId,
            role: a.role,
            isPrimary: a.isPrimary,
            permissions: a.permissions
          }))
        });
      }
    });

    // 5. Audit
    for (const a of normalized) {
      const dept = await prisma.department.findUnique({ where: { id: a.departmentId } });
      await recordAuditLog(currentUser.id, 'USER_ASSIGNMENT_CHANGE', {
        targetUserId,
        deptName: dept?.name,
        role: a.role,
        isPrimary: a.isPrimary,
        permissions: a.permissions
      }, req);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Assignment Error:', error);
    return NextResponse.json({ error: 'Failed to update assignments' }, { status: 500 });
  }
}
