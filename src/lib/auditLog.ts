import { prisma } from './db';

export async function logAuditAction(userId: string, action: string, targetId: string) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata: JSON.stringify({ targetId }),
      }
    });
  } catch (error) {
    console.error('Failed to log audit action:', error);
  }
}
