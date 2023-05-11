import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { departments } from "./csvReader";

async function main() {
  console.table(departments)
  console.table(departments);
  for (const dept of departments) {
    await prisma.department.upsert({
      where: {
        code_startDate: {
          code: dept.code,
          startDate: dept.startDate
        }
      },
      create: dept,
      update: dept
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
