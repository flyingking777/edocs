/**
 * One-shot data wipe.
 *
 * Removes ALL documents, folders, labels, departments, and any associated
 * permission/share rows AND the on-disk files that back them. Keeps:
 *   - users + sessions + audit/security logs (so logins keep working)
 *   - tenant settings
 *
 * Run with:
 *     node scripts/wipe-data.mjs
 *
 * Idempotent: re-running on an already-empty DB is a no-op.
 *
 * Notes:
 *   - Talks to the SQLite file directly via better-sqlite3 (already a project
 *     dependency) so we don't have to spin up the full Prisma client.
 *   - Foreign keys are enforced so cascades fire correctly.
 *   - If the Next.js dev server has a long-running write transaction open
 *     when this runs, you may need to stop it first to avoid SQLITE_BUSY.
 */

import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs/promises';

const root = process.cwd();
const dbPath = path.join(root, 'prisma', 'dev.db');

console.log(`[wipe] Using database: ${dbPath}`);

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Tables to clear, in dependency-safe order. The implicit "_LabelToDocument"
// join table is created by Prisma for the many-to-many between Label and
// Document — we explicitly clear it before deleting either side.
const TABLES = [
  'DocumentPermission',
  'FolderPermission',
  '_LabelToDocument',
  'Document',
  'Folder',
  'Label',
  'UserDepartment',
  'Department'
];

function tableExists(name) {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(name);
  return Boolean(row);
}

const counts = {};

const wipeTx = db.transaction(() => {
  for (const t of TABLES) {
    if (!tableExists(t)) {
      counts[t] = 'missing';
      continue;
    }
    const before = db.prepare(`SELECT COUNT(*) AS n FROM "${t}"`).get().n;
    db.prepare(`DELETE FROM "${t}"`).run();
    counts[t] = before;
  }
});

try {
  wipeTx();
} catch (err) {
  console.error('[wipe] FAILED — rolling back. Reason:', err.message);
  db.close();
  process.exit(1);
}

console.log('[wipe] Rows removed per table:');
for (const t of TABLES) {
  console.log(`  ${t.padEnd(22)} ${counts[t]}`);
}

db.close();

// ---- File system cleanup -------------------------------------------------

async function clearDirContents(dir) {
  try {
    const entries = await fs.readdir(dir);
    let removed = 0;
    for (const entry of entries) {
      const target = path.join(dir, entry);
      await fs.rm(target, { recursive: true, force: true });
      removed += 1;
    }
    return { ok: true, removed };
  } catch (err) {
    if (err.code === 'ENOENT') return { ok: true, removed: 0, note: 'directory does not exist' };
    return { ok: false, error: err.message };
  }
}

console.log('[wipe] Removing on-disk files…');
const storageResult = await clearDirContents(path.join(root, 'storage'));
const uploadsResult = await clearDirContents(path.join(root, 'public', 'uploads'));

console.log(`  ./storage              ${formatFsResult(storageResult)}`);
console.log(`  ./public/uploads       ${formatFsResult(uploadsResult)}`);

function formatFsResult(r) {
  if (!r.ok) return `ERROR: ${r.error}`;
  if (r.note) return `0 (${r.note})`;
  return `${r.removed} entr${r.removed === 1 ? 'y' : 'ies'} removed`;
}

console.log('[wipe] Done.');
