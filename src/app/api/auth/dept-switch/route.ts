import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { departmentId } = await req.json();
    if (typeof departmentId !== 'string' || !departmentId.trim()) {
      return NextResponse.json({ error: 'departmentId is required' }, { status: 400 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // ADMIN and SUB_ADMIN can switch to any department in the tenant — they
    // operate globally and need to be able to view per-department scopes.
    // (`user.role` is already aliased so SUB_ADMIN reads as "ADMIN" here.)
    const isAdminLike = user.role === 'ADMIN';

    if (isAdminLike) {
      const dept = await prisma.department.findUnique({ where: { id: departmentId } });
      if (!dept) {
        return NextResponse.json({ error: 'Department not found' }, { status: 404 });
      }
    } else {
      // Everyone else must be an actual member of the target department.
      const membership = await prisma.userDepartment.findUnique({
        where: {
          userId_departmentId: {
            userId: user.id,
            departmentId
          }
        }
      });
      if (!membership) {
        return NextResponse.json({ error: 'You do not belong to this department' }, { status: 403 });
      }
    }

    const cookieStore = await cookies();
    cookieStore.set('active_dept_id', departmentId, { path: '/' });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Department switch error:', error);
    return NextResponse.json({ error: 'Failed to switch department' }, { status: 500 });
  }
}
