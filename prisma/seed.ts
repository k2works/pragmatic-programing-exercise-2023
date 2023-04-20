import { PrismaClient, dept_mst, employee } from "@prisma/client";
const prisma = new PrismaClient();
import { departments } from "./data/department";
import { employees } from "./data/employee";

async function main() {
  console.table(departments);
  for (const dept of departments) {
    await prisma.dept_mst.upsert({
      where: {
        dept_code_start_date: {
          dept_code: dept.dept_code,
          start_date: dept.start_date,
        },
      },
      create: dept,
      update: dept,
    });
  }

  console.table(employees);
  for (const emp of employees) {
    await prisma.employee.upsert({
      where: {
        emp_code: emp.emp_code,
      },
      create: emp,
      update: emp,
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
