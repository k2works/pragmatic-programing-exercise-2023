import { PrismaClient } from "@prisma/client";

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
  wharehouses,
  orders,
  orderDetails,
  sales,
  salesDetails,
  invoices,
  invoiceDetails,
  bankAccounts,
  credits,
  alterNateProducts,
} from "./data/csvReader";
import { waitForDebugger } from "inspector";

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

  console.table(alterNateProducts);
  for (const altProd of alterNateProducts) {
    await prisma.alternate_products.upsert({
      where: {
        prod_code_alt_prod_code: {
          prod_code: altProd.prod_code,
          alt_prod_code: altProd.alt_prod_code
        }
      },
      create: altProd,
      update: altProd
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

  console.table(wharehouses)
  for (const w of wharehouses) {
    await prisma.wh_mst.upsert({
      where: {
        wh_code: w.wh_code
      },
      create: w,
      update: w
    })
  }

  await prisma.$transaction(async (prisma) => {
    console.table(orders)
    for (const order of orders) {
      await prisma.orders.upsert({
        where: {
          order_no: order.order_no
        },
        create: order,
        update: order
      })
    }

    console.table(orderDetails)
    for (const orderDetail of orderDetails) {
      await prisma.order_details.upsert({
        where: {
          order_no_so_row_no: {
            order_no: orderDetail.order_no,
            so_row_no: orderDetail.so_row_no
          }
        },
        create: orderDetail,
        update: orderDetail
      })
    }
  });

  await prisma.$transaction(async (prisma) => {
    console.table(sales)
    for (const s of sales) {
      await prisma.sales.upsert({
        where: {
          sales_no: s.sales_no
        },
        create: s,
        update: s
      })

    }
    console.table(salesDetails)
    for (const salesDetail of salesDetails) {
      await prisma.sales_details.upsert({
        where: {
          sales_no_row_no: {
            sales_no: salesDetail.sales_no,
            row_no: salesDetail.row_no
          }
        },
        create: salesDetail,
        update: salesDetail
      })
    }
  });

  await prisma.$transaction(async (prisma) => {
    console.table(invoices)
    for (const i of invoices) {
      await prisma.invoice.upsert({
        where: {
          invoice_no: i.invoice_no
        },
        create: i,
        update: i
      })
    }
    console.table(invoiceDetails)
    for (const invoiceDetail of invoiceDetails) {
      await prisma.invoice_details.upsert({
        where: {
          invoice_no_sales_no_row_no: {
            invoice_no: invoiceDetail.invoice_no,
            sales_no: invoiceDetail.sales_no,
            row_no: invoiceDetail.row_no
          }
        },
        create: invoiceDetail,
        update: invoiceDetail
      })
    }
  });

  console.table(bankAccounts)
  for (const bankAccount of bankAccounts) {
    await prisma.bank_acut_mst.upsert({
      where: {
        bank_acut_code: bankAccount.bank_acut_code
      },
      create: bankAccount,
      update: bankAccount
    })
  }

  console.table(credits)
  for (const credit of credits) {
    await prisma.credit.upsert({
      where: {
        credit_no: credit.credit_no
      },
      create: credit,
      update: credit
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
