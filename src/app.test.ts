import { config } from "dotenv";
config({ path: '.env.test' })
import { PrismaClient, Department } from "@prisma/client";
const prisma = new PrismaClient();


const departments: Department[] = [
  {
    code: "D0001",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    name: "新規部署",
    layer: 1,
    psth: "D0001",
    bottomType: 1,
    slitYn: 0,
    createDate: new Date("2021-01-01"),
    creator: "admin",
    updateDate: new Date("2021-01-01"),
    updater: "admin",
  }
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
          where: { code_startDate: { code: departments[0].code, startDate: departments[0].startDate } },
          data: expected[0]
        });

        const result = await prisma.department.findMany();
        expect(result).toEqual(expected);
      });

      test("部門を削除できる", async () => {
        const expected: Department[] = [];
        await prisma.department.delete({
          where: { code_startDate: { code: departments[0].code, startDate: departments[0].startDate } }
        });

        const result = await prisma.department.findMany();
        expect(result).toEqual(expected);
      });
    });
  });
});
