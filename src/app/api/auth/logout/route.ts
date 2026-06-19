import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashToken } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (token) {
      const tokenHash = hashToken(token);
      
      // Delete session from DB
      await prisma.activeSession.deleteMany({
        where: { token_hash: tokenHash }
      });
    }

    // Clear cookies
    cookieStore.delete('session_token');
    cookieStore.delete('mock_user_id');
    cookieStore.delete('active_dept_id');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error during logout' }, { status: 500 });
  }
}
