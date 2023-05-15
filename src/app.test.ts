import { config } from "dotenv";
config({ path: '.env.test' })
import {
  PrismaClient,
  Department,
  Employee,
  ProductCategory,
  Product,
  PriceByCustomer,
  AlternateProduct,
  Company,
  Customer,
  Consumer,
  Supplier,
  CompanyGroup,
  CompanyCategoryGroup,
  CompanyCategory,
  CategoryType,
  Order,
  OrderDetail,
  Sales,
  SalesDetail,
} from "@prisma/client";
const prisma = new PrismaClient();


const departments: Department[] = [
  {
    deptCode: "11101",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    name: "新規部署",
    layer: 1,
    psth: "D0001",
    lowestType: 1,
    slitYn: 0,
    createDate: new Date("2021-01-01"),
    creator: "admin",
    updateDate: new Date("2021-01-01"),
    updater: "admin",
  }
]

const employees: Employee[] = [
  {
    empCode: "EMP999",
    name: "伊藤 裕子",
    kana: "イトウ ユウコ",
    loginPassword: "password",
    tel: "090-1234-5678",
    fax: "03-1234-5678",
    deptCode: "11101",
    startDate: new Date("2021-01-01"),
    occuCode: "",
    approvalCode: "",
    createDate: new Date("2021-01-01"),
    creator: "admin",
    updateDate: new Date("2021-01-01"),
    updater: "admin",
  }
];

const productCategories: ProductCategory[] = [
  {
    categoryCode: "00101001",
    name: "牛肉",
    layer: 0,
    path: "00100000~00101000~00101001",
    lowestType: 1,
    createDate: new Date("2021-01-01"),
    creator: "user",
    updateDate: new Date("2021-01-01"),
    updater: "user",
  },
]

const products: Product[] = [
  {
    prodCode: "1010100X",
    fullname: "商品名",
    name: "商品名",
    kana: "ショウヒンメイ",
    prodType: "1",
    serialNo: "1234567890",
    unitprice: 1000,
    poPrice: 900,
    primeCost: 500,
    taxType: 1,
    categoryCode: "00101001",
    wideUseType: 1,
    stockManageType: 1,
    stockReserveType: 1,
    supCode: "001",
    supSubNo: 1,
    createDate: new Date("2021-01-01"),
    creator: "user",
    updateDate: new Date("2021-01-01"),
    updater: "user",
  }
];

const alternateProducts: AlternateProduct[] = [
  {
    prodCode: '1010100X',
    altProdCode: 'P0000001',
    priority: 1,
    createDate: new Date(),
    creator: 'admin',
    updateDate: new Date(),
    updater: 'admin',
  }
];

const priceByCustomers: PriceByCustomer[] = [
  {
    prodCode: '1010100X',
    compCode: 'C0000001',
    unitprice: 1000,
    createDate: new Date(),
    creator: 'admin',
    updateDate: new Date(),
    updater: 'admin',
  }
];

const companies: Company[] = [{
  compCode: "00X",
  name: "顧客名1",
  kana: "クスキメイ1",
  supType: 0,
  zipCode: "000-0000",
  state: "都道府県",
  address1: "住所1",
  address2: "住所2",
  noSalesFlg: 0,
  wideUseType: 0,
  compGroupCode: "001",
  maxCredit: 10000,
  tempCreditUp: 0,
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const customers: Customer[] = [{
  custCode: "00X",
  custSubNo: 1,
  custType: 0,
  arCode: "001",
  arSubNo: 1,
  payerCode: "001",
  payerSubNo: 1,
  name: "顧客名1",
  kana: "クスキメイ1",
  empCode: "001",
  custUserName: "顧客担当者名1",
  custUserDepName: "顧客担当者部署名1",
  custZipCode: "000-0000",
  custState: "都道府県",
  custAddress1: "住所1",
  custAddress2: "住所2",
  custTel: "000-0000-0000",
  custFax: "000-0000-0000",
  custEmail: "hoge@hoge.com",
  custArType: 0,
  custCloseDate1: 1,
  custPayMonths1: 0,
  custPayDates1: 1,
  custPayMethod1: 0,
  custPayDates2: 1,
  custPayMethod2: 0,
  custCloseDate2: 1,
  custPayMonths2: 0,
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const suppliers: Supplier[] = [{
  supCode: "00X",
  supSubNo: 1,
  name: "仕入先名1",
  kana: "シスキメイ1",
  supEmpName: "担当者名1",
  supDepName: "部署名1",
  supZipCode: "000-0000",
  supState: "都道府県",
  supAddress1: "住所1",
  supAddress2: "住所2",
  supTel: "000-0000-0000",
  supFax: "000-0000-0000",
  supEmail: "hoge@hoegc.com",
  supCloseDate: 1,
  supPayMonths: 1,
  supPayDates: 1,
  payMethodType: 1,
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const companyGroups: CompanyGroup[] = [{
  compGroupCode: "001",
  groupName: "グループ名1",
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const cateoryTypes: CategoryType[] = [{
  categoryTypeCode: "01",
  categoryTypeName: "分類名1",
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const companyCategories: CompanyCategory[] = [{
  categoryTypeCode: "01",
  compCateCode: "001",
  compCateName: "分類名1",
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const companyCategoryGroups: CompanyCategoryGroup[] = [{
  categoryTypeCode: "01",
  compCateCode: "001",
  compCode: "00X",
  createDate: new Date(),
  creator: null,
  updateDate: new Date(),
  updater: null
}]

const orders: Order[] = [{
  orderNo: "0000000001",
  orderDate: new Date(),
  deptCode: "11101",
  startDate: new Date("2021-01-01"),
  custCode: "00X",
  custSubNo: 1,
  empCode: "EMP999",
  requiredDate: new Date(),
  custorderNo: "0000000001",
  whCode: "001",
  orderAmnt: 1000,
  cmpTax: 10,
  slipComment: "test",
  createDate: new Date(),
  creator: "0001",
  updateDate: new Date(),
  updater: "0001",
}];

const orderDetails: OrderDetail[] = [{
  orderNo: "0000000001",
  soRowNo: 1,
  prodCode: "0001",
  prodName: "test",
  unitprice: 100,
  quantity: 10,
  cmpTaxRate: 10,
  reserveQty: 0,
  deliveryOrderQty: 0,
  deliveredQty: 0,
  completeFlg: 0,
  discount: 0,
  deliveryDate: new Date(),
  createDate: new Date(),
  creator: "0001",
  updateDate: new Date(),
  updater: "0001",
},
{
  orderNo: "0000000001",
  soRowNo: 2,
  prodCode: "0001",
  prodName: "test",
  unitprice: 100,
  quantity: 10,
  cmpTaxRate: 10,
  reserveQty: 0,
  deliveryOrderQty: 0,
  deliveredQty: 0,
  completeFlg: 0,
  discount: 0,
  deliveryDate: new Date(),
  createDate: new Date(),
  creator: "0001",
  updateDate: new Date(),
  updater: "0001",
},
{
  orderNo: "0000000001",
  soRowNo: 3,
  prodCode: "0001",
  prodName: "test",
  unitprice: 100,
  quantity: 10,
  cmpTaxRate: 10,
  reserveQty: 0,
  deliveryOrderQty: 0,
  deliveredQty: 0,
  completeFlg: 0,
  discount: 0,
  deliveryDate: new Date(),
  createDate: new Date(),
  creator: "0001",
  updateDate: new Date(),
  updater: "0001",
}
];

const sales: Sales[] = [{
  salesNo: '0000000001',
  orderNo: '0000000001',
  salesDate: new Date(),
  salesType: 1,
  deptCode: '11101',
  startDate: new Date('2021-01-01'),
  compCode: '1',
  empCode: '1',
  salesAmnt: 3,
  cmpTax: 100,
  slipComment: 'test',
  updatedNo: 1,
  orgnlNo: '1',
  createDate: new Date(),
  creator: 'admin',
  updateDate: new Date(),
  updater: 'admin',
}];
const salesDetails: SalesDetail[] = [
  {
    salesNo: '0000000001',
    rowNo: 1,
    prodCode: '10101001',
    prodName: 'test',
    unitprice: 1000,
    deliveredQty: 1,
    quantity: 1,
    discount: 1,
    invoicedDate: new Date(),
    invoiceNo: '1',
    invoiceDelayType: 1,
    autoJournalDate: new Date(),
    createDate: new Date(),
    creator: 'admin',
    updateDate: new Date(),
    updater: 'admin',
  },
  {
    salesNo: '0000000001',
    rowNo: 2,
    prodCode: '10101001',
    prodName: 'test',
    unitprice: 1000,
    deliveredQty: 1,
    quantity: 1,
    discount: 1,
    invoicedDate: new Date(),
    invoiceNo: '1',
    invoiceDelayType: 1,
    autoJournalDate: new Date(),
    createDate: new Date(),
    creator: 'admin',
    updateDate: new Date(),
    updater: 'admin',
  },
  {
    salesNo: '0000000001',
    rowNo: 3,
    prodCode: '10101001',
    prodName: 'test',
    unitprice: 1000,
    deliveredQty: 1,
    quantity: 1,
    discount: 1,
    invoicedDate: new Date(),
    invoiceNo: '1',
    invoiceDelayType: 1,
    autoJournalDate: new Date(),
    createDate: new Date(),
    creator: 'admin',
    updateDate: new Date(),
    updater: 'admin',
  },
]


describe("Part 1 業務システムの概要とマスタ設計", () => {
  describe("Chapter 1 販売管理システム全体像", () => { });

  describe("Chapter 2 基幹業務システム構築のポイント", () => { });

  describe("Chapter 3 部門／社員／商品マスタ設計", () => {
    describe("部門マスタ", () => {
      beforeAll(async () => {
        await prisma.department.deleteMany();
      });

      test("部門を登録できる", async () => {
        const expected: Department[] = departments.map((c) => {
          return { ...c };
        });
        await prisma.department.create({
          data: departments[0]
        });

        const result = await prisma.department.findMany();
        expect(result).toEqual(expected);
      });

      test("部門を更新できる", async () => {
        const expected: Department[] = departments.map((c) => {
          return { ...c, name: "更新部署" };
        });
        await prisma.department.update({
          where: { deptCode_startDate: { deptCode: departments[0].deptCode, startDate: departments[0].startDate } },
          data: expected[0]
        });

        const result = await prisma.department.findMany();
        expect(result).toEqual(expected);
      });

      test("部門を削除できる", async () => {
        const expected: Department[] = [];
        await prisma.department.delete({
          where: { deptCode_startDate: { deptCode: departments[0].deptCode, startDate: departments[0].startDate } }
        });

        const result = await prisma.department.findMany();
        expect(result).toEqual(expected);
      });
    });

    describe("社員マスタ", () => {
      beforeAll(async () => {
        await prisma.employee.deleteMany();
      });

      test("社員を登録できる", async () => {
        const expected: Employee[] = employees.map((c) => {
          return { ...c };
        });
        await prisma.employee.create({
          data: employees[0]
        });

        const result = await prisma.employee.findMany();
        expect(result).toEqual(expected);
      });

      test("社員を更新できる", async () => {
        const expected: Employee[] = employees.map((c) => {
          return { ...c, name: "更新社員" };
        });
        await prisma.employee.update({
          where: { empCode: employees[0].empCode },
          data: expected[0]
        });

        const result = await prisma.employee.findMany();
        expect(result).toEqual(expected);
      });

      test("社員を削除できる", async () => {
        const expected: Employee[] = [];
        await prisma.employee.delete({
          where: { empCode: employees[0].empCode }
        });

        const result = await prisma.employee.findMany();
        expect(result).toEqual(expected);
      });
    });

    describe("商品マスタ", () => {
      beforeAll(async () => {
        await prisma.alternateProduct.deleteMany();
        await prisma.priceByCustomer.deleteMany();
        await prisma.product.deleteMany();
        await prisma.productCategory.deleteMany();
      });

      test("商品を登録できる", async () => {
        const expected: Product[] = products.map((c) => {
          return {
            ...c,
            alternateProducts: alternateProducts,
            pricebycustomers: priceByCustomers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.productCategory.createMany({ data: productCategories });
          await prisma.product.createMany({ data: products });
          await prisma.alternateProduct.createMany({ data: alternateProducts });
          await prisma.priceByCustomer.createMany({ data: priceByCustomers });
        });

        const result = await prisma.product.findUnique({
          where: { prodCode: products[0].prodCode },
          include: {
            alternateProducts: true,
            pricebycustomers: true,
          }
        });
        expect(result).toEqual(expected[0]);
      });

      test("商品を更新できる", async () => {
        const expected: Product[] = products.map((c) => {
          return { ...c, name: "更新商品" };
        });
        await prisma.product.update({
          where: { prodCode: products[0].prodCode },
          data: expected[0]
        });

        const result = await prisma.product.findUnique({
          where: { prodCode: products[0].prodCode },
        });
        expect(result).toEqual(expected[0]);
      });

      test("商品を削除できる", async () => {
        const expected: Product[] = [];

        await prisma.$transaction(async (prisma) => {
          await prisma.alternateProduct.deleteMany({
            where: { prodCode: products[0].prodCode }
          });
          await prisma.priceByCustomer.deleteMany({
            where: { prodCode: products[0].prodCode }
          });
          await prisma.product.delete({
            where: { prodCode: products[0].prodCode }
          });
        });

        const result = await prisma.product.findMany();
        expect(result).toEqual(expected);
      });

    });
  });

  describe("Chapter 4 取引先（顧客／仕入先）マスタ設計", () => {
    beforeAll(async () => {
      await prisma.customer.deleteMany();
      await prisma.supplier.deleteMany();
      await prisma.companyCategoryGroup.deleteMany();
      await prisma.company.deleteMany();
      await prisma.companyGroup.deleteMany();
      await prisma.companyCategory.deleteMany();
      await prisma.categoryType.deleteMany();
    });
    describe("取引先マスタ", () => {

      test("取引先を登録できる", async () => {
        const expected: Company[] = companies.map((c) => {
          return {
            ...c,
            customers: customers,
            suppliers: suppliers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.companyGroup.createMany({ data: companyGroups });
          await prisma.company.createMany({ data: companies });
          await prisma.customer.createMany({ data: customers });
          await prisma.supplier.createMany({ data: suppliers });
        });

        const result = await prisma.company.findMany(
          {
            include: {
              customers: true,
              suppliers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("取引先を更新できる", async () => {
        const updatedCompanies: Company[] = companies.map((c) => { return { ...c, name: "更新取引先" }; });
        const updatedCustomers: Customer[] = customers.map((c) => { return { ...c, name: "更新顧客" }; });
        const updatedSuppliers: Supplier[] = suppliers.map((c) => { return { ...c, name: "更新仕入先" }; });

        const expected: Company[] = updatedCompanies.map((c) => {
          return {
            ...c,
            customers: updatedCustomers,
            suppliers: updatedSuppliers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          for (const com of updatedCompanies) {
            await prisma.company.update({ where: { compCode: com.compCode }, data: com });
          }
          for (const cus of updatedCustomers) {
            await prisma.customer.update({
              where: {
                custCode_custSubNo: {
                  custCode: cus.custCode,
                  custSubNo: cus.custSubNo
                }
              }, data: cus
            });
          }
          for (const sup of updatedSuppliers) {
            await prisma.supplier.update({
              where: {
                supCode_supSubNo: {
                  supCode: sup.supCode,
                  supSubNo: sup.supSubNo
                }
              }, data: sup
            });
          }
        });

        const result = await prisma.company.findMany(
          {
            include: {
              customers: true,
              suppliers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("取引先を削除できる", async () => {
        const expected: Company[] = [];
        await prisma.$transaction(async (prisma) => {
          for (const com of companies) {
            await prisma.companyCategoryGroup.deleteMany({
              where: { compCode: com.compCode }
            });
            await prisma.customer.deleteMany({
              where: { custCode: com.compCode }
            });
            await prisma.supplier.deleteMany({
              where: { supCode: com.compCode }
            });
            await prisma.company.delete({
              where: { compCode: com.compCode }
            });
            await prisma.companyGroup.delete({
              where: { compGroupCode: com.compGroupCode }
            });
          }
        });

        const result = await prisma.company.findMany();
        expect(result).toEqual(expected);
      });

    });

    describe("顧客マスタ", () => {
      test("顧客を登録できる", async () => {
        const expected: Company[] = companies.map((c) => {
          return {
            ...c,
            customers: customers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.company.createMany({ data: companies });
          await prisma.customer.createMany({ data: customers });
        });

        const result = await prisma.company.findMany(
          {
            include: {
              customers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("顧客を更新できる", async () => {
        const updatedCompanies: Company[] = companies.map((c) => { return { ...c, name: "更新取引先" }; });
        const updatedCustomers: Customer[] = customers.map((c) => { return { ...c, name: "更新顧客" }; });

        const expected: Company[] = updatedCompanies.map((c) => {
          return {
            ...c,
            customers: updatedCustomers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          for (const com of updatedCompanies) {
            await prisma.company.update({ where: { compCode: com.compCode }, data: com });
          }
          for (const cus of updatedCustomers) {
            await prisma.customer.update({
              where: {
                custCode_custSubNo: {
                  custCode: cus.custCode,
                  custSubNo: cus.custSubNo
                }
              }, data: cus
            });
          }
        });

        const result = await prisma.company.findMany(
          {
            include: {
              customers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("顧客を削除できる", async () => {
        const expected: Customer[] = [];
        await prisma.$transaction(async (prisma) => {
          for (const com of companies) {
            await prisma.customer.deleteMany({
              where: { custCode: com.compCode }
            });
            await prisma.company.delete({
              where: { compCode: com.compCode }
            });
          }
        });

        const result = await prisma.customer.findMany();
        expect(result).toEqual(expected);
      });

    });


    describe("取引先グループマスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.companyGroup.createMany({ data: companyGroups });
          await prisma.company.createMany({ data: companies });
        });
      });

      afterAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.company.deleteMany();
          await prisma.companyGroup.deleteMany();
        });
      });

      test("取引先をグループ化できる", async () => {
        const expected = {
          ...companyGroups[0],
          companies: companies,
        }

        const result = {
          ...await prisma.companyGroup.findUnique({ where: { compGroupCode: companyGroups[0].compGroupCode } }),
          companies: await prisma.company.findMany({ where: { compGroupCode: companyGroups[0].compGroupCode } }),
        }
        expect(result).toEqual(expected);
      });

    });

    describe("取引先分類マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.company.createMany({ data: companies });
          await prisma.categoryType.createMany({ data: cateoryTypes });
          await prisma.companyCategory.createMany({ data: companyCategories });
          await prisma.companyCategoryGroup.createMany({ data: companyCategoryGroups });
        });
      });

      afterAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.companyCategoryGroup.deleteMany();
          await prisma.companyCategory.deleteMany();
          await prisma.categoryType.deleteMany();
          await prisma.company.deleteMany();
        });
      });

      test("取引先を種別ごとに分類できる", async () => {
        const expected: CategoryType[] = cateoryTypes.map((c) => {
          return {
            ...c,
            companyCategories: companyCategories,
          };
        });

        const result = await prisma.categoryType.findMany(
          {
            include: {
              companyCategories: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("取引先を所属ごとに分類できる", async () => {
        const expected: CompanyCategory[] = companyCategories.map((c) => {
          return {
            ...c,
            categoryType: cateoryTypes[0],
            companyCategoryGroups: companyCategoryGroups,
          };
        });

        const result = await prisma.companyCategory.findMany(
          {
            include: {
              categoryType: true,
              companyCategoryGroups: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

    });


    describe("仕入先マスタ", () => {

      test("仕入先を登録できる", async () => {
        const expected: Company[] = companies.map((c) => {
          return {
            ...c,
            suppliers: suppliers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.company.createMany({ data: companies });
          await prisma.supplier.createMany({ data: suppliers });
        });

        const result = await prisma.company.findMany(
          {
            include: {
              suppliers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("仕入先を更新できる", async () => {
        const updatedCompanies: Company[] = companies.map((c) => { return { ...c, name: "更新取引先" }; });
        const updatedSuppliers: Supplier[] = suppliers.map((c) => { return { ...c, name: "更新仕入先" }; });

        const expected: Company[] = updatedCompanies.map((c) => {
          return {
            ...c,
            suppliers: updatedSuppliers,
          };
        });
        await prisma.$transaction(async (prisma) => {
          for (const com of updatedCompanies) {
            await prisma.company.update({ where: { compCode: com.compCode }, data: com });
          }
          for (const sup of updatedSuppliers) {
            await prisma.supplier.update({
              where: {
                supCode_supSubNo: {
                  supCode: sup.supCode,
                  supSubNo: sup.supSubNo
                }
              }, data: sup
            });
          }
        });

        const result = await prisma.company.findMany(
          {
            include: {
              suppliers: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("仕入先を削除できる", async () => {
        const expected: Supplier[] = [];
        await prisma.$transaction(async (prisma) => {
          for (const com of companies) {
            await prisma.supplier.deleteMany({
              where: { supCode: com.compCode }
            });
            await prisma.company.delete({
              where: { compCode: com.compCode }
            });
          }
        });

        const result = await prisma.supplier.findMany();
        expect(result).toEqual(expected);
      });

    });

  });
});

describe("Part 2 販売システムのDB設計", () => {
  describe("Chapter 5 受注業務のDB設計", () => {
    describe("受注と受注明細", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.employee.deleteMany();
          await prisma.customer.deleteMany();
          await prisma.company.deleteMany();
          await prisma.product.deleteMany();
          await prisma.orderDetail.deleteMany();
          await prisma.order.deleteMany();

          await prisma.employee.createMany({ data: employees });
          await prisma.company.createMany({ data: companies });
          await prisma.customer.createMany({ data: customers });
          await prisma.product.createMany({ data: products });
        });
      });

      test("受注を登録できる", async () => {
        const expected: Order[] = orders.map((o) => {
          return {
            ...o,
            orderDetails: orderDetails.filter((od) => od.orderNo === o.orderNo),
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.order.createMany({ data: orders });
          await prisma.orderDetail.createMany({ data: orderDetails });
        });

        const result = await prisma.order.findMany(
          {
            include: {
              orderDetails: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("受注を更新できる", async () => {
        const updatedOrders: Order[] = orders.map((o) => { return { ...o, orderAmnt: 1000 }; });
        const updatedOrderDetails: OrderDetail[] = orderDetails.map((o) => { return { ...o, quantity: 10 }; });

        const expected: Order[] = updatedOrders.map((o) => {
          return {
            ...o,
            orderDetails: updatedOrderDetails.filter((od) => od.orderNo === o.orderNo),
          };
        });
        await prisma.$transaction(async (prisma) => {
          for (const order of updatedOrders) {
            await prisma.order.update({ where: { orderNo: order.orderNo }, data: order });
          }
          for (const orderDetail of updatedOrderDetails) {
            await prisma.orderDetail.update({
              where: {
                orderNo_soRowNo: {
                  orderNo: orderDetail.orderNo,
                  soRowNo: orderDetail.soRowNo
                }
              }, data: orderDetail
            });
          }
        });

        const result = await prisma.order.findMany(
          {
            include: {
              orderDetails: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("受注を削除できる", async () => {
        const expected: Order[] = [];
        await prisma.$transaction(async (prisma) => {
          for (const order of orders) {
            await prisma.orderDetail.deleteMany({
              where: { orderNo: order.orderNo }
            });
            await prisma.order.delete({
              where: { orderNo: order.orderNo }
            });
          }
        });

        const result = await prisma.order.findMany();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Chapter 6 出荷／売上業務のDB設計", () => {
    describe("売上と売上明細", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.employee.deleteMany();
          await prisma.customer.deleteMany();
          await prisma.company.deleteMany();
          await prisma.product.deleteMany();
          await prisma.orderDetail.deleteMany();
          await prisma.order.deleteMany();
          await prisma.salesDetail.deleteMany();
          await prisma.sales.deleteMany();

          await prisma.employee.createMany({ data: employees });
          await prisma.company.createMany({ data: companies });
          await prisma.customer.createMany({ data: customers });
          await prisma.product.createMany({ data: products });
          await prisma.order.createMany({ data: orders });
          await prisma.orderDetail.createMany({ data: orderDetails });
        });
      });

      test("売上を登録できる", async () => {
        const expected: Sales[] = sales.map((s) => {
          return {
            ...s,
            salesDetails: salesDetails.filter((sd) => sd.salesNo === s.salesNo),
          };
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.sales.createMany({ data: sales });
          await prisma.salesDetail.createMany({ data: salesDetails });
        });

        const result = await prisma.sales.findMany(
          {
            include: {
              salesDetails: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("売上を更新できる", async () => {
        const updatedSales: Sales[] = sales.map((s) => { return { ...s, salesAmnt: 1000 }; });
        const updatedSalesDetails: SalesDetail[] = salesDetails.map((sd) => { return { ...sd, quantity: 10 }; });

        const expected: Sales[] = updatedSales.map((s) => {
          return {
            ...s,
            salesDetails: updatedSalesDetails.filter((sd) => sd.salesNo === s.salesNo),
          };
        });
        await prisma.$transaction(async (prisma) => {
          for (const sales of updatedSales) {
            await prisma.sales.update({ where: { salesNo: sales.salesNo }, data: sales });
          }
          for (const salesDetail of updatedSalesDetails) {
            await prisma.salesDetail.update({
              where: {
                salesNo_rowNo: {
                  salesNo: salesDetail.salesNo,
                  rowNo: salesDetail.rowNo
                }
              }, data: salesDetail
            });
          }
        });

        const result = await prisma.sales.findMany(
          {
            include: {
              salesDetails: true,
            }
          }
        );
        expect(result).toEqual(expected);
      });

      test("売上を削除できる", async () => {
        const expected: Sales[] = [];
        await prisma.$transaction(async (prisma) => {
          for (const sale of sales) {
            await prisma.salesDetail.deleteMany({
              where: { salesNo: sale.salesNo }
            });
            await prisma.sales.delete({
              where: { salesNo: sale.salesNo }
            });
          }
        });

        const result = await prisma.sales.findMany();
        expect(result).toEqual(expected);
      });

    });
  });
});
