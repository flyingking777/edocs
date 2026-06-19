import { cookies } from 'next/headers';
import { prisma } from './db';
import { decryptToken, hashToken } from './session';
import { effectivePermissionsFor, parsePermissions } from './permissions';
import { isSuperAdmin, normalizeRole } from './roles';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  let userId = cookieStore.get('mock_user_id')?.value;
  const activeDeptId = cookieStore.get('active_dept_id')?.value;

  if (token) {
    const payload = decryptToken(token);
    if (payload && payload.userId) {
      // Validate session in database
      const tokenHash = hashToken(token);
      const activeSession = await prisma.activeSession.findFirst({
        where: {
          token_hash: tokenHash,
          expires_at: { gt: new Date() }
        }
      });
      if (activeSession) {
        userId = payload.userId;
      }
    }
  }

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { 
      departments: {
        include: { department: true }
      }
    }
  });

  if (!user) return null;

  // If no active dept is set, default to the first one assigned to the user
  let finalActiveDeptId = activeDeptId;
  if (!finalActiveDeptId && user.departments.length > 0) {
    const primaryDept = user.departments.find(d => d.isPrimary);
    finalActiveDeptId = primaryDept ? primaryDept.departmentId : user.departments[0].departmentId;
  }

  const activeAssignment = user.departments.find(d => d.departmentId === finalActiveDeptId);

  // Admin-like users (ADMIN, SUB_ADMIN) can be active on a department they
  // don't belong to. In that case the assignment lookup above misses, but we
  // still want the UI to show the dept name. Look up the dept directly.
  let activeDept = activeAssignment?.department || null;
  if (!activeDept && finalActiveDeptId && (user.role === 'ADMIN' || user.role === 'SUB_ADMIN')) {
    activeDept = await prisma.department.findUnique({ where: { id: finalActiveDeptId } });
  }

  const departmentsWithPerms = user.departments.map(d => ({
    ...d,
    permissionsList: parsePermissions(d.permissions)
  }));

  const effectivePermissions = effectivePermissionsFor(user.role, activeAssignment);

  // We expose the SUB_ADMIN role as ADMIN to the rest of the system so the
  // dozens of `role === 'ADMIN'` checks across the API/UI continue to work
  // unchanged. The real DB role stays available as `rawRole` for the few
  // checks that gate Security Vault / audit log access.
  const aliasedRole = normalizeRole(user.role);

  const { password_hash: _passwordHash, ...safeUser } = user;

  return {
    ...safeUser,
    role: aliasedRole,
    rawRole: user.role,
    isSuperAdmin: isSuperAdmin(user.role),
    departments: departmentsWithPerms,
    activeDeptId: finalActiveDeptId,
    activeDept,
    deptRole: activeAssignment?.role || 'MEMBER',
    effectivePermissions
  };
}

export function userHasPermission(
  user: Awaited<ReturnType<typeof getCurrentUser>>,
  permission: 'VIEW' | 'EDIT' | 'DELETE' | 'PRINT' | 'UPLOAD' | 'SHARE'
): boolean {
  if (!user) return false;
  if (user.role === 'ADMIN') return true;
  return user.effectivePermissions.includes(permission);
}
