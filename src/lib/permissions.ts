export type Permission = 'VIEW' | 'EDIT' | 'DELETE' | 'PRINT' | 'UPLOAD' | 'SHARE';

export const ALL_PERMISSIONS: Permission[] = ['VIEW', 'EDIT', 'DELETE', 'PRINT', 'UPLOAD', 'SHARE'];

const ALL_SET = new Set<string>(ALL_PERMISSIONS);

/**
 * Named permission *sets* (templates). Admins pick one of these in the Create /
 * Edit user UI to apply a bundle in a single click instead of toggling 6
 * checkboxes per department. Custom selections that don't match any preset
 * remain valid; the UI just shows them as "Custom".
 *
 * Keep this list short, ordered from least to most privileged, and append
 * VIEW automatically (every assignment must include VIEW).
 */
export interface PermissionPreset {
  id: string;
  label: string;
  description: string;
  permissions: Permission[];
}

export const PERMISSION_PRESETS: PermissionPreset[] = [
  {
    id: 'viewer',
    label: 'Viewer',
    description: 'Read-only access to documents.',
    permissions: ['VIEW']
  },
  {
    id: 'contributor',
    label: 'Contributor',
    description: 'View and upload new documents.',
    permissions: ['VIEW', 'UPLOAD']
  },
  {
    id: 'editor',
    label: 'Editor',
    description: 'View, upload, edit and print.',
    permissions: ['VIEW', 'EDIT', 'UPLOAD', 'PRINT']
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Edit, share and delete; no print.',
    permissions: ['VIEW', 'EDIT', 'DELETE', 'UPLOAD', 'SHARE']
  },
  {
    id: 'full',
    label: 'Full access',
    description: 'Every permission this department offers.',
    permissions: [...ALL_PERMISSIONS]
  }
];

/** Return the preset whose permission set exactly matches `perms`, or null. */
export function matchPermissionPreset(perms: Array<string | Permission>): PermissionPreset | null {
  const set = new Set(perms.map(p => String(p).toUpperCase()));
  for (const preset of PERMISSION_PRESETS) {
    if (preset.permissions.length !== set.size) continue;
    if (preset.permissions.every(p => set.has(p))) return preset;
  }
  return null;
}

/** Defaults applied when no permission list is provided for an assignment. */
export function defaultPermissionsForDeptRole(deptRole: string): Permission[] {
  return deptRole === 'HOD' ? [...ALL_PERMISSIONS] : ['VIEW', 'UPLOAD'];
}

/** Parse a CSV permissions string into a unique, validated array. */
export function parsePermissions(csv?: string | null): Permission[] {
  if (!csv) return [];
  const set = new Set<Permission>();
  for (const raw of csv.split(',')) {
    const p = raw.trim().toUpperCase();
    if (ALL_SET.has(p)) set.add(p as Permission);
  }
  return Array.from(set);
}

/** Serialize an array of permissions to a canonical CSV (deduped, validated, ordered). */
export function serializePermissions(perms: Array<string | Permission>): string {
  const set = new Set<Permission>();
  for (const raw of perms) {
    const p = String(raw).trim().toUpperCase();
    if (ALL_SET.has(p)) set.add(p as Permission);
  }
  return ALL_PERMISSIONS.filter(p => set.has(p)).join(',');
}

/**
 * ADMIN (and SUB_ADMIN — same access except no Security Vault) globally has
 * every permission; otherwise derive from a UserDepartment row.
 */
export function effectivePermissionsFor(
  globalRole: string,
  activeAssignment: { permissions?: string | null } | null | undefined
): Permission[] {
  if (globalRole === 'ADMIN' || globalRole === 'SUB_ADMIN') return [...ALL_PERMISSIONS];
  return parsePermissions(activeAssignment?.permissions);
}

export function hasPermissionString(csv: string | null | undefined, perm: Permission): boolean {
  return parsePermissions(csv).includes(perm);
}
