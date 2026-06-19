import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import {
  ALL_PERMISSIONS,
  defaultPermissionsForDeptRole,
  parsePermissions,
  serializePermissions
} from '@/lib/permissions';

export const dynamic = 'force-dynamic';

const ALLOWED_GLOBAL_ROLES = new Set(['ADMIN', 'SUB_ADMIN', 'HOD', 'USER']);
const ALLOWED_DEPT_ROLES = new Set(['MEMBER', 'HOD']);
const ALLOWED_PERMS = new Set<string>(ALL_PERMISSIONS);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'HOD')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      include: {
        departments: { include: { department: true } }
      }
    });

    const safe = users.map(({ password_hash, ...rest }) => ({
      ...rest,
      departments: rest.departments.map(d => ({
        ...d,
        permissionsList: parsePermissions(d.permissions)
      }))
    }));
    return NextResponse.json(safe);
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ error: 'Failed to list users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const actor = await getCurrentUser();
    if (!actor || actor.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const role = typeof body?.role === 'string' ? body.role.toUpperCase() : 'USER';
    const assignments: Array<{ departmentId: string; role?: string; isPrimary?: boolean; permissions?: string[] }> =
      Array.isArray(body?.assignments) ? body.assignments : [];

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (name.length > 80) return NextResponse.json({ error: 'Name must be 80 characters or fewer' }, { status: 400 });
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    if (!ALLOWED_GLOBAL_ROLES.has(role)) {
      return NextResponse.json({ error: 'Invalid global role' }, { status: 400 });
    }

    // Only a true ADMIN can mint another ADMIN. A SUB_ADMIN (whose `role` is
    // aliased to "ADMIN" downstream) is excluded by checking `rawRole`.
    // Without this, a sub-admin could create an ADMIN account and log in as
    // them to bypass their Security Vault restriction.
    const actorRawRole = (actor as any).rawRole ?? actor.role;
    if (role === 'ADMIN' && actorRawRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only a full ADMIN can grant the ADMIN role.' },
        { status: 403 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    let normalizedAssignments: Array<{ departmentId: string; role: string; isPrimary: boolean; permissions: string }> = [];
    if (assignments.length > 0) {
      const ids = Array.from(new Set(assignments.map(a => a.departmentId).filter(Boolean)));
      if (ids.length !== assignments.length) {
        return NextResponse.json({ error: 'Duplicate department assignments are not allowed' }, { status: 400 });
      }
      const depts = await prisma.department.findMany({ where: { id: { in: ids } } });
      if (depts.length !== ids.length) {
        return NextResponse.json({ error: 'One or more departments do not exist' }, { status: 400 });
      }
      normalizedAssignments = assignments.map(a => {
        const r = (a.role || 'MEMBER').toUpperCase();
        if (!ALLOWED_DEPT_ROLES.has(r)) {
          throw new Error('INVALID_DEPT_ROLE');
        }
        let permsArr: string[];
        if (Array.isArray(a.permissions)) {
          permsArr = a.permissions.map(p => String(p).toUpperCase());
          for (const p of permsArr) {
            if (!ALLOWED_PERMS.has(p)) throw new Error('INVALID_PERMISSION');
          }
          // VIEW is the floor — every assignment must include it.
          if (!permsArr.includes('VIEW')) permsArr.push('VIEW');
        } else {
          permsArr = defaultPermissionsForDeptRole(r);
        }
        return {
          departmentId: a.departmentId,
          role: r,
          isPrimary: !!a.isPrimary,
          permissions: serializePermissions(permsArr)
        };
      });

      const primaries = normalizedAssignments.filter(a => a.isPrimary);
      if (primaries.length > 1) {
        return NextResponse.json({ error: 'Only one department can be marked primary' }, { status: 400 });
      }
      if (primaries.length === 0) {
        normalizedAssignments[0].isPrimary = true;
      }
    }

    const password_hash = await bcrypt.hash(password, 10);

    const created = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: { name, email, role, password_hash }
      });
      if (normalizedAssignments.length > 0) {
        await tx.userDepartment.createMany({
          data: normalizedAssignments.map(a => ({
            userId: u.id,
            departmentId: a.departmentId,
            role: a.role,
            isPrimary: a.isPrimary,
            permissions: a.permissions
          }))
        });
      }
      return tx.user.findUnique({
        where: { id: u.id },
        include: { departments: { include: { department: true } } }
      });
    });

    await recordAuditLog(actor.id, 'USER_CREATE', {
      newUserId: created?.id,
      email,
      role,
      assignmentCount: normalizedAssignments.length
    }, req);

    if (created) {
      const { password_hash: _ph, ...safe } = created;
      return NextResponse.json(safe, { status: 201 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  } catch (error: any) {
    if (error?.message === 'INVALID_DEPT_ROLE') {
      return NextResponse.json({ error: 'Invalid department role. Must be MEMBER or HOD.' }, { status: 400 });
    }
    if (error?.message === 'INVALID_PERMISSION') {
      return NextResponse.json({ error: 'Invalid permission code. Must be one of: VIEW, EDIT, DELETE, PRINT, UPLOAD, SHARE.' }, { status: 400 });
    }
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
