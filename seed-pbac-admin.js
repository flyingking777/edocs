const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
  const prisma = new PrismaClient({ adapter });

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) return console.log('No tenant found');

  console.log('Seeding PBAC Rule: Super-Admin Override...');

  await prisma.policy.create({
    data: {
      tenantId: tenant.id,
      name: 'Super-Admin Override',
      targetResource: 'ANY',
      effect: 'ALLOW',
      conditionJson: JSON.stringify([{
        "resource": "*",
        "action": "*",
        "condition": {
          "field": "user.role",
          "operator": "EQUALS",
          "value": "Admin"
        }
      }])
    }
  });

  console.log('Policy seeded.');
}

main().catch(console.error);
