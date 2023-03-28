import { PrismaClient } from "@prisma/client";
import account from "../prisma/data/account";
import retiredAccount from "../prisma/data/retiredAccount";

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

  describe("第４章 検索結果の加工", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
    });

    // SELECT * FROM account ORDER BY number ASC;
    test("口座テーブルから、口座番号順にすべてのデータを抽出する。ただし、並び替えには列名を指定し、昇順にすること。", async () => {
      const result = await prisma.account.findMany({
        orderBy: {
          number: "asc",
        },
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        number: "0037651",
        name: "キタムラ　ユウコ",
        type: "1",
        balance: 1341107,
        updatedAt: new Date(2022, 0, 3),
      });
      expect(result[29]).toStrictEqual({
        number: "3104451",
        name: "ナカジョウ　ヨシヒコ",
        type: "2",
        balance: 8136406,
        updatedAt: new Date("2022-03-13"),
      });

    });

    // SELECT * FROM account ORDER BY balance DESC;
    test("口座テーブルから、名義の一覧を取得する。データの重複は除外し、名義の昇順にすること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        name: "アイダ　ミユ",
      });
      expect(result[27]).toStrictEqual({
        name: "ワダ　アキヒコ",
      });
    });


    // SELECT * FROM account ORDER BY balance DESC, number ASC;
    test("口座テーブルから、残高の大きい順にすべてのデータを抽出する。残高が同額の場合には口座番号の昇順にし、並び替えには列番号を指定すること。", async () => {
      const result = await prisma.account.findMany({
        orderBy: [
          {
            balance: "desc",
          },
          {
            number: "asc",
          },
        ],
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        number: "3104451",
        name: "ナカジョウ　ヨシヒコ",
        type: "2",
        balance: 8136406,
        updatedAt: new Date("2022-03-13"),
      });
      expect(result[29]).toStrictEqual({
        number: "1840675",
        name: "サイトウ　モモコ",
        type: "1",
        balance: 0,
        updatedAt: new Date("2022-01-10"),
      });
    })

    test("口座テーブルから、更新日を過去の日付順に10件抽出する。ただし、更新日の設定がないデータは除くこと。", async () => {
      const result = await prisma.account.findMany({
        where: {
          updatedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "asc",
        },
        take: 10,
      });

      console.table(result);
      expect(result.length).toBe(10);
      expect(result[0]).toStrictEqual({
        number: "1046990",
        name: "ツヅキ　ジュンヤ",
        type: "1",
        balance: 378911,
        updatedAt: new Date(2020, 2, 1),
      });
      expect(result[9]).toStrictEqual({
        number: "1016840",
        name: "オカダ　トシロウ",
        type: "2",
        balance: 0,
        updatedAt: new Date(2021, 10, 13),
      });
    });

    // SELECT * FROM account WHERE balance > 0 AND updated_at IS NOT NULL ORDER BY balance ASC, updated_at DESC LIMIT 10 OFFSET 10;
    test("口座テーブルから、更新日と残高の小さい順に11～20件目のみを抽出する。ただし、残高が0円または更新日の設定がないデータは除外し、残高が同額の場合には更新日の新しい順（降順）とする。", async () => {
      const result = await prisma.account.findMany({
        where: {
          balance: {
            gt: 0,
          },
          updatedAt: {
            not: null,
          },
        },
        orderBy: [
          {
            balance: "asc",
          },
          {
            updatedAt: "desc",
          },
        ],
        skip: 10,
        take: 10,
      });

      console.table(result);
      expect(result.length).toBe(10);
      expect(result[0]).toStrictEqual({
        number: "1017119",
        name: "ソネ　タツヤ",
        type: "1",
        balance: 265000,
        updatedAt: new Date(2021, 10, 26),
      });
      expect(result[9]).toStrictEqual({
        number: "2316474",
        name: "セキ　ショウタロウ",
        type: "3",
        balance: 1064497,
        updatedAt: new Date("2021-12-02"),
      });
    });

    test("口座テーブルと廃止口座テーブルに登録されている口座番号を昇順に抽出する。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
        },
        orderBy: {
          number: "asc",
        },
      });
      const retiredResult = await prisma.retiredAccount.findMany({
        select: {
          number: true,
        },
        orderBy: {
          number: "asc",
        },
      });

      const allResult = result.concat(retiredResult);

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        number: "0037651",
      });
      expect(allResult[33]).toStrictEqual({
        number: "1017100",
      });
    });

    // SELECT DISTINCT name FROM account WHERE name NOT IN (SELECT name FROM retired_account) ORDER BY name DESC;
    test("口座テーブルに登録されている名義のうち、廃止口座テーブルには存在しない名義を抽出する。重複したデータは除き、降順で並べること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "desc",
        },
      });

      const retiredResult = await prisma.retiredAccount.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "desc",
        },
      });

      const allResult = result.concat(retiredResult).filter((x, i, self) => {
        return self.indexOf(x) === i;
      });

      console.table(allResult);
      expect(allResult.length).toBe(32);
    });

    // SELECT DISTINCT name FROM account WHERE name IN (SELECT name FROM retired_account) ORDER BY name ASC;
    test("口座テーブルと廃止口座テーブルの両方に登録されている名義を昇順に抽出する。", async () => {
      const result = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });

      const retiredResult = await prisma.retiredAccount.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });

      const allResult = result.map((x) => x.name).filter((x) => retiredResult.map((y) => y.name).includes(x));

      console.table(allResult);
      expect(allResult.length).toBe(2);
    });

    // SELECT number, balance FROM account WHERE balance = 0 ORDER BY number ASC;
    test("口座テーブルと廃止口座テーブルに登録されている口座番号と残高の一覧を取得する。ただし、口座テーブルは残高が0のもの、廃止口座テーブルは解約時残高が0でない", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
        where: {
          balance: 0,
        },
        orderBy: {
          number: "asc",
        },
      });

      const retiredResult = await prisma.retiredAccount.findMany({
        select: {
          number: true,
          balance: true,
        },
        where: {
          balance: {
            not: 0,
          },
        },
        orderBy: {
          number: "asc",
        },
      });

      const allResult = result.concat(retiredResult);

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        number: "1016840",
        balance: 0,
      });
      expect(allResult[3]).toStrictEqual({
        number: "0097310",
        balance: 130040,
      });
    });

  });
});
