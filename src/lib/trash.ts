import fs from 'fs/promises';
import { prisma } from './db';

/**
 * How long deleted folders and documents are recoverable from Trash before
 * being permanently purged. Configurable via env, defaults to 30 days.
 */
export const TRASH_RETENTION_DAYS = (() => {
  const raw = Number(process.env.TRASH_RETENTION_DAYS);
  if (Number.isFinite(raw) && raw > 0) return Math.floor(raw);
  return 30;
})();

export const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;

/**
 * Compute the absolute cutoff date: anything deleted before this is overdue
 * for purge.
 */
export function trashCutoffDate(now: Date = new Date()): Date {
  return new Date(now.getTime() - TRASH_RETENTION_MS);
}

/**
 * Returns the number of whole days remaining before this trashed item is
 * permanently purged. Returns 0 once the window has elapsed.
 */
export function daysRemainingInTrash(deletedAt: Date | string | null | undefined, now: Date = new Date()): number {
  if (!deletedAt) return 0;
  const d = deletedAt instanceof Date ? deletedAt : new Date(deletedAt);
  const purgeAt = d.getTime() + TRASH_RETENTION_MS;
  const ms = purgeAt - now.getTime();
  if (ms <= 0) return 0;
  return Math.ceil(ms / (24 * 60 * 60 * 1000));
}

/**
 * Janitor: physically remove documents whose Trash window has elapsed.
 * Best-effort - on any disk error, the DB row is still removed.
 */
export async function purgeExpiredDocuments(now: Date = new Date()): Promise<number> {
  const cutoff = trashCutoffDate(now);
  const expired = await prisma.document.findMany({
    where: { deletedAt: { not: null, lt: cutoff } },
    select: { id: true, path: true }
  });
  if (expired.length === 0) return 0;

  // Detach m2m labels before delete to avoid FK errors on some adapters.
  for (const doc of expired) {
    try {
      await prisma.document.update({ where: { id: doc.id }, data: { labels: { set: [] } } });
    } catch (e) {
      console.warn('[trash:purge] failed to clear labels for', doc.id, (e as any)?.message);
    }
  }

  await prisma.document.deleteMany({ where: { id: { in: expired.map(d => d.id) } } });

  for (const doc of expired) {
    if (doc.path) {
      try { await fs.unlink(doc.path); }
      catch (e) { /* file may already be gone */ }
    }
  }
  return expired.length;
}

/**
 * Janitor: physically remove folders whose Trash window has elapsed.
 * Also cascades to the documents inside them (those documents are typically
 * already soft-deleted via the folder delete, but we belt-and-brace here).
 */
export async function purgeExpiredFolders(now: Date = new Date()): Promise<number> {
  const cutoff = trashCutoffDate(now);
  const expired = await prisma.folder.findMany({
    where: { deletedAt: { not: null, lt: cutoff } },
    select: { id: true }
  });
  if (expired.length === 0) return 0;

  // Hard-delete documents that live inside the expired folders so we don't
  // orphan rows. We unlink their files on disk too.
  const docs = await prisma.document.findMany({
    where: { folderId: { in: expired.map(f => f.id) } },
    select: { id: true, path: true }
  });
  for (const d of docs) {
    try {
      await prisma.document.update({ where: { id: d.id }, data: { labels: { set: [] } } });
    } catch { /* noop */ }
  }
  if (docs.length) {
    await prisma.document.deleteMany({ where: { id: { in: docs.map(d => d.id) } } });
    for (const d of docs) {
      if (d.path) { try { await fs.unlink(d.path); } catch { /* noop */ } }
    }
  }

  await prisma.folder.deleteMany({ where: { id: { in: expired.map(f => f.id) } } });
  return expired.length;
}

/**
 * Convenience: run all purges. Call from any Trash-related endpoint so the
 * grace window is enforced even without a separate cron job.
 */
export async function runTrashJanitor(): Promise<{ documents: number; folders: number }> {
  const [documents, folders] = await Promise.all([
    purgeExpiredDocuments(),
    purgeExpiredFolders()
  ]);
  return { documents, folders };
}

/**
 * Recursively collect the IDs of a folder and all its descendant folders.
 */
export async function collectFolderSubtree(rootId: string): Promise<string[]> {
  const ids = new Set<string>([rootId]);
  const queue: string[] = [rootId];
  while (queue.length) {
    const parentId = queue.shift()!;
    const children = await prisma.folder.findMany({
      where: { parentId },
      select: { id: true }
    });
    for (const c of children) {
      if (!ids.has(c.id)) {
        ids.add(c.id);
        queue.push(c.id);
      }
    }
  }
  return [...ids];
}
