import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const HIGH_RISK_ACTIONS = ['FILE_DELETE', 'HIGH_RISK_ALERT', 'UNAUTHORIZED_ACCESS', 'LOGIN_FAILED'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) return NextResponse.json({ error: 'Department not found' }, { status: 404 });

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [documents, folders, members, activity, highRisk7d] = await Promise.all([
      prisma.document.findMany({
        where: { departmentId: id },
        orderBy: { createdAt: 'desc' },
        take: 25,
        include: {
          labels: true,
          folder: { select: { id: true, name: true } }
        }
      }),
      prisma.folder.findMany({
        where: { departmentId: id },
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { documents: true } } }
      }),
      prisma.userDepartment.findMany({
        where: { departmentId: id },
        include: { user: { select: { id: true, name: true, email: true, role: true } } }
      }),
      prisma.auditLog.findMany({
        where: { departmentId: id },
        orderBy: { timestamp: 'desc' },
        take: 50
      }),
      prisma.auditLog.count({
        where: { departmentId: id, action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: sevenDaysAgo } }
      })
    ]);

    const allUserIds = Array.from(new Set([
      ...documents.map(d => d.userId),
      ...activity.map(a => a.userId)
    ].filter(Boolean)));
    const users = allUserIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: allUserIds } },
          select: { id: true, name: true, email: true }
        })
      : [];
    const userMap = new Map(users.map(u => [u.id, u]));

    const documentsEnriched = documents.map(d => ({
      ...d,
      uploader: userMap.get(d.userId) || null
    }));
    const activityEnriched = activity.map(a => ({
      ...a,
      userName: userMap.get(a.userId)?.name || null,
      userEmail: userMap.get(a.userId)?.email || null
    }));

    return NextResponse.json({
      department: {
        id: department.id,
        name: department.name
      },
      documents: documentsEnriched,
      folders,
      members: members.map(m => ({
        userId: m.userId,
        role: m.role,
        isPrimary: m.isPrimary,
        permissions: m.permissions,
        user: m.user
      })),
      activity: activityEnriched,
      highRisk7d
    });
  } catch (error: any) {
    console.error('Oversight drill-down error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
