import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const wantFullUserList = req.nextUrl.searchParams.get('full') === '1';

    // Return quickly if database is already seeded — the main app no longer
    // needs the full user list on every page load.
    const existingCount = await prisma.user.count();
    if (existingCount > 0) {
      // Migrate any legacy @edocs.com emails (single batched query + updates only if needed)
      const legacyUsers = await prisma.user.findMany({
        where: { email: { endsWith: '@edocs.com' } },
        select: { id: true, email: true }
      });
      if (legacyUsers.length > 0) {
        for (const u of legacyUsers) {
          await prisma.user.update({
            where: { id: u.id },
            data: { email: u.email.replace(/@edocs\.com$/i, '@multichoice.com') }
          });
        }
      }

      // Ensure the demo SUB_ADMIN exists on databases seeded before that role
      // was introduced. Idempotent — only creates if missing.
      const samExists = await prisma.user.findUnique({
        where: { email: 'sam@multichoice.com' },
        select: { id: true }
      });
      if (!samExists) {
        const samPasswordHash = await bcrypt.hash('password123', 10);
        await prisma.user.create({
          data: {
            name: 'Sam SubAdmin',
            email: 'sam@multichoice.com',
            role: 'SUB_ADMIN',
            password_hash: samPasswordHash
          }
        });
      }

      if (!wantFullUserList) {
        return NextResponse.json({ ok: true, seeded: true, userCount: existingCount });
      }

      const users = await prisma.user.findMany({
        include: {
          departments: {
            include: { department: true }
          }
        }
      });
      return NextResponse.json(users);
    }

    // Clear existing data to ensure clean seed if database is empty
    await prisma.userDepartment.deleteMany();
    await prisma.activeSession.deleteMany();
    await prisma.securityLog.deleteMany();
    await prisma.user.deleteMany();
    await prisma.department.deleteMany();

    // Generate shared password hash for testing (password is 'password123')
    const passwordHash = await bcrypt.hash('password123', 10);

    // Seed Departments
    const engineering = await prisma.department.create({
      data: { name: 'Engineering' }
    });
    
    const hr = await prisma.department.create({
      data: { name: 'Human Resources' }
    });

    const finance = await prisma.department.create({
      data: { name: 'Finance' }
    });

    // Seed Users
    const alice = await prisma.user.create({
      data: { 
        name: 'Alice Admin', 
        email: 'alice@multichoice.com', 
        role: 'ADMIN', 
        password_hash: passwordHash 
      }
    });

    // SUB_ADMIN has the same powers as ADMIN but cannot see the Security Vault.
    await prisma.user.create({
      data: {
        name: 'Sam SubAdmin',
        email: 'sam@multichoice.com',
        role: 'SUB_ADMIN',
        password_hash: passwordHash
      }
    });

    const bob = await prisma.user.create({
      data: { 
        name: 'Bob EngHOD', 
        email: 'bob@multichoice.com', 
        role: 'HOD', 
        password_hash: passwordHash 
      }
    });

    const charlie = await prisma.user.create({
      data: { 
        name: 'Charlie EngUser', 
        email: 'charlie@multichoice.com', 
        role: 'USER', 
        password_hash: passwordHash 
      }
    });

    const diana = await prisma.user.create({
      data: { 
        name: 'Diana HrHOD', 
        email: 'diana@multichoice.com', 
        role: 'HOD', 
        password_hash: passwordHash 
      }
    });

    const eve = await prisma.user.create({
      data: { 
        name: 'Eve HrUser', 
        email: 'eve@multichoice.com', 
        role: 'USER', 
        password_hash: passwordHash 
      }
    });

    // Seed User-Department Junctions
    // Alice (Admin) belongs to all departments
    await prisma.userDepartment.createMany({
      data: [
        { userId: alice.id, departmentId: engineering.id, role: 'MEMBER', isPrimary: true },
        { userId: alice.id, departmentId: hr.id, role: 'MEMBER', isPrimary: false },
        { userId: alice.id, departmentId: finance.id, role: 'MEMBER', isPrimary: false },
      ]
    });

    // Bob is HOD of Engineering and Member of HR
    await prisma.userDepartment.createMany({
      data: [
        { userId: bob.id, departmentId: engineering.id, role: 'HOD', isPrimary: true },
        { userId: bob.id, departmentId: hr.id, role: 'MEMBER', isPrimary: false },
      ]
    });

    // Charlie is just Engineering member
    await prisma.userDepartment.create({
      data: { userId: charlie.id, departmentId: engineering.id, role: 'MEMBER', isPrimary: true }
    });

    // Diana is HOD of HR
    await prisma.userDepartment.create({
      data: { userId: diana.id, departmentId: hr.id, role: 'HOD', isPrimary: true }
    });

    // Eve is Member of HR and Member of Finance
    await prisma.userDepartment.createMany({
      data: [
        { userId: eve.id, departmentId: hr.id, role: 'MEMBER', isPrimary: true },
        { userId: eve.id, departmentId: finance.id, role: 'MEMBER', isPrimary: false },
      ]
    });

    const users = await prisma.user.findMany({ 
      include: { 
        departments: {
          include: { department: true }
        }
      } 
    });
    return NextResponse.json(users);

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
