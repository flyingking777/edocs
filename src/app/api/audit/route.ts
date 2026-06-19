import { prisma } from '@/lib/db';
import { recordAuditLog } from '@/lib/audit';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
  canAccessAuditLogs,
  fetchAuditLogsEnriched,
  parseAuditDateRange,
  resolveAuditScope
} from '@/lib/audit-query';

export const dynamic = 'force-dynamic';

const LIST_LIMIT = 500;

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!canAccessAuditLogs(user)) {
      return NextResponse.json({ error: 'Forbidden: ADMIN or HOD role required' }, { status: 403 });
    }

    const fromStr = req.nextUrl.searchParams.get('from');
    const toStr = req.nextUrl.searchParams.get('to');
    const range = parseAuditDateRange(fromStr, toStr);
    if ('error' in range) {
      return NextResponse.json({ error: range.error }, { status: 400 });
    }

    const requestedDeptId = req.nextUrl.searchParams.get('departmentId');
    const scope = resolveAuditScope(user, requestedDeptId);
    if (scope.error) {
      return NextResponse.json({ error: scope.error }, { status: 403 });
    }

    // Only a true ADMIN (NOT a sub-admin, which is excluded by
    // canAccessAuditLogs above) gets to see cross-tenant security logs.
    const isAdmin = (user.rawRole ?? user.role) === 'ADMIN';
    const enriched = await fetchAuditLogsEnriched({
      scopeDeptId: scope.scopeDeptId,
      allowedDeptIds: scope.allowedDeptIds,
      from: range.from,
      to: range.to,
      limit: LIST_LIMIT,
      isAdmin
    });

    return NextResponse.json(enriched);
  } catch (error) {
    console.error('Audit GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, action, metadata } = await req.json();
    await recordAuditLog(userId, action, metadata, req);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record log' }, { status: 500 });
  }
}
