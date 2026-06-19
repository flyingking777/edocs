import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = user.id;

  try {
    const logs = await prisma.auditLog.findMany({
      where: { metadata: { contains: id }, userId },
      orderBy: { timestamp: 'desc' },
      take: 5
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error(`[API ACTIVITY ERROR] ${id}:`, error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
