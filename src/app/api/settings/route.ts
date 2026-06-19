import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    let settings = await prisma.tenantSettings.findUnique({
      where: { id: 'global' }
    });
    
    if (!settings) {
      settings = await prisma.tenantSettings.create({
        data: { id: 'global' }
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const settings = await prisma.tenantSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: { id: 'global', ...data }
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
