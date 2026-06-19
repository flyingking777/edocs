import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { generateEncryptedToken, hashToken } from '@/lib/session';
import { env } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    // Impersonation is a development-only convenience. It is permanently
    // disabled in production unless an operator explicitly opts in via
    // ALLOW_DEV_ROUTES=1, which should NEVER be set on production deployments.
    if (!env.ALLOW_DEV_ROUTES) {
      return NextResponse.json(
        { error: 'User impersonation is disabled in production.' },
        { status: 403 }
      );
    }

    const actor = await getCurrentUser();
    if (!actor || actor.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: ADMIN role required' }, { status: 403 });
    }

    const { userId } = await req.json();
    const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // verify user exists
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      include: { 
        departments: {
          include: { department: true }
        }
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate encrypted JWT
    const roles = [user.role, ...user.departments.map(d => d.role)];
    const departments = user.departments.map(d => d.departmentId);
    
    const token = generateEncryptedToken({
      userId: user.id,
      roles,
      departments
    });

    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);

    // Create session in DB
    await prisma.activeSession.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        ip_address: ip,
        user_agent: userAgent,
        expires_at: expiresAt
      }
    });

    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt
    });

    cookieStore.set('mock_user_id', userId, { path: '/' });
    
    // Set default active dept
    if (user.departments.length > 0) {
      const primaryDept = user.departments.find(d => d.isPrimary) || user.departments[0];
      cookieStore.set('active_dept_id', primaryDept.departmentId, { path: '/' });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to switch user' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch current user' }, { status: 500 });
  }
}
