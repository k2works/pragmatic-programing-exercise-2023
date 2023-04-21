import { PrismaClient, dept_mst, employee, products as product } from "@prisma/client";
import { employees } from "../prisma/data/employee";
import { departments } from "../prisma/data/department";
import { products } from "../prisma/data/product";
const prisma = new PrismaClient();

describe("Part 1 業務システムの概要とマスタ設計", () => {
  describe("Chapter 1 販売管理システム全体像", () => {});

  describe("Chapter 2 基幹業務システム構築のポイント", () => {});

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
          const exepcted = await prisma.$queryRaw`SELECT * FROM dept_mst`;
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

        test("部署の下位部署の一括更新：指定された部署の下位部署の情報をまとめて更新する。下位部署の末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => {});
        test("部署の上位部署の一括更新：指定された部署の上位部署の情報をまとめて更新する。上位部署の末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => {});
        test("部署コードの一括更新：指定された部署コードを持つ部署の情報をまとめて更新する。末端タイプ、作成日時、更新日時、作成者、更新者などを更新できる。", () => {});
      });
      describe("部門情報を参照して、それぞれの部門が所属する上位部門や下位部門を把握する", () => {
        test("部署階層の検索：部門マスタテーブルから、指定された部署の親部署、子部署、兄弟部署、孫部署など、部署階層に関連する情報を検索する。", async () => {
          const expected =
            await prisma.$queryRaw`SELECT * FROM dept_mst WHERE dept_psth LIKE '10000~11000%'`;
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
      describe("部門情報を参照して、その部門が所属する部門階層を把握する", () => {});
      describe("部門情報を参照して、その部門が所属する部門階層の中での位置を把握する", () => {});
      describe("部門情報を参照して、その部門に所属する従業員の情報を取得する", () => {});
      describe("部門情報を参照して、その部門に所属する従業員の業績を分析する", () => {});
      describe("部門情報を参照して、その部門の売上や利益などの業績を分析する", () => {});
      describe("部門情報を参照して、その部門に関する予算や財務情報を分析する", () => {});
      describe("部門情報を参照して、その部門に対する人事施策を考える", () => {});
      describe("部門情報を参照して、その部門の戦略・経営計画を策定するための情報収集を行う。", () => {});
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
        await prisma.$transaction( async(prisma) => {
         await prisma.pricebycustomer.deleteMany(),
         await prisma.products.deleteMany(),
         await prisma.products.createMany({ data: products })
        })
      });

      describe("商品テーブル", () => {
        test("全ての商品が正常に取得できる", async () => {
          const expected : product[] = await prisma.$queryRaw`SELECT * FROM products`;
          const result = await prisma.products.findMany();

          expect(result).toEqual(expected);
        });

        test("特定の商品が正常に取得できる", async () => {
          const prod_code = "10101001";
          const expected : product[] = await prisma.$queryRaw`SELECT *  FROM products WHERE prod_code = ${prod_code}`;
          const result = await prisma.products.findUnique({
            where: { prod_code: prod_code },
          });

          expect(result).toEqual(expected[0]);
        });

        test("新しい商品を追加できる", async () => {
          const expected : product[] = [{
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
          }]
           await prisma.products.createMany({
            data: expected,
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: expected[0].prod_code },
          });

          expect(result).toEqual(expected[0]);
        });

        test("商品の情報を正常に更新できる", async () => {
          const product : product[] = [{
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
          }]
           await prisma.products.createMany({
            data: product,
          });

          const expected : product[] = [{
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
          }]
          await prisma.products.update({
            data: expected[0],
            where: {
              prod_code: product[0].prod_code
            }
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: expected[0].prod_code },
          });
          expect(result).toEqual(expected[0]);
        });

        test("商品を削除できる", async () => {
          const product : product[] = [{
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
          }]
           await prisma.products.createMany({
            data: product,
          });

          await prisma.products.delete({
            where: {prod_code: product[0].prod_code}
          });

          const result = await prisma.products.findUnique({
            where: { prod_code: product[0].prod_code },
          });
          expect(result).toBeNull();
        });
      });

      describe("商品カテゴリーテーブル", () => {
        test("全ての商品カテゴリーが正常に取得できる", () => {
          // データベースから全ての商品カテゴリーを取得し、それが想定通りの件数であることを検証するテスト
        });

        test("特定の商品カテゴリーが正常に取得できる", () => {
          // データベースから特定の商品カテゴリーを取得し、それが想定通りの情報であることを検証するテスト
        });

        test("新しい商品カテゴリーを追加できる", () => {
          // 新しい商品カテゴリーをデータベースに追加し、その商品カテゴリーが正常に登録されたことを検証するテスト
        });

        test("商品カテゴリーの情報を正常に更新できる", () => {
          // データベース内の商品カテゴリーの情報を更新し、その情報が正常に変更されたことを検証するテスト
        });

        test("商品カテゴリーを削除できる", () => {
          // データベースから商品カテゴリーを削除し、その商品カテゴリーが正常に削除されたことを検証するテスト
        });
      });
    });
  });

  describe("Chapter 4 取引先(顧客／仕入先)マスタの設計", () => {});
});
