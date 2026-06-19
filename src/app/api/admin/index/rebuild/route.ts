import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { rebuildIndex } from '@/lib/indexer';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/index/rebuild?onlyMissing=1
 *   Rebuilds the document index. ADMIN only.
 *   - With `?onlyMissing=1`, only re-indexes docs missing a `searchTokens`.
 *   - Without it, re-indexes every document in the system (use sparingly).
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const onlyMissing = req.nextUrl.searchParams.get('onlyMissing') === '1';
    const result = await rebuildIndex({ onlyMissing });

    await recordAuditLog(user.id, 'INDEX_REBUILD', {
      onlyMissing,
      ...result
    }, req);

    return NextResponse.json({ success: true, ...result, onlyMissing });
  } catch (error: any) {
    console.error('Index rebuild failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
