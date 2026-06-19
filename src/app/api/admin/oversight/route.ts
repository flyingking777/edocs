import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const HIGH_RISK_ACTIONS = ['FILE_DELETE', 'HIGH_RISK_ALERT', 'UNAUTHORIZED_ACCESS', 'LOGIN_FAILED'];

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { users: true, folders: true, documents: true } }
      }
    });

    const summaries = await Promise.all(departments.map(async (d) => {
      const [docs7d, recentDocs, recentLogsRaw, highRisk7d, highRisk24h, lastLog] = await Promise.all([
        prisma.document.count({ where: { departmentId: d.id, createdAt: { gte: sevenDaysAgo } } }),
        prisma.document.findMany({
          where: { departmentId: d.id },
          orderBy: { createdAt: 'desc' },
          take: 3,
          select: { id: true, name: true, createdAt: true, userId: true }
        }),
        prisma.auditLog.findMany({
          where: { departmentId: d.id },
          orderBy: { timestamp: 'desc' },
          take: 5
        }),
        prisma.auditLog.count({
          where: { departmentId: d.id, action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: sevenDaysAgo } }
        }),
        prisma.auditLog.count({
          where: { departmentId: d.id, action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: twentyFourHoursAgo } }
        }),
        prisma.auditLog.findFirst({
          where: { departmentId: d.id },
          orderBy: { timestamp: 'desc' },
          select: { timestamp: true }
        })
      ]);

      const recentUserIds = Array.from(new Set([
        ...recentLogsRaw.map(l => l.userId),
        ...recentDocs.map(r => r.userId)
      ].filter(Boolean)));
      const recentUsers = recentUserIds.length > 0
        ? await prisma.user.findMany({
            where: { id: { in: recentUserIds } },
            select: { id: true, name: true, email: true }
          })
        : [];
      const userMap = new Map(recentUsers.map(u => [u.id, u]));

      const recentLogs = recentLogsRaw.map(l => ({
        ...l,
        userName: userMap.get(l.userId)?.name || null,
        userEmail: userMap.get(l.userId)?.email || null
      }));
      const recentDocsEnriched = recentDocs.map(d2 => ({
        ...d2,
        uploader: userMap.get(d2.userId) || null
      }));

      return {
        id: d.id,
        name: d.name,
        users: d._count.users,
        folders: d._count.folders,
        documents: d._count.documents,
        docs7d,
        highRisk7d,
        highRisk24h,
        lastActivity: lastLog?.timestamp || null,
        recentLogs,
        recentDocs: recentDocsEnriched
      };
    }));

    const totals = summaries.reduce((acc, s) => ({
      documents: acc.documents + s.documents,
      folders: acc.folders + s.folders,
      users: acc.users + s.users,
      docs7d: acc.docs7d + s.docs7d,
      highRisk24h: acc.highRisk24h + s.highRisk24h,
      highRisk7d: acc.highRisk7d + s.highRisk7d
    }), { documents: 0, folders: 0, users: 0, docs7d: 0, highRisk24h: 0, highRisk7d: 0 });

    return NextResponse.json({ totals, departments: summaries });
  } catch (error: any) {
    console.error('Oversight summary error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
