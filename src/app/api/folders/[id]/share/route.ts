import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });

    const isOwner = folder.userId === user.id;
    if (user.role !== 'ADMIN' && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const grants = await prisma.folderPermission.findMany({
      where: { folderId: id },
      orderBy: { sharedAt: 'desc' }
    });

    const userIds = Array.from(new Set(grants.map(g => g.sharedWithUserId)));
    const users = userIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true }
        })
      : [];
    const userMap = new Map(users.map(u => [u.id, u]));

    const enriched = grants.map(g => ({
      ...g,
      user: userMap.get(g.sharedWithUserId) || null
    }));

    return NextResponse.json(enriched);
  } catch (error: any) {
    console.error('Folder share GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const folder = await prisma.folder.findUnique({ where: { id }, include: { department: true } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });

    const body = await request.json().catch(() => ({}));
    const sharedWithUserId = typeof body?.sharedWithUserId === 'string' ? body.sharedWithUserId.trim() : '';
    const permissionLevel = String(body?.permissionLevel || 'VIEW').toUpperCase();
    const ttlHours = Number(body?.ttlHours) || 0;
    const expiresAtInput = typeof body?.expiresAt === 'string' ? body.expiresAt : null;

    if (!sharedWithUserId) {
      return NextResponse.json({ error: 'sharedWithUserId is required' }, { status: 400 });
    }
    if (permissionLevel !== 'VIEW' && permissionLevel !== 'EDIT') {
      return NextResponse.json({ error: 'permissionLevel must be VIEW or EDIT' }, { status: 400 });
    }

    const target = await prisma.user.findUnique({ where: { id: sharedWithUserId }, select: { id: true, name: true, email: true } });
    if (!target) return NextResponse.json({ error: 'Target user not found' }, { status: 404 });

    let expiresAt: Date | null = null;
    if (expiresAtInput) {
      const parsed = new Date(expiresAtInput);
      if (!isNaN(parsed.getTime()) && parsed.getTime() > Date.now()) {
        expiresAt = parsed;
      }
    } else if (ttlHours > 0) {
      expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    }

    const grant = await prisma.folderPermission.upsert({
      where: {
        folderId_sharedWithUserId: { folderId: id, sharedWithUserId }
      },
      update: { permissionLevel, expiresAt, grantedByUserId: user.id },
      create: {
        folderId: id,
        sharedWithUserId,
        permissionLevel,
        expiresAt,
        grantedByUserId: user.id
      }
    });

    await recordAuditLog(user.id, 'FOLDER_SHARE', {
      folderId: id,
      folderName: folder.name,
      sharedWithUserId,
      sharedWithName: target.name,
      permissionLevel,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
      ttlHours: ttlHours || null
    }, request);

    return NextResponse.json({ ...grant, user: target }, { status: 201 });
  } catch (error: any) {
    console.error('Folder share POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const targetUserId = request.nextUrl.searchParams.get('userId');
    if (!targetUserId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });

    await prisma.folderPermission.delete({
      where: {
        folderId_sharedWithUserId: { folderId: id, sharedWithUserId: targetUserId }
      }
    }).catch(() => null);

    await recordAuditLog(user.id, 'FOLDER_UNSHARE', {
      folderId: id,
      folderName: folder.name,
      sharedWithUserId: targetUserId
    }, request);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Folder share DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
