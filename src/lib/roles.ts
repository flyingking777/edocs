/**
 * Centralized role definitions and aliasing rules.
 *
 * Global roles stored in the database (User.role):
 *   - ADMIN     — full access to everything, including Security Vault.
 *   - SUB_ADMIN — full access to everything EXCEPT Security Vault / audit logs.
 *   - HOD       — head of department (scoped admin within their departments).
 *   - USER      — standard user.
 *
 * The Security Vault is the only privileged surface that distinguishes
 * ADMIN from SUB_ADMIN. Every other admin-only check (user management,
 * department management, oversight, document admin actions, etc.) treats
 * SUB_ADMIN exactly like ADMIN.
 *
 * To avoid touching dozens of `role === 'ADMIN'` checks across the codebase,
 * we ALIAS the role downstream of the session loader: a sub-admin's session
 * exposes `role: 'ADMIN'` while preserving the real value as `rawRole`. The
 * audit/vault gates explicitly read `rawRole`, so only true ADMINs get in.
 */

export const ROLE = {
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
  HOD: 'HOD',
  USER: 'USER',
} as const;

export type GlobalRole = (typeof ROLE)[keyof typeof ROLE];

export const ALL_GLOBAL_ROLES: GlobalRole[] = [
  ROLE.ADMIN,
  ROLE.SUB_ADMIN,
  ROLE.HOD,
  ROLE.USER,
];

/**
 * Normalize a raw DB role into the "effective" role used by most permission
 * checks. SUB_ADMIN → ADMIN. Everything else passes through unchanged.
 */
export function normalizeRole(raw: string | null | undefined): string {
  if (!raw) return ROLE.USER;
  return raw === ROLE.SUB_ADMIN ? ROLE.ADMIN : raw;
}

/** Has the highest level of privilege (Security Vault, audit log access). */
export function isSuperAdmin(raw: string | null | undefined): boolean {
  return raw === ROLE.ADMIN;
}

/** Treated as admin for non-vault privileged actions (ADMIN or SUB_ADMIN). */
export function isAdminLike(raw: string | null | undefined): boolean {
  return raw === ROLE.ADMIN || raw === ROLE.SUB_ADMIN;
}
