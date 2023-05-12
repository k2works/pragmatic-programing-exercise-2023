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
} from "@prisma/client";
import { kMaxLength } from "buffer";
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
});
