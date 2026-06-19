import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { recordAuditLog } from '@/lib/audit';
import { rateLimit, rateLimitKeyFor } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const MIN_LENGTH = 8;

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 5 password-change attempts per 10 minutes per IP
    const rl = rateLimit(rateLimitKeyFor(req, `pwd:${user.id}`), 5, 10 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: `Too many attempts. Try again in ${rl.retryAfterSeconds}s.` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const currentPassword = typeof body?.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : '';
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current and new password are required.' }, { status: 400 });
    }
    if (newPassword.length < MIN_LENGTH) {
      return NextResponse.json({ error: `New password must be at least ${MIN_LENGTH} characters.` }, { status: 400 });
    }
    if (newPassword === currentPassword) {
      return NextResponse.json({ error: 'New password must differ from your current password.' }, { status: 400 });
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      return NextResponse.json({ error: 'New password and confirmation do not match.' }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { password_hash: true } });
    if (!dbUser) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

    const ok = await bcrypt.compare(currentPassword, dbUser.password_hash);
    if (!ok) {
      await recordAuditLog(user.id, 'PASSWORD_CHANGE_FAILED', { reason: 'wrong_current' }, req);
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 403 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password_hash: newHash } });

    // Invalidate all other sessions so the password change actually kicks attackers off.
    // We keep the current cookie working by leaving the calling client's session intact;
    // any other devices will need to re-log-in.
    await prisma.activeSession.deleteMany({
      where: { user_id: user.id }
    });

    await recordAuditLog(user.id, 'PASSWORD_CHANGED', {}, req);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to change password.' }, { status: 500 });
  }
}
