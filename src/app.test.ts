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
} from "@prisma/client";
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
} from "../prisma/data/csvReader";

const prisma = new PrismaClient();

describe("Part 1 業務システムの概要とマスタ設計", () => {
  describe("Chapter 1 販売管理システム全体像", () => { });

  describe("Chapter 2 基幹業務システム構築のポイント", () => { });

  describe("Chapter 3 部門／社員／商品マスタ設計", () => {
    describe("部門マスタ", () => {
      beforeAll(async () => {
        await prisma.employee.deleteMany();
        await prisma.dept_mst.deleteMany();
        await prisma.dept_mst.createMany({
          data: departments,
        });
        await prisma.employee.createMany({
          data: employees,
        });
      });

      const createDepartment = async () => {
        const expected: dept_mst = {
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
        };
        await prisma.dept_mst.create({
          data: expected,
        });
        return expected;
      };

      const deleteDepartment = async () => {
        await prisma.employee.deleteMany();
        await prisma.dept_mst.deleteMany();
      };

      describe("部門情報の追加・変更・削除", () => {
        test("部署情報の検索：部署コード、開始日時、終了日時、部署名、階層、親部署、末端タイプなどの条件で、部門マスタテーブルから部署情報を検索する。", async () => {
          const exepcted = await prisma.$queryRaw`SELECT *
                                                  FROM dept_mst`;
          const departments = await prisma.dept_mst.findMany();
          const result: dept_mst[] = departments.map((dept) => {
            return {
              ...dept,
            };
          });
          expect(result).toEqual(exepcted);
        });

        test("部署情報の追加：新しい部署情報を部門マスタテーブルに追加する。", async () => {
          const expected: dept_mst = await createDepartment();

          const result = await prisma.dept_mst.findUnique({
            where: {
              dept_code_start_date: {
                dept_code: "D0001",
                start_date: new Date("2021-01-01"),
              },
            },
          });
          expect(result).toEqual(expected);
        });

        test("部署情報の更新：部門マスタテーブルの部署情報を更新する。部署コード、開始日時、終了日時、部署名、階層、親部署、末端タイプなどの情報を更新できる。", async () => {
          await deleteDepartment();
          await createDepartment();

          const expected: dept_mst = {
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
          };

          await prisma.dept_mst.update({
            where: {
              dept_code_start_date: {
                dept_code: "D0001",
                start_date: new Date("2021-01-01"),
              },
            },
            data: expected,
          });

          const result = await prisma.dept_mst.findUnique({
            where: {
              dept_code_start_date: {
                dept_code: "D0001",
                start_date: new Date("2021-01-01"),
              },
            },
          });
          expect(result).toEqual(expected);
        });

        test("部署情報の削除：部門マスタテーブルから部署情報を削除する。", async () => {
          await deleteDepartment();
          await createDepartment();

          const expected = 0;
          await prisma.dept_mst.deleteMany({
            where: {
              dept_code: "D0001",
              start_date: new Date("2021-01-01"),
            },
          });

          const result = await prisma.dept_mst.count({
            where: {
              dept_code: "D0001",
              start_date: new Date("2021-01-01"),
            },
          });
          expect(result).toEqual(expected);
        });

        test("部署の下位部署の一括更新：指定された部署の下位部署の情報をまとめて更新する。下位部署の末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => { });
        test("部署の上位部署の一括更新：指定された部署の上位部署の情報をまとめて更新する。上位部署の末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => { });
        test("部署コードの一括更新：指定された部署コードを持つ部署の情報をまとめて更新する。末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => { });
      });
      describe("部門情報を参照して、それぞれの部門が所属する上位部門や下位部門を把握する", () => {
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
      describe("部門情報を参照して、その部門が所属する部門階層を把握する", () => { });
      describe("部門情報を参照して、その部門が所属する部門階層の中での位置を把握する", () => { });
      describe("部門情報を参照して、その部門に所属する従業員の情報を取得する", () => { });
      describe("部門情報を参照して、その部門に所属する従業員の業績を分析する", () => { });
      describe("部門情報を参照して、その部門の売上や利益などの業績を分析する", () => { });
      describe("部門情報を参照して、その部門に関する予算や財務情報を分析する", () => { });
      describe("部門情報を参照して、その部門に対する人事施策を考える", () => { });
      describe("部門情報を参照して、その部門の戦略・経営計画を策定するための情報収集を行う。", () => { });
    });

    describe("社員マスタ", () => {
      beforeAll(async () => {
        await prisma.employee.deleteMany();
        await prisma.dept_mst.deleteMany();
        await prisma.dept_mst.createMany({
          data: departments,
        });
        await prisma.employee.createMany({
          data: employees,
        });
      });

      test("従業員を検索する", async () => {
        const employees = await prisma.employee.findMany();
        expect(employees).toHaveLength(37);
      });

      test("従業員を追加する", async () => {
        const employee: employee = await prisma.employee.create({
          data: {
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
          },
        });
        expect(employee.emp_name).toBe("伊藤 裕子");
      });

      test("従業員を更新する", async () => {
        const updatedEmployee = await prisma.employee.update({
          where: { emp_code: "EMP013" },
          data: { emp_name: "伊藤 由紀子" },
        });
        expect(updatedEmployee.emp_name).toBe("伊藤 由紀子");
      });

      test("従業員を削除する", async () => {
        const deletedEmployee = await prisma.employee.delete({
          where: { emp_code: "EMP013" },
        });
        expect(deletedEmployee.emp_code).toBe("EMP013");
      });

      test("部署に所属する従業員を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { dept_code: "11101" },
        });
        expect(employees).toHaveLength(11);
      });

      test("従業員の名前を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { emp_name: "山田 太郎" },
        });
        expect(employees).toHaveLength(6);
      });

      test("従業員のカナ名を検索する", async () => {
        const employees = await prisma.employee.findMany({
          where: { emp_kana: "ヤマダ タロウ" },
        });
        expect(employees).toHaveLength(5);
      });
    });

    describe("商品マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.product_category.deleteMany(),
            await prisma.product_category.createMany({
              data: productCategories,
            }),
            await prisma.pricebycustomer.deleteMany(),
            await prisma.products.deleteMany(),
            await prisma.products.createMany({ data: products }),
            await prisma.destinations_mst.deleteMany(),
            await prisma.customers_mst.deleteMany(),
            await prisma.supplier_mst.deleteMany(),
            await prisma.company_category_group.deleteMany(),
            await prisma.companys_mst.deleteMany(),
            await prisma.companys_mst.createMany({ data: companys }),
            await prisma.pricebycustomer.createMany({ data: priceByCustomers });
        });
      });

      test("商品コードの意味付けの例", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "10101001" },
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
        expect(product?.prod_code.slice(5, 8)).toBe("001");
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
          where: { prod_code: "10101001" },
        });
        expect(product?.serial_no).toBe("1234567890");
      });

      test("顧客商品コード対応", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "10101001" },
        });
        expect(product?.sup_code).toBe("001");
        expect(product?.sup_sub_no).toBe(0);
      });

      test("販売単価と仕入単価", async () => {
        const product = await prisma.products.findUnique({
          where: { prod_code: "10101001" },
        });
        expect(product?.unitprice).toBe(1000);
        expect(product?.po_price).toBe(900);
      });

      describe("売上原価", () => {
        test("売上原価", async () => {
          const product = await prisma.products.findUnique({
            where: { prod_code: "10101001" },
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
            where: { prod_code: "10101001" },
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

      describe("商品テーブル", () => {
        test("全ての商品が正常に取得できる", async () => {
          const expected: product[] = await prisma.$queryRaw`SELECT *
                                                             FROM products`;
          const result = await prisma.products.findMany();

          expect(result).toEqual(expected);
        });

        test("特定の商品が正常に取得できる", async () => {
          const prod_code = "10101001";
          const expected: product[] = await prisma.$queryRaw`SELECT *
                                                             FROM products
                                                             WHERE prod_code = ${prod_code}`;
          const result = await prisma.products.findUnique({
            where: { prod_code: prod_code },
          });

          expect(result).toEqual(expected[0]);
        });

        test("新しい商品を追加できる", async () => {
          const expected: product[] = [
            {
              prod_code: "10101004",
              prod_fullname: "商品名",
              prod_name: "商品名",
              prod_kana: "ショウヒンメイ",
              prod_type: "1",
              serial_no: "1234567890123",
              unitprice: 1000,
              po_price: 800,
              prime_cost: 500,
              tax_type: 1,
              category_code: "00101001",
              wide_use_type: 1,
              stock_manage_type: 1,
              stock_reserve_type: 1,
              sup_code: "00101001",
              sup_sub_no: 1,
              create_date: new Date("2021-01-01"),
              creator: "user",
              update_date: new Date("2021-01-01"),
              updater: "user",
            },
          ];
          await prisma.products.createMany({
            data: expected,
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: expected[0].prod_code },
          });

          expect(result).toEqual(expected[0]);
        });

        test("商品の情報を正常に更新できる", async () => {
          const product: product[] = [
            {
              prod_code: "10101005",
              prod_fullname: "商品名",
              prod_name: "商品名",
              prod_kana: "ショウヒンメイ",
              prod_type: "1",
              serial_no: "1234567890123",
              unitprice: 1000,
              po_price: 800,
              prime_cost: 500,
              tax_type: 1,
              category_code: "00101001",
              wide_use_type: 1,
              stock_manage_type: 1,
              stock_reserve_type: 1,
              sup_code: "00101001",
              sup_sub_no: 1,
              create_date: new Date("2021-01-01"),
              creator: "user",
              update_date: new Date("2021-01-01"),
              updater: "user",
            },
          ];
          await prisma.products.createMany({
            data: product,
          });

          const expected: product[] = [
            {
              prod_code: "10101005",
              prod_fullname: "商品名2",
              prod_name: "商品名2",
              prod_kana: "ショウヒンメイ2",
              prod_type: "2",
              serial_no: "1234567890123",
              unitprice: 1001,
              po_price: 801,
              prime_cost: 501,
              tax_type: 2,
              category_code: "00101002",
              wide_use_type: 2,
              stock_manage_type: 2,
              stock_reserve_type: 2,
              sup_code: "00101002",
              sup_sub_no: 2,
              create_date: new Date("2021-01-02"),
              creator: "user",
              update_date: new Date("2021-01-02"),
              updater: "user",
            },
          ];
          await prisma.products.update({
            data: expected[0],
            where: {
              prod_code: product[0].prod_code,
            },
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: expected[0].prod_code },
          });
          expect(result).toEqual(expected[0]);
        });

        test("商品を削除できる", async () => {
          const product: product[] = [
            {
              prod_code: "10101006",
              prod_fullname: "商品名",
              prod_name: "商品名",
              prod_kana: "ショウヒンメイ",
              prod_type: "1",
              serial_no: "1234567890123",
              unitprice: 1000,
              po_price: 800,
              prime_cost: 500,
              tax_type: 1,
              category_code: "00101001",
              wide_use_type: 1,
              stock_manage_type: 1,
              stock_reserve_type: 1,
              sup_code: "00101001",
              sup_sub_no: 1,
              create_date: new Date("2021-01-01"),
              creator: "user",
              update_date: new Date("2021-01-01"),
              updater: "user",
            },
          ];
          await prisma.products.createMany({
            data: product,
          });

          await prisma.products.delete({
            where: { prod_code: product[0].prod_code },
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: product[0].prod_code },
          });
          expect(result).toBeNull();
        });
      });

      describe("商品カテゴリーテーブル", () => {
        test("全ての商品カテゴリーが正常に取得できる", async () => {
          const expected: product_category[] = await prisma.$queryRaw`SELECT *
                                                                      FROM product_category`;
          const result = await prisma.product_category.findMany();

          expect(result).toHaveLength(expected.length);
        });

        test("特定の商品カテゴリーが正常に取得できる", async () => {
          const category_code = "00101001";
          const expected: product_category[] = await prisma.$queryRaw`SELECT *
                                                                      FROM product_category
                                                                      WHERE category_code = ${category_code}`;

          const result = await prisma.product_category.findUnique({
            where: { category_code: category_code },
          });
          expect(result).toEqual(expected[0]);
        });

        test("新しい商品カテゴリーを追加できる", async () => {
          // 新しい商品カテゴリーをデータベースに追加し、その商品カテゴリーが正常に登録されたことを検証するテスト
          const expected: product_category = {
            category_code: "00101006",
            prod_cate_name: "商品カテゴリー名",
            category_layer: 1,
            category_path: "00101001",
            lowest_flug: 1,
            create_date: new Date("2021-01-01"),
            creator: "user",
            update_date: new Date("2021-01-01"),
            updater: "user",
          };
          await prisma.product_category.create({
            data: expected,
          });

          const result = await prisma.product_category.findUnique({
            where: { category_code: expected.category_code },
          });
          expect(result).toEqual(expected);
        });

        test("商品カテゴリーの情報を正常に更新できる", async () => {
          // データベース内の商品カテゴリーの情報を更新し、その情報が正常に変更されたことを検証するテスト
          const expected: product_category = {
            category_code: "00101006",
            prod_cate_name: "商品カテゴリー名1",
            category_layer: 0,
            category_path: "00101006",
            lowest_flug: 0,
            create_date: new Date("2021-01-02"),
            creator: "user",
            update_date: new Date("2021-01-02"),
            updater: "user",
          };
          await prisma.product_category.update({
            data: expected,
            where: {
              category_code: expected.category_code,
            },
          });

          const result = await prisma.product_category.findUnique({
            where: { category_code: expected.category_code },
          });
          expect(result).toEqual(expected);
        });

        test("商品カテゴリーを削除できる", async () => {
          const category_code = "00101006";
          await prisma.product_category.delete({
            where: { category_code: category_code },
          });

          const result = await prisma.product_category.findUnique({
            where: { category_code: category_code },
          });
          expect(result).toBeNull();
        });
      });

      describe("顧客別販売単価テーブル", () => {
        test("全ての顧客別販売単価が正常に取得できる", async () => {
          const expected: pricebycustomer[] = await prisma.$queryRaw`SELECT *
                                                                     FROM pricebycustomer`;
          const result = await prisma.pricebycustomer.findMany();

          expect(result).toHaveLength(expected.length);
        });

        test("特定の顧客別販売単価が正常に取得できる", async () => {
          const prod_code = "10101001";
          const comp_code = "001";
          const expected: pricebycustomer[] = await prisma.$queryRaw`SELECT *
                                                                     FROM pricebycustomer
                                                                     WHERE prod_code = ${prod_code}
                                                                       AND comp_code = ${comp_code}`;

          const result = await prisma.pricebycustomer.findUnique({
            where: {
              prod_code_comp_code: {
                prod_code: prod_code,
                comp_code: comp_code,
              },
            },
          });
          expect(result).toEqual(expected[0]);
        });

        test("新しい顧客別販売単価を追加できる", async () => {
          const expected: pricebycustomer = {
            prod_code: "10101002",
            comp_code: "001",
            unitprice: 1000,
            create_date: new Date("2021-01-01"),
            creator: "user",
            update_date: new Date("2021-01-01"),
            updater: "user",
          };
          await prisma.pricebycustomer.create({
            data: expected,
          });

          const result = await prisma.pricebycustomer.findUnique({
            where: {
              prod_code_comp_code: {
                prod_code: expected.prod_code,
                comp_code: expected.comp_code,
              },
            },
          });
          expect(result).toEqual(expected);
        });

        test("顧客別販売単価の情報を正常に更新できる", async () => {
          const expected: pricebycustomer = {
            prod_code: "10101002",
            comp_code: "001",
            unitprice: 2000,
            create_date: new Date("2021-01-02"),
            creator: "user",
            update_date: new Date("2021-01-02"),
            updater: "user",
          };
          await prisma.pricebycustomer.update({
            data: expected,
            where: {
              prod_code_comp_code: {
                prod_code: expected.prod_code,
                comp_code: expected.comp_code,
              },
            },
          });

          const result = await prisma.pricebycustomer.findUnique({
            where: {
              prod_code_comp_code: {
                prod_code: expected.prod_code,
                comp_code: expected.comp_code,
              },
            },
          });
          expect(result).toEqual(expected);
        });

        test("顧客別販売単価を削除できる", async () => {
          const prod_code = "10101002";
          const comp_code = "001";
          await prisma.pricebycustomer.delete({
            where: {
              prod_code_comp_code: {
                prod_code: prod_code,
                comp_code: comp_code,
              },
            },
          });

          const result = await prisma.pricebycustomer.findUnique({
            where: {
              prod_code_comp_code: {
                prod_code: prod_code,
                comp_code: comp_code,
              },
            },
          });
          expect(result).toBeNull();
        });
      });
    });
  });

  describe("Chapter 4 取引先(顧客／仕入先)マスタの設計", () => {
    describe("取引先マスタ", () => {
      beforeAll(async () => {
        await prisma.$transaction(async (prisma) => {
          await prisma.destinations_mst.deleteMany(),
            await prisma.customers_mst.deleteMany(),
            await prisma.supplier_mst.deleteMany(),
            await prisma.company_category_group.deleteMany(),
            await prisma.pricebycustomer.deleteMany(),
            await prisma.credit_balance.deleteMany(),
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
          await prisma.destinations_mst.deleteMany(),
            await prisma.area_mst.deleteMany(),
            await prisma.customers_mst.deleteMany(),
            await prisma.supplier_mst.deleteMany(),
            await prisma.company_category_group.deleteMany(),
            await prisma.pricebycustomer.deleteMany(),
            await prisma.credit_balance.deleteMany(),
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
  });
});
