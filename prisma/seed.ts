import { PrismaClient, customers_mst, consumer, supplier_mst } from "@prisma/client";

const prisma = new PrismaClient();
import {
  departments,
  employees,
  productCategories,
  products,
  priceByCustomers,
  companys
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
  await prisma.customers_mst.deleteMany();
  await prisma.customers_mst.createMany({
    data: [
      {
        cust_code: "SUP001",
        cust_sub_no: 1,
        cust_type: 0,
        ar_code: "AR0001",
        ar_sub_no: 1,
        payer_code: "CUST0001",
        payer_sub_no: 1,
        cust_name: "Customer 1",
        cust_kana: "カスタマー1",
        emp_code: "EMP0001",
        cust_user_name: "Customer 1",
        cust_user_dep_name: "Customer 1",
        cust_zip_code: "1234567",
        cust_state: "0001",
        cust_address1: "Chiyoda-ku",
        cust_address2: "1-1-1",
        cust_tel: "0123456789",
        cust_fax: "0123456789",
        cust_email: "hoge@hoge.com",
        cust_ar_flag: 0,
        cust_close_date1: 1,
        cust_pay_months1: 1,
        cust_pay_dates1: 1,
        cust_pay_method1: 1,
        cust_close_date2: 1,
        cust_pay_months2: 1,
        cust_pay_dates2: 1,
        cust_pay_method2: 1,
        create_date: new Date(),
        creator: "admin",
        update_date: new Date(),
        updater: "admin"
      }
    ]
  });

  await prisma.consumer.deleteMany();
  await prisma.consumer.createMany({
    data: [
      {
        consumer_code: "CON001",
        last_name: "Consumer",
        first_name: "1",
        last_name_kana: "コンシューマー",
        first_name_kana: "1",
        login_id: "consumer1",
        email: "hoge@hoge.com",
        pwd: "123456",
        birth_date: new Date("2000-01-01"),
        sex: 1,
        login_datetime: new Date(),
        rest_point: 100,
        withdrawal_date: new Date(),
        create_date: new Date(),
        creator: "admin",
        update_date: new Date(),
        updater: "admin"
      }
    ]
  });

  await prisma.supplier_mst.deleteMany();
  await prisma.supplier_mst.createMany({
    data: [
      {
        sup_code: "SUP001",
        sup_sub_no: 1,
        sup_name: "Supplier 1",
        sup_kana: "スプライヤー1",
        sup_emp_name: "Supplier 1",
        sup_dep_name: "Supplier 1",
        sup_zip_code: "1234567",
        sup_state: "0001",
        sup_address1: "Chiyoda-ku",
        sup_address2: "1-1-1",
        sup_tel: "0123456789",
        sup_fax: "0123456789",
        sup_email: "hoge@hoge.com",
        sup_close_date: 1,
        sup_pay_months: 1,
        sup_pay_dates: 1,
        pay_method_type: 1,
        create_date: new Date(),
        creator: "admin",
        update_date: new Date(),
        updater: "admin"
      }
    ]
  });
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
