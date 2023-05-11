import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { departments, employees } from "./csvReader";

async function main() {
  console.table(departments)
  for (const dept of departments) {
    await prisma.department.upsert({
      where: {
        deptCode_startDate: {
          deptCode: dept.deptCode,
          startDate: dept.startDate
        }
      },
      create: dept,
      update: dept
    });
  }

  console.table(employees);
  for (const emp of employees) {
    await prisma.employee.upsert({
      where: {
        empCode: emp.empCode
      },
      create: emp,
      update: emp
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
