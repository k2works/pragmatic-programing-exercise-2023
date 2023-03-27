import { PrismaClient } from '@prisma/client';
import account from '../prisma/data/account';

const prisma = new PrismaClient();

describe('第２章 基本文法と四大命令', () => {
  beforeAll(async () => {
    await prisma.account.deleteMany({});
    for (const a of account) {
      await prisma.account.upsert({
        where: { number: a.number },
        update: {},
        create: a,
      });
    }
  });

  test('口座テーブルの全てのデータを「*]を用いずに抽出する', async () => {
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
      number: '0037651',
      name: 'キタムラユウコ',
      type: '1',
      balance: 1341107,
      updatedAt: new Date(2022, 0, 3),
    });
    expect(accounts[29]).toStrictEqual({
      number: '3104451',
      name: 'ナカジョウ　ヨシヒコ',
      type: '2',
      balance: 8136406,
      updatedAt: new Date('2022-03-13'),
    });
  });

  test('口座テーブルの全ての口座番号を抽出する', async () => {
    const accounts = await prisma.account.findMany({
      select: {
        number: true,
      },
    });

    expect(accounts.length).toBe(30);
    expect(accounts[0]).toStrictEqual({
      number: '0037651',
    });
    expect(accounts[29]).toStrictEqual({
      number: '3104451',
    });
  });

  test('口座テーブルの全ての口座番号と残高を抽出する', async () => {
    const accounts = await prisma.account.findMany({
      select: {
        number: true,
        balance: true,
      },
    });

    expect(accounts.length).toBe(30);
    expect(accounts[0]).toStrictEqual({
      number: '0037651',
      balance: 1341107,
    });
    expect(accounts[29]).toStrictEqual({
      number: '3104451',
      balance: 8136406,
    });
  });

  test('口座テーブルの全てのデータを「＊」を用いて抽出する', async () => {
    const accounts = await prisma.account.findMany();

    expect(accounts.length).toBe(30);
    expect(accounts[0]).toStrictEqual({
      number: '0037651',
      name: 'キタムラユウコ',
      type: '1',
      balance: 1341107,
      updatedAt: new Date(2022, 0, 3),
    });
    expect(accounts[29]).toStrictEqual({
      number: '3104451',
      name: 'ナカジョウ　ヨシヒコ',
      type: '2',
      balance: 8136406,
      updatedAt: new Date('2022-03-13'),
    });
  });

  test('口座テーブルの全ての名義を「ｘｘｘｘｘ」に更新する', async () => {
    const accounts = await prisma.account.updateMany({
      data: {
        name: 'ｘｘｘｘｘ',
      },
    });

    const result = await prisma.account.findMany();

    expect(result[0]).toStrictEqual({
      number: '0037651',
      name: 'ｘｘｘｘｘ',
      type: '1',
      balance: 1341107,
      updatedAt: new Date(2022, 0, 3),
    });
    expect(result[29]).toStrictEqual({
      number: '3104451',
      name: 'ｘｘｘｘｘ',
      type: '2',
      balance: 8136406,
      updatedAt: new Date('2022-03-13'),
    });
  });

  test('口座テーブルの全て残高を99999999、更新日を「2022-03-01」に更新する', async () => {
    const accounts = await prisma.account.updateMany({
      data: {
        balance: 99999999,
        updatedAt: new Date('2022-03-01'),
      },
    });

    const result = await prisma.account.findMany();

    expect(result[0]).toStrictEqual({
      number: '0037651',
      name: 'ｘｘｘｘｘ',
      type: '1',
      balance: 99999999,
      updatedAt: new Date('2022-03-01'),
    });
    expect(result[29]).toStrictEqual({
      number: '3104451',
      name: 'ｘｘｘｘｘ',
      type: '2',
      balance: 99999999,
      updatedAt: new Date('2022-03-01'),
    });
  });

  test('口座テーブルに次の３つのデータを１回の実行ごとに１つずつ登録する', async () => {
    const data = [
      {
        number: '0642191',
        name: 'アオキ　ハルカ',
        type: '1',
        balance: 3640551,
        updatedAt: new Date('2022-03-13'),
      },
      {
        number: '1039410',
        name: 'キノシタ　リュウジ',
        type: '1',
        balance: 259017,
        updatedAt: new Date('2021-11-30'),
      },
      {
        number: '1239855',
        name: 'タカシナ ミツル',
        type: '2',
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
