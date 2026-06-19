import { prisma } from './db';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function recordAuditLog(
  userId: string, 
  action: string, 
  metadata: any = null, 
  req?: NextRequest
) {
  try {
    const ip = req?.headers.get('x-forwarded-for') || (req as any)?.ip || 'unknown';
    const userAgent = req?.headers.get('user-agent') || 'unknown';

    const cookieStore = await cookies();
    const activeDeptId = cookieStore.get('active_dept_id')?.value;

    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ip,
        userAgent,
        departmentId: activeDeptId || null,
      }
    });
  } catch (error) {
    console.error('Failed to record audit log:', error);
  }
}
