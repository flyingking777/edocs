import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateEncryptedToken, hashToken } from '@/lib/session';
import { clearRateLimit, rateLimit, rateLimitKeyFor } from '@/lib/rate-limit';

// 10 attempts per 5 minutes per IP. After the window expires, attempts reset.
const LOGIN_LIMIT = 10;
const LOGIN_WINDOW_MS = 5 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || (req as any).ip || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  const rlKey = rateLimitKeyFor(req, 'login');
  const rl = rateLimit(rlKey, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many login attempts. Try again in ${rl.retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let emailOrUsername = '';
  let password = '';

  try {
    const body = await req.json();
    emailOrUsername = body.email || body.username || '';
    password = body.password || '';
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!emailOrUsername || !password) {
    return NextResponse.json({ error: 'Email/Username and password are required' }, { status: 400 });
  }

  try {
    // 1. Fetch user by email or name/username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername.trim().toLowerCase() },
          { name: emailOrUsername.trim() }
        ]
      },
      include: {
        departments: {
          include: { department: true }
        }
      }
    });

    // 2. Validate password
    let isPasswordMatch = false;
    if (user) {
      isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    }

    if (!user || !isPasswordMatch) {
      // Log login failure
      await prisma.securityLog.create({
        data: {
          action: 'USER_LOGIN_FAILED',
          ip_address: ip,
          user_id: user?.id || null
        }
      });

      return NextResponse.json({ error: 'Invalid email/username or password' }, { status: 401 });
    }

    // 3. Generate encrypted JWT
    const roles = [user.role, ...user.departments.map(d => d.role)];
    const departments = user.departments.map(d => d.departmentId);
    
    const token = generateEncryptedToken({
      userId: user.id,
      roles,
      departments
    });

    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours expiration

    // 4. Create Active Session in DB
    await prisma.activeSession.create({
      data: {
        user_id: user.id,
        token_hash: tokenHash,
        ip_address: ip,
        user_agent: userAgent,
        expires_at: expiresAt
      }
    });

    // 5. Update last login details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        last_login_at: new Date(),
        last_login_ip: ip
      }
    });

    // 6. Log success to Security_Logs
    await prisma.securityLog.create({
      data: {
        action: 'USER_LOGIN_SUCCESS',
        ip_address: ip,
        user_id: user.id
      }
    });

    // Clear rate-limit bucket for this IP on successful auth
    clearRateLimit(rlKey);

    // 7. Save the token and primary department in cookies
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt
    });

    // Determine primary department and initialize department switcher
    const primaryDept = user.departments.find(d => d.isPrimary) || user.departments[0];
    if (primaryDept) {
      cookieStore.set('active_dept_id', primaryDept.departmentId, { path: '/' });
    }

    // Retain legacy cookie fallback for full compatibility
    cookieStore.set('mock_user_id', user.id, { path: '/' });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeDeptId: primaryDept?.departmentId || null
      }
    });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal server error during login' }, { status: 500 });
  }
}
