import { PrismaClient, customers_mst, consumer, supplier_mst } from "@prisma/client";

const prisma = new PrismaClient();
import {
  departments,
  employees,
  productCategories,
  products,
  priceByCustomers,
  companys,
  customers,
  consumers,
  suppliers
} from "./data/csvReader";

async function main() {
  console.table(departments);
  for (const dept of departments) {
    await prisma.dept_mst.upsert({
      where: {
        dept_code_start_date: {
          dept_code: dept.dept_code,
          start_date: dept.start_date
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
        emp_code: emp.emp_code
      },
      create: emp,
      update: emp
    });
  }

  console.table(productCategories);
  for (const cate of productCategories) {
    await prisma.product_category.upsert({
      where: {
        category_code: cate.category_code
      },
      create: cate,
      update: cate
    });
  }

  console.table(products);
  for (const prod of products) {
    await prisma.products.upsert({
      where: {
        prod_code: prod.prod_code
      },
      create: prod,
      update: prod
    });
  }

  console.table(companys);
  for (const comp of companys) {
    await prisma.companys_mst.upsert({
      where: {
        comp_code: comp.comp_code
      },
      create: comp,
      update: comp
    });
  }

  console.table(priceByCustomers);
  for (const price of priceByCustomers) {
    await prisma.pricebycustomer.upsert({
      where: {
        prod_code_comp_code: {
          prod_code: price.prod_code,
          comp_code: price.comp_code
        }
      },
      create: price,
      update: price
    });
  }

  console.table(customers)
  for (const cust of customers) {
    await prisma.customers_mst.upsert({
      where: {
        cust_code_cust_sub_no: {
          cust_code: cust.cust_code,
          cust_sub_no: cust.cust_sub_no
        }
      },
      create: cust,
      update: cust
    });
  }

  console.table(consumers)
  for (const consumer of consumers) {
    await prisma.consumer.upsert({
      where: {
        consumer_code: consumer.consumer_code
      },
      create: consumer,
      update: consumer
    });
  }

  console.table(suppliers)
  for (const supplier of suppliers) {
    await prisma.supplier_mst.upsert({
      where: {
        sup_code_sup_sub_no: {
          sup_code: supplier.sup_code,
          sup_sub_no: supplier.sup_sub_no
        }
      },
      create: supplier,
      update: supplier
    })
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
