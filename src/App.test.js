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

  describe("LIKE演算子データ取得", () => {
    let select_birthday_like = () => { };

    beforeEach(() => {
      const parseBirthday = (birthday) => {
        const date = new Date(birthday);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      select_birthday_like = (data, birthday) =>
        data.filter((i) => parseBirthday(i.birthday).match("\\s*" + birthday + "\\s*"));
    })

    test("SELECT * FROM Student WHERE birthday LIKE '%2000-%'", () => {
      const result = select_birthday_like(students, "2000-");

      console.table(result);
      expect(result.length).toBe(2);
    })

    test("SELECT * FROM Student WHERE birthday LIKE '1998-%'", () => {
      const result = select_birthday_like(students, "1998-");

      console.table(result);
      expect(result.length).toBe(3);
    })

    test("SELECT * FROM Student WHERE name LIKE '%藤'", () => {
      const select_name_like_before = (data, name) =>
        data.filter((i) => i.name.match(new RegExp(name + ".*", "g")));

      const result = select_name_like_before(students, "藤");

      console.table(result);
      expect(result.length).toBe(3);
    })

    test("SELECT * FROM Student WHERE name LIKE '藤%'", () => {
      const select_name_like_after = (data, name) =>
        data.filter((i) => i.name.match(new RegExp("^" + name + ".*", "g")));

      const result = select_name_like_after(students, "藤");

      console.table(result);
      expect(result.length).toBe(0);
    })

    test("SELECT * FROM Student WHERE test_score is NULL", () => {
      const select_test_score_is_null = (data) =>
        data.filter((i) => i.test_score === null);

      const result = select_test_score_is_null(students);

      console.table(result);
      expect(result.length).toBe(0);
    })

    test("SELECT * FROM Student WHERE test_score is NOT NULL", () => {
      const select_test_score_is_not_null = (data) =>
        data.filter((i) => i.test_score !== null);

      const result = select_test_score_is_not_null(students);

      console.table(result);
      expect(result.length).toBe(10);
    })
  })

  describe("AND演算子 OR演算子", () => {
    test("SELECT * FROM Student WHERE gender='男' AND age=12", () => {
      const select_by_gender_and_age = (data, gender, age) =>
        data.filter((i) => i.gender === gender && i.age === age);

      const result = select_by_gender_and_age(students, "男", 12);

      console.table(result);
      expect(result.length).toBe(2);
    })

    test("SELECT * FROM Student WHERE gender='男' AND age>10", () => {
      const select_by_gender_and_age_grater = (data, gender, age) =>
        data.filter((i) => i.gender === gender && i.age > age);

      const result = select_by_gender_and_age_grater(students, "男", 10);

      console.table(result);
      expect(result.length).toBe(3);
    })

    test("SELECT * FROM Student WHERE gener='女' AND birthday LIKE '%1998-%'", () => {
      const parseBirthday = (birthday) => {
        const date = new Date(birthday);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      const select_by_gender_and_birthday_like = (data, gender, birthday) =>
        data.filter(
          (i) =>
            i.gender === gender &&
            parseBirthday(i.birthday).match(new RegExp("^" + birthday + ".*", "g"))
        );

      const result = select_by_gender_and_birthday_like(students, "女", "1998-");
      expect(result.length).toBe(2);
    })

    test("SELECT * FROM Student WHERE gender='男' AND age=12 AND test_score>50", () => {
      const select_by_gender_and_age_and_test_score_grater = (
        data,
        gender,
        age,
        test_score
      ) =>
        data.filter(
          (i) => i.gender === gender && i.age === age && i.test_score > test_score
        );

      const result = select_by_gender_and_age_and_test_score_grater(students, "男", 12, 50);
      expect(result.length).toBe(2);
    })

    test("SELECT * FROM Student WHERE age=10 OR age=12", () => {
      const select_by_age = (data, agelist) =>
        data.filter((i) => agelist.includes(i.age));

      const result = select_by_age(students, [10, 12]);

      console.table(result);
      expect(result.length).toBe(5);
    })

    test("SELECT * FROM Student WHERE age=10 OR age=12 OR name='渡辺'", () => {
      const select_by_age_or_name = (data, agelist, name) =>
        data.filter((i) => agelist.includes(i.age) || i.name === name);

      const result = select_by_age_or_name(students, [10, 12], "渡辺");

      console.table(result);
      expect(result.length).toBe(6);
    })
  })
})