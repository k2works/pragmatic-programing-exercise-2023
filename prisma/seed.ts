import { PrismaClient, order_details, orders, wh_mst } from "@prisma/client";

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
  suppliers,
  areas,
  destinations,
  companyGroups,
  categoryTypes,
  companyCategories,
  companyCategoryGroups,
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

  console.table(areas)
  for (const area of areas) {
    await prisma.area_mst.upsert({
      where: {
        area_code: area.area_code
      },
      create: area,
      update: area
    })
  }

  console.table(destinations)
  for (const dest of destinations) {
    await prisma.destinations_mst.upsert({
      where: {
        comp_code_dist_no_comp_sub_no: {
          comp_code: dest.comp_code,
          comp_sub_no: dest.comp_sub_no,
          dist_no: dest.dist_no
        }
      },
      create: dest,
      update: dest
    })
  }

  console.table(companyGroups)
  for (const group of companyGroups) {
    await prisma.company_group_mst.upsert({
      where: {
        comp_group_code: group.comp_group_code
      },
      create: group,
      update: group
    })
  }

  console.table(categoryTypes)
  for (const cateType of categoryTypes) {
    await prisma.category_type.upsert({
      where: {
        category_type_code: cateType.category_type_code
      },
      create: cateType,
      update: cateType
    })
  }

  console.table(companyCategories)
  for (const cate of companyCategories) {
    await prisma.company_category.upsert({
      where: {
        comp_cate_code_category_type: {
          category_type: cate.category_type,
          comp_cate_code: cate.comp_cate_code
        },
      },
      create: cate,
      update: cate
    })
  }

  console.table(companyCategoryGroups)
  for (const group of companyCategoryGroups) {
    await prisma.company_category_group.upsert({
      where: {
        category_type_comp_code_comp_cate_code: {
          category_type: group.category_type,
          comp_cate_code: group.comp_cate_code,
          comp_code: group.comp_code,
        },
      },
      create: group,
      update: group
    })
  }

  await prisma.order_details.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.wh_mst.deleteMany({});

  const wharehouses: wh_mst[] = [{
    wh_code: "001",
    wh_name: "本社倉庫",
    wh_type: "1",
    zip_code: "000-0000",
    state: "東京都",
    address1: "千代田区",
    address2: "千代田1-1-1",
    create_date: new Date(),
    creator: "0001",
    update_date: new Date(),
    updater: "0001",
  }];
  await prisma.wh_mst.createMany({
    data: wharehouses
  });

  const orders: orders[] = [{
    order_no: "0000000001",
    order_date: new Date(),
    dept_code: "11101",
    start_date: new Date("2021-01-01"),
    cust_code: "001",
    cust_sub_no: 1,
    emp_code: "EMP001",
    required_date: new Date(),
    custorder_no: "0000000001",
    wh_code: "001",
    order_amnt: 1000,
    cmp_tax: 10,
    slip_comment: "test",
    create_date: new Date(),
    creator: "0001",
    update_date: new Date(),
    updater: "0001",
  }];

  const order_details: order_details[] = [{
    order_no: "0000000001",
    so_row_no: 1,
    prod_code: "0001",
    prod_name: "test",
    unitprice: 100,
    quantity: 10,
    cmp_tax_rate: 10,
    reserve_qty: 0,
    delivery_order_qty: 0,
    delivered_qty: 0,
    complete_flg: 0,
    discount: 0,
    delivery_date: new Date(),
    create_date: new Date(),
    creator: "0001",
    update_date: new Date(),
    updater: "0001",
  },
  {
    order_no: "0000000001",
    so_row_no: 2,
    prod_code: "0001",
    prod_name: "test",
    unitprice: 100,
    quantity: 10,
    cmp_tax_rate: 10,
    reserve_qty: 0,
    delivery_order_qty: 0,
    delivered_qty: 0,
    complete_flg: 0,
    discount: 0,
    delivery_date: new Date(),
    create_date: new Date(),
    creator: "0001",
    update_date: new Date(),
    updater: "0001",
  },
  {
    order_no: "0000000001",
    so_row_no: 3,
    prod_code: "0001",
    prod_name: "test",
    unitprice: 100,
    quantity: 10,
    cmp_tax_rate: 10,
    reserve_qty: 0,
    delivery_order_qty: 0,
    delivered_qty: 0,
    complete_flg: 0,
    discount: 0,
    delivery_date: new Date(),
    create_date: new Date(),
    creator: "0001",
    update_date: new Date(),
    updater: "0001",
  }
  ];

  await prisma.$transaction(async (prisma) => {
    await prisma.orders.createMany({
      data: orders
    });
    await prisma.order_details.createMany({
      data: order_details
    });
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
