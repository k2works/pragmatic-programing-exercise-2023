import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { alterNateProducts, departments, employees, priceByCustomers, productCategories, products } from "./csvReader";

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

  console.table(productCategories);
  for (const cate of productCategories) {
    await prisma.productCategory.upsert({
      where: {
        categoryCode: cate.categoryCode
      },
      create: cate,
      update: cate
    });
  }

  console.table(products);
  for (const prod of products) {
    await prisma.product.upsert({
      where: {
        prodCode: prod.prodCode
      },
      create: prod,
      update: prod
    });
  }

  console.table(priceByCustomers);
  for (const price of priceByCustomers) {
    await prisma.priceByCustomer.upsert({
      where: {
        prodCode_compCode: {
          prodCode: price.prodCode,
          compCode: price.compCode
        }
      },
      create: price,
      update: price
    });
  }

  console.table(alterNateProducts);
  for (const altProd of alterNateProducts) {
    await prisma.alternateProduct.upsert({
      where: {
        prodCode_altProdCode: {
          prodCode: altProd.prodCode,
          altProdCode: altProd.altProdCode
        }
      },
      create: altProd,
      update: altProd
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
