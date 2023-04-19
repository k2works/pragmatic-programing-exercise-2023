import { PrismaClient, dept_mst, employee } from "@prisma/client";
const prisma = new PrismaClient();
import { departments } from "./data/department";

async function main() {
  await prisma.dept_mst.deleteMany({});
  await prisma.dept_mst.createMany({
    data: departments,
  });

  await prisma.employee.deleteMany({});
  const employee: employee = await prisma.employee.create({
    data: {
      emp_code: "EMP001",
      emp_name: "John",
      emp_kana: "ジョン",
      login_password: "password",
      tel: "090-1234-5678",
      fax: "03-1234-5678",
      dept_code: "000001",
      start_date: new Date("2021-01-01"),
      occu_code: "",
      approval_code: "",
    },
  });
  console.log({ employee });
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
