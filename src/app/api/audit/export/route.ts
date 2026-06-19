import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
  auditLogsToCsv,
  canAccessAuditLogs,
  fetchAuditLogsEnriched,
  parseAuditDateRange,
  resolveAuditScope
} from '@/lib/audit-query';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const EXPORT_LIMIT = 50_000;

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
    const range = parseAuditDateRange(fromStr, toStr, { requireBoth: true });
    if ('error' in range) {
      return NextResponse.json({ error: range.error }, { status: 400 });
    }

    const requestedDeptId = req.nextUrl.searchParams.get('departmentId');
    const scope = resolveAuditScope(user, requestedDeptId);
    if (scope.error) {
      return NextResponse.json({ error: scope.error }, { status: 403 });
    }

    const isAdmin = (user.rawRole ?? user.role) === 'ADMIN';
    const rows = await fetchAuditLogsEnriched({
      scopeDeptId: scope.scopeDeptId,
      allowedDeptIds: scope.allowedDeptIds,
      from: range.from,
      to: range.to,
      limit: EXPORT_LIMIT,
      isAdmin
    });

    await recordAuditLog(
      user.id,
      'AUDIT_EXPORT',
      {
        from: fromStr,
        to: toStr,
        departmentId: requestedDeptId || scope.scopeDeptId || 'scoped',
        rowCount: rows.length
      },
      req
    );

    const fromLabel = (fromStr || '').trim().slice(0, 10);
    const toLabel = (toStr || '').trim().slice(0, 10);
    const filename = `security-audit_${fromLabel}_to_${toLabel}.csv`;
    const csv = auditLogsToCsv(rows);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Audit export error:', error);
    return NextResponse.json({ error: 'Failed to export audit logs' }, { status: 500 });
  }
}
