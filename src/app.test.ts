import {
  PrismaClient,
  dept_mst,
  employee,
  products as product,
  product_category,
  pricebycustomer,
  companys_mst,
  customers_mst,
  destinations_mst,
  area_mst,
  company_group_mst,
  category_type,
  company_category,
  company_category_group,
  supplier_mst,
  orders as order,
  order_details as order_detail,
  wh_mst,
} from "@prisma/client";
import { priceByCustomers } from "../prisma/data/csvReader";

const prisma = new PrismaClient();

describe("Part 1 業務システムの概要とマスタ設計", () => {
  describe("Chapter 1 販売管理システム全体像", () => { });

  describe("Chapter 2 基幹業務システム構築のポイント", () => { });

  describe("Chapter 3 部門／社員／商品マスタ設計", () => {
    describe("部門マスタ", () => {
      beforeAll(async () => {
        await prisma.order_details.deleteMany()
        await prisma.orders.deleteMany()
        await prisma.employee.deleteMany();
        await prisma.dept_mst.deleteMany();
      });

      const departments: dept_mst[] = [
        {
          dept_code: "D0001",
          start_date: new Date("2021-01-01"),
          end_date: new Date("2021-12-31"),
          dep_name: "新規部署",
          dept_layer: 1,
          dept_psth: "D0001",
          bottom_type: 1,
          slit_yn: 0,
          create_date: new Date("2021-01-01"),
          creator: "admin",
          update_date: new Date("2021-01-01"),
          updater: "admin",
        }
      ]

      test("部門を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.dept_mst.createMany({ data: departments });
        });

        const result = await prisma.dept_mst.findMany();

        expect(result).toEqual(departments);
      });

      test("部門を更新できる", async () => {
        const expected: dept_mst[] = departments.map((c) => {
          return {
            ...c,
            dept_code: "D0001",
            start_date: new Date("2021-01-01"),
            end_date: new Date("2021-12-31"),
            dep_name: "新規部署2",
            dept_layer: 2,
            dept_psth: "D0002",
            bottom_type: 2,
            slit_yn: 1,
          };
        });

        await prisma.$transaction(async (prisma) => {
          await prisma.dept_mst.updateMany({
            data: expected[0],
            where: {
              dept_code: "D0001",
            },
          });
        });

        const result = await prisma.dept_mst.findMany();

        expect(result).toEqual(expected);
      });

      test("部門を削除できる", async () => {
        await prisma.dept_mst.deleteMany({
          where: {
            dept_code: "D0001",
          },
        });

        const result = await prisma.dept_mst.findMany();

        expect(result).toEqual([]);
      });


      test("部署階層の検索：部門マスタテーブルから、指定された部署の親部署、子部署、兄弟部署、孫部署など、部署階層に関連する情報を検索する。", async () => {
        const expected = await prisma.$queryRaw`SELECT *
                                   FROM dept_mst
                                   WHERE dept_psth LIKE '10000~11000%'`;
        const result = await prisma.dept_mst.findMany({
          where: {
            dept_psth: {
              contains: "10000~11000",
            },
          },
        });

        expect(result).toEqual(expected);
      });
    });

    describe("社員マスタ", () => {
      beforeAll(async () => {
        await prisma.order_details.deleteMany()
        await prisma.orders.deleteMany()
        await prisma.employee.deleteMany();
        await prisma.dept_mst.deleteMany();
      });

      const departments: dept_mst[] = [
        {
          dept_code: "11101",
          start_date: new Date("2021-01-01"),
          end_date: new Date("2021-12-31"),
          dep_name: "新規部署",
          dept_layer: 1,
          dept_psth: "10000~11000~11100~11101~",
          bottom_type: 1,
          slit_yn: 0,
          create_date: new Date("2021-01-01"),
          creator: "admin",
          update_date: new Date("2021-01-01"),
          updater: "admin",
        }
      ];

      const employees = [
        {
          emp_code: "EMP999",
          emp_name: "伊藤 裕子",
          emp_kana: "イトウ ユウコ",
          login_password: "password",
          tel: "090-1234-5678",
          fax: "03-1234-5678",
          dept_code: "11101",
          start_date: new Date("2021-01-01"),
          occu_code: "",
          approval_code: "",
          create_date: new Date("2021-01-01"),
          creator: "admin",
          update_date: new Date("2021-01-01"),
          updater: "admin",
        }
      ];

      test("従業員を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.dept_mst.createMany({ data: departments });
          await prisma.employee.createMany({ data: employees });
        });

        const result = await prisma.employee.findMany();

        expect(result).toEqual(employees);
      });

      test("従業員を更新できる", async () => {
        const expected: employee[] = employees.map((c) => {
          return {
            ...c,
            emp_code: "EMP999",
            emp_name: "伊藤 裕子",
            emp_kana: "イトウ ユウコ",
            login_password: "password",
            tel: "090-1234-5678",
            fax: "03-1234-5678",
            dept_code: "11101",
            start_date: new Date("2021-01-01"),
            occu_code: "",
            approval_code: "",
          }
        });

        await prisma.employee.updateMany({
          data: expected[0],
          where: {
            emp_code: "EMP999",
          },
        });

        const result = await prisma.employee.findMany();

        expect(result).toEqual(expected);
      });

      test("部署に所属する従業員を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { dept_code: "11101" },
        });
        expect(employees).toHaveLength(1);
      });

      test("従業員の名前を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { emp_name: "伊藤 裕子" },
        });
        expect(employees).toHaveLength(1);
      });

      test("従業員のカナ名を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { emp_kana: "イトウ ユウコ" },
        });
        expect(employees).toHaveLength(1);
      });

      test("従業員を削除できる", async () => {
        await prisma.employee.deleteMany({
          where: {
            emp_code: "EMP999",
          },
        });

        const result = await prisma.employee.findMany();

        expect(result).toEqual([]);
      });
    });

    describe("商品マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.product_category.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.products.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.companys_mst.deleteMany()
        });
      });

      const productCategories = [
        {
          category_code: "00101001",
          prod_cate_name: "牛肉",
          category_layer: 0,
          category_path: "00100000~00101000~00101001",
          lowest_flug: 1,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00101002",
          prod_cate_name: "豚肉",
          category_layer: 0,
          category_path: "00100000~00101000~00101002",
          lowest_flug: 1,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00102001",
          prod_cate_name: "まぐろ",
          category_layer: 0,
          category_path: "00100000~00101000~00101001",
          lowest_flug: 1,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00102002",
          prod_cate_name: "えび",
          category_layer: 0,
          category_path: "00100000~00101000~00101001",
          lowest_flug: 1,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00101000",
          prod_cate_name: "食肉",
          category_layer: 1,
          category_path: "00100000~00101000",
          lowest_flug: 0,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00102000",
          prod_cate_name: "水産物",
          category_layer: 1,
          category_path: "00100000~00102000",
          lowest_flug: 0,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        },
        {
          category_code: "00100000",
          prod_cate_name: "生鮮食品",
          category_layer: 2,
          category_path: "00100000~00102000",
          lowest_flug: 0,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        }
      ]

      const products = [
        {
          prod_code: "1010100X",
          prod_fullname: "商品名",
          prod_name: "商品名",
          prod_kana: "ショウヒンメイ",
          prod_type: "1",
          serial_no: "1234567890",
          unitprice: 1000,
          po_price: 900,
          prime_cost: 500,
          tax_type: 1,
          category_code: "00101001",
          wide_use_type: 1,
          stock_manage_type: 1,
          stock_reserve_type: 1,
          sup_code: "001",
          sup_sub_no: 1,
          create_date: new Date("2021-01-01"),
          creator: "user",
          update_date: new Date("2021-01-01"),
          updater: "user",
        }
      ];

      test("商品を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.product_category.createMany({ data: productCategories });
          await prisma.products.createMany({ data: products });
        });

        const result = await prisma.products.findMany();

        expect(result).toEqual(products);
      });

      test("商品を更新できる", async () => {
        const expected: product[] = products.map((c) => {
          return {
            ...c,
            prod_code: "1010100X",
            prod_fullname: "商品名2",
            prod_name: "商品名2",
            prod_kana: "ショウヒンメイ2",
            prod_type: "2",
            serial_no: "1234567890123",
            unitprice: 1000,
            po_price: 800,
            prime_cost: 500,
            tax_type: 1,
            category_code: "00101001",
            wide_use_type: 1,
            stock_manage_type: 1,
            stock_reserve_type: 1,
            sup_code: "001",
            sup_sub_no: 1,
          }
        });

        await prisma.products.updateMany({
          data: expected[0],
          where: {
            prod_code: "1010100X",
          },
        });

        const result = await prisma.products.findMany();

        expect(result).toEqual(expected);
      });

      test("商品を削除できる", async () => {
        await prisma.products.deleteMany({
          where: {
            prod_code: "1010100X",
          },
        });

        const result = await prisma.products.findMany();

        expect(result).toEqual([]);
      });

      test("商品分類を登録できる", async () => {
        const productCategory = productCategories.map((c) => {
          return {
            ...c,
            category_code: "00200000",
            prod_cate_name: "商品カテゴリー名",
            category_layer: 2,
            category_path: "00100000",
          }
        });
        await prisma.$transaction(async (prisma) => {
          await prisma.product_category.create({
            data: productCategory[0],
          });
        });

        const result = await prisma.product_category.findMany(
          {
            where: {
              category_code: "00200000",
            },
          }
        );

        expect(result[0]).toEqual(productCategory[0]);
      });

      test("商品分類を更新できる", async () => {
        const expected: product_category[] = productCategories.map((c) => {
          return {
            ...c,
            category_code: "0010200X",
            prod_cate_name: "商品カテゴリー名2",
          }
        });

        await prisma.product_category.updateMany({
          data: expected[0],
          where: {
            category_code: "0010200X",
          },
        });

        const result = await prisma.product_category.findMany();
      });

      test("商品分類を削除できる", async () => {
        await prisma.product_category.deleteMany({
          where: {
            category_code: "0010200X",
          },
        });

        const result = await prisma.product_category.findMany(
          {
            where: {
              category_code: "0010200X",
            },
          }
        );

        expect(result).toEqual([]);
      });

      test("顧客別販売単価を登録できる", async () => {
        const day = new Date("2021-01-01");
        const companies: companys_mst[] = [
          {
            comp_code: "00X",
            comp_name: "顧客名1",
            comp_kana: "クスキメイ1",
            sup_type: 0,
            zip_code: "000-0000",
            state: "都道府県",
            address1: "住所1",
            address2: "住所2",
            no_sales_flg: 0,
            wide_use_type: 0,
            comp_group_code: "001",
            max_credit: 10000,
            temp_credit_up: 0,
            create_date: day,
            creator: null,
            update_date: day,
            updater: null
          }
        ]

        const priceByCustomers: pricebycustomer[] = [
          {
            prod_code: "1010100X",
            comp_code: "00X",
            unitprice: 1000,
            create_date: new Date("2021-01-01"),
            creator: "user",
            update_date: new Date("2021-01-01"),
            updater: "user",
          }
        ];

        await prisma.$transaction(async (prisma) => {
          await prisma.companys_mst.createMany({ data: companies });
          await prisma.products.createMany({ data: products });
          await prisma.pricebycustomer.createMany({ data: priceByCustomers });
        });

        const result = await prisma.pricebycustomer.findMany();

        expect(result).toEqual(priceByCustomers);
      });

      test("顧客別販売単価を更新できる", async () => {
        const expected: pricebycustomer[] = priceByCustomers.map((c) => {
          return {
            ...c,
            prod_code: "1010100X",
            comp_code: "00X",
            unitprice: 2000,
          }
        });

        await prisma.pricebycustomer.updateMany({
          data: expected[0],
          where: {
            prod_code: "1010100X",
            comp_code: "00X",
          },
        });

        const result = await prisma.pricebycustomer.findMany();

        expect(result).toEqual(expected);
      });

      test("顧客別販売単価を削除できる", async () => {
        await prisma.pricebycustomer.deleteMany({
          where: {
            prod_code: "1010100X",
            comp_code: "00X",
          },
        });

        const result = await prisma.pricebycustomer.findMany();

        expect(result).toEqual([]);
      });

      test("商品コードの意味付けの例", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "1010100X" },
        });
        expect(product?.category_code).toBe("00101001");
        //商品コードの先頭1桁目は事業（01:生鮮食料品 02:缶詰...)
        expect(product?.prod_code.slice(0, 1)).toBe("1");
        //商品コードの先頭2-3桁目は品目（01:食肉 02:水産物...)
        expect(product?.prod_code.slice(1, 3)).toBe("01");
        expect(product?.category_code?.slice(3, 5)).toBe(
          product?.prod_code.slice(1, 3),
        );
        //商品コードの先頭4-5桁目は畜種（01:牛肉 02:豚肉 03:まぐろ 04:えび...)
        expect(product?.prod_code.slice(3, 5)).toBe("01");
        expect(product?.category_code?.slice(6, 8)).toBe(
          product?.prod_code.slice(3, 5),
        );
        //商品コードの先頭6-8桁目は連番
        expect(product?.prod_code.slice(5, 8)).toBe("00X");
      });

      test("商品分類の階層構造", async () => {
        const productCategory = await prisma.product_category.findUnique({
          where: { category_code: "00101001" },
        });
        const categoryPath = productCategory?.category_path?.split("~");

        const topCategory = await prisma.product_category.findUnique({
          where: { category_code: categoryPath?.[0] },
        });
        const middleCategory = await prisma.product_category.findUnique({
          where: { category_code: categoryPath?.[1] },
        });

        expect(topCategory?.prod_cate_name).toBe("生鮮食品");
        expect(middleCategory?.prod_cate_name).toBe("食肉");
        expect(productCategory?.prod_cate_name).toBe("牛肉");
      });

      test("製品（メーカー）型番", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "1010100X" },
        });
        expect(product?.serial_no).toBe("1234567890");
      });

      test("顧客商品コード対応", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "1010100X" },
        });
        expect(product?.sup_code).toBe("001");
        expect(product?.sup_sub_no).toBe(1);
      });

      test("販売単価と仕入単価", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "1010100X" },
        });
        expect(product?.unitprice).toBe(1000);
        expect(product?.po_price).toBe(900);
      });

      describe("売上原価", () => {
        test("売上原価", async () => {
          const product = await prisma.products.findUnique({
            where: { prod_code: "1010100X" },
          });
          expect(product?.prime_cost).toBe(500);
        });
        /*
         商品Aの仕入単価が変動した場合の在庫金額は？
         |     | 仕入数量 | 仕入単価 | 販売数量 | 在庫数量 | 在庫金額 | 在庫単価 |
         | --- | ---     | ---    | ---     | ---    | ---     | --- |
         | 10月 | 100    | 6000   |   0     | 100     | 600000 | 6000 |
         | 11月 | 100    | 5000   | 150     |  50     | ?       | ?    |
        */
        test("先例先出し法：販売時に、先に入れた商品からはけるものとして残った在庫を評価。", async () => {
          const 売上原価 = 6000 * 150;
          const 在庫金額 = 5000 * 50;
          const 在庫単価 = 在庫金額 / 50;

          expect(売上原価).toBe(900000);
          expect(在庫金額).toBe(250000);
          expect(在庫単価).toBe(5000);
        });

        test("後入れ先出し法：販売時に、後で仕入れた商品からはけるものとして残った在庫を評価。", async () => {
          const 売上原価 = 5000 * 50 + 6000 * 100;
          const 在庫金額 = 6000 * 50;
          const 在庫単価 = 在庫金額 / 50;

          expect(売上原価).toBe(850000);
          expect(在庫金額).toBe(300000);
          expect(在庫単価).toBe(6000);
        });

        test("総平均法：期全体での平均値（仕入金額合計 ÷ 仕入数量合計）を在庫単価とする。", async () => {
          const 平均値 = (6000 * 100 + 5000 * 100) / (100 + 100);
          const 売上原価 = 平均値 * 150;
          const 在庫金額 = 平均値 * 50;
          const 在庫単価 = 平均値;

          expect(売上原価).toBe(825000);
          expect(在庫金額).toBe(275000);
          expect(在庫単価).toBe(5500);
        });

        test("移動平均法：仕入の都度、それまでの取得金額と今回仕入で平均計算する。", async () => {
          const 平均値 = (6000 * 100 + 5000 * 100) / (100 + 100);
          const 売上原価 = 平均値 * 150;
          const 在庫金額 = 平均値 * 50;
          const 在庫単価 = 平均値;

          expect(売上原価).toBe(825000);
          expect(在庫金額).toBe(275000);
          expect(在庫単価).toBe(5500);
        });

        test("最終仕入原価法：最後に仕入れた仕入単価を在庫単価とする。", async () => {
          const 最後に仕入れた価格 = 5000;
          const 売上原価 = 最後に仕入れた価格 * 150;
          const 在庫金額 = 最後に仕入れた価格 * 50;
          const 在庫単価 = 最後に仕入れた価格;

          expect(売上原価).toBe(750000);
          expect(在庫金額).toBe(250000);
          expect(在庫単価).toBe(5000);
        });

        test("売価還元法：販売価格に原価率を金額を在庫単価とする。", async () => {
          const 原価率 = 0.5;
          const 在庫単価 = 12000 * 原価率;
          const 売上原価 = 在庫単価 * 150;
          const 在庫金額 = 在庫単価 * 50;

          expect(売上原価).toBe(900000);
          expect(在庫金額).toBe(300000);
          expect(在庫単価).toBe(6000);
        });
      });

      describe("税区分", () => {
        test("税区分", async () => {
          const product = await prisma.products.findUnique({
            where: { prod_code: "1010100X" },
          });
          expect(product?.tax_type).toBe(1);
        });

        test("外税", async () => {
          const 税率 = 0.08;
          const 売上 = 100000;
          const 消費税 = 売上 * 税率;

          expect(消費税).toBe(8000);
        });

        test("内税", async () => {
          const 税率 = 0.08;
          const 売上 = 100000;
          const 消費税 = Math.floor(売上 * 税率 * (1 / (1 + 税率)));

          expect(売上 - 消費税).toBe(92593);
          expect(消費税).toBe(7407);
        });

        test("非課税", async () => {
          const 税率 = 0.08;
          const 売上 = 100000;
          const 消費税 = 0;

          expect(消費税).toBe(0);
        });
      });

    });
  });

  describe("Chapter 4 取引先(顧客／仕入先)マスタの設計", () => {
    describe("取引先マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.credit_balance.deleteMany()
          await prisma.companys_mst.deleteMany()
        });
      });

      const day = new Date("2021-01-01");
      const company: companys_mst[] = [{
        comp_code: "00X",
        comp_name: "顧客名1",
        comp_kana: "クスキメイ1",
        sup_type: 0,
        zip_code: "000-0000",
        state: "都道府県",
        address1: "住所1",
        address2: "住所2",
        no_sales_flg: 0,
        wide_use_type: 0,
        comp_group_code: "001",
        max_credit: 10000,
        temp_credit_up: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      test("取引先を登録できる", async () => {
        await prisma.companys_mst.create({ data: company[0] });

        const result = await prisma.companys_mst.findMany(
          { where: { comp_code: company[0].comp_code } }
        );

        expect(result).toStrictEqual(company);
      });

      test("取引先を更新できる", async () => {
        const newCompany: companys_mst = {
          comp_code: "00X",
          comp_name: "顧客名2",
          comp_kana: "クスキメイ2",
          sup_type: 0,
          zip_code: "000-0000",
          state: "都道府県",
          address1: "住所1",
          address2: "住所2",
          no_sales_flg: 0,
          wide_use_type: 0,
          comp_group_code: "001",
          max_credit: 10000,
          temp_credit_up: 0,
          create_date: day,
          creator: null,
          update_date: day,
          updater: null
        }
        await prisma.companys_mst.update({
          where: { comp_code: newCompany.comp_code },
          data: newCompany
        });

        const result = await prisma.companys_mst.findMany(
          { where: { comp_code: newCompany.comp_code } }
        );

        expect(result).toStrictEqual([newCompany]);
      });

      test("取引先を削除できる", async () => {
        await prisma.companys_mst.delete({
          where: { comp_code: company[0].comp_code }
        });

        const result = await prisma.companys_mst.findMany(
          { where: { comp_code: company[0].comp_code } }
        );

        expect(result).toStrictEqual([]);
      });
    });

    describe("顧客マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.area_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.credit_balance.deleteMany()
          await prisma.companys_mst.deleteMany()
        });
      });

      const day = new Date("2021-01-01");
      const company: companys_mst[] = [{
        comp_code: "00X",
        comp_name: "顧客名1",
        comp_kana: "クスキメイ1",
        sup_type: 0,
        zip_code: "000-0000",
        state: "都道府県",
        address1: "住所1",
        address2: "住所2",
        no_sales_flg: 0,
        wide_use_type: 0,
        comp_group_code: "001",
        max_credit: 10000,
        temp_credit_up: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const customer: customers_mst[] = [{
        cust_code: "00X",
        cust_sub_no: 1,
        cust_type: 0,
        ar_code: "001",
        ar_sub_no: 1,
        payer_code: "001",
        payer_sub_no: 1,
        cust_name: "顧客名1",
        cust_kana: "クスキメイ1",
        emp_code: "001",
        cust_user_name: "顧客担当者名1",
        cust_user_dep_name: "顧客担当者部署名1",
        cust_zip_code: "000-0000",
        cust_state: "都道府県",
        cust_address1: "住所1",
        cust_address2: "住所2",
        cust_tel: "000-0000-0000",
        cust_fax: "000-0000-0000",
        cust_email: "hoge@hoge.com",
        cust_ar_flag: 0,
        cust_close_date1: 1,
        cust_pay_months1: 0,
        cust_pay_dates1: 1,
        cust_pay_method1: 0,
        cust_pay_dates2: 1,
        cust_pay_method2: 0,
        cust_close_date2: 1,
        cust_pay_months2: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const areas: area_mst[] = [{
        area_code: "00X",
        area_name: "エリア名1",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const destinations: destinations_mst[] = [{
        comp_code: "00X",
        comp_sub_no: 1,
        dist_no: 1,
        dist_name: "配送先名1",
        area_code: "00X",
        zip_code: "000-0000",
        address1: "住所1",
        address2: "住所2",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      test("顧客を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.companys_mst.create({ data: company[0] });
          await prisma.customers_mst.create({ data: customer[0] });
        });

        const result = await prisma.customers_mst.findUnique({
          where: {
            cust_code_cust_sub_no: {
              cust_code: "00X",
              cust_sub_no: 1,
            },
          },
        });

        expect(result).toStrictEqual(customer[0]);
      });

      test("顧客を更新できる", async () => {
        const expected: customers_mst[] = customer.map((c) => {
          return {
            ...c,
            cust_name: "顧客名2",
            cust_kana: "クスキメイ2",
            cust_user_name: "顧客担当者名2",
            cust_user_dep_name: "顧客担当者部署名2",
            cust_zip_code: "000-0000",
            cust_state: "都道府県",
            cust_address1: "住所1",
            cust_address2: "住所2",
            cust_tel: "000-0000-0000",
            cust_fax: "000-0000-0000",
            cust_email: "hoge@hoge",
          };
        });

        await prisma.customers_mst.update({
          data: expected[0],
          where: {
            cust_code_cust_sub_no: {
              cust_code: expected[0].cust_code,
              cust_sub_no: expected[0].cust_sub_no,
            },
          },
        });

        const result = await prisma.customers_mst.findUnique({
          where: {
            cust_code_cust_sub_no: {
              cust_code: expected[0].cust_code,
              cust_sub_no: expected[0].cust_sub_no,
            },
          },
        });

        expect(result).toStrictEqual(expected[0]);
      });

      test("顧客を削除できる", async () => {
        await prisma.customers_mst.delete({
          where: {
            cust_code_cust_sub_no: {
              cust_code: "00X",
              cust_sub_no: 1,
            },
          },
        });

        const result = await prisma.customers_mst.findUnique({
          where: {
            cust_code_cust_sub_no: {
              cust_code: "00X",
              cust_sub_no: 1,
            },
          },
        });

        expect(result).toBeNull();
      });

      test("出荷先を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.customers_mst.create({ data: customer[0] });
          await prisma.area_mst.create({ data: areas[0] });
          await prisma.destinations_mst.create({ data: destinations[0] });
        });

        const result = await prisma.destinations_mst.findUnique({
          where: {
            comp_code_dist_no_comp_sub_no: {
              comp_code: "00X",
              dist_no: 1,
              comp_sub_no: 1,
            },
          },
        });

        expect(result).toStrictEqual(destinations[0]);
      });

      test("出荷先を更新できる", async () => {
        const expected: destinations_mst[] = destinations.map((d) => {
          return {
            ...d,
            dist_name: "配送先名2",
            area_code: "00X",
            zip_code: "000-0000",
            address1: "住所1",
            address2: "住所2",
          };
        });

        await prisma.destinations_mst.update({
          data: expected[0],
          where: {
            comp_code_dist_no_comp_sub_no: {
              comp_code: expected[0].comp_code,
              dist_no: expected[0].dist_no,
              comp_sub_no: expected[0].comp_sub_no,
            },
          },
        });

        const result = await prisma.destinations_mst.findUnique({
          where: {
            comp_code_dist_no_comp_sub_no: {
              comp_code: expected[0].comp_code,
              dist_no: expected[0].dist_no,
              comp_sub_no: expected[0].comp_sub_no,
            },
          },
        });

        expect(result).toStrictEqual(expected[0]);
      });

      test("出荷先を削除できる", async () => {
        await prisma.destinations_mst.delete({
          where: {
            comp_code_dist_no_comp_sub_no: {
              comp_code: "00X",
              dist_no: 1,
              comp_sub_no: 1,
            },
          },
        });

        const result = await prisma.destinations_mst.findUnique({
          where: {
            comp_code_dist_no_comp_sub_no: {
              comp_code: "00X",
              dist_no: 1,
              comp_sub_no: 1,
            },
          },
        });

        expect(result).toBeNull();
      });
    });

    describe("取引先グループマスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.area_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.credit_balance.deleteMany()
          await prisma.companys_mst.deleteMany()
          await prisma.company_group_mst.deleteMany()
        });
      });

      const day = new Date("2021-01-01");
      const company: companys_mst[] = [{
        comp_code: "00X",
        comp_name: "顧客名1",
        comp_kana: "クスキメイ1",
        sup_type: 0,
        zip_code: "000-0000",
        state: "都道府県",
        address1: "住所1",
        address2: "住所2",
        no_sales_flg: 0,
        wide_use_type: 0,
        comp_group_code: "001",
        max_credit: 10000,
        temp_credit_up: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const comapnyGroups: company_group_mst[] = [{
        comp_group_code: "001",
        group_name: "グループ名1",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      test("取引先グループを登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.company_group_mst.create({ data: comapnyGroups[0] });
          await prisma.companys_mst.create({ data: company[0] });
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
        });

        expect(result?.comp_group_code).toStrictEqual(comapnyGroups[0].comp_group_code);
      });

      test("取引先グループを更新できる", async () => {
        const expected: companys_mst[] = company.map((c) => {
          return {
            ...c,
            comp_group_code: "002",
          };
        });

        await prisma.companys_mst.update({
          data: expected[0],
          where: {
            comp_code: expected[0].comp_code,
          },
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: expected[0].comp_code,
          },
        });

        expect(result?.comp_group_code).toStrictEqual(expected[0].comp_group_code);
      });

      test("取引先グループを削除できる", async () => {
        await prisma.companys_mst.delete({
          where: {
            comp_code: company[0].comp_code,
          },
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
        });

        expect(result).toBeNull();
      });

    });

    describe("取引先分類マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.area_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.credit_balance.deleteMany()
          await prisma.companys_mst.deleteMany()
          await prisma.company_group_mst.deleteMany()
          await prisma.company_category.deleteMany()
          await prisma.category_type.deleteMany()
        });
      });

      const day = new Date("2021-01-01");
      const company: companys_mst[] = [{
        comp_code: "00X",
        comp_name: "顧客名1",
        comp_kana: "クスキメイ1",
        sup_type: 0,
        zip_code: "000-0000",
        state: "都道府県",
        address1: "住所1",
        address2: "住所2",
        no_sales_flg: 0,
        wide_use_type: 0,
        comp_group_code: "001",
        max_credit: 10000,
        temp_credit_up: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const cateoryTypes: category_type[] = [{
        category_type_code: "01",
        cate_type_name: "分類名1",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const companyCategories: company_category[] = [{
        category_type: "01",
        comp_cate_code: "001",
        comp_cate_name: "分類名1",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      const companyCategoryGroups: company_category_group[] = [{
        category_type: "01",
        comp_cate_code: "001",
        comp_code: "00X",
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      test("取引先分類を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.companys_mst.create({ data: company[0] });
          await prisma.category_type.create({ data: cateoryTypes[0] });
          await prisma.company_category.create({ data: companyCategories[0] });
          await prisma.company_category_group.create({ data: companyCategoryGroups[0] });
        });

        const result1 = await prisma.category_type.findUnique({
          where: {
            category_type_code: cateoryTypes[0].category_type_code,
          },
          include: {
            company_category_company_category_category_typeTocategory_type: true,
          },
        });
        const result2 = await prisma.company_category.findUnique({
          where: {
            comp_cate_code_category_type: {
              category_type: companyCategories[0].category_type,
              comp_cate_code: companyCategories[0].comp_cate_code,
            },
          },
          include: {
            company_category_group: true,
          },
        });
        const result3 = await prisma.company_category_group.findUnique({
          where: {
            category_type_comp_code_comp_cate_code: {
              category_type: companyCategoryGroups[0].category_type,
              comp_cate_code: companyCategoryGroups[0].comp_cate_code,
              comp_code: companyCategoryGroups[0].comp_code,
            },
          },
          include: {
            company_category: true,
          },
        });
        const result4 = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
          include: {
            company_category_group: true,
          },
        });

        expect(result1?.cate_type_name).toStrictEqual(cateoryTypes[0].cate_type_name);
        expect(result1?.company_category_company_category_category_typeTocategory_type).toStrictEqual(companyCategories);
        expect(result2?.comp_cate_name).toStrictEqual(companyCategories[0].comp_cate_name);
        expect(result2?.company_category_group).toStrictEqual(companyCategoryGroups);
        expect(result3?.comp_code).toStrictEqual(companyCategoryGroups[0].comp_code);
        expect(result3?.company_category).toStrictEqual(companyCategories[0]);
        expect(result4?.comp_group_code).toStrictEqual(company[0].comp_group_code);
        expect(result4?.company_category_group).toStrictEqual(companyCategoryGroups);
      });
    });

    describe("仕入先マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.order_details.deleteMany()
          await prisma.orders.deleteMany()
          await prisma.destinations_mst.deleteMany()
          await prisma.area_mst.deleteMany()
          await prisma.customers_mst.deleteMany()
          await prisma.supplier_mst.deleteMany()
          await prisma.company_category_group.deleteMany()
          await prisma.pricebycustomer.deleteMany()
          await prisma.credit_balance.deleteMany()
          await prisma.companys_mst.deleteMany()
          await prisma.company_group_mst.deleteMany()
          await prisma.company_category.deleteMany()
          await prisma.category_type.deleteMany()
        });
      });

      const day = new Date("2021-01-01");
      const company: companys_mst[] = [{
        comp_code: "00X",
        comp_name: "顧客名1",
        comp_kana: "クスキメイ1",
        sup_type: 0,
        zip_code: "000-0000",
        state: "都道府県",
        address1: "住所1",
        address2: "住所2",
        no_sales_flg: 0,
        wide_use_type: 0,
        comp_group_code: "001",
        max_credit: 10000,
        temp_credit_up: 0,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]
      const suppliers: supplier_mst[] = [{
        sup_code: "00X",
        sup_sub_no: 1,
        sup_name: "仕入先名1",
        sup_kana: "シスキメイ1",
        sup_emp_name: "担当者名1",
        sup_dep_name: "部署名1",
        sup_zip_code: "000-0000",
        sup_state: "都道府県",
        sup_address1: "住所1",
        sup_address2: "住所2",
        sup_tel: "000-0000-0000",
        sup_fax: "000-0000-0000",
        sup_email: "hoge@hoegc.com",
        sup_close_date: 1,
        sup_pay_months: 1,
        sup_pay_dates: 1,
        pay_method_type: 1,
        create_date: day,
        creator: null,
        update_date: day,
        updater: null
      }]

      test("仕入先を登録できる", async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.companys_mst.create({ data: company[0] });
          await prisma.supplier_mst.create({ data: suppliers[0] });
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
          include: {
            supplier_mst: true,
          },
        });

        expect(result?.comp_name).toStrictEqual(company[0].comp_name);
        expect(result?.supplier_mst).toStrictEqual(suppliers);
      });

      test("仕入先を更新できる", async () => {
        const expected: supplier_mst[] = suppliers.map((c) => {
          return {
            ...c,
            sup_code: "00X",
            sup_sub_no: 1,
            sup_name: "仕入先名1",
            sup_kana: "シスキメイ1",
            sup_emp_name: "担当者名1",
            sup_dep_name: "部署名1",
            sup_zip_code: "000-0000",
            sup_state: "都道府県",
            sup_address1: "住所1",
            sup_address2: "住所2",
            sup_tel: "000-0000-0000",
            sup_fax: "000-0000-0000",
            sup_email: "hoge@hoegc.com",
          };
        });

        await prisma.supplier_mst.update({
          data: expected[0],
          where: {
            sup_code_sup_sub_no: {
              sup_code: expected[0].sup_code,
              sup_sub_no: expected[0].sup_sub_no,
            },
          },
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
          include: {
            supplier_mst: true,
          },
        });

        expect(result?.supplier_mst).toStrictEqual(expected);
      });

      test("仕入先を削除できる", async () => {
        await prisma.supplier_mst.delete({
          where: {
            sup_code_sup_sub_no: {
              sup_code: suppliers[0].sup_code,
              sup_sub_no: suppliers[0].sup_sub_no,
            },
          },
        });

        const result = await prisma.companys_mst.findUnique({
          where: {
            comp_code: company[0].comp_code,
          },
          include: {
            supplier_mst: true,
          },
        });

        expect(result?.supplier_mst).toStrictEqual([]);
      });

    });
  });
});

describe("Part 2 販売システムのDB設計", () => {
  describe("Chapter 5 受注業務のDB設計", () => {
    beforeAll(async () => {
      await prisma.order_details.deleteMany({});
      await prisma.orders.deleteMany({});
      await prisma.wh_mst.deleteMany({});
      await prisma.customers_mst.deleteMany({});
      await prisma.companys_mst.deleteMany({});
      await prisma.employee.deleteMany({});
      await prisma.dept_mst.deleteMany({});
    });

    const departments: dept_mst[] = [
      {
        dept_code: "11101",
        start_date: new Date("2021-01-01"),
        end_date: new Date("2021-12-31"),
        dep_name: "新規部署",
        dept_layer: 1,
        dept_psth: "10000~11000~11100~11101~",
        bottom_type: 1,
        slit_yn: 0,
        create_date: new Date("2021-01-01"),
        creator: "admin",
        update_date: new Date("2021-01-01"),
        updater: "admin",
      }
    ];
    const employees = [
      {
        emp_code: "EMP999",
        emp_name: "伊藤 裕子",
        emp_kana: "イトウ ユウコ",
        login_password: "password",
        tel: "090-1234-5678",
        fax: "03-1234-5678",
        dept_code: "11101",
        start_date: new Date("2021-01-01"),
        occu_code: "",
        approval_code: "",
        create_date: new Date("2021-01-01"),
        creator: "admin",
        update_date: new Date("2021-01-01"),
        updater: "admin",
      }
    ];

    const day = new Date("2021-01-01");
    const company: companys_mst[] = [{
      comp_code: "00X",
      comp_name: "顧客名1",
      comp_kana: "クスキメイ1",
      sup_type: 0,
      zip_code: "000-0000",
      state: "都道府県",
      address1: "住所1",
      address2: "住所2",
      no_sales_flg: 0,
      wide_use_type: 0,
      comp_group_code: "001",
      max_credit: 10000,
      temp_credit_up: 0,
      create_date: day,
      creator: null,
      update_date: day,
      updater: null
    }]
    const customer: customers_mst[] = [{
      cust_code: "00X",
      cust_sub_no: 1,
      cust_type: 0,
      ar_code: "001",
      ar_sub_no: 1,
      payer_code: "001",
      payer_sub_no: 1,
      cust_name: "顧客名1",
      cust_kana: "クスキメイ1",
      emp_code: "001",
      cust_user_name: "顧客担当者名1",
      cust_user_dep_name: "顧客担当者部署名1",
      cust_zip_code: "000-0000",
      cust_state: "都道府県",
      cust_address1: "住所1",
      cust_address2: "住所2",
      cust_tel: "000-0000-0000",
      cust_fax: "000-0000-0000",
      cust_email: "hoge@hoge.com",
      cust_ar_flag: 0,
      cust_close_date1: 1,
      cust_pay_months1: 0,
      cust_pay_dates1: 1,
      cust_pay_method1: 0,
      cust_pay_dates2: 1,
      cust_pay_method2: 0,
      cust_close_date2: 1,
      cust_pay_months2: 0,
      create_date: day,
      creator: null,
      update_date: day,
      updater: null
    }]

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

    const orders: order[] = [{
      order_no: "0000000001",
      order_date: new Date(),
      dept_code: "11101",
      start_date: new Date("2021-01-01"),
      cust_code: "00X",
      cust_sub_no: 1,
      emp_code: "EMP999",
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

    const orderDetails: order_detail[] = [{
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

    test("受注を登録できる", async () => {
      await prisma.$transaction(async (prisma) => {
        await prisma.dept_mst.createMany({ data: departments });
        await prisma.employee.createMany({ data: employees });
        await prisma.companys_mst.createMany({ data: company });
        await prisma.customers_mst.createMany({ data: customer });
        await prisma.wh_mst.createMany({ data: wharehouses });
        await prisma.orders.createMany({ data: orders });
        await prisma.order_details.createMany({ data: orderDetails });
      })
      const expected = { ...orders[0], order_details: orderDetails };

      const result = await prisma.orders.findUnique({
        where: {
          order_no: orders[0].order_no
        },
        include: {
          order_details: true
        }
      });

      expect(result).toEqual(expected);
    });

    test("受注を更新できる", async () => {
      const order: order = { ...orders[0], order_amnt: 2000 };
      const expected = {
        ...order,
        order_details: orderDetails.map((orderDetail) => {
          return {
            ...orderDetail,
            order_no: order.order_no, quantity: 20
          }
        })
      };
      const { order_details, ...expectedWithoutOrderDetails } = expected;
      await prisma.$transaction(async (prisma) => {
        for (const orderDetail of expected.order_details) {
          await prisma.order_details.update({
            where: {
              order_no_so_row_no: {
                order_no: order.order_no,
                so_row_no: orderDetail.so_row_no
              }
            },
            data: orderDetail
          });
        }

        await prisma.orders.update({
          where: {
            order_no: expected.order_no
          },
          data: expectedWithoutOrderDetails
        });
      });

      const result = await prisma.orders.findUnique({
        where: {
          order_no: expected.order_no
        },
        include: {
          order_details: true
        }
      });

      expect(result).toEqual(expected);
      expect(result?.order_details).toEqual(expected.order_details);
    });

    test("受注を削除できる", async () => {
      await prisma.$transaction(async (prisma) => {
        await prisma.order_details.deleteMany({
          where: {
            order_no: orders[0].order_no
          }
        });
        await prisma.orders.delete({
          where: {
            order_no: orders[0].order_no
          }
        });
      });

      const result = await prisma.orders.findMany({
        where: {
          order_no: orders[0].order_no
        }
      });

      expect(result).toEqual([]);
    });
  });
});
