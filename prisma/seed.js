const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const student = [
  {
    id: 1,
    name: "佐藤",
    age: 12,
    gender: "男",
    test_score: 89,
    birthday: new Date("2000-05-09"),
  },
  {
    id: 2,
    name: "鈴木",
    age: 9,
    gender: "男",
    test_score: 64,
    birthday: new Date("1997-04-09"),
  },
  {
    id: 3,
    name: "高橋",
    age: 8,
    gender: "女",
    test_score: 90,
    birthday: new Date("1996-03-11"),
  },
  {
    id: 4,
    name: "田中",
    age: 10,
    gender: "男",
    test_score: 45,
    birthday: new Date("1998-04-05"),
  },
  {
    id: 5,
    name: "伊藤",
    age: 11,
    gender: "女",
    test_score: 25,
    birthday: new Date("1999-01-13"),
  },
  {
    id: 6,
    name: "渡辺",
    age: 8,
    gender: "女",
    test_score: 50,
    birthday: new Date("1996-02-14"),
  },
  {
    id: 7,
    name: "山本",
    age: 11,
    gender: "男",
    test_score: 55,
    birthday: new Date("1999-03-30"),
  },
  {
    id: 8,
    name: "中村",
    age: 12,
    gender: "男",
    test_score: 100,
    birthday: new Date("2000-06-01"),
  },
  {
    id: 9,
    name: "小林",
    age: 10,
    gender: "女",
    test_score: 99,
    birthday: new Date("1998-07-28"),
  },
  {
    id: 10,
    name: "加藤",
    age: 10,
    gender: "女",
    test_score: 14,
    birthday: new Date("1998-08-25"),
  },
];

async function main() {
  for (const s of student) {
    await prisma.student.upsert({
      where: { id: s.id },
      update: {},
      create: s
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })