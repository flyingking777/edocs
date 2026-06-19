import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const userId = 'user_123';
  
  try {
    const labels = await prisma.label.findMany({
      where: { userId }
    });
    return NextResponse.json(labels);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = 'user_123';
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    const label = await prisma.label.upsert({
      where: {
        name_userId: { name, userId }
      },
      update: {},
      create: { name, userId }
    });
    return NextResponse.json(label);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
