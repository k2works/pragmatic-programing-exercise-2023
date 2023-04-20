import { PrismaClient, dept_mst } from "@prisma/client";
const prisma = new PrismaClient();
import { departments } from "../prisma/data/department";

describe("Part 1 業務システムの概要とマスタ設計", () => {
  describe("Chapter 1 販売管理システム全体像", () => {});

  describe("Chapter 2 基幹業務システム構築のポイント", () => {});

  describe("Chapter 3 部門／社員／商品マスタ設計", () => {
    describe("部門マスタ", () => {
      beforeAll(async () => {
        await prisma.dept_mst.deleteMany();
        await prisma.dept_mst.createMany({
          data: departments,
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
  });

  describe("Chapter 4 取引先(顧客／仕入先)マスタの設計", () => {});
});
