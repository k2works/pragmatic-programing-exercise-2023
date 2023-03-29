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
    });

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

      const allResult = result
        .map((x) => x.name)
        .filter((x) => retiredResult.map((y) => y.name).includes(x));

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

  describe("第５章 式と関数", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
    });

    // SELECT number, name, '○' AS status FROM account  UNION ALL SELECT number, name, 'ｘ' AS status FROM retired_account ORDER BY name ASC;
    test("口座テーブルと廃止口座テーブルに登録されている口座番号と名義の一覧を取得する。一覧は名義を昇順にし、その口座の状況がわかるように、有効な口座には「○」を、廃止した口座には「ｘ」を一覧に付記すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      const retiredResult = await prisma.retiredAccount.findMany({
        select: {
          number: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      const allResult = ((a, b) => {
        return a
          .map((x) => ({
            number: x.number,
            name: x.name,
            status: "○",
          }))
          .concat(
            b.map((x) => ({
              number: x.number,
              name: x.name,
              status: "ｘ",
            })),
          );
      })(result, retiredResult);

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        number: "0351333",
        name: "アイダ　ミユ",
        status: "○",
      });
      expect(allResult[33]).toStrictEqual({
        number: "0945671",
        name: "モリシタ　カズミ",
        status: "ｘ",
      });
    });

    test("口座テーブルから、残高が100万円以上の口座番号と残高を抽出する。ただし、残高は千円単位で表記し、見出しを「千円単位の残高」とする", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
        where: {
          balance: {
            gte: 1000000,
          },
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        千円単位の残高: `${Math.floor(x.balance / 1000)}千円`,
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0037651",
        千円単位の残高: "1341千円",
      });
    });

    test("口座テーブルに次の3つのデータを1回の実行ごとに1つずつ登録する。ただし、キャンペーンにより登録時に残高を3000円プラスする。", async () => {
      const data = [
        {
          number: "0652281",
          name: "タカギ　ノブオ",
          type: "1",
          balance: 100000,
          updatedAt: new Date("2022-04-01"),
        },
        {
          number: "1026413",
          name: "マツモト　サワコ",
          type: "1",
          balance: 300000,
          updatedAt: new Date("2022-04-02"),
        },
        {
          number: "2239710",
          name: "ササキ　シゲノリ",
          type: "1",
          balance: 1000000,
          updatedAt: new Date("2022-04-03"),
        },
      ];

      await prisma.account.createMany({
        data: data.map((x) => ({
          number: x.number,
          name: x.name,
          type: x.type,
          balance: x.balance + 3000,
          updatedAt: x.updatedAt,
        }))
      });

      const allResult = await prisma.account.findMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          }
        },
      });

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        number: "0652281",
        name: "タカギ　ノブオ",
        type: "1",
        balance: 103000,
        updatedAt: new Date("2022-04-01"),
      });
      expect(allResult[1]).toStrictEqual({
        number: "1026413",
        name: "マツモト　サワコ",
        type: "1",
        balance: 303000,
        updatedAt: new Date("2022-04-02"),
      });
      expect(allResult[2]).toStrictEqual({
        number: "2239710",
        name: "ササキ　シゲノリ",
        type: "1",
        balance: 1003000,
        updatedAt: new Date("2022-04-03"),
      });
    });

    test("35の問題で登録したデータについて、キャンペーンの価格が間違っていたことが判明した。該当するデータの残高それぞれから3000円を差し引き、あらためて残高の0.3%を上乗せした金額になるよう更新する。", async () => {
      const data = [
        {
          number: "0652281",
          name: "タカギ　ノブオ",
          type: "1",
          balance: 103000,
          updatedAt: new Date("2022-04-01"),
        },
        {
          number: "1026413",
          name: "マツモト　サワコ",
          type: "1",
          balance: 303000,
          updatedAt: new Date("2022-04-02"),
        },
        {
          number: "2239710",
          name: "ササキ　シゲノリ",
          type: "1",
          balance: 1003000,
          updatedAt: new Date("2022-04-03"),
        },
      ];

      for (const x of data) {
        await prisma.account.update({
          where: {
            number: x.number,
          },
          data: {
            balance: (x.balance - 3000) + Math.floor((x.balance - 3000) * 0.003),
          }
        });
      }

      const allResult = await prisma.account.findMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          }
        },
      });

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        number: "0652281",
        name: "タカギ　ノブオ",
        type: "1",
        balance: 100300,
        updatedAt: new Date("2022-04-01"),
      });
      expect(allResult[1]).toStrictEqual({
        number: "1026413",
        name: "マツモト　サワコ",
        type: "1",
        balance: 300900,
        updatedAt: new Date("2022-04-02"),
      });
      expect(allResult[2]).toStrictEqual({
        number: "2239710",
        name: "ササキ　シゲノリ",
        type: "1",
        balance: 1003000,
        updatedAt: new Date("2022-04-03"),
      });
    });

    test("口座テーブルから、更新日が2020年以前のデータを対象に、口座番号、更新日、通帳期限日を抽出する。ただし、通帳期限日は、更新日の180日後とする。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          updatedAt: true,
        },
        where: {
          updatedAt: {
            lte: new Date("2020-12-31"),
          },
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        更新日: x.updatedAt,
        通帳期限日: new Date(new Date(x.updatedAt).setDate(x.updatedAt.getDate() + 180)),
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0100807",
        更新日: new Date("2020-11-29T15:00:00.000Z"),
        通帳期限日: new Date("2021-05-28T15:00:00.000Z"),
      });
    });

    test("口座テーブルから、種別が「別段」のデータについて、口座番号と名義を抽出する。ただし、名義の前に「カ）」を付記すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
        },
        where: {
          type: "2",
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: `カ）${x.name}`,
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "1016840",
        名義: "カ）オカダ　トシロウ",
      });
    });

    test("口座テーブルから、登録されている種別の一覧を取得する。見出しは「種別コード」と「種別名」とし、種別名には日本語を表記する。", async () => {
      const result = await prisma.account.findMany({
        select: {
          type: true,
        },
      });

      const typeName = (type) => {
        switch (type) {
          case "1":
            return "普通";
          case "2":
            return "当座";
          case "3":
            return "別段";
          default:
            return "";
        }
      }
      const allResult = result.map((x) => ({
        種別コード: x.type,
        種別名: typeName(x.type),
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        種別コード: "1",
        種別名: "普通",
      });
      expect(allResult[1]).toStrictEqual({
        種別コード: "3",
        種別名: "別段",
      });
      expect(allResult[7]).toStrictEqual({
        種別コード: "2",
        種別名: "当座",
      });
    });

    test("口座テーブルから、口座番号、名義、残高ランクを抽出する。残高ランクは、残高が10万円未満を「C」、10万円以上100万円未満を「B」、それ以外を「A」とする。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const rank = (balance) => {
        if (balance < 100000) {
          return "C";
        } else if (balance < 1000000) {
          return "B";
        } else {
          return "A";
        }
      };
      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
        残高ランク: rank(x.balance),
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0037651",
        名義: "キタムラ　ユウコ",
        残高ランク: "A",
      });
    })

    test("口座テーブルから、口座番号、名義、残高の文字数を抽出する。ただし、名義の姓目の間の全角スペースは除外すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
        残高: x.balance,
        口座番号文字数: x.number.length,
        名義文字数: x.name.replace(/　/g, "").length,
        残高文字数: x.balance.toString().length,
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0037651",
        名義: "キタムラ　ユウコ",
        残高: 1341107,
        口座番号文字数: 7,
        名義文字数: 7,
        残高文字数: 7,
      });
    })

    test("口座テーブルから、名義の1～5文字目に「カワ」が含まれるデータを抽出する。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
        },
        where: {
          name: {
            contains: "カワ",
            mode: "insensitive",
          },
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "1106405",
        名義: "センカワ　シゲル",
      });
    });

    test("口座テーブルから、残高の桁数が4桁以上で、1000円未満の端数がないデータを抽出する。ただし、どちらの条件も文字数を求める関数を使って判定すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
        残高: x.balance,
      })).filter((x) => {
        return x.残高.toString().length >= 4 && x.残高 % 1000 === 0;
      });

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0100807",
        名義: "アキタ　サトル",
        残高: 10000,
      });
    })

    test("口座テーブルから、口座番号、残高、利息を残高の降順に抽出する。利息は、残高に普通預金利息0.02%を掛けて求め、1円未満を切り捨てること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        残高: x.balance,
        利息: Math.floor(x.balance * 0.02),
      })).sort((a, b) => {
        return b.残高 - a.残高;
      });

      console.table(allResult);
      expect(allResult[30]).toStrictEqual({
        口座番号: "1977301",
        残高: 5325,
        利息: 106,
      });
    });

    test("口座テーブルから、口座番号、残高、残高別利息を抽出する。残高別利息は、残高50万円未満を0.01%、50万円以上200万円未満を0.02%、200万円以上を0.03%として計算し、1円未満を切り捨てる。一覧は、残高別利息の降順、口座番号の昇順に並べること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        残高: x.balance,
        残高別利息: Math.floor(x.balance * (x.balance < 500000 ? 0.01 : x.balance < 2000000 ? 0.02 : 0.03)),
      })).sort((a, b) => {
        return b.残高別利息 - a.残高別利息 || a.口座番号 - b.口座番号;
      });

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "3104451",
        残高: 8136406,
        残高別利息: 244092,
      });
    });

    test("口座テーブルに以下にある3つのデータを1回の実行ごとに1つずつ登録する。ただし、更新日は現在の日付を求める関数を利用して指定すること。", async () => {
      const today = new Date();
      const data = [
        {
          number: "0351262",
          name: "イトカワ　ダイ",
          type: "2",
          balance: 635110,
          updatedAt: today,
        },
        {
          number: "1015513",
          name: "アキツ　ジュンジ",
          type: "1",
          balance: 88463,
          updatedAt: today,
        },
        {
          number: "1739298",
          name: "ホシノ　サトミ",
          type: "1",
          balance: 704610,
          updatedAt: today,
        },
      ];

      await prisma.account.createMany({ data });
      const result = await prisma.account.findMany({
        where: {
          updatedAt: {
            equals: today,
          },
        }
      });

      console.table(result);
      expect(result.length).toBe(3);
    })

    test("口座テーブルから更新日が2022年以降のデータを抽出する。その際、更新日は「2022年01月01日」のような形式で抽出すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          updatedAt: true,
        },
        where: {
          updatedAt: {
            gte: new Date("2022-01-01"),
          },
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
        更新日: `${x.updatedAt.getFullYear()}年${x.updatedAt.getMonth() + 1}月${x.updatedAt.getDate()}日`,
      }));

      console.table(allResult);
      expect(allResult[0]).toStrictEqual({
        口座番号: "0037651",
        名義: "キタムラ　ユウコ",
        更新日: "2022年1月3日",
      });
    });

    test("口座テーブルから更新日を抽出する。更新日が登録されていない場合は、「設定なし」と表記すること。", async () => {
      const result = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          updatedAt: true,
        },
      });

      const allResult = result.map((x) => ({
        口座番号: x.number,
        名義: x.name,
        更新日: x.updatedAt ? x.updatedAt : "設定なし",
      }));

      console.table(allResult);
      expect(allResult[4]).toStrictEqual({
        口座番号: "0671412",
        名義: "タムラ　タカシ",
        更新日: "設定なし",
      });
    });

  });
});
