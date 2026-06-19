import { prisma } from './db';

/** Don't run permission cleanup on every single list request — throttle to once per interval. */
const PERMISSION_CLEANUP_MS = 5 * 60 * 1000; // 5 minutes
let lastPermissionCleanup = 0;

/**
 * Delete expired document/folder share permissions. Called from list endpoints;
 * internally throttled so it doesn't add two DELETE queries to every page load.
 */
export async function cleanupExpiredPermissionsIfDue(): Promise<void> {
  const now = Date.now();
  if (now - lastPermissionCleanup < PERMISSION_CLEANUP_MS) return;
  lastPermissionCleanup = now;

  const cutoff = new Date();
  await Promise.all([
    prisma.documentPermission.deleteMany({ where: { expiresAt: { lt: cutoff } } }),
    prisma.folderPermission.deleteMany({ where: { expiresAt: { lt: cutoff } } })
  ]);
}
