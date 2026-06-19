import { PrismaClient } from '../generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');

// WAL mode is per-database-file; set it once so every Prisma connection
// benefits from concurrent reads while writes are in flight.
let walInitialized = false;
function ensureWalMode() {
  if (walInitialized) return;
  try {
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('busy_timeout = 5000');
    db.close();
    walInitialized = true;
  } catch {
    // Non-fatal — dev still works in default journal mode.
  }
}
ensureWalMode();

function createPrismaClient() {
  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: `file:${dbPath}` }),
    log:
      process.env.PRISMA_LOG_QUERIES === '1'
        ? ['query', 'warn', 'error']
        : ['warn', 'error'],
  });
}

// Reuse one Prisma client in dev so hot reload doesn't open a new SQLite
// connection (and lock) on every module re-import.
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
