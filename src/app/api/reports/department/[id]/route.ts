import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'HOD')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    // Ensure the user has access to this department
    const activeDeptId = id === 'active' ? user.activeDeptId : id;
    
    if (!activeDeptId) {
      return NextResponse.json({ error: 'No active department' }, { status: 400 });
    }

    const isMember = user.role === 'ADMIN' || user.departments.some((ud: any) => ud.departmentId === activeDeptId);
    if (!isMember) {
      return NextResponse.json({ error: 'Access denied to this department' }, { status: 403 });
    }

    // 1. Total document count
    const totalDocs = await prisma.document.count({ where: { departmentId: activeDeptId } });

    // 2. Count by Label
    const labels = await prisma.label.findMany({
      where: { documents: { some: { departmentId: activeDeptId } } },
      select: {
        name: true,
        _count: {
          select: { documents: { where: { departmentId: activeDeptId } } }
        }
      }
    });
    const labelDistribution = labels.map(l => ({ name: l.name, count: l._count.documents }));

    // 3. Top 5 active users
    const auditLogs = await prisma.auditLog.findMany({
      where: { departmentId: activeDeptId },
      select: { userId: true }
    });
    
    const userActivityMap: Record<string, number> = {};
    auditLogs.forEach(log => {
      userActivityMap[log.userId] = (userActivityMap[log.userId] || 0) + 1;
    });
    
    const topUsers = await Promise.all(
      Object.entries(userActivityMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(async ([uid, count]) => {
          const u = await prisma.user.findUnique({ where: { id: uid }, select: { name: true } });
          return { name: u?.name || 'Unknown', count };
        })
    );

    // 4. Active Shared links
    const activeSharedLinks = await prisma.documentPermission.count({
      where: { 
        document: { departmentId: activeDeptId },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    // 5. Weekly Trends (Last 4 weeks)
    const now = new Date();
    const weeklyTrends = await Promise.all([3, 2, 1, 0].map(async (weeksAgo) => {
      const start = new Date(now.getTime() - (weeksAgo + 1) * 7 * 24 * 60 * 60 * 1000);
      const end = new Date(now.getTime() - weeksAgo * 7 * 24 * 60 * 60 * 1000);
      const count = await prisma.document.count({
        where: {
          departmentId: activeDeptId,
          createdAt: { gte: start, lte: end }
        }
      });
      return { week: weeksAgo === 0 ? 'This Week' : `${weeksAgo}w ago`, count };
    }));

    // 6. Security Watch (Recent High Risk Logs)
    const securityWatchRaw = await prisma.auditLog.findMany({
      where: { 
        departmentId: activeDeptId,
        action: { in: ['FILE_DELETE', 'HIGH_RISK_ALERT', 'UNAUTHORIZED_ACCESS'] }
      },
      take: 5,
      orderBy: { timestamp: 'desc' }
    });

    const watchUserIds = Array.from(new Set(securityWatchRaw.map(l => l.userId).filter(Boolean)));
    const watchUsers = watchUserIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: watchUserIds } },
          select: { id: true, name: true, email: true }
        })
      : [];
    const watchUserMap = new Map(watchUsers.map(u => [u.id, u]));
    const securityWatch = securityWatchRaw.map(l => {
      const u = watchUserMap.get(l.userId);
      return { ...l, userName: u?.name || null, userEmail: u?.email || null };
    });

    return NextResponse.json({
      totalDocs,
      activeSharedLinks,
      labelDistribution,
      topUsers,
      weeklyTrends,
      securityWatch
    });

  } catch (error: any) {
    console.error('Report Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
