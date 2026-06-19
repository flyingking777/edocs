import { prisma } from './db';

export type AuditLogRow = {
  id: string;
  userId: string;
  action: string;
  metadata: string | null;
  ip: string | null;
  userAgent: string | null;
  departmentId: string | null;
  timestamp: Date;
  userName: string | null;
  userEmail: string | null;
  departmentName: string | null;
  logType: 'audit' | 'security';
};

type DeptAssignment = { departmentId: string; role: string };

/**
 * Security Vault / audit log access is intentionally restricted to:
 *   - true ADMINs (NOT SUB_ADMINs — their whole differentiator is no vault),
 *   - HOD role holders, scoped to their own departments.
 *
 * `rawRole` carries the un-aliased DB role; falling back to `role` keeps
 * older callers that haven't been updated working safely (they'd see ADMIN
 * for a sub-admin, which is the original behavior we want to AVOID — so we
 * always prefer rawRole when available).
 */
export function canAccessAuditLogs(user: {
  role: string;
  rawRole?: string;
  departments?: DeptAssignment[];
}): boolean {
  if (!user) return false;
  const effective = user.rawRole ?? user.role;
  if (effective === 'ADMIN' || effective === 'HOD') return true;
  return (user.departments || []).some((d) => d.role === 'HOD');
}

/** Departments a non-admin may view audit data for (dept HOD assignments). */
export function hodManagedDepartmentIds(user: {
  role: string;
  departments?: DeptAssignment[];
}): string[] {
  const hodDepts = (user.departments || [])
    .filter((d) => d.role === 'HOD')
    .map((d) => d.departmentId);
  if (hodDepts.length > 0) return hodDepts;
  if (user.role === 'HOD') {
    return (user.departments || []).map((d) => d.departmentId);
  }
  return [];
}

function parseYmd(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

export function parseAuditDateRange(
  fromStr?: string | null,
  toStr?: string | null,
  options?: { requireBoth?: boolean; defaultDays?: number }
): { from: Date; to: Date } | { error: string } {
  const requireBoth = options?.requireBoth ?? false;
  const defaultDays = options?.defaultDays ?? 30;
  const now = new Date();

  if (requireBoth && (!fromStr?.trim() || !toStr?.trim())) {
    return { error: 'Both start date and end date are required for export.' };
  }

  let from: Date;
  let to: Date;

  if (toStr?.trim()) {
    const parsed = parseYmd(toStr.trim());
    if (!parsed) return { error: 'Invalid end date. Use YYYY-MM-DD.' };
    to = endOfDay(parsed);
  } else {
    to = endOfDay(now);
  }

  if (fromStr?.trim()) {
    const parsed = parseYmd(fromStr.trim());
    if (!parsed) return { error: 'Invalid start date. Use YYYY-MM-DD.' };
    from = startOfDay(parsed);
  } else {
    const fallback = new Date(now);
    fallback.setDate(fallback.getDate() - defaultDays);
    from = startOfDay(fallback);
  }

  if (from.getTime() > to.getTime()) {
    return { error: 'Start date must be on or before end date.' };
  }

  const maxSpanMs = 366 * 24 * 60 * 60 * 1000;
  if (to.getTime() - from.getTime() > maxSpanMs) {
    return { error: 'Date range cannot exceed 366 days.' };
  }

  return { from, to };
}

export function resolveAuditScope(
  user: { role: string; activeDeptId?: string | null; departments?: DeptAssignment[] },
  requestedDeptId: string | null | undefined
): { scopeDeptId: string | null; allowedDeptIds: string[] | null; error?: string } {
  const isAdmin = user.role === 'ADMIN';
  const hodDepts = hodManagedDepartmentIds(user);

  if (isAdmin) {
    if (requestedDeptId === 'all') {
      return { scopeDeptId: null, allowedDeptIds: null };
    }
    if (requestedDeptId) {
      return { scopeDeptId: requestedDeptId, allowedDeptIds: null };
    }
    return { scopeDeptId: user.activeDeptId || null, allowedDeptIds: null };
  }

  if (!hodDepts.length) {
    return { scopeDeptId: null, allowedDeptIds: [], error: 'Forbidden' };
  }

  if (requestedDeptId === 'all') {
    return { scopeDeptId: null, allowedDeptIds: hodDepts };
  }

  if (requestedDeptId && requestedDeptId !== 'active') {
    if (!hodDepts.includes(requestedDeptId)) {
      return { scopeDeptId: null, allowedDeptIds: [], error: 'You can only view audit logs for departments you head.' };
    }
    return { scopeDeptId: requestedDeptId, allowedDeptIds: hodDepts };
  }

  const active = user.activeDeptId && hodDepts.includes(user.activeDeptId)
    ? user.activeDeptId
    : hodDepts[0];
  return { scopeDeptId: active, allowedDeptIds: hodDepts };
}

function metadataContext(metadata: string | null): string {
  if (!metadata) return '';
  try {
    const m = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
    return (
      m.fileName ||
      m.name ||
      m.query ||
      m.detail ||
      m.targetUserId ||
      m.targetEmail ||
      JSON.stringify(m)
    );
  } catch {
    return metadata;
  }
}

export async function fetchAuditLogsEnriched(options: {
  scopeDeptId: string | null;
  allowedDeptIds: string[] | null;
  from: Date;
  to: Date;
  limit: number;
  isAdmin: boolean;
}): Promise<AuditLogRow[]> {
  const { scopeDeptId, allowedDeptIds, from, to, limit, isAdmin } = options;

  const auditWhere: {
    timestamp: { gte: Date; lte: Date };
    departmentId?: string | { in: string[] };
  } = {
    timestamp: { gte: from, lte: to }
  };

  if (scopeDeptId) {
    auditWhere.departmentId = scopeDeptId;
  } else if (allowedDeptIds && allowedDeptIds.length > 0) {
    auditWhere.departmentId = { in: allowedDeptIds };
  }

  const auditLogs = await prisma.auditLog.findMany({
    where: auditWhere,
    orderBy: { timestamp: 'desc' },
    take: limit
  });

  let securityLogs: Array<{
    id: string;
    action: string;
    ip_address: string | null;
    user_id: string | null;
    created_at: Date;
  }> = [];

  if (isAdmin) {
    securityLogs = await prisma.securityLog.findMany({
      where: { created_at: { gte: from, lte: to } },
      orderBy: { created_at: 'desc' },
      take: limit
    });
  } else if (allowedDeptIds && allowedDeptIds.length > 0) {
    const memberships = await prisma.userDepartment.findMany({
      where: { departmentId: { in: allowedDeptIds } },
      select: { userId: true }
    });
    const memberIds = Array.from(new Set(memberships.map((m) => m.userId)));
    if (memberIds.length > 0) {
      securityLogs = await prisma.securityLog.findMany({
        where: {
          created_at: { gte: from, lte: to },
          user_id: { in: memberIds }
        },
        orderBy: { created_at: 'desc' },
        take: limit
      });
    }
  }

  const mappedSecurity = securityLogs.map((sl) => ({
    id: sl.id,
    userId: sl.user_id || 'unknown',
    action: sl.action,
    metadata: null as string | null,
    ip: sl.ip_address || 'unknown',
    userAgent: null as string | null,
    departmentId: null as string | null,
    timestamp: sl.created_at,
    logType: 'security' as const
  }));

  const mappedAudit = auditLogs.map((a) => ({
    id: a.id,
    userId: a.userId,
    action: a.action,
    metadata: a.metadata,
    ip: a.ip,
    userAgent: a.userAgent,
    departmentId: a.departmentId,
    timestamp: a.timestamp,
    logType: 'audit' as const
  }));

  const combined = [...mappedAudit, ...mappedSecurity]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);

  const userIds = Array.from(
    new Set(combined.map((l) => l.userId).filter((id) => id && id !== 'unknown'))
  );
  const users =
    userIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true }
        })
      : [];
  const userMap = new Map(users.map((u) => [u.id, u]));

  const deptIds = Array.from(
    new Set(combined.map((l) => l.departmentId).filter(Boolean) as string[])
  );
  const depts =
    deptIds.length > 0
      ? await prisma.department.findMany({
          where: { id: { in: deptIds } },
          select: { id: true, name: true }
        })
      : [];
  const deptMap = new Map(depts.map((d) => [d.id, d]));

  return combined.map((l) => {
    const u = userMap.get(l.userId);
    const dept = l.departmentId ? deptMap.get(l.departmentId) : null;
    return {
      ...l,
      userName: u?.name || null,
      userEmail: u?.email || null,
      departmentName: dept?.name || (l.departmentId ? null : 'global')
    };
  });
}

export function auditLogsToCsv(rows: AuditLogRow[]): string {
  const headers = [
    'Timestamp',
    'Date',
    'Time',
    'Log Type',
    'Action',
    'User Name',
    'User Email',
    'User ID',
    'Department',
    'IP Address',
    'User Agent',
    'Context'
  ];

  const escape = (val: string) => {
    const s = String(val ?? '');
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [headers.join(',')];
  for (const row of rows) {
    const ts = new Date(row.timestamp);
    lines.push(
      [
        ts.toISOString(),
        ts.toLocaleDateString(),
        ts.toLocaleTimeString(),
        row.logType,
        row.action,
        row.userName || '',
        row.userEmail || '',
        row.userId,
        row.departmentName || (row.departmentId ? '' : 'global'),
        row.ip || '',
        row.userAgent || '',
        metadataContext(row.metadata)
      ]
        .map(escape)
        .join(',')
    );
  }

  return '\uFEFF' + lines.join('\r\n');
}
