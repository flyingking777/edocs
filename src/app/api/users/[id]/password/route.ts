import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const MIN_LENGTH = 8;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const actor = await getCurrentUser();
    if (!actor || actor.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required.' }, { status: 403 });
    }

    const { id: targetUserId } = await params;
    const body = await req.json().catch(() => ({}));
    const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : '';
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!newPassword || newPassword.length < MIN_LENGTH) {
      return NextResponse.json(
        { error: `New password must be at least ${MIN_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (!confirmPassword || confirmPassword !== newPassword) {
      return NextResponse.json({ error: 'New password and confirmation do not match.' }, { status: 400 });
    }

    const target = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, email: true, role: true }
    });
    if (!target) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: targetUserId },
      data: { password_hash }
    });

    // Force re-authentication on all devices for the target account.
    await prisma.activeSession.deleteMany({
      where: { user_id: targetUserId }
    });

    await recordAuditLog(actor.id, 'USER_PASSWORD_RESET', {
      targetUserId,
      targetEmail: target.email,
      targetRole: target.role
    }, req);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin reset password error:', error);
    return NextResponse.json({ error: 'Failed to reset user password.' }, { status: 500 });
  }
}
