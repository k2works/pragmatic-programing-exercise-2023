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

const student2 = [
  {
    id: 1,
    name: "佐藤",
    from_id: 3,
    class_id: 2,
  },
  {
    id: 2,
    name: "鈴木",
    from_id: 1,
    class_id: 3,
  },
  {
    id: 3,
    name: "高橋",
    from_id: 2,
    class_id: 4,
  },
  {
    id: 4,
    name: "田中",
    from_id: 4,
  },
]

const from = [
  {
    id: 1,
    syussin: "東京",
  },
  {
    id: 2,
    syussin: "大阪",
  },
  {
    id: 3,
    syussin: "北海道",
  }
]

const classRoom = [
  {
    id: 1,
    teacher: "木村",
  },
  {
    id: 2,
    teacher: "近藤",
  },
  {
    id: 3,
    teacher: "桐山",
  },
  {
    id: 4,
    teacher: "高崎",
  },
]

async function main() {
  for (const s of student) {
    await prisma.student.upsert({
      where: { id: s.id },
      update: {},
      create: s
    })
  }

  for (const f of from) {
    await prisma.from.upsert({
      where: { id: f.id },
      update: {},
      create: f
    })
  }

  for (const s2 of student2) {
    await prisma.student2.upsert({
      where: { id: s2.id },
      update: {},
      create: s2
    })
  }

  for ( const c of classRoom) {
    await prisma.classRoom.upsert({
      where: { id: c.id },
      update: {},
      create: c
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