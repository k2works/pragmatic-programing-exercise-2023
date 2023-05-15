import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { alterNateProducts, categoryTypes, companyCategories, companyCategoryGroups, companyGroups, companys, consumers, customers, departments, employees, orderDetails, orders, priceByCustomers, productCategories, products, sales, salesDetails, suppliers } from "./csvReader";

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

  console.table(companys);
  for (const comp of companys) {
    await prisma.company.upsert({
      where: {
        compCode: comp.compCode
      },
      create: comp,
      update: comp
    });
  }

  console.table(customers)
  for (const cust of customers) {
    await prisma.customer.upsert({
      where: {
        custCode_custSubNo: {
          custCode: cust.custCode,
          custSubNo: cust.custSubNo
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
        consumerCode: consumer.consumerCode
      },
      create: consumer,
      update: consumer
    });
  }

  console.table(suppliers)
  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: {
        supCode_supSubNo: {
          supCode: supplier.supCode,
          supSubNo: supplier.supSubNo
        }
      },
      create: supplier,
      update: supplier
    })
  }

  console.table(companyGroups)
  for (const group of companyGroups) {
    await prisma.companyGroup.upsert({
      where: {
        compGroupCode: group.compGroupCode
      },
      create: group,
      update: group
    })
  }

  console.table(categoryTypes)
  for (const cateType of categoryTypes) {
    await prisma.categoryType.upsert({
      where: {
        categoryTypeCode: cateType.categoryTypeCode
      },
      create: cateType,
      update: cateType
    })
  }

  console.table(companyCategories)
  for (const cate of companyCategories) {
    await prisma.companyCategory.upsert({
      where: {
        categoryTypeCode_compCateCode: {
          categoryTypeCode: cate.categoryTypeCode,
          compCateCode: cate.compCateCode
        },
      },
      create: cate,
      update: cate
    })
  }

  console.table(companyCategoryGroups)
  for (const group of companyCategoryGroups) {
    await prisma.companyCategoryGroup.upsert({
      where: {
        categoryTypeCode_compCode_compCateCode: {
          categoryTypeCode: group.categoryTypeCode,
          compCateCode: group.compCateCode,
          compCode: group.compCode,
        },
      },
      create: group,
      update: group
    })
  }

  await prisma.$transaction(async (prisma) => {
    console.table(orders)
    for (const order of orders) {
      await prisma.order.upsert({
        where: {
          orderNo: order.orderNo
        },
        create: order,
        update: order
      })
    }

    console.table(orderDetails)
    for (const orderDetail of orderDetails) {
      await prisma.orderDetail.upsert({
        where: {
          orderNo_soRowNo: {
            orderNo: orderDetail.orderNo,
            soRowNo: orderDetail.soRowNo
          },
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
          salesNo: s.salesNo
        },
        create: s,
        update: s
      })

    }
    console.table(salesDetails)
    for (const salesDetail of salesDetails) {
      await prisma.salesDetail.upsert({
        where: {
          salesNo_rowNo: {
            salesNo: salesDetail.salesNo,
            rowNo: salesDetail.rowNo
          }
        },
        create: salesDetail,
        update: salesDetail
      })
    }
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
