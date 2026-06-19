const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding demo data with RBAC/PBAC...');

  // 1. Create Permissions
  const permissions = ['READ_DOCS', 'WRITE_DOCS', 'DELETE_DOCS', 'MANAGE_USERS', 'VIEW_BILLING'];
  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  const allPerms = await prisma.permission.findMany();

  // 2. Create Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Global Tech Industries',
      searchSalt: 'company_secret_123',
      plans: {
        create: {
          name: 'ENTERPRISE',
          price: 999.0,
          storageLimit: 1073741824, // 1GB
          ocrLimit: 10000,
        }
      },
      billingMeter: {
        create: { ocrCount: 450 }
      },
      roles: {
        create: [
          {
            name: 'Admin',
            permissions: {
              create: allPerms.map(p => ({ permissionId: p.id }))
            }
          },
          {
            name: 'Viewer',
            permissions: {
              create: [
                { permissionId: allPerms.find(p => p.name === 'READ_DOCS').id }
              ]
            }
          }
        ]
      },
      policies: {
        create: [
          { 
            name: 'Approval Limit', 
            rule: JSON.stringify({
              action: 'APPROVE',
              condition: { attr: 'amount', operator: 'lt', value: 1000000 }
            })
          }
        ]
      }

    }
  });

  const roles = await prisma.role.findMany({ where: { tenantId: tenant.id } });

  // 3. Create Users
  await prisma.user.create({
    data: {
      email: 'admin@globaltech.com',
      name: 'Super Admin',
      tenantId: tenant.id,
      roleId: roles.find(r => r.name === 'Admin').id
    }
  });

  console.log('Seed complete for tenant:', tenant.id);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
