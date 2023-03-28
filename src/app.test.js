import { PrismaClient } from "@prisma/client";
import account from "../prisma/data/account";

const prisma = new PrismaClient();

describe("銀行口座データベース", () => {
  describe("第２章 基本文法と四大命令", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
    });
    test("口座テーブルの全てのデータを「*]を用いずに抽出する", async () => {
      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          type: true,
          balance: true,
          updatedAt: true,
        },
      });

      expect(accounts.length).toBe(30);
      expect(accounts[0]).toStrictEqual({
        number: "0037651",
        name: "キタムラ　ユウコ",
        type: "1",
        balance: 1341107,
        updatedAt: new Date(2022, 0, 3),
      });
      expect(accounts[29]).toStrictEqual({
        number: "3104451",
        name: "ナカジョウ　ヨシヒコ",
        type: "2",
        balance: 8136406,
        updatedAt: new Date("2022-03-13"),
      });
    });

    test("口座テーブルの全ての口座番号を抽出する", async () => {
      const accounts = await prisma.account.findMany({
        select: {
          number: true,
        },
      });

      expect(accounts.length).toBe(30);
      expect(accounts[0]).toStrictEqual({
        number: "0037651",
      });
      expect(accounts[29]).toStrictEqual({
        number: "3104451",
      });
    });

    test("口座テーブルの全ての口座番号と残高を抽出する", async () => {
      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });

      expect(accounts.length).toBe(30);
      expect(accounts[0]).toStrictEqual({
        number: "0037651",
        balance: 1341107,
      });
      expect(accounts[29]).toStrictEqual({
        number: "3104451",
        balance: 8136406,
      });
    });

    test("口座テーブルの全てのデータを「＊」を用いて抽出する", async () => {
      const accounts = await prisma.account.findMany();

      expect(accounts.length).toBe(30);
      expect(accounts[0]).toStrictEqual({
        number: "0037651",
        name: "キタムラ　ユウコ",
        type: "1",
        balance: 1341107,
        updatedAt: new Date(2022, 0, 3),
      });
      expect(accounts[29]).toStrictEqual({
        number: "3104451",
        name: "ナカジョウ　ヨシヒコ",
        type: "2",
        balance: 8136406,
        updatedAt: new Date("2022-03-13"),
      });
    });

    test("口座テーブルの全ての名義を「ｘｘｘｘｘ」に更新する", async () => {
      const accounts = await prisma.account.updateMany({
        data: {
          name: "ｘｘｘｘｘ",
        },
      });

      const result = await prisma.account.findMany();

      expect(result[0]).toStrictEqual({
        number: "0037651",
        name: "ｘｘｘｘｘ",
        type: "1",
        balance: 1341107,
        updatedAt: new Date(2022, 0, 3),
      });
      expect(result[29]).toStrictEqual({
        number: "3104451",
        name: "ｘｘｘｘｘ",
        type: "2",
        balance: 8136406,
        updatedAt: new Date("2022-03-13"),
      });
    });

    test("口座テーブルの全て残高を99999999、更新日を「2022-03-01」に更新する", async () => {
      const accounts = await prisma.account.updateMany({
        data: {
          balance: 99999999,
          updatedAt: new Date("2022-03-01"),
        },
      });

      const result = await prisma.account.findMany();

      expect(result[0]).toStrictEqual({
        number: "0037651",
        name: "ｘｘｘｘｘ",
        type: "1",
        balance: 99999999,
        updatedAt: new Date("2022-03-01"),
      });
      expect(result[29]).toStrictEqual({
        number: "3104451",
        name: "ｘｘｘｘｘ",
        type: "2",
        balance: 99999999,
        updatedAt: new Date("2022-03-01"),
      });
    });

    test("口座テーブルに次の３つのデータを１回の実行ごとに１つずつ登録する", async () => {
      const data = [
        {
          number: "0642191",
          name: "アオキ　ハルカ",
          type: "1",
          balance: 3640551,
          updatedAt: new Date("2022-03-13"),
        },
        {
          number: "1039410",
          name: "キノシタ　リュウジ",
          type: "1",
          balance: 259017,
          updatedAt: new Date("2021-11-30"),
        },
        {
          number: "1239855",
          name: "タカシナ ミツル",
          type: "2",
          balance: 6509773,
          updatedAt: null,
        },
      ];
      const accounts = await prisma.account.createMany({ data: data });

      const result = await prisma.account.findMany();

      expect(accounts.count).toBe(3);
      expect(result[30]).toStrictEqual(data[0]);
      expect(result[31]).toStrictEqual(data[1]);
      expect(result[32]).toStrictEqual(data[2]);
    });
  });

  describe("第３章 操作する行の絞り込み", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
    });

    // SELECT * FROM account WHERE number = "0037651";
    test("口座テーブルから、口座番号が「0037651」のデータを抽出する", async () => {
      const result = await prisma.account.findUnique({
        where: {
          number: "0037651",
        },
      });

      console.table(result);
      expect(result).toStrictEqual({
        number: "0037651",
        name: "キタムラ　ユウコ",
        type: "1",
        balance: 1341107,
        updatedAt: new Date(2022, 0, 3),
      });
    });

    // SELECT * FROM account WHERE balance > 0;
    test("口座テーブルから、残高が0より大きいデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          balance: {
            gt: 0,
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(28);
    });

    // SELECT * FROM account WHERE number < '1000000';
    test("口座テーブルから、口座番号が「1000000」番より前のデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          number: {
            lt: "1000000",
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(7);
    });

    // SELECT * FROM account WHERE updated_at <= '2021-12-31';
    test("口座テーブルから、更新日が2021年以前のデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          updatedAt: {
            lte: new Date("2021-12-31"),
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(15);
    });

    // SELECT * FROM account WHERE balance >= 1000000;
    test("口座テーブルから、残高が100万円以上のデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          balance: {
            gte: 1000000,
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(8);
    });

    // SELECT * FROM account WHERE type <> '1';
    test("口座テーブルから、種別が「普通」ではないデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          type: {
            not: "1",
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(6);
    });

    // SELECT * FROM account WHERE updated_at IS NULL;
    test("口座テーブルから、更新日が登録されていないデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          updatedAt: null,
        },
      });

      console.table(result);
      expect(result.length).toBe(1);
    });

    // SELECT * FROM account WHERE name LIKE '%ハシ%';
    test("口座テーブルから、「ハシ」を含む名義のデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          name: {
            contains: "ハシ",
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    //SELECT * FROM account WHERE updated_at >= '2022-01-01' AND updated_at < '2022-02-01';
    test("口座テーブルから、更新日が2022年1月の日付であるデータを抽出する。ただし、記述する条件は式は１つであること。", async () => {
      const result = await prisma.account.findMany({
        where: {
          updatedAt: {
            gte: new Date("2022-01-01"),
            lt: new Date("2022-02-01"),
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(6);
    });

    // SELECT * FROM account WHERE type IN ('2', '3');
    test("口座テーブルから、種別が「当座」または「別段」のデータを抽出する。ただし、記述する条件は式は１つであること。", async () => {
      const result = await prisma.account.findMany({
        where: {
          type: {
            in: ["2", "3"],
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(6);
    });

    // SELECT * FROM account WHERE name IN ('サカタ　リョウヘイ', 'マツモト　ミワコ', 'ハマダ　サトシ');
    test("口座テーブルから、名義が「サカタ　リョウヘイ」「マツモト　ミワコ」「ハマダ　サトシ」のデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          name: {
            in: ["サカタ　リョウヘイ", "マツモト　ミワコ", "ハマダ　サトシ"],
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(3);
    });

    // SELECT * FROM account WHERE updated_at BETWEEN '2021-12-30' AND '2022-01-04';
    test("口座テーブルから、更新日が2021年12月30日から2022年1月4日であるデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          updatedAt: {
            gte: new Date("2021-12-30"),
            lte: new Date("2022-01-04"),
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    //SELECT * FROM account WHERE balance < 10000 AND updated_at IS NOT NULL;
    test("口座テーブルから、残高が1万円未満で、更新日が登録されているデータを抽出する", async () => {
      const result = await prisma.account.findMany({
        where: {
          balance: {
            lt: 10000,
          },
          updatedAt: {
            not: null,
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    //SELECT * FROM account WHERE number LIKE '2000000%' OR name LIKE 'エ%コ';
    test("口座テーブルから、次の条件のいずれかに当てはまるデータを抽出する", async () => {
      // 口座番号が「2000000」番台
      // 名義の姓が「エ」から始まる３文字で、名が「コ」で終わる
      const result = await prisma.account.findMany({
        where: {
          OR: [
            {
              number: {
                startsWith: "2000000",
              },
            },
            {
              name: {
                startsWith: "エ",
                endsWith: "コ",
              },
            },
          ],
        },
      });

      console.table(result);
      expect(result.length).toBe(1);
      expect(result[0]).toStrictEqual({
        number: "1977301",
        name: "エガワ　サトコ",
        type: "1",
        balance: 5325,
        updatedAt: new Date("2021-02-19"),
      });
    });
  });
});
