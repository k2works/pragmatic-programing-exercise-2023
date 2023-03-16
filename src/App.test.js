import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
let students = [];
beforeAll(async () => {
  students = await prisma.student.findMany();
})

describe("SQL入門", () => {
  let parseBirthday = () => { };
  let select_birthday_like = () => { };

  beforeEach(() => {
    parseBirthday = (birthday) => {
      const date = new Date(birthday);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    select_birthday_like = (data, birthday) =>
      data.filter((i) => parseBirthday(i.birthday).match("\\s*" + birthday + "\\s*"));
  })

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

  describe("ORDER BYで並び替え", () => {
    test("SELECT name,age FROM Student ORDER BY age ASC", () => {
      const select_name_and_age_order_by_age_asc = (data) =>
        data.sort((a, b) => a.age - b.age).map((i) => ({ name: i.name, age: i.age }));

      const result = select_name_and_age_order_by_age_asc(students);

      console.table(result);
      expect(result[0].age).toBe(8);
    })

    test("SELECT name,birthday FROM Student ORDER BY birthday ASC", () => {
      const select_name_and_birthday_order_by_birthday_asc = (data) =>
        data
          .sort((a, b) => parseBirthday(a.birthday).localeCompare(parseBirthday(b.birthday)))
          .map((i) => ({ name: i.name, birthday: i.birthday }));

      const result = select_name_and_birthday_order_by_birthday_asc(students);

      console.table(result);
      expect(parseBirthday(result[0].birthday)).toBe("1996-2-14");
    })

    test("SELECT name,age FROM Student ORDER BY age DESC", () => {
      const select_name_and_age_order_by_age_desc = (data) =>
        data.sort((a, b) => b.age - a.age).map((i) => ({ name: i.name, age: i.age }));

      const result = select_name_and_age_order_by_age_desc(students);

      console.table(result);
      expect(result[0].age).toBe(12);
    })

    test("SELECT age,id FROM Student ORDER BY age,id ASC", () => {
      const select_age_and_id_order_by_age_asc_and_id_asc = (data) =>
        data
          .sort((a, b) => a.age - b.age || a.id - b.id)
          .map((i) => ({ age: i.age, id: i.id }));

      const result = select_age_and_id_order_by_age_asc_and_id_asc(students);

      console.table(result);
      expect(result[0].age).toBe(8);
    })

    test("SELECT name,age FROM Student WHERE age>=10 ORDER BY age ASC", () => {
      const select_name_and_age_order_by_age_asc_by_age_grater = (data, age) =>
        data
          .filter((i) => i.age >= age)
          .sort((a, b) => a.age - b.age)
          .map((i) => ({ name: i.name, age: i.age }));

      const result = select_name_and_age_order_by_age_asc_by_age_grater(students, 10);

      console.table(result);
      expect(result[0].age).toBe(10);
    })

    test("SELECT name,id,age,gender FROM Student WHERE gender='女' ORDER BY age,id ASC", () => {
      const select_name_and_id_and_age_and_gender_order_by_age_id_asc_by_gender = (
        data,
        gender
      ) =>
        data
          .filter((i) => i.gender === gender)
          .sort((a, b) => a.age - b.age || a.id - b.id)
          .map((i) => ({ name: i.name, id: i.id, age: i.age, gender: i.gender }));

      const result = select_name_and_id_and_age_and_gender_order_by_age_id_asc_by_gender(students, "女");

      console.table(result);
      expect(result[0].age).toBe(8);
    })
  })

  describe("LIMIでデータ数制限", () => {
    test("SELECT name FROM Student LIMIT 5", () => {
      const select_name_limit = (data, limit) =>
        data
          .sort((a, b) => a.id - b.id)
          .map((i) => i.name)
          .slice(0, -1 * limit);

      const result = select_name_limit(students, 5);

      console.table(result);
      expect(result.length).toBe(5);
    })

    test("SELECT name FROM Student WHERE age=12 LIMIT 1", () => {
      const select_name_by_age_limit = (data, age, limit) => {
        const result = data
          .filter((i) => i.age === age)
          .sort((a, b) => a.id - b.id)
          .map((i) => i.name)
          .slice(0, -1 * limit);
        return result.length ? result[0] : null;
      };

      const result = select_name_by_age_limit(students, 12, 1);

      console.table(result);
      expect(result).toBe("佐藤");
    })

    test("SELECT name FROM Student WHERE birthday LIKE '2000-%' LIMIT 1", () => {
      const select_name_by_birthday_like_limit = (data, birthday, limit) => {
        const result = data
          .filter((i) => parseBirthday(i.birthday).includes(birthday))
          .sort((a, b) => a.id - b.id)
          .map((i) => i.name)
          .slice(0, -1 * limit);
        return result.length ? result[0] : null;
      };

      const result = select_name_by_birthday_like_limit(students, "2000-", 1);

      console.table(result);
      expect(result).toBe("佐藤");
    })

    test("SELECT name FROM Student ORDER BY age ASC LIMIT 1", () => {
      const select_name_order_by_age_asc_limit = (data, limit) => {
        const result = data
          .sort((a, b) => a.age - b.age)
          .map((i) => i.name)
          .slice(0, -1 * limit);
        return result.length ? result[0] : null;
      };

      const result = select_name_order_by_age_asc_limit(students, 1);

      console.table(result);
      expect(result).toBe("高橋");
    })

    test("SELECT DISTINCT(age) FROM Student ORDER BY age ASC", () => {
      const select_distinct_age_order_by_age_asc = (data) =>
        data
          .sort((a, b) => a.age - b.age)
          .map((i) => i.age)
          .filter((i, index, self) => self.indexOf(i) === index);

      const result = select_distinct_age_order_by_age_asc(students);

      console.table(result);
      expect(result.length).toBe(5);
    })
  })

  describe("SUMなどの集計関数", () => {
    test("SELECT SUM(test_score) FROM Student", () => {
      const select_sum_test_score = (data) =>
        data.reduce((acc, cur) => acc + cur.test_score, 0);

      const result = select_sum_test_score(students);

      console.table(result);
      expect(result).toBe(631);
    })

    test("SELECT SUM(test_score) FROM Student WHERE test_score>=50", () => {
      const select_sum_test_score_by_test_score_grater = (data, test_score) =>
          data
          .filter((i) => i.test_score >= test_score)
          .reduce((acc, cur) => acc + cur.test_score, 0);

      const result = select_sum_test_score_by_test_score_grater(students, 50);

      console.table(result);
      expect(result).toBe(547);
    })

    test("SELECT COUNT(test_score) FROM Student", () => {
      const select_count_test_score = (data) => data.length;

      const result = select_count_test_score(students);

      console.table(result);
      expect(result).toBe(10);
    })

    test("SELECT COUNT(test_score) FROM Student WHERE test_score>=50", () => {
      const select_count_test_score_by_test_score_grater = (data, test_score) =>
        data.filter((i) => i.test_score >= test_score).length;

      const result = select_count_test_score_by_test_score_grater(students, 50);

      console.table(result);
      expect(result).toBe(7);
    })

    test("SELECT AVG(test_score) FROM Student", () => {
      const select_avg_test_score = (data) =>
        data.reduce((acc, cur) => acc + cur.test_score, 0) / data.length;

      const result = select_avg_test_score(students);

      console.table(result);
      expect(result).toBe(63.1);
    })

    test("SELECT AVG(test_score) FROM Student WHERE gender='男'", () => {
      const select_avg_test_score_by_gender = (data, gender) =>
        data
          .filter((i) => i.gender === gender)
          .reduce((acc, cur) => acc + cur.test_score, 0) / data.filter((i) => i.gender === gender).length;

      const result = select_avg_test_score_by_gender(students, "男");

      console.table(result);
      expect(result).toBe(70.6);
    })
  })
})
