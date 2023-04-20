import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { departments } from "./data/department";
import { employees } from "./data/employee";
import { productCategories } from "./data/productCategory";
import { products } from "./data/product";
import { companys } from "./data/company";
import { priceByCustomers } from "./data/priceByCustomer";

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

  console.table(productCategories);
  for (const cate of productCategories) {
    await prisma.product_category.upsert({
      where: {
        category_code: cate.category_code,
      },
      create: cate,
      update: cate,
    });
  }

  console.table(products);
  for (const prod of products) {
    await prisma.products.upsert({
      where: {
        prod_code: prod.prod_code,
      },
      create: prod,
      update: prod,
    });
  }

  console.table(companys);
  for (const comp of companys) {
    await prisma.companys_mst.upsert({
      where: {
        comp_code: comp.comp_code,
      },
      create: comp,
      update: comp,
    });
  }

  console.table(priceByCustomers);
  for (const price of priceByCustomers) {
    await prisma.pricebycustomer.upsert({
      where: {
        prod_code_comp_code: {
          prod_code: price.prod_code,
          comp_code: price.comp_code,
        },
      },
      create: price,
      update: price,
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
