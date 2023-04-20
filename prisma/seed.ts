import {
  PrismaClient,
  dept_mst,
  employee,
  product_category,
  products,
  pricebycustomer,
  companys_mst,
} from "@prisma/client";
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
  const productCategories: product_category[] = [
    {
      category_code: "CATE001",
      prod_cate_name: "Sample Category 1",
      category_layer: 1,
      category_path: "/CATE001/",
      lowest_flug: 1,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
    {
      category_code: "CATE002",
      prod_cate_name: "Sample Category 2",
      category_layer: 1,
      category_path: "/CATE002/",
      lowest_flug: 1,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
  ];
  for (const cate of productCategories) {
    await prisma.product_category.upsert({
      where: {
        category_code: cate.category_code,
      },
      create: cate,
      update: cate,
    });
  }

  const produts: products[] = [
    {
      prod_code: "PROD001",
      prod_fullname: "Sample Product 1",
      prod_name: "Prod1",
      prod_kana: "ぷろだくと1",
      prod_type: "A",
      serial_no: "1234567890",
      unitprice: 1000,
      po_price: 900,
      prime_cost: 500,
      tax_type: 1,
      category_code: "CATE001",
      wide_use_type: 1,
      stock_manage_type: 1,
      stock_reserve_type: null,
      sup_code: "SUP001",
      sup_sub_no: null,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
    {
      prod_code: "PROD002",
      prod_fullname: "Sample Product 2",
      prod_name: "Prod2",
      prod_kana: "ぷろだくと2",
      prod_type: null,
      serial_no: null,
      unitprice: 2000,
      po_price: null,
      prime_cost: 1000,
      tax_type: 2,
      category_code: "CATE002",
      wide_use_type: null,
      stock_manage_type: null,
      stock_reserve_type: null,
      sup_code: "SUP002",
      sup_sub_no: null,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
  ];
  for (const prod of produts) {
    await prisma.products.upsert({
      where: {
        prod_code: prod.prod_code,
      },
      create: prod,
      update: prod,
    });
  }

  const companys: companys_mst[] = [
    {
      comp_code: "SUP001",
      comp_name: "Sample Company 1",
      comp_kana: "すぱむぷれい1",
      sup_type: 1,
      zip_code: "1234567",
      state: "東京都",
      address1: "東京都港区",
      address2: "サンプル1-1-1",
      no_sales_flg: 0,
      wide_use_type: 1,
      comp_group_code: "SUP",
      max_credit: 100000,
      temp_credit_up: 100000,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
  ];
  for (const comp of companys) {
    await prisma.companys_mst.upsert({
      where: {
        comp_code: comp.comp_code,
      },
      create: comp,
      update: comp,
    });
  }

  const pricebycustomer: pricebycustomer[] = [
    {
      prod_code: "PROD001",
      comp_code: "SUP001",
      unitprice: 800,
      create_date: new Date("2022-04-20T00:00:00Z"),
      creator: "User001",
      update_date: new Date("2022-04-20T00:00:00Z"),
      updater: "User001",
    },
  ];
  for (const price of pricebycustomer) {
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
