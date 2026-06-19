import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const HIGH_RISK_ACTIONS = ['FILE_DELETE', 'HIGH_RISK_ALERT', 'UNAUTHORIZED_ACCESS', 'LOGIN_FAILED'];

const RANGE_CONFIG = {
  '24h': { windowMs: 24 * 60 * 60 * 1000, bucketMs: 60 * 60 * 1000, points: 24 },
  '7d': { windowMs: 7 * 24 * 60 * 60 * 1000, bucketMs: 24 * 60 * 60 * 1000, points: 7 },
  '30d': { windowMs: 30 * 24 * 60 * 60 * 1000, bucketMs: 24 * 60 * 60 * 1000, points: 30 }
} as const;

type RangeKey = keyof typeof RANGE_CONFIG;

function seriesFromDates(dates: Date[], startMs: number, bucketMs: number, points: number): number[] {
  const out = Array.from({ length: points }, () => 0);
  for (const d of dates) {
    const ts = d.getTime();
    const idx = Math.floor((ts - startMs) / bucketMs);
    if (idx >= 0 && idx < points) out[idx] += 1;
  }
  return out;
}

function labelsForRange(startMs: number, bucketMs: number, points: number, range: RangeKey): string[] {
  return Array.from({ length: points }, (_, i) => {
    const d = new Date(startMs + i * bucketMs);
    if (range === '24h') {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  });
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const rangeParam = String(req.nextUrl.searchParams.get('range') || '7d') as RangeKey;
    const range: RangeKey = rangeParam in RANGE_CONFIG ? rangeParam : '7d';

    const now = Date.now();
    const last24h = new Date(now - 24 * 60 * 60 * 1000);
    const last7d = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const cfg = RANGE_CONFIG[range];
    const rangeEndMs = Math.floor(now / cfg.bucketMs) * cfg.bucketMs + cfg.bucketMs;
    const rangeStartMs = rangeEndMs - cfg.points * cfg.bucketMs;
    const rangeStart = new Date(rangeStartMs);

    const [
      departments,
      usersTotal,
      foldersTotal,
      documentsTotal,
      docs24h,
      docs7d,
      highRisk24h,
      highRisk7d,
      docsInRange,
      highRiskInRange,
      auditsInRange,
      contributorCounts
    ] = await Promise.all([
      prisma.department.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { users: true, folders: true, documents: true } } }
      }),
      prisma.user.count(),
      prisma.folder.count(),
      prisma.document.count({ where: { deletedAt: null } }),
      prisma.document.count({ where: { deletedAt: null, createdAt: { gte: last24h } } }),
      prisma.document.count({ where: { deletedAt: null, createdAt: { gte: last7d } } }),
      prisma.auditLog.count({ where: { action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: last24h } } }),
      prisma.auditLog.count({ where: { action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: last7d } } }),
      prisma.document.findMany({
        where: { deletedAt: null, createdAt: { gte: rangeStart } },
        select: { createdAt: true }
      }),
      prisma.auditLog.findMany({
        where: { action: { in: HIGH_RISK_ACTIONS }, timestamp: { gte: rangeStart } },
        select: { timestamp: true }
      }),
      prisma.auditLog.findMany({
        where: { timestamp: { gte: rangeStart } },
        orderBy: { timestamp: 'desc' },
        take: 60
      }),
      // Raw SQL GROUP BY is more reliable on SQLite than Prisma groupBy here.
      prisma.$queryRaw<Array<{ userId: string; cnt: number }>>`
        SELECT "userId", COUNT(*) as cnt
        FROM "AuditLog"
        WHERE "timestamp" >= ${rangeStart}
        GROUP BY "userId"
        ORDER BY cnt DESC
        LIMIT 6
      `
    ]);

    const userIds = Array.from(
      new Set([
        ...auditsInRange.map((a) => a.userId).filter(Boolean),
        ...contributorCounts.map((c) => c.userId).filter(Boolean)
      ])
    );
    const users = userIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true }
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u]));

    const recentActivity = auditsInRange.map((a) => ({
      ...a,
      userName: userMap.get(a.userId)?.name || null,
      userEmail: userMap.get(a.userId)?.email || null
    }));

    const topContributors = contributorCounts.map((c) => ({
      userId: c.userId,
      actions: Number(c.cnt),
      userName: userMap.get(c.userId)?.name || c.userId,
      userEmail: userMap.get(c.userId)?.email || null
    }));

    const departmentSnapshot = departments
      .map((d) => ({
        id: d.id,
        name: d.name,
        users: d._count.users,
        folders: d._count.folders,
        documents: d._count.documents
      }))
      .sort((a, b) => b.documents - a.documents);

    const trendLabels = labelsForRange(rangeStartMs, cfg.bucketMs, cfg.points, range);
    const docsSeries = seriesFromDates(
      docsInRange.map((d) => d.createdAt),
      rangeStartMs,
      cfg.bucketMs,
      cfg.points
    );
    const highRiskSeries = seriesFromDates(
      highRiskInRange.map((a) => a.timestamp),
      rangeStartMs,
      cfg.bucketMs,
      cfg.points
    );
    const activitySeries = seriesFromDates(
      auditsInRange.map((a) => a.timestamp),
      rangeStartMs,
      cfg.bucketMs,
      cfg.points
    );

    return NextResponse.json({
      range,
      totals: {
        departments: departments.length,
        users: usersTotal,
        folders: foldersTotal,
        documents: documentsTotal,
        docs24h,
        docs7d,
        highRisk24h,
        highRisk7d
      },
      inRange: {
        docs: docsInRange.length,
        highRisk: highRiskInRange.length,
        activities: auditsInRange.length
      },
      trends: {
        labels: trendLabels,
        docsSeries,
        highRiskSeries,
        activitySeries
      },
      departmentSnapshot,
      topContributors,
      recentActivity
    });
  } catch (error: any) {
    console.error('Dashboard summary error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
