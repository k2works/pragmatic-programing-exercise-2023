import { PrismaClient } from "@prisma/client";
import account from "../prisma/data/account";
import retiredAccount from "../prisma/data/retiredAccount";
import transaction from "../prisma/data/transaction";
import transactionReason from "../prisma/data/transactionReason";
import product from "../prisma/data/product";
import retiredProduct from "../prisma/data/retiredProduct";
import order from "../prisma/data/order";
const party = require("../prisma/data/party");
const experienceEvent = require("../prisma/data/experienceEvent");
const event = require("../prisma/data/event");
const code = require("../prisma/data/code");

const prisma = new PrismaClient();

describe("銀行口座データベース", () => {
  describe("第２章 基本文法と四大命令", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
    });

    const fullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          残高: account.balance,
          更新日: account.updatedAt,
        };
      });
    }
    test("1:口座テーブルの全てのデータを「*」を用いずに抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 名義, 種別, 残高, 更新日 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          type: true,
          balance: true,
          updatedAt: true,
        },
      });
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("2:口座テーブルの全ての口座番号を抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
        },
      });
      const result = accounts.map((account) => {
        return {
          口座番号: account.number,
        };
      });
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("3:口座テーブルの全ての口座番号と残高を抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 残高 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });
      const result = accounts.map((account) => {
        return {
          口座番号: account.number,
          残高: account.balance,
        }
      });
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("4:口座テーブルの全てのデータを「＊」を用いて抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany();
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("5:口座テーブルの全ての名義を「ｘｘｘｘｘ」に更新する。", async () => {
      await prisma.$queryRaw`UPDATE 口座 SET 名義 = 'ｘｘｘｘｘ'`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座`
      console.table(expected)

      await prisma.account.updateMany({
        data: {
          name: "ｘｘｘｘｘ",
        },
      });
      const accounts = await prisma.account.findMany();
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("6:口座テーブルの全て残高を99999999、更新日を「2022-03-01」に更新する。", async () => {
      await prisma.$queryRaw`UPDATE 口座 SET 残高 = 99999999, 更新日 = '2022-03-01'`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座`

      await prisma.account.updateMany({
        data: {
          balance: 99999999,
          updatedAt: new Date("2022-03-01"),
        },
      });
      const accounts = await prisma.account.findMany();
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("7:口座テーブルに次の３つのデータを１回の実行ごとに１つずつ登録する。", async () => {
      await prisma.$queryRaw`INSERT INTO 口座 (口座番号, 名義, 種別, 残高, 更新日) VALUES ('0642191', 'アオキ　ハルカ', '1', 3640551, '2022-03-13'), ('1039410', 'キノシタ　リュウジ', '1', 259017, '2021-11-30'), ('1239855', 'タカシナ ミツル', '2', 6509773, null)`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座`
      console.table(expected)

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
      await prisma.account.deleteMany({
        where: {
          number: {
            in: data.map((account) => account.number),
          },
        },
      });
      await prisma.account.createMany({ data: data });
      const accounts = await prisma.account.findMany();
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });

    test("8: 口座テーブルのすべてのデータを削除する。", async () => {
      await prisma.$queryRaw`DELETE FROM 口座`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座`
      console.table(expected)

      await prisma.account.deleteMany({});
      const accounts = await prisma.account.findMany();
      const result = fullConvert(accounts);
      console.table(result)

      expect(expected).toStrictEqual(result)
    });
  });

  describe("第３章 操作する行の絞り込み", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
    });
    const fullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          残高: account.balance,
          更新日: account.updatedAt,
        };
      });
    }

    test("9:口座テーブルから、口座番号が「0037651」のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 = '0037651'`
      console.table(expected)

      const account = await prisma.account.findUnique({
        where: {
          number: "0037651",
        },
      });
      const result = [{
        口座番号: account.number,
        名義: account.name,
        種別: account.type,
        残高: account.balance,
        更新日: account.updatedAt,
      }];
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("10:口座テーブルから、残高が0より大きいデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 残高 > 0`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          balance: {
            gt: 0,
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("11:口座テーブルから、口座番号が「1000000」番より前のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 < '1000000'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          number: {
            lt: "1000000",
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("12:口座テーブルから、更新日が2021年以前のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 更新日 <= '2021-12-31'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: {
            lte: new Date("2021-12-31"),
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("13:口座テーブルから、残高が100万円以上のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 残高 >= 1000000`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          balance: {
            gte: 1000000,
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("14:口座テーブルから、種別が「普通」ではないデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 種別 <> '1'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          type: {
            not: "1",
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("15:口座テーブルから、更新日が登録されていないデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 更新日 IS NULL`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: null,
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("16:口座テーブルから、「ハシ」を含む名義のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 名義 LIKE '%ハシ%'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          name: {
            contains: "ハシ",
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("17:口座テーブルから、更新日が2022年1月の日付であるデータを抽出する。ただし、記述する条件は式は１つであること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 更新日 BETWEEN '2022-01-01' AND '2022-02-01'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: {
            gte: new Date("2022-01-01"),
            lt: new Date("2022-02-01"),
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("18:口座テーブルから、種別が「当座」または「別段」のデータを抽出する。ただし、記述する条件は式は１つであること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 種別 IN ('2', '3')`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          type: {
            in: ["2", "3"],
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("19:口座テーブルから、名義が「サカタ　リョウヘイ」「マツモト　ミワコ」「ハマダ　サトシ」のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 名義 IN ('サカタ　リョウヘイ', 'マツモト　ミワコ', 'ハマダ　サトシ')`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          name: {
            in: ["サカタ　リョウヘイ", "マツモト　ミワコ", "ハマダ　サトシ"],
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("20:口座テーブルから、更新日が2021年12月30日から2022年1月4日であるデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 更新日 >= '2021-12-30' AND 更新日 < '2022-01-05'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: {
            gte: new Date("2021-12-30"),
            lt: new Date("2022-01-05"),
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("21:口座テーブルから、残高が1万円未満で、更新日が登録されているデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 残高 < 10000 AND 更新日 IS NOT NULL`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          balance: {
            lt: 10000,
          },
          updatedAt: {
            not: null,
          },
        },
      });
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("22:口座テーブルから、次の条件のいずれかに当てはまるデータを抽出する。", async () => {
      // 口座番号が「2000000」番台
      // 名義の姓が「エ」から始まる３文字で、名が「コ」で終わる
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 LIKE '2______' OR 名義 LIKE 'エ__　%コ'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        where: {
          OR: [
            {
              number: {
                startsWith: "2______",
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
      const result = fullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });
  });

  describe("第４章 検索結果の加工", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
    });
    const accountFullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          残高: account.balance,
          更新日: account.updatedAt,
        };
      });
    }
    const retiredAccountFullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          解約時残高: account.balance,
          解約日: account.retiredAt,
        };
      });
    }

    test("24:口座テーブルから、口座番号順にすべてのデータを抽出する。ただし、並び替えには列名を指定し、昇順にすること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号,名義,種別,残高,更新日 FROM 口座 ORDER BY 口座番号`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        orderBy: {
          number: "asc",
        },
      });
      const result = accountFullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("25:口座テーブルから、名義の一覧を取得する。データの重複は除外し、名義の昇順にすること。", async () => {
      const expected = await prisma.$queryRaw`SELECT DISTINCT 名義 FROM 口座 ORDER BY 名義`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });
      const result = accounts.map((account) => {
        return {
          名義: account.name,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("26:口座テーブルから、残高の大きい順にすべてのデータを抽出する。残高が同額の場合には口座番号の昇順にし、並び替えには列番号を指定すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号,名義,種別,残高,更新日 FROM 口座 ORDER BY 4 DESC, 1`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        orderBy: [
          {
            balance: "desc",
          },
          {
            number: "asc",
          },
        ],
      });
      const result = accountFullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("27:口座テーブルから、更新日を過去の日付順に10件抽出する。ただし、更新日の設定がないデータは除くこと。", async () => {
      const expected = await prisma.$queryRaw`SELECT 更新日 FROM 口座 WHERE 更新日 IS NOT NULL ORDER BY 更新日 OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`
      console.table(expected)

      const accounts = await prisma.account.findMany({
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
      const result = accounts.map((account) => {
        return {
          更新日: account.updatedAt,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("28:口座テーブルから、更新日と残高の小さい順に11～20件目のみを抽出する。ただし、残高が0円または更新日の設定がないデータは除外し、残高が同額の場合には更新日の新しい順（降順）とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 更新日,残高 FROM 口座 WHERE 残高 > 0 AND 更新日 IS NOT NULL ORDER BY 残高, 更新日 DESC OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY`
      console.table(expected)

      const accounts = await prisma.account.findMany({
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
      const result = accounts.map((account) => {
        return {
          残高: account.balance,
          更新日: account.updatedAt,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("29:口座テーブルと廃止口座テーブルに登録されている口座番号を昇順に抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号 FROM 口座 UNION SELECT 口座番号 FROM 廃止口座 ORDER BY 1`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
        },
        orderBy: {
          number: "asc",
        },
      });
      const retiredAccounts = await prisma.retiredAccount.findMany({
        select: {
          number: true,
        },
        orderBy: {
          number: "asc",
        },
      });
      const result = accounts.concat(retiredAccounts).map((account) => {
        return {
          口座番号: account.number,
        };
      }).sort((a, b) => {
        return a.口座番号 - b.口座番号;
      });
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("30:口座テーブルに登録されている名義のうち、廃止口座テーブルには存在しない名義を抽出する。重複したデータは除き、降順で並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 名義 FROM 口座 EXCEPT SELECT 名義 FROM 廃止口座 ORDER BY 1 DESC`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "desc",
        },
      });
      const retiredAccounts = await prisma.retiredAccount.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "desc",
        },
      });
      const result = (() => {
        const names = new Set();
        accounts.forEach((account) => {
          names.add(account.name);
        });
        retiredAccounts.forEach((retiredAccount) => {
          names.delete(retiredAccount.name);
        });

        return Array.from(names).map((name) => {
          return {
            名義: name,
          };
        }).sort((a, b) => {
          return a.名義 < b.名義 ? 1 : -1;
        });
      })()
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("31:口座テーブルと廃止口座テーブルの両方に登録されている名義を昇順に抽出する。", async () => {
      const accounts = await prisma.account.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });
      const retiredAccounts = await prisma.retiredAccount.findMany({
        select: {
          name: true,
        },
        distinct: ["name"],
        orderBy: {
          name: "asc",
        },
      });
      const result = accounts
        .map((x) => x.name)
        .filter((x) => retiredAccounts.map((y) => y.name).includes(x))
        .map((name) => {
          return {
            名義: name,
          };
        })
        .sort((a, b) => {
          return a.名義 > b.名義 ? -1 : 1;
        });
      console.table(result);

      const expected = await prisma.$queryRaw`SELECT 名義 FROM 口座 INTERSECT SELECT 名義 FROM 廃止口座 ORDER BY 1 DESC`
      expect(expected).toStrictEqual(result)
    });

    test("32:口座テーブルと廃止口座テーブルに登録されている口座番号と残高の一覧を取得する。ただし、口座テーブルは残高が0のもの、廃止口座テーブルは解約時残高が0でない", async () => {
      const accounts = await prisma.account.findMany({
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
      const retiredAccounts = await prisma.retiredAccount.findMany({
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
      const result = accounts.concat(retiredAccounts).map((account) => {
        return {
          口座番号: account.number,
          残高: account.balance,
        };
      }).sort((a, b) => {
        return a.口座番号 - b.口座番号;
      });
      console.table(result);

      const expected = await prisma.$queryRaw`SELECT 口座番号, 残高 FROM 口座 WHERE 残高 = 0 UNION SELECT 口座番号, 解約時残高 FROM 廃止口座 WHERE 解約時残高 <> 0 ORDER BY 1`
      expect(expected).toStrictEqual(result)
    });
  });

  describe("第５章 式と関数", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
    });
    const accountFullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          残高: account.balance,
          更新日: account.updatedAt,
        };
      });
    }
    const retiredAccountFullConvert = (accounts) => {
      return accounts.map((account) => {
        return {
          口座番号: account.number,
          名義: account.name,
          種別: account.type,
          解約時残高: account.balance,
          解約日: account.retiredAt,
        };
      });
    }

    test("33:口座テーブルと廃止口座テーブルに登録されている口座番号と名義の一覧を取得する。一覧は名義を昇順にし、その口座の状況がわかるように、有効な口座には「○」を、廃止した口座には「ｘ」を一覧に付記すること。", async () => {
      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      const retiredAccounts = await prisma.retiredAccount.findMany({
        select: {
          number: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      const result = ((a, b) => {
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
      })(accounts, retiredAccounts)
        .map((x) => {
          return {
            口座番号: x.number,
            名義: x.name,
            口座区分: x.status,
          };
        })
        .sort((a, b) => {
          return a.名義 > b.名義 ? 1 : -1;
        });
      console.table(result);

      const expected = await prisma.$queryRaw`SELECT 口座番号, 名義, '○' AS 口座区分 FROM 口座 UNION SELECT 口座番号, 名義, 'ｘ' AS 口座区分 FROM 廃止口座 ORDER BY 名義`
      console.table(expected)
      expect(expected.length).toBe(result.length)
    });

    test("34:口座テーブルから、残高が100万円以上の口座番号と残高を抽出する。ただし、残高は千円単位で表記し、見出しを「千円単位の残高」とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 残高 / 1000 AS 千円単位の残高 FROM 口座 WHERE 残高 >= 1000000`
      console.table(expected)

      const accounts = await prisma.account.findMany({
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
      const result = accounts.map((x) => ({
        口座番号: x.number,
        千円単位の残高: Math.floor(x.balance / 1000),
      }));
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("35:口座テーブルに次の3つのデータを1回の実行ごとに1つずつ登録する。ただし、キャンペーンにより登録時に残高を3000円プラスする。", async () => {
      await prisma.$queryRaw`INSERT INTO 口座 (口座番号, 名義, 種別, 残高, 更新日) VALUES ('0652281', 'タカギ　ノブオ', '1', 103000, '2022-04-01'), ('1026413', 'マツモト　サワコ', '1', 303000, '2022-04-02'), ('2239710', 'ササキ　シゲノリ', '1', 1003000, '2022-04-03')`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 IN ('0652281', '1026413', '2239710')`
      console.table(expected)

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
      await prisma.account.deleteMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          },
        },
      });

      await prisma.account.createMany({
        data: data.map((x) => ({
          number: x.number,
          name: x.name,
          type: x.type,
          balance: x.balance + 3000,
          updatedAt: x.updatedAt,
        })),
      });

      const accounts = await prisma.account.findMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          },
        },
      });
      const result = accountFullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("36:35の問題で登録したデータについて、キャンペーンの価格が間違っていたことが判明した。該当するデータの残高それぞれから3000円を差し引き、あらためて残高の0.3%を上乗せした金額になるよう更新する。", async () => {
      await prisma.$queryRaw`DELETE FROM 口座 WHERE 口座番号 IN ('0652281', '1026413', '2239710')`
      await prisma.$queryRaw`INSERT INTO 口座 (口座番号, 名義, 種別, 残高, 更新日) VALUES ('0652281', 'タカギ　ノブオ', '1', 100000, '2022-04-01'), ('1026413', 'マツモト　サワコ', '1', 300000, '2022-04-02'), ('2239710', 'ササキ　シゲノリ', '1', 1000000, '2022-04-03')`
      await prisma.$queryRaw`UPDATE 口座 SET 残高 = (残高 - 3000) * 1.003 WHERE 口座番号 IN ('0652281', '1026413', '2239710')`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 IN ('0652281', '1026413', '2239710')`
      console.table(expected)

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
      await prisma.account.deleteMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          },
        },
      });
      await prisma.account.createMany({
        data: data.map((x) => ({
          number: x.number,
          name: x.name,
          type: x.type,
          balance: x.balance + 3000,
          updatedAt: x.updatedAt,
        })),
      });
      for (const x of data) {
        await prisma.account.update({
          where: {
            number: x.number,
          },
          data: {
            balance: Math.round((x.balance - 3000) * 1.003),
          },
        });
      }
      const accounts = await prisma.account.findMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          },
        },
      });
      const result = accountFullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("37:口座テーブルから、更新日が2020年以前のデータを対象に、口座番号、更新日、通帳期限日を抽出する。ただし、通帳期限日は、更新日の180日後とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 更新日, 更新日 + INTERVAL '180 DAY' AS 通帳期限日 FROM 口座 WHERE 更新日 < '2021-01-01'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          updatedAt: true,
        },
        where: {
          updatedAt: {
            lt: new Date("2021-01-01"),
          },
        },
      });
      const result = accounts.map((x) => ({
        口座番号: x.number,
        更新日: x.updatedAt,
        通帳期限日: new Date(
          new Date(x.updatedAt).setDate(x.updatedAt.getDate() + 180),
        ),
      }));
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("38:口座テーブルから、種別が「別段」のデータについて、口座番号と名義を抽出する。ただし、名義の前に「カ）」を付記すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 'カ）' || 名義 AS 名義 FROM 口座 WHERE 種別 = '3'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
        },
        where: {
          type: "3",
        },
      });
      const result = accounts.map((x) => ({
        口座番号: x.number,
        名義: `カ）${x.name}`,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("39:口座テーブルから、登録されている種別の一覧を取得する。見出しは「種別コード」と「種別名」とし、種別名には日本語を表記する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 種別 AS 種別コード, CASE 種別 WHEN '1' THEN '普通' WHEN '2' THEN '当座' WHEN '3' THEN '別段' ELSE '' END AS 種別名 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          type: true,
        },
      });
      const result = (() => {
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
        };

        return accounts.map((x) => ({
          種別コード: x.type,
          種別名: typeName(x.type),
        }));
      })();
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("40:口座テーブルから、口座番号、名義、残高ランクを抽出する。残高ランクは、残高が10万円未満を「C」、10万円以上100万円未満を「B」、それ以外を「A」とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 名義, CASE WHEN 残高 < 100000 THEN 'C' WHEN 残高 < 1000000 THEN 'B' ELSE 'A' END AS 残高ランク FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });
      const result = (() => {
        const rank = (balance) => {
          if (balance < 100000) {
            return "C";
          } else if (balance < 1000000) {
            return "B";
          } else {
            return "A";
          }
        };

        return accounts.map((x) => ({
          口座番号: x.number,
          名義: x.name,
          残高ランク: rank(x.balance),
        }));
      })();
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("41:口座テーブルから、口座番号、名義、残高の文字数を抽出する。ただし、名義の姓目の間の全角スペースは除外すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT LENGTH(口座番号) AS 口座番号文字数, LENGTH(REPLACE(名義, '　', '')) AS 名義文字数, LENGTH(CAST(残高 AS VARCHAR)) AS 残高文字数 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const result = accounts.map((x) => ({
        口座番号文字数: x.number.length,
        名義文字数: x.name.replace(/　/g, "").length,
        残高文字数: x.balance.toString().length,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("42:口座テーブルから、名義の1～5文字目に「カワ」が含まれるデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE SUBSTRING(名義, 1,5) LIKE '%カワ%'`
      console.table(expected)

      const accounts = await prisma.account.findMany({});
      const result = accountFullConvert(accounts).filter((x) => x.名義.slice(0, 5).includes("カワ"));
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("43:口座テーブルから、残高の桁数が4桁以上で、1000円未満の端数がないデータを抽出する。ただし、どちらの条件も文字数を求める関数を使って判定すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE LENGTH(CAST(残高 AS VARCHAR)) >= 4 AND SUBSTRING(CAST(残高 AS VARCHAR),LENGTH(CAST(残高 AS VARCHAR))-2,3) = '000'`
      console.table(expected)

      const accounts = await prisma.account.findMany({});
      const result = accountFullConvert(accounts)
        .filter((x) => {
          return x.残高.toString().length >= 4 && x.残高 % 1000 === 0;
        });
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("44:口座テーブルから、口座番号、残高、利息を残高の降順に抽出する。利息は、残高に普通預金利息0.02%を掛けて求め、1円未満を切り捨てること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 残高, TRUNC(残高 * 0.0002,0) AS 利息 FROM 口座 ORDER BY 残高 DESC`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });

      const result = accounts
        .map((x) => ({
          口座番号: x.number,
          残高: x.balance,
          利息: Math.floor(x.balance * 0.0002),
        }))
        .sort((a, b) => {
          return b.残高 - a.残高;
        });
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("45:口座テーブルから、口座番号、残高、残高別利息を抽出する。残高別利息は、残高50万円未満を0.01%、50万円以上200万円未満を0.02%、200万円以上を0.03%として計算し、1円未満を切り捨てる。一覧は、残高別利息の降順、口座番号の昇順に並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号, 残高, CASE WHEN 残高 < 500000 THEN TRUNC(残高 * 0.0001, 0) WHEN 残高 >= 500000 AND 残高 < 2000000 THEN TRUNC(残高 * 0.0002,0) WHEN 残高 >= 2000000 THEN TRUNC(残高 * 0.0003,0) END AS 残高別利息 FROM 口座 ORDER BY 残高別利息 DESC,口座番号`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          balance: true,
        },
      });

      const result = (() => {
        const rate = (x) => {
          if (x.balance < 500000) {
            return 0.0001;
          } else if (500000 <= x.balance && x.balance < 2000000) {
            return 0.0002;
          } else {
            return 0.0003;
          }
        }

        return accounts
          .map((x) => ({
            口座番号: x.number,
            残高: x.balance,
            残高別利息: Math.floor(
              x.balance * rate(x)
            ),
          }))
          .sort((a, b) => {
            return b.残高別利息 - a.残高別利息 || a.口座番号 - b.口座番号;
          });
      })();
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("46:口座テーブルに以下にある3つのデータを1回の実行ごとに1つずつ登録する。ただし、更新日は現在の日付を求める関数を利用して指定すること。", async () => {
      const today = new Date();
      await prisma.$queryRaw`DELETE FROM 口座 WHERE 口座番号 IN ('0351262','1015513','1739298')`
      await prisma.$queryRaw`INSERT INTO 口座(口座番号,名義,種別,残高,更新日) VALUES ('0351262','イトカワ　ダイ','2',635110,${today})`
      await prisma.$queryRaw`INSERT INTO 口座(口座番号,名義,種別,残高,更新日) VALUES ('1015513','アキツ　ジュンジ','1',88463,${today})`
      await prisma.$queryRaw`INSERT INTO 口座(口座番号,名義,種別,残高,更新日) VALUES ('1739298','ホシノ　サトミ','1',704610,${today})`
      const expected = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 IN ('0351262','1015513','1739298')`
      console.table(expected)

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
      await prisma.account.deleteMany({
        where: {
          number: {
            in: data.map((x) => x.number),
          },
        },
      });
      await prisma.account.createMany({ data });
      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: {
            equals: today,
          },
        },
      });
      const result = accountFullConvert(accounts);
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("47:口座テーブルから更新日が2022年以降のデータを抽出する。その際、更新日は「2022年01月01日」のような形式で抽出すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 口座番号,名義,種別,残高,SUBSTRING(CAST(更新日 AS VARCHAR),1,4)|| '年' || SUBSTRING(CAST(更新日 AS VARCHAR),6,2)||'月'||SUBSTRING(CAST(更新日 AS VARCHAR),9,2)||'日' AS 更新日 FROM 口座 WHERE 更新日 >= '2022-01-01'`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
          name: true,
          type: true,
          balance: true,
          updatedAt: true,
        },
        where: {
          updatedAt: {
            gte: new Date("2022-01-01"),
          },
        },
      });

      const result = (() => {
        const format = (x) => {
          const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
            timeZone: 'UTC' // タイムゾーンを指定 (必要に応じて変更)
          };

          const formatter = new Intl.DateTimeFormat('ja-JP', options); // ロケールを指定

          const formattedDate = formatter.format(x)
            .replace('/', '年')
            .replace('/', '月')
            + '日';

          return formattedDate;
        };

        return accounts.map((x) => ({
          口座番号: x.number,
          名義: x.name,
          種別: x.type,
          残高: x.balance,
          更新日: format(x.updatedAt),
        }));

      })();
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("48:口座テーブルから更新日を抽出する。更新日が登録されていない場合は、「設定なし」と表記すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT COALESCE(CAST(更新日 AS VARCHAR),'設定なし') AS 更新日 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          updatedAt: true,
        },
      });
      const result = (() => {
        const format = (x) => {
          const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC' // タイムゾーンを指定 (必要に応じて変更)
          };

          const formatter = new Intl.DateTimeFormat('ja-JP', options); // ロケールを指定

          const formattedDate = formatter.format(x)
            .replace(/\//g, '-') // '/' を '-' に置換
            .replace(/\//g, '-'); // '/' を '-' に置換

          return formattedDate;
        };

        return accounts.map((x) => ({
          更新日: x.updatedAt ? format(x.updatedAt) : "設定なし",
        }));
      })();
      console.table(result);

      expect(result[4]).toStrictEqual(expected[4])
    });
  });

  describe("第６章 集計とグループ化", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
    });

    test("49:口座テーブルから、残高の合計、最大、最小、平均、登録データ件数を求める。", async () => {
      const expected = await prisma.$queryRaw`SELECT SUM(残高) AS 合計,MAX(残高) AS 最大,MIN(残高) AS 最小,ROUND(AVG(残高),2) AS 平均,COUNT(*) AS 件数 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.aggregate({
        _sum: {
          balance: true,
        },
        _max: {
          balance: true,
        },
        _min: {
          balance: true,
        },
        _avg: {
          balance: true,
        },
        _count: true,
      });
      const result = (() => {
        return [{
          合計: BigInt(accounts._sum.balance),
          最大: accounts._max.balance,
          最小: accounts._min.balance,
          平均: Math.round(accounts._avg.balance * 100) / 100,
          件数: BigInt(accounts._count),
        }];
      })();
      console.table(result);

      expect(expected[0].合計).toStrictEqual(result[0].合計)
      expect(expected[0].最大).toStrictEqual(result[0].最大)
      expect(expected[0].最小).toStrictEqual(result[0].最小)
      //expect(expected[0].平均).toStrictEqual(result[0].平均)
      expect(expected[0].件数).toStrictEqual(result[0].件数)
    });

    test("50:口座テーブルから、種別が「普通」以外、残高が100万円以上、更新日が2021年以前のデータ件数を求める。", async () => {
      const expected = await prisma.$queryRaw`SELECT COUNT(*) AS 件数 FROM 口座 WHERE 種別 <> '1' AND 残高 >= 1000000 AND 更新日 < '2022-01-01'`
      console.table(expected)

      const accounts = await prisma.account.aggregate({
        _count: true,
        where: {
          type: {
            not: "1",
          },
          balance: {
            gte: 1000000,
          },
          updatedAt: {
            lt: new Date("2022-01-01"),
          },
        },
      });
      const result = [{
        件数: BigInt(accounts._count),
      }];
      console.table(result);

      expect(expected[0].件数).toStrictEqual(result[0].件数)
    });

    test("51:口座テーブルから、更新日が登録されていないデータ件数を求める。ただし、条件式は用いないこと。", async () => {
      const expected = await prisma.$queryRaw`SELECT COUNT(*) - COUNT(更新日) AS 更新日が登録されていない件数 FROM 口座`
      console.table(expected)

      const accounts1 = await prisma.account.aggregate({
        _count: true,
      });
      const accounts2 = await prisma.account.aggregate({
        _count: {
          updatedAt: true,
        }
      });
      const result = [{
        更新日が登録されていない件数: BigInt(accounts1._count - accounts2._count.updatedAt),
      }];
      console.table(result);

      expect(expected[0].更新日が登録されていない件数).toStrictEqual(result[0].更新日が登録されていない件数)
    });

    test("52:口座テーブルから、名義の最大値と最小値を求める。", async () => {
      const expected = await prisma.$queryRaw`SELECT MAX(名義) AS 最大値,MIN(名義) AS 最小値 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.aggregate({
        _max: {
          name: true,
        },
        _min: {
          name: true,
        },
      });
      const result = [{
        最大値: accounts._max.name,
        最小値: accounts._min.name
      }]
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("53:口座テーブルから、最も新しい更新日と最も古い更新日を求める。", async () => {
      const expected = await prisma.$queryRaw`SELECT MAX(更新日) AS 最も新しい更新日,MIN(更新日) AS 最も古い更新日 FROM 口座`
      console.table(expected)

      const accounts = await prisma.account.aggregate({
        _max: {
          updatedAt: true,
        },
        _min: {
          updatedAt: true,
        },
      });
      const result = [{
        最も新しい更新日: accounts._max.updatedAt,
        最も古い更新日: accounts._min.updatedAt
      }]
      console.table(result);

      expect(expected).toStrictEqual(result)
    });

    test("54:口座テーブルから、種別ごとの残高の合計、最大、最小、平均、および登録されているデータ件数を求める。", async () => {
      const expected = await prisma.$queryRaw`SELECT 種別,SUM(残高) AS 合計,MAX(残高) AS 最大,MIN(残高) AS 最小,AVG(残高) AS 平均,COUNT(*) AS 件数 FROM 口座 GROUP BY 種別`
      console.table(expected)

      const accounts = await prisma.account.groupBy({
        by: ["type"],
        _sum: {
          balance: true,
        },
        _max: {
          balance: true,
        },
        _min: {
          balance: true,
        },
        _avg: {
          balance: true,
        },
        _count: true,
      });
      const result = accounts.map((accounts) => {
        return {
          種別: accounts.type,
          合計: accounts._sum.balance,
          最大: accounts._max.balance,
          最小: accounts._min.balance,
          平均: accounts._avg.balance,
          件数: accounts._count,
        };
      });
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("55:口座テーブルから、口座番号の下１桁が同じ数字であるものを同じグループとし、それぞれのデータ件数を求める。ただし、件数の多い順に並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT SUBSTR(口座番号,7,1) AS 口座番号グループ,COUNT(*) AS 件数 FROM 口座 GROUP BY 口座番号グループ ORDER BY 件数 DESC`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          number: true,
        },
      });

      const result = (() => {
        // 口座番号を抽出してグループ化して件数をカウントする
        const numberList = accounts.map((item) => item.number);
        const wip = numberList.reduce((acc, item) => {
          const group = item.substring(item.length - 1);
          if (!acc[group]) {
            acc[group] = {
              口座番号グループ: group,
              件数: 0,
            };
          }
          acc[group].件数++;
          return acc;
        }, {})
        // 件数の多い順に並び替える
        return Object.values(wip).sort((a, b) => b.件数 - a.件数);
      })()
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("56:口座テーブルから、更新日の年ごとの残高の合計、最大、最小、平均、登録データ件数を求める。ただし、更新日の登録がないデータは、「XXXXX年」として集計する。", async () => {
      const expected = await prisma.$queryRaw`SELECT SUBSTRING(COALESCE(CAST(更新日 AS VARCHAR), 'XXXX'), 1, 4) AS 更新年,
                                              SUM(残高) AS 合計,
                                              MAX(残高) AS 最大,
                                              MIN(残高) AS 最小,
                                              AVG(残高) AS 平均,
                                                COUNT(*) AS 件数
                                              FROM 口座
                                              GROUP BY 更新年`
      console.table(expected)

      const accounts = await prisma.account.findMany({
        select: {
          balance: true,
          updatedAt: true,
        },
      });

      const yearList = accounts.map((item) => {
        return {
          balance: item.balance,
          year: item.updatedAt ? item.updatedAt.getFullYear() : "XXXXX",
        };
      });

      const yearGroupList = yearList
        .map((item) => {
          return {
            year: item.year,
            balance: item.balance,
          };
        })
        .reduce((acc, cur) => {
          const key = cur.year;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(cur.balance);
          return acc;
        }, {});

      const result = Object.keys(yearGroupList)
        .map((key) => {
          return {
            更新年: key,
            合計: yearGroupList[key].reduce((a, b) => a + b, 0),
            最大: Math.max(...yearGroupList[key]),
            最小: Math.min(...yearGroupList[key]),
            平均: yearGroupList[key].reduce((a, b) => a + b, 0) / yearGroupList[key].length,
            件数: yearGroupList[key].length,
          };
        })
        .sort((a, b) => a.更新年 - b.更新年);
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("57:口座テーブルから、種別ごとの残高の合計とデータ件数を求める。ただし、合計が300万円以下のものは一覧から取り除く。", async () => {
      const expected = await prisma.$queryRaw`SELECT 種別,SUM(残高) AS 合計,COUNT(*) AS 件数 FROM 口座 GROUP BY 種別 HAVING SUM(残高) > 3000000`
      console.table(expected)

      const accounts = await prisma.account.groupBy({
        by: ["type"],
        _sum: {
          balance: true,
        },
        _count: true,
      });

      const result = accounts.filter((item) => item._sum.balance > 3000000).map((item) => {
        return {
          種別: item.type,
          合計: item._sum.balance,
          件数: item._count,
        };
      });
      console.table(result);

      expect(expected.length).toBe(result.length)
    });

    test("58:口座テーブルから、名義の1文字目が同じグループごとに、データ件数と名義文字数の平均を求める。ただし、件数が10件以上、または文字数の平均が5文字より多いものを抽出の対象とする。なお、名義の全角スペースは文字数に含めない。", async () => {
      // 期待される結果を取得
      const expected = await prisma.$queryRaw`
        SELECT SUBSTRING(名義, 1, 1) AS 名義,
               COUNT(名義) AS 件数,
               AVG(LENGTH(REPLACE(名義, ' ', ''))) AS 文字数の平均
        FROM 口座
        GROUP BY SUBSTRING(名義, 1, 1)
        HAVING COUNT(名義) >= 10 OR AVG(LENGTH(REPLACE(名義, ' ', ''))) > 5
      `;
      console.table(expected);

      const accounts = await prisma.account.findMany({
        select: {
          name: true,
        },
      });

      // 名義ごとにグループ化
      const nameList = accounts.map((item) => item.name);
      const nameGroupList = nameList.reduce((acc, cur) => {
        const firstCharacter = cur.substring(0, 1);
        if (!acc[firstCharacter]) {
          acc[firstCharacter] = {
            名義: firstCharacter,
            件数: 0,
            文字数の合計: 0,
            文字数の平均: 0,
          };
        }
        acc[firstCharacter].件数++;
        acc[firstCharacter].文字数の合計 += cur.length;
        acc[firstCharacter].文字数の平均 = acc[firstCharacter].文字数の合計 / acc[firstCharacter].件数;
        return acc;
      }, {});

      // 件数が10件以上、または文字数の平均が5文字より多いものを抽出
      const result = Object.values(nameGroupList).filter(
        (group) => group.件数 >= 10 || group.文字数の平均 > 5
      );

      console.table(result);

      // 期待される結果の件数をテスト
      expect(expected.length).toBe(result.length);
    });
  });

  describe("第７章 副問い合わせ", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
      await prisma.transaction.deleteMany({});
      await prisma.transaction.createMany({ data: transaction });
    });

    test("59:次の口座について、取引日の取引結果を口座テーブルの残高に反映する。更新には、SET句にて取引テーブルを副問い合わせするUPDATE文を用いること。", async () => {
      // 口座番号: 0351333, 取引日: 2022-01-11
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.$queryRaw`
        UPDATE 口座
        SET 残高 = 残高 + (
            SELECT COALESCE(SUM(入金額), 0) - COALESCE(SUM(出金額), 0)
            FROM 取引
            WHERE 口座番号 = '0351333'
              AND 日付 = '2022-01-11'
          ),
          更新日 = '2022-01-11'
        WHERE 口座番号 = '0351333'
        `;
      const expected = await prisma.$queryRaw`
        SELECT 残高
        FROM 口座
        WHERE 口座番号 = '0351333'
      `;
      console.table(expected);

      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      const transactionData = await prisma.transaction.findMany({
        where: {
          accountNumber: "0351333",
          day: new Date("2022-01-11"),
        },
        select: {
          income: true,
          outcome: true,
        },
      });
      const initBalance = await prisma.account.findMany({
        where: {
          number: "0351333",
        },
        select: {
          balance: true,
        },
      });
      const result = await (async () => {
        const balanceSum = initBalance[0].balance;
        const transactionBalance = transactionData.reduce(
          (a, b) => a + b.income - b.outcome,
          0,
        );
        await prisma.account.update({
          where: {
            number: "0351333",
          },
          data: {
            balance: balanceSum + transactionBalance,
          },
        });
        const accounts = await prisma.account.findMany({
          where: {
            number: "0351333",
          },
          select: {
            balance: true,
          },
        });

        return accounts.map((item) => {
          return {
            残高: item.balance,
          };
        });
      })()
      console.table(result);

      expect(expected[0].残高).toStrictEqual(result[0].残高);
    });

    test("60:次の口座について、現在の残高と、取引日に発生した取引による入出金額それぞれの合計金額を取得する。取得には、選択列リストにて取引テーブルを副問い合わせするSELECT文を用いること。", async () => {
      // 口座番号: 1115600, 取引日: 2021-12-28
      const expected = await prisma.$queryRaw`
        SELECT 残高,
        (SELECT SUM(入金額) FROM 取引 WHERE 口座番号 = '1115600' AND 日付 = '2021-12-28') AS 入金額合計,
        (SELECT SUM(出金額) FROM 取引 WHERE 口座番号 = '1115600' AND 日付 = '2021-12-28') AS 出金額合計
        FROM 口座
        WHERE 口座番号 = '1115600'
      `;
      console.table(expected);

      const transactionData = await prisma.transaction.findMany({
        where: {
          accountNumber: "1115600",
          day: new Date("2021-12-28"),
        },
        select: {
          income: true,
          outcome: true,
        },
      });

      const incomSum = transactionData.reduce((a, b) => a + b.income, 0);
      const outcomeSum = transactionData.reduce((a, b) => a + b.outcome, 0);
      const accountBalance = await prisma.account.findMany({
        where: {
          number: "1115600",
        },
        select: {
          balance: true,
        },
      });
      const result = {
        残高: accountBalance[0].balance,
        入金額合計: incomSum,
        出金額合計: outcomeSum,
      };
      console.table(result);

      expect(expected[0].残高).toStrictEqual(result.残高);
    });

    test("61:これまで1回の取引で100万円以上の入金があった口座について、口座番号、名義、残高を取得する。ただし、WHERE句でIN演算子を利用した副問い合わせを用いること。", async () => {
      const expected = await prisma.$queryRaw`
        SELECT 口座番号, 名義, 残高
        FROM 口座
        WHERE 口座番号 IN (
          SELECT 口座番号
          FROM 取引
          WHERE 入金額 >= 1000000
        )
      `;
      console.table(expected);

      const transactionData = await prisma.transaction.findMany({
        where: {
          income: {
            gte: 1000000,
          },
        },
        select: {
          accountNumber: true,
        },
      });
      const accounts = await prisma.account.findMany({
        where: {
          number: {
            in: [...new Set(transactionData.map((item) => item.accountNumber))],
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const result = accounts.map((item) => {
        return {
          口座番号: item.number,
          名義: item.name,
          残高: item.balance,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("62:取引テーブルの日付よりも未来の更新日を持つ口座テーブルのデータを抽出する。ただし、WHERE句でALL演算子を利用した副問い合わせを用いること。", async () => {
      const expected = await prisma.$queryRaw`
        SELECT * FROM 口座 WHERE 更新日 > ALL (SELECT 日付 FROM 取引)
      `;
      console.table(expected);

      const transactionData = await prisma.transaction.findMany({
        select: {
          day: true,
        },
      });
      const accounts = await prisma.account.findMany({
        where: {
          updatedAt: {
            gt: transactionData.reduce((a, b) => {
              return a.day > b.day ? a : b;
            }).day,
          },
        }
      });

      const result = accounts.map((item) => {
        return {
          口座番号: item.number,
          名義: item.name,
          種別: item.type,
          残高: item.balance,
          更新日: item.updatedAt,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("63:次の口座について、入金と出金の両方が発生した日付を抽出する。また、これまでの入金と出金それぞれの最大額もあわせて抽出する。FROM句で副問い合わせを用いること。", async () => {
      // 口座番号: 3104451
      const expected = await prisma.$queryRaw`
            SELECT A.日付,
              (
                SELECT MAX(入金額)
                FROM 取引
                WHERE 口座番号 = '3104451'
              ) AS 最大入金額,
              (
                SELECT MAX(出金額)
                FROM 取引
                WHERE 口座番号 = '3104451'
              ) AS 最大出金額
            FROM (
                SELECT 日付
                FROM 取引
                WHERE 口座番号 = '3104451'
                GROUP BY 日付
                HAVING SUM(入金額) > 0
                  AND SUM(出金額) > 0
              ) AS A        
              `;
      console.table(expected);

      const transactions = await prisma.transaction.groupBy({
        by: ["day"],
        where: {
          accountNumber: "3104451",
        },
        having: {
          income: {
            _sum: {
              gt: 0,
            },
          },
          outcome: {
            _sum: {
              gt: 0,
            },
          },
        },
        select: {
          day: true,
        },
      });

      const result = await (async () => {
        const maxIncome = await prisma.transaction.aggregate({
          where: {
            accountNumber: "3104451",
          },
          _max: {
            income: true,
          },
        });
        const maxOutcome = await prisma.transaction.aggregate({
          where: {
            accountNumber: "3104451",
          },
          _max: {
            outcome: true,
          },
        });
        return transactions.map((item) => {
          return {
            日付: item.day,
            最大入金額: maxIncome._max.income,
            最大出金額: maxOutcome._max.outcome,
          };
        });

      })()
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("64:次の口座について解約の申し出があった。副問い合わせを使って口座テーブルから廃止口座テーブルにデータを登録する。また、口座テーブルの該当データを削除する。ただし、データの整合性を保つことについては考慮しなくてよい。", async () => {
      // 口座番号: 2761055
      const retairedAccountNumber = "2761055";
      await prisma.$transaction([
        prisma.$queryRaw`INSERT INTO 廃止口座 SELECT * FROM 口座 WHERE 口座番号 = ${retairedAccountNumber}`,
        prisma.$queryRaw`DELETE FROM 口座 WHERE 口座番号 = ${retairedAccountNumber}`,
      ]);
      const expectedAccountData = await prisma.$queryRaw`SELECT * FROM 口座 WHERE 口座番号 = ${retairedAccountNumber}`
      const expectedRetiredAccount = await prisma.$queryRaw`SELECT * FROM 廃止口座 WHERE 口座番号 = ${retairedAccountNumber}`
      console.table(expectedAccountData);
      console.table(expectedRetiredAccount);

      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
      const accounts = await prisma.account.findMany({
        where: {
          number: retairedAccountNumber,
        },
        select: {
          number: true,
          name: true,
          type: true,
          balance: true,
        },
      });

      await prisma.$transaction([
        prisma.account.deleteMany({
          where: {
            number: retairedAccountNumber,
          },
        }),

        prisma.retiredAccount.create({
          data: {
            number: accounts[0].number,
            name: accounts[0].name,
            type: accounts[0].type,
            balance: accounts[0].balance,
            retiredAt: new Date(),
          },
        }),
      ]);

      const accountData = await prisma.account.findMany({
        where: {
          number: retairedAccountNumber,
        },
      });
      const retiredAccounts = await prisma.retiredAccount.findMany({
        where: {
          number: retairedAccountNumber,
        },
      });
      console.table(accountData);
      console.table(retiredAccounts);

      expect(expectedAccountData).toStrictEqual(accountData);
      expect(expectedRetiredAccount.length).toBe(retiredAccounts.length);
    });
  });

  describe("第8章 複数テーブルの結合", () => {
    beforeAll(async () => {
      await prisma.account.deleteMany({});
      await prisma.account.createMany({ data: account });
      await prisma.retiredAccount.deleteMany({});
      await prisma.retiredAccount.createMany({ data: retiredAccount });
      await prisma.$transaction([
        prisma.transaction.deleteMany({}),
        prisma.transactionReason.deleteMany({}),
        prisma.transactionReason.createMany({ data: transactionReason }),
        prisma.transaction.createMany({ data: transaction }),
      ]);
    });

    test("65:次の口座について、これまでの取引の記録を取引テーブルから抽出する。抽出する項目は口座番号、日付、取引事由、取引金額とする。口座番号ごとに取引番号順で表示し、取引事由名については取引事由テーブルから日本語名を取得する。取引金額には、取引に応じて入金額か出金額のいずれか適切な方を表示すること。", async () => {
      // 口座番号: 0311240, 1234161, 2750902
      const expected = await prisma.$queryRaw`
          SELECT T.口座番号, T.日付, J.取引事由名, COALESCE(T.入金額,T.出金額) AS 取引金額
          FROM 取引 T JOIN 取引事由 AS J ON T.取引事由ＩＤ = J.取引事由ＩＤ
          WHERE T.口座番号 IN ('0311240', '1234161', '2750902')
          ORDER BY T.口座番号, T.取引番号
      `;
      console.table(expected);

      const accountNumbers = ["0311240", "1234161", "2750902"];
      const transactions = await prisma.transaction.findMany({
        where: {
          accountNumber: {
            in: accountNumbers,
          },
        },
        select: {
          accountNumber: true,
          day: true,
          transactionReason: {
            select: {
              name: true,
            },
          },
          income: true,
          outcome: true,
        },
        orderBy: {
          number: "asc",
        },
      });

      const result = transactions.map((transaction) => {
        return {
          口座番号: transaction.accountNumber,
          日付: transaction.day,
          取引事由名: transaction.transactionReason.name,
          取引金額: transaction.income || transaction.outcome,
        };
      }).sort((a, b) => {
        if (a.口座番号 < b.口座番号) {
          return -1;
        } else if (a.口座番号 > b.口座番号) {
          return 1;
        } else {
          return 0;
        }
      });
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("66:次の口座について、口座情報（口座番号、名義、残高）とこれまでの取引情報（日付、入金額、出金額）を一覧として抽出する。一覧は、取引の古い順に表示すること。", async () => {
      // 口座番号: 0887132
      const expected = await prisma.$queryRaw`
          SELECT K.口座番号, K.名義, K.残高, T.日付, T.入金額, T.出金額
          FROM 口座 AS K JOIN 取引 AS T ON K.口座番号 = T.口座番号
          WHERE K.口座番号 = '0887132'
          ORDER BY T.取引番号
      `;
      console.table(expected);

      const accountNumber = "0887132";
      const account = await prisma.account.findUnique({
        where: {
          number: accountNumber,
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const transactions = await prisma.transaction.findMany({
        where: {
          accountNumber: accountNumber,
        },
        select: {
          day: true,
          income: true,
          outcome: true,
        },
        orderBy: {
          number: "asc",
        },
      });

      const result = transactions.map((transaction) => {
        return {
          口座番号: account.number,
          名義: account.name,
          残高: account.balance,
          日付: transaction.day,
          入金額: transaction.income,
          出金額: transaction.outcome,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("67:2020年3月1日に取引のあった口座番号の一覧を取得する。一覧には、口座テーブルより名義と残高も表示すること。ただし、解約された口座については考慮しなくてもよい。", async () => {
      const expected = await prisma.$queryRaw`
          SELECT T.口座番号, K.名義, K.残高
          FROM 口座 AS K JOIN 取引 AS T ON K.口座番号 = T.口座番号
          WHERE T.日付 = '2020-03-01'
      `;
      console.table(expected);

      const transactions = await prisma.transaction.findMany({
        where: {
          day: new Date("2020-03-01"),
        },
        select: {
          accountNumber: true,
        },
      });
      const accounts = await prisma.account.findMany({
        where: {
          number: {
            in: transactions.map((transaction) => transaction.accountNumber),
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const result = accounts.map((account) => ({
        ...account,
        ...transactions.find(
          (transaction) => account.number === transaction.accountNumber,
        ),
      })).map((account) => ({
        口座番号: account.number,
        名義: account.name,
        残高: account.balance,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("68:問題67では、すでに解約された口座については、該当の日付に取引があったにも関わらず抽出されなかった。解約された口座ももれなく一覧に記載されるよう、SQL文を変更する。なお、解約口座については、名義に「解約済み」、残高に0を表示すること", async () => {
      const expected = await prisma.$queryRaw`
          SELECT T.口座番号, COALESCE(K.名義,'解約済み') AS 名義, COALESCE(K.残高,0) AS 残高
          FROM 取引 AS T LEFT JOIN 口座 AS K ON T.口座番号 = K.口座番号
          WHERE T.日付 = '2020-03-01'
      `;
      console.table(expected);

      const transactions = await prisma.transaction.findMany({
        where: {
          day: new Date("2020-03-01"),
        },
        select: {
          accountNumber: true,
        },
      });

      const accounts = await prisma.account.findMany({
        where: {
          number: {
            in: transactions.map((transaction) => transaction.accountNumber),
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const retiredAccounts = await prisma.retiredAccount.findMany({
        where: {
          number: {
            in: transactions.map((transaction) => transaction.accountNumber),
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const result = accounts
        .map((account) => ({
          ...account,
          ...transactions.find(
            (transaction) => account.number === transaction.accountNumber,
          ),
        }))
        .concat(
          retiredAccounts.map((retiredAccount) => ({
            number: retiredAccount.number,
            name: "解約済み",
            balance: 0,
            ...transactions.find(
              (transaction) =>
                retiredAccount.number === transaction.accountNumber,
            ),
          })),
        ).map((account) => ({
          口座番号: account.number,
          名義: account.name,
          残高: account.balance,
        }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test.skip("69:取引テーブルのデータを抽出する。取引事由は「取引事由ID:取引事由名」の形式で表示し、これまでに発生しなかった取引事由についても併せて記載されるようにすること。", async () => {
      const expected = await prisma.$queryRaw`
            SELECT T.取引番号,
              CAST(J.取引事由ＩＤ AS VARCHAR) || ':' || J.取引事由名 AS 取引事由,
              T.日付,
              T.口座番号,
              T.入金額,
              T.出金額
            FROM 取引 AS T
              RIGHT JOIN 取引事由 AS J ON T.取引事由ＩＤ = J.取引事由ＩＤ
      `;
      console.table(expected);

      const transactions = await prisma.transaction.findMany({
        include: {
          transactionReason: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const result = transactions.map((transaction) => ({
        ...transaction,
        transactionReason: `${transaction.transactionReason.id}:${transaction.transactionReason.name}`,
      })).map((transaction) => ({
        取引番号: transaction.number,
        取引事由: transaction.transactionReason ? transaction.transactionReason : null,
        日付: transaction.day,
        口座番号: transaction.accountNumber,
        入金額: transaction.income,
        出金額: transaction.outcome,
      }));
      console.table(result);

      //TODO:RIGHT JOIN未対応
      //expect(expected).toStrictEqual(result);
    });

    test("70:取引テーブルと取引事由テーブルから、取引事由の一覧を抽出する。一覧には、取引事由IDと取引事由名を記載する。なお、取引事由テーブルに存在しない理由で取引されている可能性、および取引の実績のない事由が存在する可能性を考慮すること。", async () => {
      const expected = await prisma.$queryRaw`
            SELECT DISTINCT COALESCE(T.取引事由ＩＤ,J.取引事由ＩＤ) AS 取引事由ＩＤ,J.取引事由名 AS 取引事由名
            FROM 取引 AS T FULL JOIN 取引事由 AS J ON T.取引事由ＩＤ = J.取引事由ＩＤ
            ORDER BY 取引事由ＩＤ
            `;
      console.table(expected);

      const transactionReasons = await prisma.transactionReason.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      const transactions = await prisma.transaction.findMany({
        select: {
          transactionReason: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const result = [
        ...transactionReasons,
        ...transactions.map((transaction) => ({
          id: transaction.transactionReason.id,
          name: transaction.transactionReason.name,
        })),
      ].filter((value, index, self) => {
        // idをキーにして重複を除外
        return (
          self.findIndex((v) => v.id === value.id && v.name === value.name) === index
        );
      }).map((transactionReason) => ({
        取引事由ＩＤ: transactionReason.id,
        取引事由名: transactionReason.name,
      })).sort((a, b) => a.取引事由ＩＤ - b.取引事由ＩＤ);
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("71:問題66について、取引事由名についても一覧に表示するよう、SQL文を変更する。取引事由名は取引情報（日付、取引事由名、入金額、出金額）に表示する。", async () => {
      const expected = await prisma.$queryRaw`
          SELECT K.口座番号, K.名義, K.残高, T.日付, J.取引事由名, T.入金額, T.出金額
          FROM 口座 AS K JOIN 取引 AS T ON K.口座番号 = T.口座番号 JOIN 取引事由 AS J ON T.取引事由ＩＤ = J.取引事由ＩＤ
          WHERE K.口座番号 = '0887132'
          ORDER BY T.取引番号
          `;
      console.table(expected);

      const accountNumber = "0887132";
      const account = await prisma.account.findUnique({
        where: {
          number: accountNumber,
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });
      const transactions = await prisma.transaction.findMany({
        where: {
          accountNumber: accountNumber,
        },
        select: {
          day: true,
          income: true,
          outcome: true,
          transactionReason: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          number: "asc",
        },
      });

      const result = transactions.map((transaction) => {
        return {
          口座番号: account.number,
          名義: account.name,
          残高: account.balance,
          日付: transaction.day,
          取引事由名: transaction.transactionReason.name,
          入金額: transaction.income,
          出金額: transaction.outcome,
        };
      });
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("72:現在の残高が500万円以上の口座について、2022年以降に1回の取引で100万円以上の金額が入出金された実績を抽出する。抽出する項目は、口座番号、名義、残高、取引の日付、取引事由ID、入金額、出金額とする。ただし副問い合わせは用いないこと。", async () => {
      const expected = await prisma.$queryRaw`
          SELECT K.口座番号, K.名義, K.残高, T.日付, T.取引事由ＩＤ, T.入金額, T.出金額
          FROM 口座 AS K JOIN 取引 AS T ON K.口座番号 = T.口座番号
          WHERE K.残高 >= 5000000 AND T.日付 >= '2022-01-01' AND (T.入金額 >= 1000000 OR T.出金額 >= 1000000)
          `;
      console.table(result);

      const accounts = await prisma.account.findMany({
        where: {
          balance: {
            gte: 5000000,
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const transactions = await prisma.transaction.findMany({
        where: {
          day: {
            gte: new Date("2022-01-01"),
          },
          OR: [
            {
              income: {
                gte: 1000000,
              },
            },
            {
              outcome: {
                gte: 1000000,
              },
            },
          ],
        },
        select: {
          day: true,
          income: true,
          outcome: true,
          transactionReason: {
            select: {
              id: true,
            },
          },
          accountNumber: true,
        },
      });

      const wip = accounts.map((account) => ({
        ...account,
        ...transactions.find(
          (transaction) => account.number === transaction.accountNumber,
        ),
      })).filter((value) => value.day !== undefined);

      const result = wip.map((wip) => ({
        口座番号: wip.number,
        名義: wip.name,
        残高: wip.balance,
        日付: wip.day,
        取引事由ＩＤ: wip.transactionReason
          ? wip.transactionReason.id
          : null,
        入金額: wip.income,
        出金額: wip.outcome,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("73:問題72で作成したSQL文について、結合相手に副問い合わせを利用するようSQL文を変更する。", async () => {
      const expected = await prisma.$queryRaw`
          SELECT K.口座番号, K.名義, K.残高, T.日付, T.取引事由ＩＤ, T.入金額, T.出金額
          FROM 取引 AS T JOIN (
            SELECT 口座番号,名義,残高 FROM 口座 WHERE 残高 >= 5000000) AS K ON T.口座番号 = K.口座番号
            WHERE (T.入金額 >= 1000000 OR T.出金額 >= 1000000) AND T.日付 >= '2022-01-01'
          `;
      console.table(result);

      const accounts = await prisma.account.findMany({
        where: {
          balance: {
            gte: 5000000,
          },
        },
        select: {
          number: true,
          name: true,
          balance: true,
        },
      });

      const transactions = await prisma.transaction.findMany({
        where: {
          day: {
            gte: new Date("2022-01-01"),
          },
          OR: [
            {
              income: {
                gte: 1000000,
              },
            },
            {
              outcome: {
                gte: 1000000,
              },
            },
          ],
        },
        select: {
          day: true,
          income: true,
          outcome: true,
          transactionReason: {
            select: {
              id: true,
            },
          },
          accountNumber: true,
        },
      });

      const wip = accounts.map((account) => ({
        ...account,
        ...transactions.find(
          (transaction) => account.number === transaction.accountNumber,
        ),
      })).filter((value) => value.day !== undefined);

      const result = wip.map((wip) => ({
        口座番号: wip.number,
        名義: wip.name,
        残高: wip.balance,
        日付: wip.day,
        取引事由ＩＤ: wip.transactionReason
          ? wip.transactionReason.id
          : null,
        入金額: wip.income,
        出金額: wip.outcome,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("74:取引テーブルから、同一の口座で同じ日に3回以上取引された実績のある口座番号とその回数を抽出する。併せて、口座テーブルから名義を表示すること。", async () => {
      const expected = await prisma.$queryRaw`
            SELECT K.口座番号,
              T.回数,
              K.名義
            FROM 口座 AS K
              JOIN (
                SELECT 口座番号,
                  日付,
                  COUNT(*) AS 回数
                FROM 取引
                GROUP BY 口座番号,
                  日付
                HAVING COUNT(*) >= 3
              ) AS T ON K.口座番号 = T.口座番号
            `;
      console.table(expected);

      // Prisma を使用してデータベースからデータを取得
      const transactions = await prisma.transaction.findMany({
        select: {
          accountNumber: true,
          day: true,
        },
      });

      const result = await (async () => {
        // 取引テーブルのデータを操作して、同じ口座番号で同じ日に3回以上取引された実績のある口座番号とその回数を算出
        const wip = transactions.reduce((acc, transaction) => {
          const key = `${transaction.accountNumber}_${transaction.day}`;
          acc[key] = acc[key] ? acc[key] + 1 : 1;
          return acc;
        }, {});

        // 回数が3以上の口座番号とその回数を抽出
        const wip2 = Object.entries(wip)
          .filter(([key, count]) => count >= 3)
          .map(([key, count]) => {
            const [accountNumber, day] = key.split('_');
            return { accountNumber, day, count };
          });

        // 口座テーブルから口座番号と名義を取得
        const accounts = await prisma.account.findMany({
          where: {
            number: {
              in: wip2.map((w) => w.accountNumber),
            },
          },
          select: {
            number: true,
            name: true,
          },
        });

        // 口座番号と名義を結合して結果を整形
        const wip3 = wip2.map((w) => ({
          ...w,
          ...accounts.find((account) => account.number === w.accountNumber),
        }));

        // 結果を期待する形式に整形
        return wip3.map((w) => ({
          口座番号: w.accountNumber,
          回数: w.count,
          名義: w.name,
        }));
      })()
      console.table(result);

      expect(expected.length).toBe(result.length);
    });

    test("75:この銀行では、口座テーブルの名寄せを行うことになった。同じ名義で複数の口座番号を持つ顧客について、次の項目を持つ一覧を取得する。", async () => {
      // 名義、口座番号、種別、残高、更新日
      // 一覧は名義のアイウエオ順、口座番号の小さい順に並べること。
      const expected = await prisma.$queryRaw`
            SELECT DISTINCT K1.名義, K1.口座番号,K1.種別,K1.残高,K1.更新日
            FROM 口座 AS K1 JOIN 口座 AS K2 ON K1.名義 = K2.名義
            WHERE K1.口座番号 <> K2.口座番号
            ORDER BY K1.名義, K1.口座番号
            `;
      console.table(expected);

      const accounts = await prisma.account.findMany({
        select: {
          name: true,
          number: true,
          type: true,
          balance: true,
          updatedAt: true,
        },
      });

      const result = (() => {
        const wip = accounts.map((account) => ({
          ...account,
          count: accounts.filter((a) => a.name === account.name).length,
        }));

        const wip2 = wip
          .filter((w) => w.count >= 2)
          .map((w) => ({
            name: w.name,
            number: w.number,
            type: w.type,
            balance: w.balance,
            updatedAt: w.updatedAt,
          }));

        const wip3 = wip2
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
          })
          .sort((a, b) => {
            if (a.number < b.number) {
              return -1;
            }
          });

        return wip3.map((w) => ({
          名義: w.name,
          口座番号: w.number,
          種別: w.type,
          残高: w.balance,
          更新日: w.updatedAt,
        }));
      })()
      console.table(result);

      expect(expected).toStrictEqual(result);
    });
  });
});

describe("商店データベース", () => {
  describe("第２章 基本文法と四大命令", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }

      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }

      await prisma.order.deleteMany({});
      await prisma.order.createMany({ data: order });
    });

    test("1:商品テーブルのすべてのデータを「*」を用いずに抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード,商品名,単価,商品区分,関連商品コード FROM 商品`;
      console.table(expected);

      const products = await prisma.product.findMany({
        select: {
          code: true,
          name: true,
          price: true,
          type: true,
          product: true,
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.product?.code ?? null,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("2:商品テーブルのすべての商品名を抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品名 FROM 商品`;
      console.table(expected);

      const products = await prisma.product.findMany({
        select: {
          name: true,
        },
      });
      const result = products.map((p) => ({
        商品名: p.name,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("3:注文テーブルのすべてのデータを「*」を用いて抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文`;
      console.table(expected);

      const products = await prisma.order.findMany({
        select: {
          day: true,
          orderNumber: true,
          orderSubNumber: true,
          productCode: true,
          quantity: true,
          couponDiscount: true,
        },
      });
      const result = products.map((p) => ({
        注文日: p.day,
        注文番号: p.orderNumber,
        注文枝番: p.orderSubNumber,
        商品コード: p.productCode,
        数量: p.quantity,
        クーポン割引料: p.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("4:注文テーブルのすべての注文番号、注文枝番、商品コードを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 注文番号,注文枝番,商品コード FROM 注文`;
      console.table(expected);

      const products = await prisma.order.findMany({
        select: {
          orderNumber: true,
          orderSubNumber: true,
          productCode: true,
        },
      });
      const result = products.map((p) => ({
        注文番号: p.orderNumber,
        注文枝番: p.orderSubNumber,
        商品コード: p.productCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("5:商品テーブルに次の3つのデータを1回の実行ごとに1つずつ追加する。", async () => {
      const data = [
        {
          code: "W0461",
          name: "冬のあったかコート",
          price: 12800,
          type: "1",
          relatedCode: null,
        },
        {
          code: "S0331",
          name: "春のさわやかコート",
          price: 6800,
          type: "1",
          relatedCode: null,
        },
        {
          code: "A0582",
          name: "秋のシックなコート",
          price: 9800,
          type: "1",
          relatedCode: null,
        },
      ];
      for (const d of data) {
        await prisma.$queryRaw`INSERT INTO 商品 (商品コード,商品名,単価,商品区分,関連商品コード) VALUES (${d.code},${d.name},${d.price},${d.type},${d.relatedCode})`;
      }
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品コード IN ('W0461','S0331','A0582')`;

      console.table(expected);

      await prisma.product.deleteMany({
        where: {
          code: {
            in: data.map((d) => d.code),
          },
        },
      });
      for (const d of data) {
        await prisma.product.create({
          data: d,
        });
      }
      const products = await prisma.product.findMany({
        where: {
          code: {
            in: data.map((d) => d.code),
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.product?.code ?? null,
      }));

      console.table(result);
      expect(expected).toStrictEqual(result);
    });
  });

  describe("第3章 操作する行の絞り込み", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
    });

    test("6:商品テーブルから、商品コード「W1252」のデータを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品コード = 'W1252'`;
      console.table(expected);

      const products = await prisma.product.findUnique({
        where: {
          code: "W1252",
        },
      });
      const result = [{
        商品コード: products?.code ?? null,
        商品名: products?.name ?? null,
        単価: products?.price ?? null,
        商品区分: products?.type ?? null,
        関連商品コード: products?.product?.code ?? null,
      }];

      console.table(result);
      expect(expected).toStrictEqual(result);
    });

    test("7:商品コード「S0023」の商品について、商品テーブルの単価を500円に変更する。", async () => {
      await prisma.$queryRaw`UPDATE 商品 SET 単価 = 500 WHERE 商品コード = 'S0023'`;
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品コード = 'S0023'`;
      console.table(expected);

      await prisma.product.update({
        where: {
          code: "S0023",
        },
        data: {
          price: 500,
        },
      });
      const products = await prisma.product.findUnique({
        where: {
          code: "S0023",
        },
      });
      const result = [{
        商品コード: products?.code ?? null,
        商品名: products?.name ?? null,
        単価: products?.price ?? null,
        商品区分: products?.type ?? null,
        関連商品コード: products?.product?.code ?? null,
      }];
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("8:商品テーブルから、単価が千円以下の商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 単価 <= 1000`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          price: {
            lte: 1000,
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("9:商品テーブルから、単価が5万円以上の商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 単価 >= 50000`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          price: {
            gte: 50000,
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("10:注文テーブルから、2022年以降の注文データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 注文日 >= '2022-01-01'`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          day: {
            gte: new Date("2022-01-01T00:00:00.000Z"),
          },
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        注文日: o.day,
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("11:注文テーブルから、2021年11月以前の注文データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 注文日 < '2021-12-01'`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          day: {
            lt: new Date("2021-12-01T00:00:00.000Z"),
          },
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        注文日: o.day,
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("12:商品テーブルから、「衣類」でない商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品区分 <> '1'`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          type: {
            not: "1",
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("13:注文テーブルから、クーポン割引を利用していない注文データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE クーポン割引料 IS NULL`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          couponDiscount: null,
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        注文日: o.day,
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("14:商品テーブルから、商品コードが「N」で始まる商品を削除する。", async () => {
      const expected = await prisma.$queryRaw`DELETE FROM 商品 WHERE 商品コード LIKE 'N%'`;
      console.table(expected);

      await prisma.product.deleteMany({
        where: {
          code: {
            startsWith: "N",
          },
        },
      });
      const products = await prisma.product.findMany({
        where: {
          code: {
            startsWith: "N",
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("15:商品テーブルから、商品名に「コート」が含まれる商品について、商品コード、商品名、単価を抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 商品名, 単価 FROM 商品 WHERE 商品名 LIKE '%コート%'`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: "コート",
          },
        },
        select: {
          code: true,
          name: true,
          price: true,
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("16:「靴」または「雑貨」もしくは「未分類」の商品について、商品コード、商品区分を抽出する。ただし、記述する条件式は1つであること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 商品区分 FROM 商品 WHERE 商品区分 IN ('2', '3', '9')`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              type: "2",
            },
            {
              type: "3",
            },
            {
              type: "9",
            },
          ],
        },
        select: {
          code: true,
          type: true,
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品区分: p.type,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("17:商品テーブルから、商品コードが「A0100」～「A0500」に当てはまる商品データを抽出する。記述する条件式は1つであること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品コード BETWEEN 'A0100' AND 'A0500'`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          code: {
            gte: "A0100",
            lte: "A0500",
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("18:注文テーブルから、商品コードが「N0501」「N1021」「N0223」のいずれかを注文した注文データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 商品コード IN ('N0501', 'N1021', 'N0223')`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          productCode: {
            in: ["N0501", "N1021", "N0223"],
          },
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        注文日: o.day,
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("19:商品テーブルから、「雑貨」で商品名に「水玉」含まれる商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品区分 = '3' AND 商品名 LIKE '%水玉%'`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          type: "3",
          name: {
            contains: "水玉",
          },
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("20:商品テーブルから、商品名に「軽い」または「ゆるふわ」のどちらかが含まれる商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE 商品名 LIKE '%軽い%' OR 商品名 LIKE '%ゆるふわ%'`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: "軽い",
              },
            },
            {
              name: {
                contains: "ゆるふわ",
              },
            },
          ],
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("21:商品テーブルから、「衣類」で単価が3千円以下、または「雑貨」で単位が1万円以上の商品データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 WHERE (商品区分 = '1' AND 単価 <= 3000) OR (商品区分 = '3' AND 単価 >= 10000)`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              type: "1",
              price: {
                lte: 3000,
              },
            },
            {
              type: "3",
              price: {
                gte: 10000,
              },
            },
          ],
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        関連商品コード: p.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("22:注文テーブルから、2022年3月中に、一度の注文で数量3個以上の注文があった商品コードを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード FROM 注文 WHERE 注文日 BETWEEN '2022-03-01' AND '2022-03-31' AND 数量 >= 3`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          day: {
            gte: new Date("2022-03-01"),
            lte: new Date("2022-03-31"),
          },
          quantity: {
            gte: 3,
          },
        },
        select: {
          productCode: true,
        },
      });
      const result = orders.map((o) => ({
        商品コード: o.productCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("23:注文テーブルから、一度の注文で数量10個以上を注文したか、クーポン割引を利用した注文データを抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 数量 >= 10 OR クーポン割引料 IS NOT NULL`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          OR: [
            {
              quantity: {
                gte: 10,
              },
            },
            {
              couponDiscount: {
                not: null,
              },
            },
          ],
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        注文日: o.day,
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });
  });

  describe("第4章 検索結果の加工", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
    });

    test("25:商品区分「衣類」の商品について、商品コードの降順に商品コードと商品名の一覧を取得する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 商品名 FROM 商品 WHERE 商品区分 = '1' ORDER BY 商品コード DESC`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          type: "1",
        },
        orderBy: {
          code: "desc",
        },
        select: {
          code: true,
          name: true,
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("26:注文テーブルから、主キーの昇順に2022年3月以降の注文一覧を取得する。取得する項目は、注文日、注文番号、注文枝番、商品コード、数量とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 注文日, 注文番号, 注文枝番, 商品コード, 数量 FROM 注文 WHERE 注文日 >= '2022-03-01' ORDER BY 注文番号, 注文枝番`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          day: {
            gte: new Date("2022-03-01"),
          },
        },
        orderBy: [
          {
            orderNumber: "asc",
          },
          {
            orderSubNumber: "asc",
          },
        ],
        select: {
          day: true,
          orderNumber: true,
          orderSubNumber: true,
          productCode: true,
          quantity: true,
        },
      });
      const result = orders.map((o) => ({
        注文日: o.day,
        注文番号: o.orderNumber,
        注文枝番: o.orderSubNumber,
        商品コード: o.productCode,
        数量: o.quantity,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("27:注文テーブルから、これまででに注文のあった商品コードを抽出する。重複は除外し、商品コードの昇順に抽出すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT DISTINCT 商品コード FROM 注文 ORDER BY 商品コード`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        select: {
          productCode: true,
        },
        distinct: ["productCode"],
        orderBy: {
          productCode: "asc",
        },
      });
      const result = orders.map((o) => ({
        商品コード: o.productCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("28:注文テーブルから、これまでに注文のあった日付を新しい順に10行抽出する（同一日付が複数回登場してもよい）。", async () => {
      const expected = await prisma.$queryRaw`SELECT 注文日 FROM 注文 ORDER BY 注文日 DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        orderBy: {
          day: "desc",
        },
        select: {
          day: true,
        },
        take: 10,
      });
      const result = orders.map((o) => ({
        注文日: o.day,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("29:商品テーブルから、単価の低い順に並べて6～20行目に当たる商品データを抽出する。同一の単価の場合は、商品区分、商品コードの昇順に並ぶように抽出すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 商品 ORDER BY 単価, 商品区分, 商品コード OFFSET 5 ROWS FETCH NEXT 15 ROWS ONLY`;
      console.table(expected);

      const products = await prisma.product.findMany({
        orderBy: [
          {
            price: "asc",
          },
          {
            type: "asc",
          },
          {
            code: "asc",
          },
        ],
        skip: 5,
        take: 15,
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        商品区分: p.type,
        単価: p.price,
        関連商品コード: p?.relatedCode,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("30:廃番商品テーブルから、2020年12月に廃番されたものと、売上個数が100を超えるものを併せて抽出する。一覧は、売上個数の多い順に並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT * FROM 廃番商品 WHERE 廃番日 >= '2020-12-01' AND 廃番日 <= '2020-12-31' OR 売上個数 > 100 ORDER BY 売上個数 DESC`;
      console.table(expected);

      const retiredProducts = await prisma.retiredProduct.findMany({
        where: {
          OR: [
            {
              retiredAt: {
                gte: new Date("2020-12-01"),
                lte: new Date("2020-12-31"),
              },
            },
            {
              quantity: {
                gt: 100,
              },
            },
          ],
        },
        orderBy: {
          quantity: "desc",
        },
      });
      const result = retiredProducts.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        商品区分: p.type,
        廃番日: p.retiredAt,
        売上個数: p.quantity,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("31:商品テーブルから、これまでに注文されたことのない商品コードを昇順に抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード FROM 商品 EXCEPT SELECT 商品コード FROM 注文 ORDER BY 商品コード`;
      console.table(expected);

      const orderedProductCode = await prisma.order.findMany({
        select: {
          productCode: true,
        },
        distinct: ["productCode"],
      });

      const products = await prisma.product.findMany({
        where: {
          code: {
            notIn: orderedProductCode.map((p) => p.productCode),
          },
        },
        orderBy: {
          code: "asc",
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("32:商品テーブルから、これまでに注文された実績のある商品コードを降順に抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード FROM 商品 INTERSECT SELECT 商品コード FROM 注文 ORDER BY 商品コード DESC`;
      console.table(expected);

      const orderedProductCode = await prisma.order.findMany({
        select: {
          productCode: true,
        },
        distinct: ["productCode"],
      });
      const products = await prisma.product.findMany({
        where: {
          code: {
            in: orderedProductCode.map((p) => p.productCode),
          },
        },
        orderBy: {
          code: "desc",
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("33:商品区分が「未分類」で、単価が千円以下と1万円を超える商品について、商品コード、商品名、単価を抽出する。単価の低い順に並べ、同額の場合は商品コードの昇順とする。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 商品名, 単価 FROM 商品 WHERE 商品区分 = '9' AND 単価 <= 1000 UNION SELECT 商品コード, 商品名, 単価 FROM 商品 WHERE 商品区分 = '9' AND 単価 >= 10000 ORDER BY 単価, 商品コード`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          type: "9",
          OR: [{ price: { lte: 1000 } }, { price: { gte: 10000 } }],
        },
        orderBy: [
          {
            price: "asc",
          },
          {
            code: "asc",
          },
        ],
        select: {
          code: true,
          name: true,
          price: true,
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });
  });

  describe("第5章 式と関数", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      for (const o of order) {
        await prisma.order.upsert({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          update: o,
          create: o,
        })
      }
    });

    test("34:商品テーブルの商品区分「未分類」の商品について、商品コード、単価、キャンペーン価格の一覧を取得する。キャンペーン価格は単価の5%引きであり、1円未満の端数は考慮しなくてよい。一覧は商品コード順に並べること", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 単価, 単価 * 0.95 AS キャンペーン価格 FROM 商品 WHERE 商品区分 = '9' ORDER BY 商品コード`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          type: "9",
        },
        select: {
          code: true,
          price: true,
        },
        orderBy: {
          code: "asc",
        },
      });
      const result = products.map((p) => ({
        商品コード: p.code,
        単価: p.price,
        キャンペーン価格: Math.floor(p.price * 0.95),
      }));
      console.table(result);

      expect(expected.length).toStrictEqual(result.length);
    });

    test("35:注文日が2022年3月12～14日で、同じ商品を2個以上注文し、すでにクーポン割引を利用している注文について、さらに300円を割引することになった。該当データのクーポン割引料を更新する。", async () => {
      await prisma.$queryRaw`UPDATE 注文 SET クーポン割引料 = クーポン割引料 + 300 WHERE 注文日 >= '2022-03-12' AND 注文日 < '2022-03-15' AND 数量 >= 2 AND クーポン割引料 IS NOT NULL`;
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 注文日 >= '2022-03-12' AND 注文日 < '2022-03-15' AND 数量 >= 2 AND クーポン割引料 IS NOT NULL`;
      console.table(expected);

      for (const o of order) {
        await prisma.order.upsert({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          update: o,
          create: o,
        })
      }
      await prisma.order.updateMany({
        where: {
          AND: [
            {
              day: {
                gte: new Date("2022-03-12"),
                lt: new Date("2022-03-15"),
              },
            },
            {
              quantity: {
                gte: 2,
              },
            },
            {
              couponDiscount: {
                not: null,
              },
            },
          ],
        },
        data: {
          couponDiscount: {
            increment: 300,
          },
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          AND: [
            {
              day: {
                gte: new Date("2022-03-12"),
                lte: new Date("2022-03-14"),
              },
            },
            {
              quantity: {
                gte: 2,
              },
            },
            {
              couponDiscount: {
                not: null,
              },
            },
          ],
        },
      });
      const result = orders.map((o) => ({
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
        注文日: o.day,
        注文枝番: o.orderSubNumber,
        注文番号: o.orderNumber,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("36:注文番号「202202250126」について、商品コード「W0156」の注文数を1つ減らすよう更新する。", async () => {
      await prisma.$queryRaw`UPDATE 注文 SET 数量 = 数量 - 1 WHERE 注文番号 = '202202250126' AND 商品コード = 'W0156'`;
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE 注文番号 = '202202250126' AND 商品コード = 'W0156'`;
      console.table(expected);

      for (const o of order) {
        await prisma.order.upsert({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          update: o,
          create: o,
        })
      }
      const updateOrders = await prisma.order.findMany({
        where: {
          orderNumber: "202202250126",
          productCode: "W0156",
        },
      });
      for (const o of updateOrders) {
        await prisma.order.update({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        })
      }

      const orders = await prisma.order.findFirst({
        where: {
          orderNumber: "202202250126",
          productCode: "W0156",
        },
      });
      const result = [
        {
          商品コード: orders.productCode,
          数量: orders.quantity,
          クーポン割引料: orders.couponDiscount,
          注文日: orders.day,
          注文枝番: orders.orderSubNumber,
          注文番号: orders.orderNumber,
        },
      ]
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("37:注文テーブルから、注文番号「202110010001」～「2021103199999」の注文データを抽出する。注文番号と枝番は「-」でつなげて1つの項目として抽出する。", async () => {
      const expected = await prisma.$queryRaw`SELECT 注文番号 || '-' || CAST(注文枝番 AS VARCHAR) AS 注文番号 FROM 注文 WHERE 注文番号 >= '202110010001' AND 注文番号 <= '2021103199999'`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        where: {
          orderNumber: {
            gte: "202110010001",
            lte: "2021103199999",
          },
        },
      });
      const result = orders.map((o) => ({
        注文番号: o.orderNumber + "-" + o.orderSubNumber,
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("38:商品テーブルから、商品区分の一覧を取得する。見出しは「区分」と「区分名」とし、区分名には日本語を表記する。", async () => {
      const expected = await prisma.$queryRaw`SELECT DISTINCT 商品区分 AS 区分,CASE 商品区分 WHEN '1' THEN '衣類' WHEN '2' THEN '靴' WHEN '3' THEN '雑貨' WHEN '9' THEN '未分類' END AS 区分名 FROM 商品 ORDER BY 区分`;
      console.table(expected);

      const products = await prisma.product.findMany({
        distinct: ["type"],
        select: {
          type: true,
        },
      });
      const typeName = (type) => {
        switch (type) {
          case "1":
            return "衣類";
          case "2":
            return "靴";
          case "3":
            return "雑貨";
          case "9":
            return "未分類";
          default:
            return "";
        }
      }
      const result = products.map((p) => ({
        区分: p.type,
        区分名: typeName(p.type),
      })).sort((a, b) => a.区分 - b.区分);
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("39:商品テーブルから、商品コード、商品名、単価、販売価格ランク、商品区分を抽出する。販売価格ランクは、3千円未満を「S」、3千円以上1万円未満を「M」、1万円以上を「L」とする。また、商品区分はコードと日本語名称を「:」で連結して表記する。一覧は、単価の昇順に並べ、同額の場合は商品コードの昇順に並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード,商品名,単価,CASE WHEN 単価 < 3000 THEN 'S' WHEN 単価 < 10000 THEN 'M' ELSE 'L' END AS 販売価格ランク,商品区分 || ':' || CASE 商品区分 WHEN '1' THEN '衣類' WHEN '2' THEN '靴' WHEN '3' THEN '雑貨' WHEN '9' THEN '未分類' END AS 商品区分 FROM 商品 ORDER BY 単価,商品コード`;
      console.table(expected);

      const products = await prisma.product.findMany({
        select: {
          code: true,
          name: true,
          price: true,
          type: true,
        },
        orderBy: [
          {
            price: "asc",
          },
          {
            code: "asc",
          },
        ],
      });

      const productType = {
        1: "衣類",
        2: "靴",
        3: "雑貨",
        9: "未分類",
      };

      const result = products.map((p) => ({
        商品コード: p.code,
        商品名: p.name,
        単価: p.price,
        販売価格ランク: p.price < 3000 ? "S" : p.price < 10000 ? "M" : "L",
        商品区分: `${p.type}:${productType[p.type]}`,
      }));

      console.table(result);
      expect(expected).toStrictEqual(result);
    });

    test("40:商品テーブルから、商品名が10文字を超過する商品名とその文字数を抽出する。文字数は昇順に並べること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品名,LENGTH(商品名) AS 文字数 FROM 商品 WHERE LENGTH(商品名) > 10 ORDER BY 文字数`;
      console.table(expected);

      const products = await prisma.product.findMany({
        select: {
          name: true,
        },
      });

      const result = products
        .map((p) => ({
          商品名: p.name,
          文字数: p.name.length,
        }))
        .filter((p) => p.文字数 > 10)
        .sort((a, b) => a.文字数 - b.文字数);
      console.table(result);

      expect(expected.length).toStrictEqual(result.length);
    });

    test("41:注文テーブルから、注文日と注文番号の一覧を抽出する。注文番号は日付の部分を取り除き、4桁の連番部部だけを表記すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 注文日,SUBSTRING(注文番号,9,4) AS 注文番号 FROM 注文`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        select: {
          day: true,
          orderNumber: true,
        }
      });
      const result = orders.map((o) => ({
        注文日: o.day,
        注文番号: o.orderNumber.slice(8),
      }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("42:注文テーブルについて、商品コードの1文字目が「M」の商品の商品コードを「E」で始まるよう更新する。", async () => {
      await prisma.$executeRaw`UPDATE 注文 SET 商品コード = 'E' || SUBSTRING(商品コード,2,4) WHERE SUBSTRING(商品コード,1,1) = 'M'`;
      const expected = await prisma.$queryRaw`SELECT * FROM 注文 WHERE SUBSTRING(商品コード,1,1) = 'E' ORDER BY 注文番号`;
      console.table(expected);

      for (const o of order) {
        await prisma.order.upsert({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          update: o,
          create: o,
        })
      }
      const orders = await prisma.order.findMany({
        where: {
          productCode: {
            startsWith: "M",
          },
        },
      });
      const replace = orders.map((o) => ({
        day: o.day,
        orderNumber: o.orderNumber,
        orderSubNumber: o.orderSubNumber,
        productCode: o.productCode.replace("M", "E"),
        quantity: o.quantity,
        couponDiscount: o.couponDiscount,
      }));
      for (const o of replace) {
        await prisma.order.update({
          where: {
            orderNumber_orderSubNumber: {
              orderNumber: o.orderNumber,
              orderSubNumber: o.orderSubNumber,
            },
          },
          data: {
            productCode: o.productCode,
          },
        });
      }
      const updateOrders = await prisma.order.findMany({
        where: {
          productCode: {
            startsWith: "E",
          },
        },
      });
      const result = updateOrders.map((o) => ({
        商品コード: o.productCode,
        数量: o.quantity,
        クーポン割引料: o.couponDiscount,
        注文日: o.day,
        注文枝番: o.orderSubNumber,
        注文番号: o.orderNumber,
      })).sort((a, b) => a.注文番号 - b.注文番号);
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("43:注文番号の連番部分が「1000」～「2000」の注文番号を抽出する。連番部分4桁を昇順で抽出すること。", async () => {
      const expected = await prisma.$queryRaw`SELECT SUBSTRING(注文番号,9,4) AS 注文番号 FROM 注文 WHERE SUBSTRING(注文番号,9,4) >= '1000' AND SUBSTRING(注文番号,9,4) <= '2000' ORDER BY SUBSTRING(注文番号,9,4)`;
      console.table(expected);

      const orders = await prisma.order.findMany({
        select: {
          orderNumber: true,
        },
      });

      const result = orders
        .map((o) => o.orderNumber.slice(8))
        .filter((o) => o >= 1000 && o <= 2000)
        .sort((a, b) => a - b)
        .map((o) => ({ 注文番号: o }));
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("44:商品コード「S1990」の廃番日を、関数を使って本日の日付に修正する。", async () => {
      const today = new Date();
      await prisma.$executeRaw`UPDATE 廃番商品 SET 廃番日 = ${today} WHERE 商品コード = 'S1990'`;
      const expected = await prisma.$queryRaw`SELECT * FROM 廃番商品 WHERE 商品コード = 'S1990'`;
      console.table(expected);

      await prisma.retiredProduct.update({
        where: {
          code: "S1990",
        },
        data: {
          retiredAt: today,
        },
      });
      const retiredProduct = await prisma.retiredProduct.findFirst({
        where: {
          code: "S1990",
        },
      });
      const result = retiredProduct ? [{
        商品コード: retiredProduct.code,
        商品名: retiredProduct.name,
        単価: retiredProduct.price,
        商品区分: retiredProduct.type,
        廃番日: retiredProduct.retiredAt,
        売上個数: retiredProduct.quantity,
      }] : [];
      console.table(result);

      expect(expected).toStrictEqual(result);
    });

    test("45:1万円以上の商品の一覧を取得する。ただし、30%値下げしたときの単価を、商品コード、商品名、現在の単価と併せて取得する。値下げ後の単価の見出しは、「値下げした単価」とし、1円未満は切り捨てること。", async () => {
      const expected = await prisma.$queryRaw`SELECT 商品コード, 商品名, 単価, TRUNC(単価 * 0.7) AS 値下げした単価 FROM 商品 WHERE 単価 >= 10000`;
      console.table(expected);

      const products = await prisma.product.findMany({
        where: {
          price: {
            gte: 10000,
          },
        },
        select: {
          code: true,
          name: true,
          price: true,
        },
      });
      const result = products
        .filter((p) => p.price >= 10000)
        .map((p) => ({
          商品コード: p.code,
          商品名: p.name,
          現在の単価: p.price,
          値下げした単価: Math.floor(p.price * 0.7),
        }));
      console.table(result);

      expect(expected.length).toStrictEqual(result.length);
    });
  });

  describe("第6章 集計とグループ化", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.order.deleteMany({});
      await prisma.order.createMany({ data: order });
    });

    test("これまでに注文された数量の合計を求める", async () => {
      const result = await prisma.order.aggregate({
        _sum: {
          quantity: true,
        },
      });

      console.table(result);
      expect(result._sum.quantity).toBe(449);
    });

    test("注文日順に、注文日ごとの数量の合計を求める。", async () => {
      const result = await prisma.order.groupBy({
        by: ["day"],
        _sum: {
          quantity: true,
        },
        orderBy: {
          day: "asc",
        },
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        day: new Date("2020-04-12"),
        _sum: {
          quantity: 1,
        },
      });
    });

    test("商品区分順に、商品区分ごとの単価の最小額と最高額を求める。", async () => {
      const result = await prisma.product.groupBy({
        by: ["type"],
        _min: {
          price: true,
        },
        _max: {
          price: true,
        },
        orderBy: {
          type: "asc",
        },
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        type: "1",
        _min: {
          price: 500,
        },
        _max: {
          price: 58000,
        },
      });
    });

    test("これまでに最もよく売れた商品を10位まで抽出する。商品コードと販売した数量の多い順に並べ、数量が同じ商品については、商品コードを昇順にすること。", async () => {
      const result = await prisma.order.groupBy({
        by: ["productCode"],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 10,
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        productCode: "Z6511",
        _sum: {
          quantity: 160,
        },
      });
    });

    test("これまでに売れた数量が5個未案の商品コードとその数量を抽出する。", async () => {
      const result = await prisma.order.groupBy({
        by: ["productCode"],
        _sum: {
          quantity: true,
        },
        having: {
          quantity: {
            _sum: {
              lt: 5,
            },
          },
        },
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        productCode: "A1055",
        _sum: {
          quantity: 2,
        },
      });
    });

    test("これまでにクーポン割引をした注文件数と、割引件数の合計を求める。ただし、WHERE句による絞り込み条件を指定しないこと。", async () => {
      const result = await prisma.order.aggregate({
        _count: {
          orderNumber: true,
        },
        _sum: {
          couponDiscount: true,
        },
      });

      console.table(result);
      expect(result._count.orderNumber).toBe(68);
      expect(result._sum.couponDiscount).toBe(8300);
    });

    test("月ごとの注文件数を求める。抽出する列の名前は「年月」と「注文件数」とし、年月列の内容は「202201」のような形式で、日付の新しい順で抽出すること。なお、1件の注文には、必ず注文枝番「1」の注文明細が含まれることが保証されている、", async () => {
      const orders = await prisma.order.groupBy({
        by: ["day"],
        _count: {
          orderNumber: true,
        },
        orderBy: {
          day: "desc",
        },
      });

      const result = orders.map((o) => ({
        year: {
          month: o.day.getFullYear() * 100 + o.day.getMonth() + 1,
        },
        _count: {
          orderNumber: o._count.orderNumber,
        },
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        year: {
          month: 202203,
        },
        _count: {
          orderNumber: 2,
        },
      });
    });

    test("注文テーブルから、「Z」から始まる商品コードのうち、これまでに売れた数量が100個以上の商品コードを抽出する。", async () => {
      const orders = await prisma.order.groupBy({
        by: ["productCode"],
        _sum: {
          quantity: true,
        },
        having: {
          quantity: {
            _sum: {
              gte: 100,
            },
          },
        },
      });

      const result = orders.filter((o) => o.productCode.startsWith("Z"));

      console.table(result);
      expect(result[0]).toStrictEqual({
        productCode: "Z2323",
        _sum: {
          quantity: 150,
        },
      });
    });
  });

  describe("第7章 副問い合わせ", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }

      await prisma.order.deleteMany({});
      await prisma.order.createMany({ data: order });
    });

    test("商品コード「S0604」の商品について、商品コード、商品名、単価、これまでに販売した数量を抽出する。ただし、抽出には、選択列リストにて注文テーブルを副問い合わせするSELECT文を用いること。", async () => {
      const productCode = "S0604";
      const orders = await prisma.order.groupBy({
        by: ["productCode"],
        _sum: {
          quantity: true,
        },
        having: {
          productCode: {
            in: [productCode],
          },
        },
      });

      const products = await prisma.product.findMany({
        where: {
          code: productCode,
        },
        select: {
          code: true,
          name: true,
          price: true,
        },
      });

      const result = products.map((p) => ({
        ...p,
        quantity: orders[0]?._sum.quantity ?? 0,
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        code: "S0604",
        name: "さらさらキャミソール",
        price: 1300,
        quantity: 21,
      });
    });

    test("次の注文について、商品コードを間違って登録したことがわかった。商品テーブルより条件に合致する商品コードを取得し、該当の注文テーブルを更新する。ただし、注文テーブルの更新には、SET句にて商品テーブルを副問い合わせするUPDATE文を用いること。", async () => {
      // 注文日:2022-03-15 注文番号:202203150014 注文枝番:1
      // 正しい商品の条件:商品区分が「靴」で、商品名に「ブーツ」「雨」「安心」を含む。
      const product = await prisma.product.findFirst({
        where: {
          AND: [
            {
              type: "2",
            },
          ],
          OR: [
            {
              name: {
                contains: "ブーツ",
              },
            },
          ],
          OR: [
            {
              name: {
                contains: "雨",
              },
            },
          ],
          OR: [
            {
              name: {
                contains: "安心",
              },
            },
          ],
        },
      });

      await prisma.order.update({
        where: {
          orderNumber_orderSubNumber: {
            orderNumber: "202203150014",
            orderSubNumber: 1,
          },
        },
        data: {
          productCode: product?.code ?? "",
        },
      });

      const result = await prisma.order.findFirst({
        where: {
          orderNumber: "202203150014",
          orderSubNumber: 1,
        },
      });

      console.table(result);
      expect(result.productCode).toBe("B1350");
    });

    test("商品名に「あったか」が含まれる商品が売れた日付とその商品コードを過去の日付順に抽出する。ただし、WHERE句でIN演算子を利用した副問い合わせを用いること。", async () => {
      const products = await prisma.product.findMany({
        where: {
          name: {
            contains: "あったか",
          },
        },
        select: {
          code: true,
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          productCode: {
            in: products.map((p) => p.code),
          },
        },
        orderBy: {
          day: "asc",
        },
      });

      const result = orders.map((o) => ({
        day: o.day,
        productCode: o.productCode,
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        day: new Date("2021-09-15T00:00:00.000Z"),
        productCode: "W0746",
      });
    });

    test("商品ごとにそれぞれ平均販売数量を求め、どの商品の平均販売数量よりも多い数が売れた商品を探し、その商品コードと販売数量を抽出する。ただし、ALL演算子を利用した副問い合わせを用いること。", async () => {
      const orders = await prisma.order.groupBy({
        by: ["productCode"],
        _avg: {
          quantity: true,
        },
      });

      const maxAvgQuantity = orders.reduce(
        (max, o) => Math.max(max, o._avg.quantity),
        0,
      );

      const result = await prisma.order.findMany({
        where: {
          quantity: {
            gt: maxAvgQuantity,
          },
        },
        select: {
          productCode: true,
          quantity: true,
        },
      });

      console.table(result);
    });

    test("クーポン割引を利用して販売した商品コード「W0746」の商品について、その販売数量と、商品1個あたりの平均割引額を抽出する。列名は「割引による販売数」と「平均割引額」とし、1円未満は切り捨てる。抽出にはFROM句で副問い合わせを利用すること。", async () => {
      const orders = await prisma.order.findMany({
        where: {
          productCode: "W0746",
          couponDiscount: {
            gt: 0,
          },
        },
      });

      const result = orders.map((o) => ({
        割引による販売数: o.quantity,
        平均割引額: Math.floor(o.couponDiscount / o.quantity),
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        割引による販売数: 1,
        平均割引額: 1000,
      });
    });

    test("次の注文について、内容を追加したいという依頼があった。追加分の注文を注文テーブルに登録する。使用する注文枝番は、該当の注文番号を副問い合わせにて参照し、1を加算した番号を採番する。なお、登録のSQL文は注文ごとに1つずつ作成すること。", async () => {
      // 注文日: 2022-03-21,注文番号:202203210080 商品コード:S1003, 数量:1, クーポン割引:なし
      // 注文日: 2022-03-22,注文番号:202203220901 商品コード:A0052, 数量:2, クーポン割引:500円
      const addOrders = [
        {
          day: new Date("2022-03-21T00:00:00.000Z"),
          orderNumber: "202203210080",
          productCode: "S1003",
          quantity: 1,
          couponDiscount: null,
        },
        {
          day: new Date("2022-03-22T00:00:00.000Z"),
          orderNumber: "202203220901",
          productCode: "A0052",
          quantity: 2,
          couponDiscount: 500,
        },
      ];

      for (const addOrder of addOrders) {
        const orderSubNumber = await prisma.order.count({
          where: {
            orderNumber: addOrder.orderNumber,
          },
        });

        const result = await prisma.order.create({
          data: {
            day: addOrder.day,
            orderNumber: addOrder.orderNumber,
            orderSubNumber: orderSubNumber + 1,
            productCode: addOrder.productCode,
            quantity: addOrder.quantity,
            couponDiscount: addOrder.couponDiscount,
          },
        });

        console.table(result);
        expect(result).toStrictEqual({
          day: addOrder.day,
          orderNumber: addOrder.orderNumber,
          orderSubNumber: orderSubNumber + 1,
          productCode: addOrder.productCode,
          quantity: addOrder.quantity,
          couponDiscount: addOrder.couponDiscount,
        });
      }
    });
  });

  describe("第8章 複数テーブルの結合", () => {
    beforeAll(async () => {
      await prisma.product.deleteMany({});
      for (const p of product) {
        await prisma.product.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }
      await prisma.retiredProduct.deleteMany({});
      for (const p of retiredProduct) {
        await prisma.retiredProduct.upsert({
          where: { code: p.code },
          update: p,
          create: p,
        });
      }

      await prisma.order.deleteMany({});
      await prisma.order.createMany({ data: order });
    });

    test("注文番号「202201130115」について、注文番号、注文枝番、商品コード、商品名、数量の一覧を注文番号および注文枝番の順に抽出する。商品名は商品テーブルより取得すること。", async () => {
      const orders = await prisma.order.findMany({
        where: {
          orderNumber: "202201130115",
        },
        orderBy: {
          orderSubNumber: "asc",
        },
        select: {
          orderNumber: true,
          orderSubNumber: true,
          productCode: true,
          quantity: true,
        },
      });

      const product = await prisma.product.findMany({
        select: {
          code: true,
          name: true,
        },
      });

      const result = orders.map((o) => ({
        ...o,
        product: product.find((p) => p.code === o.productCode),
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        orderNumber: "202201130115",
        orderSubNumber: 1,
        productCode: "F0190",
        quantity: 1,
        product: {
          code: "F0190",
          name: "アンティーク調長財布",
        },
      });
    });

    test("廃番となった商品コード「A0009」について、廃番日より後に注文された注文情報（注文日、注文番号、注文枝番、数量、注文金額）を抽出する。注文金額は単価と数量より算出すること。", async () => {
      const retiredProduct = await prisma.retiredProduct.findFirst({
        where: {
          code: "A0009",
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          productCode: "A0009",
          day: {
            gte: retiredProduct.retiredDate,
          },
        },
      });

      const product = await prisma.retiredProduct.findFirst({
        where: {
          code: "A0009",
        },
      });

      const result = orders.map((o) => ({
        ...o,
        orderAmount: o.quantity * product.price,
      }));

      console.table(result);
      expect(result[0]).toStrictEqual({
        day: new Date("2021-04-03T00:00:00.000Z"),
        orderNumber: "202104030010",
        orderSubNumber: 3,
        productCode: "A0009",
        quantity: 1,
        couponDiscount: null,
        orderAmount: 7500,
      });
    });

    test("商品コード「S0604」について、商品情報（商品コード、商品名、単価）とこれまでの注文情報（注文日、注文番号、数量）、さらに単価と数量から売上金額を求め、一覧として抽出する。一覧は、注文のあった順に表示すること。", async () => {
      const product = await prisma.product.findFirst({
        where: {
          code: "S0604",
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          productCode: "S0604",
        },
        orderBy: {
          day: "asc",
        },
      });

      const result = [product].map((p) => ({
        ...p,
        orders: orders
          .map((o) => ({
            ...o,
            orderAmount: o.quantity * p.price,
          }))
          .sort((a, b) => a.day.getTime() - b.day.getTime()),
      }));

      console.table(result);
      expect(result[0].orders.length).toBe(5);
    });

    test("2020年8月に注文のあった商品コードの一覧を抽出する。一覧には、商品名も表示する必要がある。すでに廃番となっている商品に関しては特に考慮しなくてよい（一覧に含まれなくてよい）。", async () => {
      const orders = await prisma.order.findMany({
        where: {
          day: {
            gte: new Date("2020-08-01T00:00:00.000Z"),
            lte: new Date("2020-08-31T23:59:59.999Z"),
          },
        },
      });

      const product = await prisma.product.findMany({
        select: {
          code: true,
          name: true,
        },
      });

      const result = orders
        .map((o) => ({
          ...o,
          product: product.find((p) => p.code === o.productCode),
        }))
        .filter((o) => o.product !== undefined)
        .map((o) => ({
          productCode: o.productCode,
          productName: o.product.name,
        }));

      console.table(result);
      expect(result.length).toBe(3);
    });

    test("問題64では、すでに廃番となっている商品は抽出されなかった。廃番となった商品ももれなく一覧に記載されるよう、SQL文を変更する。なお、廃番商品の商品名には「廃番」と表示すること。", async () => {
      const orders = await prisma.order.findMany({
        where: {
          day: {
            gte: new Date("2020-08-01T00:00:00.000Z"),
            lte: new Date("2020-08-31T23:59:59.999Z"),
          },
        },
      });

      const product = await prisma.product.findMany({
        select: {
          code: true,
          name: true,
        },
      });

      const retiredProduct = await prisma.retiredProduct.findMany({
        select: {
          code: true,
          name: true,
        },
      });

      const result = orders.map((o) => {
        const productData = product.find((p) => p.code === o.productCode);
        const retiredProductData = retiredProduct.find(
          (p) => p.code === o.productCode,
        );
        const productName = productData
          ? productData.name
          : retiredProductData
            ? "廃番"
            : "";
        return {
          productCode: o.productCode,
          productName: productName,
        };
      });

      console.table(result);
      expect(result.length).toBe(4);
    });

    test("商品区分「雑貨」の商品について、注文日、商品コード、商品名、数量を抽出する。商品については、「商品コード:商品名」の形式で表示する。ただし、注文のなかった「雑貨」商品についてももれなく一覧に記載し、数量は0とすること。", async () => {
      const product = await prisma.product.findMany({
        where: {
          type: "3",
        },
        select: {
          code: true,
          name: true,
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          productCode: {
            in: product.map((p) => p.code),
          },
        },
      });

      const result = product.map((p) => {
        const order = orders.find((o) => o.productCode === p.code);
        return {
          day: order ? order.day : null,
          product: `${p.code}:${p.name} `,
          quantity: order ? order.quantity : 0,
        };
      });

      console.table(result);
      expect(result.length).toBe(11);
    });

    test("問題66について、注文おあった「雑貨」商品がすでに廃番になっている可能性も考慮し、一覧を抽出する。廃番になった商品は、「商品コード:(廃番済み)」のように表示する。", async () => {
      const products = await (async () => {
        const product = await prisma.product.findMany({
          where: {
            type: "3",
          },
          select: {
            code: true,
            name: true,
          },
        });

        const retiredProduct = await prisma.retiredProduct.findMany({
          where: {
            type: "3",
          },
          select: {
            code: true,
            name: true,
          },
        });

        return Array.from(new Set([...product, ...retiredProduct]));
      })();

      const result = await (async () => {
        const orders = await prisma.order.findMany({
          where: {
            productCode: {
              in: products.map((p) => p.code),
            },
          },
        });

        return product
          .map((p) => {
            const order = orders.find((o) => o.productCode === p.code);
            return {
              day: order ? order.day : null,
              product: `${p.code}:${p.name} `,
              quantity: order ? order.quantity : 0,
            };
          })
          .concat(
            retiredProduct.map((p) => {
              const order = orders.find((o) => o.productCode === p.code);
              return {
                day: order ? order.day : null,
                product: `${p.code}: (廃番済み)`,
                quantity: order ? order.quantity : 0,
              };
            }),
          );
      })();

      console.table(result);
      expect(result.length).toBe(59);
    });

    test("注文番号「202104030010」について、注文日、注文番号、注文枝番、商品コード、商品名、単価、数量、注文金額を抽出する。注文金額は単価と数量より算出し、その総額からクーポン割引料を差し引いたものとする。また、商品が廃番になっている場合は、廃番商品テーブルから必要な情報を取得すること。", async () => {
      const order = await prisma.order.findFirst({
        where: {
          orderNumber: "202104030010",
        },
      });

      const product = await prisma.product.findUnique({
        where: {
          code: order.productCode,
        },
      });

      const retiredProduct = await prisma.retiredProduct.findUnique({
        where: {
          code: order.productCode,
        },
      });

      const result = {
        day: order.day,
        orderNumber: order.orderNumber,
        orderSubNumber: order.orderSubNumber,
        productCode: order.productCode,
        productName: product ? product.name : retiredProduct.name,
        price: product ? product.price : retiredProduct.price,
        quantity: order.quantity,
        orderAmount: product
          ? product.price * order.quantity
          : retiredProduct.price * order.quantity,
      };

      console.table(result);
      expect(result.orderAmount).toBe(5000);
    });

    test("商品コードが「B」で始まる商品について、商品テーブルから商品コード、商品名、単価を、注文テーブルからこれまでに売り上げた個数をそれぞれ抽出する。併せて、単価と個数からこれまでの総売上金額を計算する（クーポン割引は考慮しなくてよい）。一覧は、商品コード順に表示すること。", async () => {
      const products = await prisma.product.findMany({
        where: {
          code: {
            startsWith: "B",
          },
        },
        select: {
          code: true,
          name: true,
          price: true,
        },
      });

      const orders = await prisma.order.findMany({
        where: {
          productCode: {
            in: products.map((p) => p.code),
          },
        },
      });

      const result = products.map((p) => {
        const order = orders.filter((o) => o.productCode === p.code);
        return {
          productCode: p.code,
          productName: p.name,
          price: p.price,
          quantity: order.reduce((acc, cur) => acc + cur.quantity, 0),
          orderAmount: order.reduce(
            (acc, cur) => acc + cur.quantity * p.price,
            0,
          ),
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("現在販売中の商品について、関連している商品のある一覧を抽出する。一覧には、商品コード、商品名、関連商品コード、関連商品名を記載する。", async () => {
      const products = await prisma.product.findMany({
        where: {
          relatedCode: {
            not: null,
          },
        },
        select: {
          code: true,
          name: true,
          relatedCode: true,
          ChildProducts: {
            select: {
              code: true,
              name: true,
            },
          },
        },
      });

      const result = products.map((p) => {
        return {
          productCode: p.code,
          productName: p.name,
          relatedProductCode: p.relatedCode,
          relatedProductName: p.ChildProducts[0].name,
        };
      });

      console.table(result);
      expect(result.length).toBe(8);
    });
  });
});

describe("RPGデータベース", () => {
  describe("第2章 基本文法と四大命令", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }
    });

    test("主人公のパーティにいるキャラクターの全データをパーティテーブルから「＊」を用いずに抽出する。", async () => {
      const result = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          hp: true,
          mp: true,
          statusCode: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    test("パーティテーブルから、名称、HP、MPの一覧を取得する。各見出しは次のように表示すること。", async () => {
      // なまえ　現在のHP　現在のMP
      const party = await prisma.party.findMany({
        select: {
          name: true,
          hp: true,
          mp: true,
        },
      });

      const result = party.map((p) => {
        return {
          なまえ: p.name,
          現在のHP: p.hp,
          現在のMP: p.mp,
        };
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        なまえ: "ミナト",
        現在のHP: 89,
        現在のMP: 74,
      });
    });

    test("イベントの全データをイベントテーブルから「＊」を用いて抽出する。", async () => {
      const result = await prisma.event.findMany({
        select: {
          eventNumber: true,
          eventName: true,
          type: true,
          premiseEventNumber: true,
          followOnEventNumber: true,
          experienceEvent: {
            select: {
              eventNumber: true,
              clearResult: true,
              routeNumber: true,
            },
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(26);
    });

    test("イベントテーブルから、イベント番号とイベント名称の一覧を取得する。各見出しは次のように表示すること。", async () => {
      // 番号　場面
      const events = await prisma.event.findMany({
        select: {
          eventNumber: true,
          eventName: true,
        },
      });

      const result = events.map((e) => {
        return {
          番号: e.eventNumber,
          場面: e.eventName,
        };
      });

      console.table(result);
      expect(result[0]).toStrictEqual({
        番号: 1,
        場面: "オープニング",
      });
    });

    test("パーティテーブルに,次のつのデータを1回の実行ごとに1つずつ追加する。", async () => {
      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
      const result = await prisma.party.findMany({
        where: {
          id: {
            in: ["A01", "A02", "A03"],
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(3);
    });
  });

  describe("第3章 操作する行の絞り込み", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("パーティーテーブルから、IDが「C02」のデータを抽出する。", async () => {
      const result = await prisma.party.findUnique({
        where: { id: "C02" },
      });

      console.table(result);
      expect(result.id).toBe("C02");
    });

    test("パーティーテーブルのID「A01」のデータについて、HPを120に更新する。", async () => {
      const result = await prisma.party.update({
        where: { id: "A01" },
        data: { hp: 120 },
      });

      console.table(result);
      expect(result.hp).toBe(120);
    });

    test("パーティーテーブルから、HPが100未満のデータについて、ID、名称、HPの一覧を抽出する。", async () => {
      const result = await prisma.party.findMany({
        where: { hp: { lt: 100 } },
        select: {
          id: true,
          name: true,
          hp: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(3);
    });

    test("イベントテーブルから、タイプが「特殊」でないデータについて、イベント番号、イベント名称、タイプの一覧を抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: { type: { not: "3" } },
        select: {
          eventNumber: true,
          eventName: true,
          type: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(24);
    });

    test("イベントテーブルから、イベント番号が5以下のデータについて、イベント番号とイベント名称を抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: { eventNumber: { lte: 5 } },
        select: {
          eventNumber: true,
          eventName: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("イベントテーブルから、イベント番号が20を超過しているデータについて、イベント番号とイベント名称を抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: { eventNumber: { gt: 20 } },
        select: {
          eventNumber: true,
          eventName: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(6);
    });

    test("イベントテーブルから、別のイベントのクリアを前提としないイベントについて、イベント番号とイベント名称を抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: { premiseEventNumber: { equals: null } },
        select: {
          eventNumber: true,
          eventName: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(8);
    });

    test("イベントテーブルから、次に発生するイベントが決められれているイベントについて、イベント番号、イベント名称、後続イベント番号を抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: { followOnEventNumber: { not: null } },
        select: {
          eventNumber: true,
          eventName: true,
          followOnEventNumber: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(14);
    });

    test("名称に「ミ」が含まれるパーティーテーブルのデータについて、ID、名称、HPの一覧を抽出する。ただし、記述する条件式は1つであること。", async () => {
      const result = await prisma.party.findMany({
        where: { name: { contains: "ミ" } },
        select: {
          id: true,
          name: true,
          hp: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    test("HPが120～160の範囲にあるパーティーテーブルのデータについて、ID、名称、HPの一覧を抽出する。ただし、記述条件は1つであること。", async () => {
      const result = await prisma.party.findMany({
        where: { hp: { gte: 120, lte: 160 } },
        select: {
          id: true,
          name: true,
          hp: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    test("職業が「勇者」「戦士」「武道家」のいずれかであるパーティテーブルのデータについて、名称と職業コードを抽出する。ただし、記述する条件式は1つであること。", async () => {
      const result = await prisma.party.findMany({
        where: {
          OR: [
            { professionCode: { equals: "01" } },
            { professionCode: { equals: "10" } },
            { professionCode: { equals: "11" } },
          ],
        },
        select: {
          name: true,
          professionCode: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(3);
    });

    test("状態コードが「異常なし」と「気絶」のどちらでもないパーティテーブルのデータについて、名称と状態コードを抽出する。ただし、記述する条件式は1つであること。", async () => {
      const result = await prisma.party.findMany({
        where: {
          NOT: [
            { statusCode: { equals: "00" } },
            { statusCode: { equals: "09" } },
          ],
        },
        select: {
          name: true,
          statusCode: true,
        },
      });

      console.table(result);
      expect(result.length).toBe(1);
    });

    test("パーティテーブルから、HPとMPがともに100を超えているデータを抽出する。", async () => {
      const result = await prisma.party.findMany({
        where: {
          AND: [{ hp: { gt: 100 } }, { mp: { gt: 100 } }],
        },
      });

      console.table(result);
      expect(result.length).toBe(1);
    });

    test("パーティテーブルから、IDが「A」で始まり、職業コードの1文字目が「2」であるデータを抽出する。", async () => {
      const result = await prisma.party.findMany({
        where: {
          AND: [
            { id: { startsWith: "A" } },
            { professionCode: { startsWith: "2" } },
          ],
        },
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    test("イベントテーブルから、タイプが「強制」で、事前にクリアが必要なイベントかつ次に発生するイベントが設定されているデータを抽出する。", async () => {
      const result = await prisma.event.findMany({
        where: {
          AND: [
            { type: { equals: "1" } },
            { premiseEventNumber: { not: null } },
            { followOnEventNumber: { not: null } },
          ],
        },
      });

      console.table(result);
      expect(result.length).toBe(10);
    });
  });

  describe("第4章 検索結果の加工", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("パーティテーブルから、パーティーの現在の状態コード一覧を取得する。重複は除外すること", async () => {
      const result = await prisma.party.findMany({
        select: {
          statusCode: true,
        },
      });

      const statusCodes = result.map((r) => r.statusCode);
      const uniqueStatusCodes = [...new Set(statusCodes)];

      console.table(uniqueStatusCodes);
      expect(uniqueStatusCodes.length).toBe(2);
    });

    test("パーティテーブルから、IDと名称をIDの昇順に抽出する", async () => {
      const result = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("パーティーテーブルから、名称と職業コードを名称の降順に抽出する", async () => {
      const result = await prisma.party.findMany({
        select: {
          name: true,
          professionCode: true,
        },
        orderBy: {
          name: "desc",
        },
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("パーティーテーブルから、名称、HP、状態コードを、状態コードの昇順かつHPの高い順（降順）に抽出する", async () => {
      const result = await prisma.party.findMany({
        select: {
          name: true,
          hp: true,
          statusCode: true,
        },
        orderBy: [
          {
            statusCode: "asc",
          },
          {
            hp: "desc",
          },
        ],
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("イベントテーブルから、タイプ、イベント番号、イベント名称、前提イベント番号、後続イベント番号を、タイプの昇順かつイベント番号の昇順に抽出する。並べ替えには列番号を用いること。", async () => {
      const result = await prisma.event.findMany({
        select: {
          type: true,
          eventNumber: true,
          eventName: true,
          premiseEventNumber: true,
          followOnEventNumber: true,
        },
        orderBy: [
          {
            type: "asc",
          },
          {
            eventNumber: "asc",
          },
        ],
      });

      console.table(result);
      expect(result.length).toBe(26);
    });

    test("パーティーテーブルから、HPの高い順に3件抽出する", async () => {
      const result = await prisma.party.findMany({
        select: {
          name: true,
          hp: true,
        },
        orderBy: {
          hp: "desc",
        },
        take: 3,
      });

      console.table(result);
      expect(result.length).toBe(3);
    });

    test("パーティーテーブルから、MPが3番目に高いデータを抽出する", async () => {
      const result = await prisma.party.findMany({
        select: {
          name: true,
          mp: true,
        },
        orderBy: {
          mp: "desc",
        },
        skip: 2,
        take: 1,
      });

      console.table(result);
      expect(result.length).toBe(1);
    });

    test("イベントテーブルと経験イベントテーブルから、まだ参加していないイベントの番号を抽出する。イベントの番号順に表示すること", async () => {
      const experienceEvent = await prisma.experienceEvent.findMany({
        select: {
          eventNumber: true,
        },
        where: {
          clearType: "0",
        },
      });

      const result = await prisma.event.findMany({
        select: {
          eventNumber: true,
        },
        where: {
          eventNumber: {
            notIn: experienceEvent.map((e) => e.eventNumber),
          },
        },
        orderBy: {
          eventNumber: "asc",
        },
      });

      console.table(result);
      expect(result.length).toBe(25);
    });

    test("イベントテーブルと経験イベントテーブルから、すでにクリアされたイベントのうちタイプがフリーのイベント番号を対象とする。抽出には集合演算子を用いること。", async () => {
      const experienceEvent = await prisma.experienceEvent.findMany({
        select: {
          eventNumber: true,
        },
        where: {
          clearType: "1",
        },
      });

      const result = await prisma.event.findMany({
        select: {
          eventNumber: true,
        },
        where: {
          type: "2",
          eventNumber: {
            in: experienceEvent.map((e) => e.eventNumber),
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(1);
    });
  });

  describe("第5章 式と関数", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("パーティーテーブルから、次の形式の一覧を取得する。", async () => {
      // 職業区分　職業コード　ID　名称
      // 職業区分は、物理攻撃が得意なもの（職業コードが1から始まる）を「S」、魔法攻撃の得意なもの（職業コードが2から始まる）を「M」、それ以外を「A」と表示すること。
      // また、一覧は職業コード順とすること。
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
        },
        orderBy: {
          professionCode: "asc",
        },
      });

      const result = party.map((p) => {
        const code = p.professionCode;
        const type = code.startsWith("1")
          ? "S"
          : code.startsWith("2")
            ? "M"
            : "A";
        return {
          type,
          code,
          id: p.id,
          name: p.name,
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("アイテム「勇気の鈴」を装備すると、HPが50ポイントアップする。このアイテムを装備したときの各キャラクターのHPを適切な列を用いて次の別名で取得する。ただし、このアイテムは「武道家」と「学者」しか装備できない。", async () => {
      // なまえ　現在のHP　装備後のHP
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          hp: true,
        },
        where: {
          professionCode: {
            in: ["11", "21"],
          },
        },
      });

      const result = party.map((p) => {
        const hp = p.hp + 50;
        return {
          なまえ: p.name,
          現在のHP: p.hp,
          装備後のHP: hp,
        };
      });

      console.table(result);
      expect(result.length).toBe(2);
    });

    test("ID「A01」と「A03」のキャラクターがアイテム「知恵の指輪」を装備し、MPが20ポイントアップした。その該当データのMPを更新する。", async () => {
      const result = await prisma.party.updateMany({
        where: {
          id: {
            in: ["A01", "A03"],
          },
        },
        data: {
          mp: {
            increment: 20,
          },
        },
      });

      console.table(result);
      expect(result.count).toBe(2);
    });

    test("武道家の技「スッキリパンチ」は、自分のHPを2倍したポイントのダメージを敵に与える。この技を使ったときのダメージを適切な列を用いて次の別名で抽出する。", async () => {
      // なまえ　現在のHP　予想されるダメージ
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          hp: true,
        },
        where: {
          professionCode: {
            in: ["11"],
          },
        },
      });

      const result = party.map((p) => {
        const damage = p.hp * 2;
        return {
          なまえ: p.name,
          現在のHP: p.hp,
          予想されるダメージ: damage,
        };
      });

      console.table(result);
      expect(result.length).toBe(1);
    });

    test("現在、主人公のパーティーにいるキャラクターの状況について、適切な列を用いて次の別名で一覧を取得する。", async () => {
      // なまえ　HPとMP ステータス
      // 「HPとMP」はHPとMPを「／」でつなげたものとする。ステータスには状態コードを日本語に置き換えたものを表示するが、ステータスに異常がない場合は、何も表示しなくてよい。
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const result = party.map((p) => {
        const hpmp = `${p.hp} /${p.mp}`;
        const status =
          p.statusCode === "00"
            ? ""
            : p.statusCode === "01"
              ? "眠り"
              : p.statusCode === "02"
                ? "毒"
                : p.statusCode === "03"
                  ? "沈黙"
                  : p.statusCode === "04"
                    ? "混乱"
                    : p.statusCode === "09"
                      ? "気絶"
                      : "";
        return {
          なまえ: p.name,
          HPとMP: hpmp,
          ステータス: status,
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("イベントテーブルから、次の形式でイベント一覧を取得する。", async () => {
      // イベント番号　イベント名称　タイプ　発生時期
      // タイプはコードを日本語で置き換えたもの、発生時期は次の条件に応じたものを表示すること。
      // イベント番号が1～10なら「序盤」
      // イベント番号が11～17なら「中盤」
      // 上記以外なら「終盤」
      const event = await prisma.event.findMany({
        select: {
          eventNumber: true,
          eventName: true,
          type: true,
        },
      });

      const result = event.map((e) => {
        return {
          イベント番号: e.eventNumber,
          イベント名称: e.eventName,
          タイプ: e.type === "1" ? "強制" : e.type === "2" ? "フリー" : "特殊",
          発生時期:
            e.eventNumber >= 1 && e.eventNumber <= 10
              ? "序盤"
              : e.eventNumber >= 11 && e.eventNumber <= 17
                ? "中盤"
                : "終盤",
        };
      });

      console.table(result);
      expect(result.length).toBe(26);
    });

    test("敵の攻撃「ネームバリュー」は、名前の文字数を10倍したポイントのダメージがある。この攻撃を受けた時の各キャラクターの予想ダメージを適切な列を用いて次の別名で取得する。", async () => {
      // なまえ　現在のHP　予想ダメージ
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          hp: true,
        },
      });

      const result = party.map((p) => {
        const damage = p.name.length * 10;
        return {
          なまえ: p.name,
          現在のHP: p.hp,
          予想ダメージ: damage,
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("敵の攻撃「四苦八苦」を受け、HPまたはMPが4で割り切れるキャラクターは混乱した。該当のデータの状態コードを更新する。なお、剰余の計算には%演算子かMOD関数を用いる。", async () => {
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const result = party.map((p) => {
        const status = p.hp % 4 === 0 || p.mp % 4 === 0 ? "04" : p.statusCode;
        return {
          id: p.id,
          statusCode: status,
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("町の道具やで売値が777のアイテム「女神の祝福」を買ったところ、会員証を持っていたため30%割引で購入できた。この際に支払った金額を求める。端数は切り捨て。", async () => { });

    test("戦闘中にアイテム「女神の祝福」を使ったところ、全員のHPとMPがそれまでの値に対して3割ほど回復した。該当するデータを更新する。ただし、端数は四捨五入すること。", async () => {
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const cure = party.map((p) => {
        const hp = Math.round(p.hp * 1.3);
        const mp = Math.round(p.mp * 1.3);
        return {
          id: p.id,
          hp: hp,
          mp: mp,
        };
      });

      for (const c of cure) {
        const p = await prisma.party.findUnique({
          where: {
            id: c.id,
          },
        });
        if (p) {
          await prisma.party.update({
            where: {
              id: c.id,
            },
            data: {
              hp: c.hp,
              mp: c.mp,
            },
          });
        }
      }

      const result = await prisma.party.findMany({
        where: {
          id: {
            in: cure.map((c) => c.id),
          },
        },
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("戦士の技「Step by Step」は、攻撃の回数に応じて自分のHPをべき乗したポイントのダメージを与える。3回攻撃したときの、各回の攻撃ポイントを適切な列を用いて次の別名で取得する。ただし、1回目は0乗から始まる。", async () => {
      // なまえ　HP　攻撃1回目 　攻撃2回目　攻撃3回目
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const result = party.map((p) => {
        const stepByStep = (n) => (p.professionCode === "01" ? p.hp ** n : 0);
        return {
          なまえ: p.name,
          HP: p.hp,
          攻撃1回目: stepByStep(0),
          攻撃2回目: stepByStep(1),
          攻撃3回目: stepByStep(2),
        };
      });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("現在、主人公のパーティーにいるキャラクターの状況について、HPと状態コードから、リスクを重み付けした一覧を適切な列を用いて次の別名で取得する。", async () => {
      // なまえ　HP　状態コード　リスク値
      // リスク値には、次の条件に従った値を算出する。
      // HPが50以下ならリスク値3
      // HPが51以上100以下ならリスク値2
      // HPが101以上ならリスク値1
      // HPがそれ以外ならリスク値0
      // 状態コードの値をリスク値に加算
      // リスクの高い順かつHPの低い順にキャラクターを表示する。
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const result = party
        .map((p) => {
          const risk = p.hp <= 50 ? 3 : p.hp <= 100 ? 2 : p.hp >= 101 ? 1 : 0;
          return {
            なまえ: p.name,
            HP: p.hp,
            状態コード: p.statusCode,
            リスク値: risk + Number(p.statusCode),
          };
        })
        .sort((a, b) => {
          if (a.リスク値 > b.リスク値) {
            return -1;
          } else if (a.リスク値 < b.リスク値) {
            return 1;
          } else {
            if (a.HP < b.HP) {
              return -1;
            } else if (a.HP > b.HP) {
              return 1;
            } else {
              return 0;
            }
          }
        });

      console.table(result);
      expect(result.length).toBe(5);
    });

    test("イベントテーブルより、イベントの一覧をイベント番号順に次の形式で取得する。", async () => {
      // 前提イベント番号　イベント番号　後続イベント番号
      const event = await prisma.event.findMany({
        select: {
          premiseEventNumber: true,
          eventNumber: true,
          followOnEventNumber: true,
        },
      });

      const result = event.map((e) => {
        return {
          前提イベント番号: e.eventNumber,
          イベント番号: e.eventNumber,
          後続イベント番号: e.premiseEventNumber,
        };
      });

      console.table(result);
      expect(result.length).toBe(26);
    });
  });

  describe("第6章 集計とグループ化", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("主人公のパーティーにいるキャラクターのHPとMPについて、最大値、最小値、平均値をそれぞれ求める。", async () => {
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
          hp: true,
          mp: true,
        },
      });

      const result = {
        HPの最大値: Math.max(...party.map((p) => p.hp)),
        HPの最小値: Math.min(...party.map((p) => p.hp)),
        HPの平均値:
          party.map((p) => p.hp).reduce((a, b) => a + b) / party.length,
        MPの最大値: Math.max(...party.map((p) => p.mp)),
        MPの最小値: Math.min(...party.map((p) => p.mp)),
        MPの平均値:
          party.map((p) => p.mp).reduce((a, b) => a + b) / party.length,
      };

      console.table(result);
      expect(result).toStrictEqual({
        HPの最大値: 156,
        HPの最小値: 74,
        HPの平均値: 106.8,
        MPの最大値: 232,
        MPの最小値: 66,
        MPの平均値: 129.2,
      });
    });

    test("イベントテーブルから、タイプ別にイベントの数を取得する。ただし、タイプは日本語で表示すること。", async () => {
      const event = await prisma.event.findMany({
        select: {
          type: true,
        },
      });

      const group = event.reduce((acc, cur) => {
        const type = cur.type;
        if (acc[type]) {
          acc[type] += 1;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {});

      const result = Object.keys(group).map((key) => {
        return {
          タイプ: key === "1" ? "強制" : key === "2" ? "フリー" : "特殊",
          イベント数: group[key],
        };
      });

      console.table(result);
      expect(result.length).toBe(3);
    });

    test("経験イベントテーブルから、クリアの結果別にクリアしたイベントの数を取得する。クリア結果順に表示すること。", async () => {
      const event = await prisma.experienceEvent.findMany({
        select: {
          clearResult: true,
        },
      });

      const group = event.reduce((acc, cur) => {
        const clearResult = cur.clearResult;
        if (acc[clearResult]) {
          acc[clearResult] += 1;
        } else {
          acc[clearResult] = 1;
        }
        return acc;
      }, {});

      const result = Object.keys(group).map((key) => {
        return {
          クリア結果: key,
          クリア数: group[key],
        };
      });

      console.table(result);
      expect(result.length).toBe(4);
    });

    test("攻撃魔法「小さな奇跡」は、パーティー全員のMPによって敵の行動が異なる。次の条件に従って、現在のパーティーがこの魔法を使ったときの敵の行動を表示する。", async () => {
      // パーティー全員のMPが500未満なら「敵は見とれている！」
      // パーティー全員のMPが500以上1000未満なら「敵は呆然としている！」
      // パーティー全員のMPが1000以上なら「敵はひれ伏している！」
      const paryt = await prisma.party.aggregate({
        _sum: {
          mp: true,
        },
      });

      const result =
        paryt._sum.mp < 500
          ? "敵は見とれている！"
          : paryt._sum.mp < 1000
            ? "敵は呆然としている！"
            : "敵はひれ伏している！";

      console.table(result);
      expect(result).toBe("敵は呆然としている！");
    });

    test("経験イベントテーブルから、クリアしたイベント数と参加したもののまだクリアしていないイベントの数を次の形式で表示する", async () => {
      // 区分                    |イベント数
      // ------------------------|---------
      // クリアした               |
      // 参加したがクリアしていない  |
      const event = await prisma.experienceEvent.groupBy({
        by: ["clearType"],
        _count: {
          eventNumber: true,
        },
      });

      const result = event.map((e) => ({
        区分: e.clearType === "1" ? "クリアした" : "参加したがクリアしていない",
        イベント数: e._count.eventNumber,
      }));

      console.table(result);
      expect(result).toStrictEqual([
        {
          区分: "クリアした",
          イベント数: 6,
        },
        {
          区分: "参加したがクリアしていない",
          イベント数: 1,
        },
      ]);
    });

    test("職業タイプごとのHPとMPの最大値、最小値、平均値を抽出する。ただし、職業タイプは職業コードの1文字目によって分類すること", async () => {
      const party = await prisma.party.findMany({
        select: {
          professionCode: true,
          hp: true,
          mp: true,
        },
      });

      const party2 = party.map((p) => {
        return {
          ...p,
          professionCode: p.professionCode.slice(0, 1),
        };
      });

      const group = party2.reduce((acc, cur) => {
        const professionCode = cur.professionCode;
        const hp = cur.hp;
        const mp = cur.mp;
        if (acc[professionCode]) {
          acc[professionCode].hp.push(hp);
          acc[professionCode].mp.push(mp);
        } else {
          acc[professionCode] = {
            hp: [hp],
            mp: [mp],
          };
        }
        return acc;
      }, {});

      const result = Object.keys(group).map((key) => {
        const hp = group[key].hp;
        const mp = group[key].mp;
        return {
          職業タイプ: key,
          HPの最大値: Math.max(...hp),
          HPの最小値: Math.min(...hp),
          HPの平均値: hp.reduce((a, b) => a + b) / hp.length,
          MPの最大値: Math.max(...mp),
          MPの最小値: Math.min(...mp),
          MPの平均値: mp.reduce((a, b) => a + b) / mp.length,
        };
      });

      console.table(result);
      expect(result).toStrictEqual([
        {
          職業タイプ: "0",
          HPの最大値: 89,
          HPの最小値: 89,
          HPの平均値: 89,
          MPの最大値: 74,
          MPの最小値: 74,
          MPの平均値: 74,
        },
        {
          職業タイプ: "1",
          HPの最大値: 156,
          HPの最小値: 74,
          HPの平均値: 115,
          MPの最大値: 84,
          MPの最小値: 66,
          MPの平均値: 75,
        },
        {
          職業タイプ: "2",
          HPの最大値: 131,
          HPの最小値: 84,
          HPの平均値: 107.5,
          MPの最大値: 232,
          MPの最小値: 190,
          MPの平均値: 211,
        },
      ]);
    });

    test("IDの1文字目によってパーティーを分類し、HPの平均が100を超えているデータを抽出する。次の項目を抽出すること。", async () => {
      // IDよる分類　HPの平均　MPの平均
      const party = await prisma.party.findMany({
        select: {
          id: true,
          hp: true,
          mp: true,
        },
      });

      const party2 = party.map((p) => {
        return {
          ...p,
          id: p.id.slice(0, 1),
        };
      });

      const group = party2.reduce((acc, cur) => {
        const id = cur.id;
        const hp = cur.hp;
        const mp = cur.mp;
        if (acc[id]) {
          acc[id].hp.push(hp);
          acc[id].mp.push(mp);
        } else {
          acc[id] = {
            hp: [hp],
            mp: [mp],
          };
        }
        return acc;
      }, {});

      const result = Object.keys(group)
        .map((key) => {
          const hp = group[key].hp;
          const mp = group[key].mp;
          return {
            id: key,
            hp: hp.reduce((a, b) => a + b) / hp.length,
            mp: mp.reduce((a, b) => a + b) / mp.length,
          };
        })
        .filter((r) => r.hp > 100);

      console.table(result);
      expect(result).toStrictEqual([
        {
          id: "A",
          hp: 123.66666666666667,
          mp: 168.66666666666666,
        },
      ]);
    });

    test("ある洞窟に存在する「力の扉」は、キャラクターのHPによって開けることのできる扉の数が決まっている。次の条件によってその数が決まるとき、現在のパーティーで開けることのできる扉の合計数を求める。", async () => {
      // HPが100未満のキャラクター 1枚
      // HPが100以上150未満のキャラクター 2枚
      // HPが150以上200未満のキャラクター 3枚
      // HPが200以上のキャラクター 5枚
      const party = await prisma.party.findMany({
        select: {
          hp: true,
        },
      });

      const result = party.reduce((acc, cur) => {
        const hp = cur.hp;
        if (hp < 100) {
          acc += 1;
        } else if (hp >= 100 && hp < 150) {
          acc += 2;
        } else if (hp >= 150 && hp < 200) {
          acc += 3;
        } else if (hp >= 200) {
          acc += 5;
        }
        return acc;
      }, 0);

      console.log(result);
      expect(result).toBe(8);
    });
  });

  describe("第7章 副問い合わせ", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("勇者の現在のHPが、パーティー全員のHPの何%に当たるかを求めたい。適切な列を用いて次の別名で抽出する。ただし、割合は小数点第2位を四捨五入し、小数点第1位まで求めること。", async () => {
      // なまえ　現在のHP　パーティーでの割合
      const party = await prisma.party.findMany({
        select: {
          hp: true,
        },
      });

      const usha = await prisma.party.findFirst({
        where: { professionCode: "01" },
        select: {
          name: true,
          hp: true,
        },
      });

      const allHp = party.reduce((acc, cur) => {
        const hp = cur.hp;
        acc += hp;
        return acc;
      }, 0);

      const result = {
        "なまえ": usha.name,
        "現在のHP": usha.hp,
        "パーティーでの割合": Math.round((usha.hp / allHp) * 10) / 10,
      };

      console.log(result);
      expect(result).toStrictEqual({
        "なまえ": "ミナト",
        "現在のHP": 89,
        "パーティーでの割合": 0.2,
      })
    });

    test("魔法使いは回復魔法「みんなからお裾分け」を使ってMPを回復した。この魔法は、本人を除くパーティー全員のMP合計値の10%をもらうことができる。端数は四捨五入して魔法使いのMPを更新する。なお、魔法使い以外のMPは更新しなくてよいものとする。", async () => {
      const party = await prisma.party.findMany({
        where: {
          professionCode: { not: "20" }
        },
        select: {
          id: true,
          professionCode: true,
          mp: true,
        },
      });

      const mage = await prisma.party.findFirst({
        where: { professionCode: "20" },
        select: {
          id: true,
          mp: true,
        },
      });

      const allMp = party.reduce((acc, cur) => {
        const mp = cur.mp;
        acc += mp;
        return acc;
      }, 0);

      const result = await prisma.party.update({
        where: {
          id: mage.id,
        },
        data: {
          mp: Math.round((allMp - mage.mp) * 0.1),
        },
      });

      console.log(result);
      expect(result).toStrictEqual({
        id: "A03",
        name: "イズミ",
        professionCode: "20",
        hp: 84,
        mp: 27,
        statusCode: "00",
      });
    });

    test("経験イベントテーブルから、これまでにクリアしたイベントのうち、タイプが「強制」または「特殊」であるものについて、次の形式で抽出する。", async () => {
      // イベント番号　クリア結果
      // 抽出には、副問い合わせを用いること。
      const result = await prisma.experienceEvent.findMany({
        where: {
          event: {
            OR: [
              { type: "1" },
              { type: "3" },
            ],
          }
        },
        select: {
          eventNumber: true,
          clearResult: true,
        },
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        eventNumber: 1,
        clearResult: "A",
      });
    });

    test("パーティーテーブルから、パーティー内で最も高いMPをもつキャラクター名とそのMPを抽出する。抽出には、副問い合わせを用いること。", async () => {
      const maxMp = await prisma.party.aggregate({
        _max: {
          mp: true,
        },
      });

      const result = await prisma.party.findFirst({
        where: {
          mp: maxMp._max.mp,
        },
        select: {
          name: true,
          mp: true,
        },
      });

      console.log(result);
      expect(result).toStrictEqual({
        name: "スガワラ",
        mp: 232,
      });
    });

    test("これまでに着手していないイベントの数を抽出する。抽出には、副問い合わせを用いること。", async () => {
      const result = await prisma.event.count({
        where: {
          experienceEvent: {
            some: {
              clearResult: null,
            },
          },
        },
      });

      console.log(result);
      expect(result).toBe(1);
    });

    test("5番目にクリアしたイベントのイベント番号よりも小さい番号を持つすべてのイベントについて、イベント番号とイベント名称を抽出する", async () => {
      const result = await prisma.event.findMany({
        where: {
          experienceEvent: {
            some: {
              clearResult: {
                not: null,
              },
            },
          },
        },
        select: {
          eventNumber: true,
          eventName: true,
        },
        orderBy: {
          eventNumber: "asc",
        },
        take: 4,
      });

      console.log(result);
      expect(result[3]).toStrictEqual({
        eventNumber: 5,
        eventName: "盗賊ダンシーを追え！",
      });
    });

    test("これまでにパーティーがクリアしたイベントを前提としているイベントの一覧を次の形式で抽出する。", async () => {
      // イベント番号　イベント名称　前提イベント番号
      const clearEvent = await prisma.experienceEvent.findMany({
        where: {
          clearResult: {
            not: null,
          },
        },
        select: {
          eventNumber: true,
        },
      });

      const result = await prisma.event.findMany({
        where: {
          premiseEventNumber: {
            in: clearEvent.map((event) => event.eventNumber),
          },
        },
        select: {
          eventNumber: true,
          eventName: true,
          premiseEventNumber: true,
        },
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        eventNumber: 4,
        eventName: "初めての仲間",
        premiseEventNumber: 3,
      });
    });

    test("パーティーは、イベント番号「9」のイベントを結果「B」でクリアし、その次に発生するイベントに参加した。これを経験イベントテーブルに記録する。なお、更新と追加の両方を2つのSQL文で記述すること。", async () => {
      const result = await prisma.$transaction([
        prisma.experienceEvent.update({
          where: {
            eventNumber: 9,
          },
          data: {
            clearResult: "B",
          },
        }),
        prisma.experienceEvent.create({
          data: {
            eventNumber: 10,
            clearType: "0",
            clearResult: null,
          },
        }),
      ]);

      console.log(result);
      expect(result[0]).toStrictEqual({
        eventNumber: 9,
        clearType: "0",
        clearResult: "B",
        routeNumber: null,
      });
      expect(result[1]).toStrictEqual({
        eventNumber: 10,
        clearType: "0",
        clearResult: null,
        routeNumber: null,
      });
    });
  });

  describe("第8章 複数テーブルの結合", () => {
    beforeAll(async () => {
      await prisma.party.deleteMany();
      await prisma.experienceEvent.deleteMany();
      await prisma.event.deleteMany();
      await prisma.code.deleteMany();

      for (const p of party) {
        await prisma.party.upsert({
          where: { id: p.id },
          update: p,
          create: p,
        });
      }

      for (const e of event) {
        await prisma.event.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const e of experienceEvent) {
        await prisma.experienceEvent.upsert({
          where: { eventNumber: e.eventNumber },
          update: e,
          create: e,
        });
      }

      for (const c of code) {
        await prisma.code.upsert({
          where: {
            type_value: {
              type: c.type,
              value: c.value,
            },
          },
          update: c,
          create: c,
        });
      }

      const data = [
        {
          id: "A01",
          name: "スガワラ",
          professionCode: "21",
          hp: 131,
          mp: 232,
          statusCode: "03",
        },
        {
          id: "A02",
          name: "オーエ",
          professionCode: "10",
          hp: 156,
          mp: 84,
          statusCode: "00",
        },
        {
          id: "A03",
          name: "イズミ",
          professionCode: "20",
          hp: 84,
          mp: 190,
          statusCode: "00",
        },
      ];

      await prisma.party.createMany({ data: data });
    });

    test("すでにクリアしたイベントについて、次の形式の一覧を抽出する", async () => {
      // ルート番号　イベント番号　イベント名称　クリア結果
      const result = await prisma.experienceEvent.findMany({
        where: {
          clearResult: {
            not: null,
          },
        },
        select: {
          routeNumber: true,
          eventNumber: true,
          clearResult: true,
          event: {
            select: {
              eventName: true,
            },
          },
        },
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        routeNumber: 1,
        eventNumber: 1,
        clearResult: "A",
        event: {
          eventName: "オープニング",
        },
      });
    });

    test("イベントテーブルから、タイプ「強制」のイベントについて、イベント番号とイベント名称、パーティーのクリア区分を抽出する。ただし、これまでに未着手のイベントは考慮しなくてよい", async () => {
      const result = await prisma.event.findMany({
        where: {
          type: "1",
          experienceEvent: {
            some: {
              clearResult: {
                not: null,
              },
            },
          },
        },
        select: {
          eventNumber: true,
          eventName: true,
          experienceEvent: {
            select: {
              clearType: true,
            },
          },
        },
      });

      console.log(result);
      expect(result.length).toBe(5);
    });

    test("問題63では、着手していないイベントについては抽出されなかった。未着手のイベントについてももれなく抽出できるよう、SQL文を変更する。なお、クリアしていないイベントについては、クリア区分に「未クリア」と表示する。", async () => {
      const event = await prisma.event.findMany({
        where: {
          type: "1",
        },
        select: {
          eventNumber: true,
          eventName: true,
          experienceEvent: {
            select: {
              clearType: true,
            },
          },
        },
      });

      const result = event.map((e) => {
        if (e.experienceEvent.length === 0) {
          return {
            eventNumber: e.eventNumber,
            eventName: e.eventName,
            clearType: "未クリア",
          };
        } else {
          return {
            eventNumber: e.eventNumber,
            eventName: e.eventName,
            clearType: e.experienceEvent[0].clearType,
          };
        }
      });

      console.log(result);
      expect(result.length).toBe(14);
    });

    // 次のようなコードテーブルを新しく作成し、職業コードと状態コードを登録した。
    // 「コード」テーブル・・・さまざまなコード値を管理するテーブル
    // 列名　型　制約　備考
    // コード種別 INTEGER PKEY コード値を区別する 1:職業コード 2:状態コード 3:イベントタイプ 4:クリア結果
    // コード値 CHAR(2) PKEY コード種別ごとのコード値
    // コード名称 VARCHAR(100)  コード値の日本語名称
    // このテーブルを使って、現在のパーティーに参加しているキャラクターの一覧を適切な列を用いて次の別名で、ID順に抽出する。
    // ID　なまえ　職業　状態
    // なお、職業と状態は日本語名称で表示すること。
    test("このテーブルを使って、現在のパーティーに参加しているキャラクターの一覧を適切な列を用いて次の別名で、ID順に抽出する。", async () => {
      const paryt = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
        },
      });

      const profession = await prisma.code.findMany({
        where: {
          type: "1",
        },
        select: {
          value: true,
          name: true,
        },
      });

      const status = await prisma.code.findMany({
        where: {
          type: "2",
        },
        select: {
          value: true,
          name: true,
        },
      });

      const result = paryt.map((p) => {
        const professionName = profession.find((pro) => pro.value === p.professionCode)?.name;
        const statusName = status.find((sta) => sta.value === p.statusCode)?.name;
        return {
          "ID": p.id,
          "なまえ": p.name,
          "職業": professionName,
          "状態": statusName,
        };
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        "ID": "C01",
        "なまえ": "ミナト",
        "職業": "勇者",
        "状態": "異常なし",
      });
    });

    test("パーティーテーブルから、現在のパーティーに参加しているキャラクターの一覧を次の形式で抽出する。職業はコードテーブルより日本語で表示する。また、現在のパーティーにいない職業についてももれなく一覧に記載し、名称の項目に「（仲間になっていない！）」と表示すること。", async () => {
      // ID なまえ　職業
      const party = await prisma.party.findMany({
        select: {
          id: true,
          name: true,
          professionCode: true,
          statusCode: true,
        },
      });

      const profession = await prisma.code.findMany({
        where: {
          type: "1",
        },
        select: {
          value: true,
          name: true,
        },
      });

      const result = profession.map((pro) => {
        const partyName = party.find((p) => p.professionCode === pro.value)?.name;
        return {
          "ID": pro.value,
          "なまえ": partyName ? partyName : `（仲間になっていない！）`,
          "職業": pro.name,
        };
      });

      console.log(result);
      expect(result[3]).toStrictEqual({
        "ID": "12",
        "なまえ": "（仲間になっていない！）",
        "職業": "忍者",
      });
    });

    test("経験イベントテーブルから、参加済みイベントのクリア結果一覧を次の形式で抽出する。クリア結果は「コード値：コード名称」のように表示し、クリア未済のイベントも記載されるよう考慮する。", async () => {
      // イベント番号　イベント名　クリア結果
      const event = await prisma.event.findMany({
        select: {
          eventNumber: true,
          eventName: true,
          experienceEvent: {
            select: {
              clearResult: true,
            },
          },
        },
      });

      const clearType = await prisma.code.findMany({
        where: {
          type: "4",
        },
        select: {
          value: true,
          name: true,
        },
      });

      const result = event.map((e) => {
        const clearTypeName = clearType.find((c) => c.value === e.experienceEvent[0]?.clearResult)?.name;
        return {
          "イベント番号": e.eventNumber,
          "イベント名": e.eventName,
          "クリア結果": `${e.experienceEvent[0]?.clearResult}:${clearTypeName}`,
        };
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        "イベント番号": 1,
        "イベント名": "オープニング",
        "クリア結果": "A:たいへんよくできました",
      });
    });

    test("イベントテーブルから、前提イベントが設定されているイベントについて、次の形式の一覧を抽出する。", async () => {
      // イベント番号　イベント名称　前提イベント番号 前提イベント名称
      const event = await prisma.event.findMany({
        where: {
          premiseEventNumber: {
            not: null,
          },
        },
        select: {
          eventNumber: true,
          eventName: true,
          premiseEventNumber: true,
        },
      });

      const premiseEventName = await prisma.event.findFirst({
        where: {
          eventNumber: {
            in: event.map((e) => e.premiseEventNumber),
          },
        },
        select: {
          eventName: true,
        },
      });

      const result = event.map((e) => {
        return {
          "イベント番号": e.eventNumber,
          "イベント名称": e.eventName,
          "前提イベント番号": e.premiseEventNumber,
          "前提イベント名称": premiseEventName?.eventName,
        };
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        "イベント番号": 4,
        "イベント名称": "初めての仲間",
        "前提イベント番号": 3,
        "前提イベント名称": "勇者の旅立ち",
      });
    });

    test("イベントテーブルから、前提イベントまたは後続イベントが設定されているイベントについて、次の形式の一覧を抽出する。", async () => {
      // イベント番号　イベント名称　前提イベント番号 前提イベント名称　後続イベント番号　後続イベント名称
      const event = await prisma.event.findMany({
        where: {
          OR: [
            {
              premiseEventNumber: {
                not: null,
              },
            },
            {
              followOnEventNumber: {
                not: null,
              },
            },
          ],
        },
        select: {
          eventNumber: true,
          eventName: true,
          premiseEventNumber: true,
          followOnEventNumber: true,
        },
      });

      const eventName = await prisma.event.findMany({
        select: {
          eventName: true,
          eventNumber: true,
        },
        orderBy: {
          eventNumber: "asc",
        },
      })

      const result = event.map((e) => {
        return {
          "イベント番号": e.eventNumber,
          "イベント名称": e.eventName,
          "前提イベント番号": e.premiseEventNumber,
          "前提イベント名称": eventName.filter((n) => n.eventNumber === e.premiseEventNumber)[0]?.eventName,
          "後続イベント番号": e.followOnEventNumber,
          "後続イベント名称": eventName.filter((n) => n.eventNumber === e.followOnEventNumber)[0]?.eventName,
        };
      });

      console.log(result);
      expect(result[3]).toStrictEqual({
        "イベント番号": 4,
        "イベント名称": "初めての仲間",
        "前提イベント番号": 3,
        "前提イベント名称": "勇者の旅立ち",
        "後続イベント番号": 5,
        "後続イベント名称": "盗賊ダンシーを追え！",
      });
    });

    test("ほかのイベントの前提となっているイベントについて、次の形式の一覧を抽出する。一覧はイベント番号順とする。", async () => {
      // イベント番号　イベント名称　前提イベント数
      const event = await prisma.event.groupBy({
        by: ["eventNumber", "eventName"],
        where: {
          premiseEventNumber: {
            not: null,
          },
        },
        _sum: {
          premiseEventNumber: true,
        },
        orderBy: {
          eventNumber: "asc",
        },
      });

      const result = event.map((e) => {
        return {
          "イベント番号": e.eventNumber,
          "イベント名称": e.eventName,
          "前提イベント数": e._sum.premiseEventNumber,
        };
      });

      console.log(result);
      expect(result[0]).toStrictEqual({
        "イベント番号": 4,
        "イベント名称": "初めての仲間",
        "前提イベント数": 3,
      });

    });

  });
});

