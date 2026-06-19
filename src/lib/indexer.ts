/**
 * Document indexer.
 *
 * Builds a lowercase, normalized "searchTokens" blob per document so that
 * `/api/search?q=...` can do fast `LIKE` matching across name, labels,
 * uploader, department, folder, and (for text-y mime types) the file body.
 *
 * Designed to fail open: if extraction fails (binary file, missing file,
 * unsupported mime), we still index everything we know about the doc.
 */

import fs from 'fs/promises';
import path from 'path';
import { prisma } from './db';

const MAX_BODY_BYTES = 1 * 1024 * 1024; // 1 MB cap on extracted content per doc

// Mime types we feel safe reading as utf-8 text.
const TEXT_MIME_PREFIXES = ['text/'];
const TEXT_MIME_EXACT = new Set([
  'application/json',
  'application/xml',
  'application/javascript',
  'application/x-yaml',
  'application/yaml',
  'application/csv'
]);

const TEXT_EXTENSIONS = new Set([
  '.txt', '.md', '.csv', '.tsv', '.json', '.xml', '.yaml', '.yml',
  '.html', '.htm', '.log', '.ini', '.cfg', '.conf', '.srt', '.vtt'
]);

function isTextual(mimeType: string | null | undefined, filename: string | null | undefined): boolean {
  const ext = (filename ? path.extname(filename) : '').toLowerCase();
  if (TEXT_EXTENSIONS.has(ext)) return true;
  if (!mimeType) return false;
  if (TEXT_MIME_EXACT.has(mimeType)) return true;
  return TEXT_MIME_PREFIXES.some(p => mimeType.startsWith(p));
}

/** Read a (probably-text) file and return up to MAX_BODY_BYTES bytes as a utf-8 string. */
async function readTextFile(filePath: string): Promise<string> {
  try {
    const handle = await fs.open(filePath, 'r');
    try {
      const stat = await handle.stat();
      const size = Math.min(stat.size, MAX_BODY_BYTES);
      if (size <= 0) return '';
      const buf = Buffer.alloc(size);
      await handle.read(buf, 0, size, 0);
      // Strip control chars except whitespace, collapse whitespace
      return buf
        .toString('utf8')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ')
        .replace(/\s+/g, ' ');
    } finally {
      await handle.close();
    }
  } catch (e) {
    console.warn('[indexer] readTextFile failed', filePath, (e as any)?.message);
    return '';
  }
}

/** Normalize a piece of text for the search blob. */
function norm(s: string | null | undefined): string {
  if (!s) return '';
  return String(s).toLowerCase().replace(/\s+/g, ' ').trim();
}

interface IndexableDoc {
  id: string;
  name: string;
  displayName: string | null;
  mimeType: string;
  path: string;
  userId: string;
  departmentId: string | null;
  folderId: string | null;
}

/**
 * Index a single document. Pulls the doc from the DB if needed, computes the
 * tokens blob, and updates `searchTokens` / `indexedAt`. Idempotent.
 */
export async function indexDocument(documentIdOrDoc: string | IndexableDoc): Promise<void> {
  const doc =
    typeof documentIdOrDoc === 'string'
      ? await prisma.document.findUnique({
          where: { id: documentIdOrDoc },
          select: {
            id: true, name: true, displayName: true, mimeType: true,
            path: true, userId: true, departmentId: true, folderId: true
          }
        })
      : documentIdOrDoc;

  if (!doc) return;

  const [labels, uploader, department, folder] = await Promise.all([
    prisma.label.findMany({
      where: { documents: { some: { id: doc.id } } },
      select: { name: true }
    }),
    doc.userId
      ? prisma.user.findUnique({ where: { id: doc.userId }, select: { name: true, email: true } })
      : Promise.resolve(null),
    doc.departmentId
      ? prisma.department.findUnique({ where: { id: doc.departmentId }, select: { name: true } })
      : Promise.resolve(null),
    doc.folderId
      ? prisma.folder.findUnique({ where: { id: doc.folderId }, select: { name: true } })
      : Promise.resolve(null)
  ]);

  let body = '';
  if (isTextual(doc.mimeType, doc.name) && doc.path) {
    body = await readTextFile(doc.path);
  }

  const parts = [
    norm(doc.name),
    norm(doc.displayName),
    norm(uploader?.name),
    norm(uploader?.email),
    norm(department?.name),
    norm(folder?.name),
    ...labels.map(l => norm(l.name)),
    norm(body)
  ].filter(Boolean);

  // Cap total token blob length to keep the DB lean.
  let tokens = parts.join(' | ');
  if (tokens.length > MAX_BODY_BYTES) tokens = tokens.slice(0, MAX_BODY_BYTES);

  await prisma.document.update({
    where: { id: doc.id },
    data: { searchTokens: tokens, indexedAt: new Date() }
  });
}

/**
 * Rebuild the index for every document (or every document not yet indexed).
 * Returns counts so callers can show progress.
 */
export async function rebuildIndex(opts: { onlyMissing?: boolean } = {}): Promise<{ total: number; reindexed: number; skipped: number }> {
  const where = opts.onlyMissing ? { OR: [{ searchTokens: null }, { indexedAt: null }] } : {};
  const docs = await prisma.document.findMany({
    where,
    select: {
      id: true, name: true, displayName: true, mimeType: true,
      path: true, userId: true, departmentId: true, folderId: true
    }
  });

  let reindexed = 0;
  let skipped = 0;
  for (const d of docs) {
    try {
      await indexDocument(d);
      reindexed += 1;
    } catch (e) {
      console.warn('[indexer] failed for', d.id, (e as any)?.message);
      skipped += 1;
    }
  }
  return { total: docs.length, reindexed, skipped };
}
