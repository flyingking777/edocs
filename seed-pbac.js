const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
  const prisma = new PrismaClient({ adapter });

  const tenant = await prisma.tenant.findFirst();
  if (!tenant) return console.log('No tenant found');

  console.log('Seeding PBAC Rule: Department Lock...');

  await prisma.policy.create({
    data: {
      tenantId: tenant.id,
      name: 'Department Lock',
      targetResource: 'FOLDER',
      effect: 'ALLOW',
      conditionJson: JSON.stringify([{
        "resource": "FOLDER",
        "action": "READ",
        "condition": {
          "field": "departmentTag",
          "operator": "EQUALS",
          "value": "user.department"
        }
      }])
    }
  });

  console.log('Policy seeded.');
}

main().catch(console.error);
