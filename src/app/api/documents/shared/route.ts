import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = user.id;

    // Janitor: clear expired permissions
    await prisma.documentPermission.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await prisma.folderPermission.deleteMany({ where: { expiresAt: { lt: new Date() } } });

    // 1. Documents shared with me directly (not authored by me)
    const directShared = await prisma.document.findMany({
      where: {
        permissions: { some: { sharedWithUserId: userId } },
        NOT: { userId }
      },
      include: {
        labels: true,
        permissions: { where: { sharedWithUserId: userId } },
        folder: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 2. Documents in folders shared with me (excluding those I authored and dept-native ones).
    const folderShares = await prisma.folderPermission.findMany({
      where: { sharedWithUserId: userId },
      select: { folderId: true }
    });
    const sharedFolderIds = folderShares.map(s => s.folderId);

    const folderShared = sharedFolderIds.length > 0
      ? await prisma.document.findMany({
          where: {
            folderId: { in: sharedFolderIds },
            NOT: { userId },
            ...(user.activeDeptId ? { departmentId: { not: user.activeDeptId } } : {})
          },
          include: {
            labels: true,
            permissions: { where: { sharedWithUserId: userId } },
            folder: { select: { id: true, name: true } }
          },
          orderBy: { createdAt: 'desc' }
        })
      : [];

    // Dedupe (a doc might appear in both lists)
    const byId = new Map<string, any>();
    for (const d of [...directShared, ...folderShared]) {
      if (!byId.has(d.id)) byId.set(d.id, d);
    }

    return NextResponse.json(Array.from(byId.values()));
  } catch (error: any) {
    console.error('[SHARED_API_ERROR]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
