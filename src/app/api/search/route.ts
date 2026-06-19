import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const MAX_RESULTS = 25;
const MIN_QUERY_LEN = 2;

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length >= MIN_QUERY_LEN)
    .slice(0, 8); // Cap query terms to keep the SQL safe.
}

/**
 * GET /api/search?q=...
 *   Returns up to 25 documents the caller can access, ranked by token overlap
 *   with the indexed `searchTokens` blob.
 *
 *   Access rules mirror the rest of the app:
 *     - ADMIN: any document anywhere.
 *     - Otherwise:
 *         * documents in the user's active department,
 *         * documents shared directly with the user (DocumentPermission),
 *         * documents inside a folder shared with the user (FolderPermission).
 *     - Trashed documents are excluded unless the user owns them.
 *
 *   `?includeTrash=1` lets owners see their own trash; admins always see all.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const rawQ = req.nextUrl.searchParams.get('q') || '';
    const includeTrash = req.nextUrl.searchParams.get('includeTrash') === '1';
    const terms = tokenize(rawQ);

    if (terms.length === 0) {
      return NextResponse.json({ results: [], query: rawQ, note: 'Query too short.' });
    }

    // Build the access filter
    const accessClauses: any[] = [];
    if (user.role === 'ADMIN') {
      // ADMIN sees everything; no extra filter
    } else {
      if (user.activeDeptId) accessClauses.push({ departmentId: user.activeDeptId });
      accessClauses.push({ userId: user.id }); // own uploads (incl. their trash)
      accessClauses.push({ permissions: { some: { sharedWithUserId: user.id } } });
      accessClauses.push({ folder: { permissions: { some: { sharedWithUserId: user.id } } } });
    }

    const trashFilter: any =
      user.role === 'ADMIN'
        ? {} // see all including trash
        : includeTrash
          ? { OR: [{ deletedAt: null }, { userId: user.id }] }
          : { deletedAt: null };

    // SQLite/Prisma: `contains` does case-sensitive matches by default on SQLite,
    // but we stored everything lowercased in `searchTokens`, and we lowercase the
    // search terms. So `contains` works as case-insensitive in practice.
    const andClauses = terms.map(t => ({ searchTokens: { contains: t } }));

    const candidates = await prisma.document.findMany({
      where: {
        AND: [
          ...andClauses,
          trashFilter,
          ...(accessClauses.length > 0 ? [{ OR: accessClauses }] : [])
        ]
      },
      include: {
        labels: true,
        folder: { select: { id: true, name: true } },
        department: { select: { id: true, name: true } },
        permissions: { where: { sharedWithUserId: user.id } }
      },
      take: 100,
      orderBy: { createdAt: 'desc' }
    });

    // Light scoring: count how many of the query terms appear in the tokens.
    const scored = candidates.map(doc => {
      const tokens = (doc.searchTokens || '').toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!tokens) continue;
        // Boost matches against the file name itself
        if (doc.name?.toLowerCase().includes(t) || (doc.displayName || '').toLowerCase().includes(t)) score += 3;
        if (tokens.includes(t)) score += 1;
      }
      return { doc, score };
    });

    scored.sort((a, b) => b.score - a.score || b.doc.createdAt.getTime() - a.doc.createdAt.getTime());
    const top = scored.slice(0, MAX_RESULTS).map(({ doc, score }) => ({
      id: doc.id,
      name: doc.name,
      displayName: doc.displayName,
      mimeType: doc.mimeType,
      createdAt: doc.createdAt,
      deletedAt: doc.deletedAt,
      uploaderId: doc.userId,
      department: doc.department || null,
      folder: doc.folder || null,
      labels: doc.labels.map(l => ({ id: l.id, name: l.name })),
      sharedWithMe: doc.permissions.length > 0,
      score
    }));

    // Audit search executions (only when they look meaningful).
    await recordAuditLog(user.id, 'SEARCH_EXECUTE', { query: rawQ, resultCount: top.length }, req);

    return NextResponse.json({ query: rawQ, terms, results: top, total: scored.length });
  } catch (error: any) {
    console.error('Search failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
