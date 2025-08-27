import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const roles = ['admin', 'user', 'manager', 'auditor'];

function getRandomRole() {
  return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomBankStatement() {
  return `Statement-${Math.floor(Math.random() * 100000)}`;
}

async function main() {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const name = `User${i + 1}`;
    users.push({
      name,
      role: getRandomRole(),
      bankStatement: getRandomBankStatement()
    });
  }

  await prisma.userDetailsModel.createMany({
    data: users
  });

  console.log('Inserted 10 random users');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());