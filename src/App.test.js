import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
let students = [];
beforeAll(async () => {
  students = await prisma.student.findMany();
})

describe("SQL入門", () => {
  describe("SQLのクエリの書き方", () => {
    test("SELECT id FROM Student", () => {
      const select = (data) => data.map((i) => i.id);

      const result = select(students);

      console.table(result);
      expect(result.length).toBe(10);
    })

    test("SELECT id,test_score FROM Student", () => {
      const select = (data) => data.map((i) => ({ id: i.id, test_score: i.test_score }));

      const result = select(students);

      console.table(result);
      expect(result.length).toBe(10);
    })

    test("SELECT * FROM Student", () => {
      const select = (data) => data.map((i) => i);

      const result = select(students);

      console.table(result);
      expect(result.length).toBe(10);
    });
  })

  describe("WHERE句でデータを取得", () => {
    test("SELECT * FROM Student WHERE age = 12", () => {
      const select_age = (data, age) => data.filter((i) => i.age === age);

      const result = select_age(students, 12);

      console.table(result);
      expect(result.length).toBe(2);
    })

    test("SELECT * FROM Student WHERE gender = '女'", () => {
      const select_gender = (data, gender) => data.filter((i) => i.gender === gender);

      const result = select_gender(students, '女');

      console.table(result);
      expect(result.length).toBe(5);
    })

    test("SELECT * FROM Student WHERE age>10", () => {
      const select_age_grater = (data, age) => data.filter((i) => i.age > age);

      const result = select_age_grater(students, 10);

      console.table(result);
      expect(result.length).toBe(4);
    })
  })
})