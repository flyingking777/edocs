import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logAuditAction } from '@/lib/auditLog';
import { getCurrentUser, userHasPermission } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = 'user_123';

  try {
    const doc = await prisma.document.findUnique({ 
      where: { id },
      include: { permissions: { where: { sharedWithUserId: userId } } }
    });
    
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const isOwner = doc.userId === userId;
    const hasEdit = doc.permissions.some(p => p.permissionLevel === 'EDIT');

    if (!isOwner && !hasEdit) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const collaborators = await prisma.documentPermission.findMany({
      where: { documentId: id },
      orderBy: { sharedAt: 'desc' }
    });
    return NextResponse.json(collaborators);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!userHasPermission(currentUser, 'SHARE')) {
    return NextResponse.json({ error: 'You do not have SHARE permission in this department.' }, { status: 403 });
  }
  const currentUserId = currentUser.id;
  const { sharedWithUserId, permissionLevel, ttlHours, expiresAt: expiresAtInput } = await request.json();

  try {
    const doc = await prisma.document.findUnique({ 
      where: { id },
      include: { permissions: { where: { sharedWithUserId: currentUserId } } }
    });

    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const isOwner = doc.userId === currentUserId;
    const hasEdit = doc.permissions.some(p => p.permissionLevel === 'EDIT');

    if (!isOwner && !hasEdit) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let expiresAt: Date | null = null;
    if (expiresAtInput) {
      const parsed = new Date(expiresAtInput);
      if (!isNaN(parsed.getTime()) && parsed.getTime() > Date.now()) {
        expiresAt = parsed;
      }
    } else if (ttlHours) {
      expiresAt = new Date(Date.now() + Number(ttlHours) * 60 * 60 * 1000);
    }

    const permission = await prisma.documentPermission.upsert({
      where: {
        documentId_sharedWithUserId: {
          documentId: id,
          sharedWithUserId
        }
      },
      update: { permissionLevel, expiresAt },
      create: {
        documentId: id,
        sharedWithUserId,
        permissionLevel,
        expiresAt
      }
    });

    const expiryNote = expiresAt
      ? ` - Expires ${expiresAt.toISOString()}`
      : '';
    await logAuditAction(currentUserId, `Shared with ${sharedWithUserId} (${permissionLevel})${expiryNote}`, id);
    return NextResponse.json(permission);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!userHasPermission(currentUser, 'SHARE')) {
    return NextResponse.json({ error: 'You do not have SHARE permission in this department.' }, { status: 403 });
  }
  const currentUserId = currentUser.id;
  const { searchParams } = new URL(request.url);
  const targetUserId = searchParams.get('userId');

  if (!targetUserId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const doc = await prisma.document.findUnique({ 
      where: { id },
      include: { permissions: { where: { sharedWithUserId: currentUserId } } }
    });

    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const isOwner = doc.userId === currentUserId;
    const hasEdit = doc.permissions.some(p => p.permissionLevel === 'EDIT');

    if (!isOwner && !hasEdit) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.documentPermission.delete({
      where: {
        documentId_sharedWithUserId: {
          documentId: id,
          sharedWithUserId: targetUserId
        }
      }
    });

    await logAuditAction(currentUserId, `Removed access for ${targetUserId}`, id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
