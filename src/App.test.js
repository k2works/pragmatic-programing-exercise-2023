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

  describe("SQL入門編", () => {
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

    describe("MAXやMINの使い方", () => {
      test("SELECT MAX(age) FROM Student", () => {
        const select_max_age = (data) =>
          data.reduce((acc, cur) => (acc > cur.age ? acc : cur.age), 0);

        const result = select_max_age(students);

        console.table(result);
        expect(result).toBe(12);
      })

      test("SELECT MAX(birthday) FROM Student", () => {
        const select_max_birthday = (data) =>
          data.reduce((acc, cur) => (acc > cur.birthday ? acc : cur.birthday), "");

        const result = select_max_birthday(students);

        console.table(result);
        expect(result).toStrictEqual(new Date("2000-06-01"));
      })

      test("SELECT MAX(age) FROM Student WHERE test_score>=50", () => {
        const select_max_age_by_test_score_grater = (data, test_score) =>
          data
            .filter((i) => i.test_score >= test_score)
            .reduce((acc, cur) => (acc > cur.age ? acc : cur.age), 0);

        const result = select_max_age_by_test_score_grater(students, 50);

        console.table(result);
        expect(result).toBe(12);
      })

      test("SELECT MIN(age) FROM Student", () => {
        const select_min_age = (data) =>
          data.map((i) => i.age).reduce((a, b) => Math.min(a, b));

        const result = select_min_age(students);

        console.table(result);
        expect(result).toBe(8);
      })

      test("SELECT MIN(age) FROM Student WHERE test_score>=50", () => {
        const select_min_age_by_test_score_grater = (data, test_score) =>
          data
            .filter((i) => i.test_score >= test_score)
            .map((i) => i.age)
            .reduce((a, b) => Math.min(a, b));

        const result = select_min_age_by_test_score_grater(students, 50);

        console.table(result);
        expect(result).toBe(8);
      })
    })

    describe("GROUP BYの使い方", () => {
      test("SELECT gender, SUM(test_score) AS test_score_by_gender FROM Student GROUP BY gender", () => {
        const select_gender_sum_test_score_gourp_by_gender = (data) => {
          const gender_group = data
            .sort((a, b) => a.gender - b.gender)
            .map((i) => i.gender)
            .filter((i, index, self) => self.indexOf(i) === index);

          return gender_group.map((gender) => {
            const list = data.filter((i) => i.gender === gender);
            return {
              gender,
              test_score_by_gender: list.reduce((acc, cur) => acc + cur.test_score, 0),
            };
          });
        };

        const result = select_gender_sum_test_score_gourp_by_gender(students);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "gender": "女", "test_score_by_gender": 278 },
            { "gender": "男", "test_score_by_gender": 353 }
          ]
        );
      })

      test("SELECT age, SUM(test_score) as test_score_by_age FROM Student GROUP BY age", () => {
        const select_age_sum_test_score_gourp_by_age = (data) => {
          const age_group = data
            .sort((a, b) => a.age - b.age)
            .map((i) => i.age)
            .filter((i, index, self) => self.indexOf(i) === index);

          return age_group.map((age) => {
            const list = data.filter((i) => i.age === age);
            return {
              age,
              test_score_by_age: list.reduce((acc, cur) => acc + cur.test_score, 0),
            };
          });
        };

        const result = select_age_sum_test_score_gourp_by_age(students);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "age": 8, "test_score_by_age": 140 },
            { "age": 9, "test_score_by_age": 64 },
            { "age": 10, "test_score_by_age": 158 },
            { "age": 11, "test_score_by_age": 80 },
            { "age": 12, "test_score_by_age": 189 }
          ]
        );
      })

      test("SELECT gender, AVG(test_score) AS test_score_avagrage_by_gender FROM Student GROUP BY gender", () => {
        const select_gender_age_test_score_gourp_by_gender = (data) => {
          const gender_group = data
            .sort((a, b) => a.gender - b.gender)
            .map((i) => i.gender)
            .filter((i, index, self) => self.indexOf(i) === index);

          return gender_group.map((gender) => {
            const list = data.filter((i) => i.gender === gender);
            return {
              gender,
              test_score_by_gender:
                list.reduce((acc, cur) => acc + cur.test_score, 0) / list.length,
            };
          });
        };

        const result = select_gender_age_test_score_gourp_by_gender(students);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "gender": "女", "test_score_by_gender": 55.6 },
            { "gender": "男", "test_score_by_gender": 70.6 }
          ]
        );
      })

      test("SELECT age, AVG(test_score) AS test_score_avarate_by_age FROM Student GROUP BY age ORDER BY AVG(test_score) ASC", () => {
        const select_age_test_score_average_by_age_order_by_test_score_avarage = (
          data
        ) => {
          const age_group = data
            .sort((a, b) => a.age - b.age)
            .map((i) => i.age)
            .filter((i, index, self) => self.indexOf(i) === index);

          return age_group
            .map((age) => {
              const list = data.filter((i) => i.age === age);
              return {
                age,
                test_score_avarage_by_age:
                  list.reduce((acc, cur) => acc + cur.test_score, 0) / list.length,
              };
            })
            .sort((a, b) => a.test_score_avarage_by_age - b.test_score_avarage_by_age);
        };

        const result = select_age_test_score_average_by_age_order_by_test_score_avarage(students);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "age": 11, "test_score_avarage_by_age": 40 },
            { "age": 10, "test_score_avarage_by_age": 52.666666666666664 },
            { "age": 9, "test_score_avarage_by_age": 64 },
            { "age": 8, "test_score_avarage_by_age": 70 },
            { "age": 12, "test_score_avarage_by_age": 94.5 }
          ]
        );
      })

      test("SELECT gender, SUM(test_score) AS test_sucore_by_gender_grater_equal_age FROM Student WHERE age>=10 GROUP BY gender", () => {
        const select_gender_test_score_by_gender_and_grater_equal_age = (data, age) => {
          const gender_group = data
            .sort((a, b) => a.gender - b.gender)
            .map((i) => i.gender)
            .filter((i, index, self) => self.indexOf(i) === index);

          return gender_group.map((gender) => {
            const list = data.filter((i) => i.gender === gender && i.age >= age);
            return {
              gender,
              test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
            };
          });
        };

        const result = select_gender_test_score_by_gender_and_grater_equal_age(students, 10);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "gender": "女", "test_score": 138 },
            { "gender": "男", "test_score": 289 }
          ]
        );
      })

      test("SELECT gender, SUM(test_score) as test_score_by_gender FROM Student GROUP BY gender WITH ROLLUP", () => {
        const select_gender_sum_test_score_gourp_by_gender_with_rollup = (data) => {
          const gender_group = data
            .sort((a, b) => a.gender - b.gender)
            .map((i) => i.gender)
            .filter((i, index, self) => self.indexOf(i) === index);

          const group_sum = gender_group.map((gender) => {
            const list = data.filter((i) => i.gender === gender);
            return {
              gender,
              test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
            };
          });

          group_sum.push({
            gender: null,
            test_score: group_sum.reduce((acc, cur) => acc + cur.test_score, 0),
          });

          return group_sum;
        };

        const result = select_gender_sum_test_score_gourp_by_gender_with_rollup(students);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "gender": "女", "test_score": 278 },
            { "gender": "男", "test_score": 353 },
            { "gender": null, "test_score": 631 }
          ]
        )
      })
    })

    describe("GROUP BYとHAVING", () => {
      test("SELECT name, test_score FROM Student HAVING test_score>=50", () => {
        const select_name_test_score_by_name_and_grater_equal_test_score = (
          data,
          test_score
        ) => {
          const name_group = data
            .sort((a, b) => a.name - b.name)
            .map((i) => i.name)
            .filter((i, index, self) => self.indexOf(i) === index);

          return name_group
            .map((name) => {
              const list = data.filter(
                (i) => i.name === name && i.test_score >= test_score
              );
              return list.map((i) => {
                return {
                  name: i.name,
                  test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
                };
              })[0];
            })
            .filter((v) => v);
        };

        const result = select_name_test_score_by_name_and_grater_equal_test_score(students, 50);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "name": "高橋", "test_score": 90 },
            { "name": "渡辺", "test_score": 50 },
            { "name": "鈴木", "test_score": 64 },
            { "name": "小林", "test_score": 99 },
            { "name": "山本", "test_score": 55 },
            { "name": "佐藤", "test_score": 89 },
            { "name": "中村", "test_score": 100 }
          ]
        )
      })

      test.skip("SELECT age, SUM(test_score) AS test_score_by_age FROM Student GROUP BY age HAVING SUM(test_score)>=100", () => {
        const select_age_sum_test_score_by_age_and_grater_equal_test_score = (
          data,
          test_score
        ) => {
          const age_group = data
            .sort((a, b) => a.age - b.age)
            .map((i) => i.age)
            .filter((i, index, self) => self.indexOf(i) === index);

          return age_group
            .map((age) => {
              const list = data.filter(
                (i) => i.age === age && i.test_score >= test_score
              );
              return list.map((i) => {
                return {
                  age: i.age,
                  test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
                };
              })[0];
            })
            .filter((v) => v);
        };

        const result = select_age_sum_test_score_by_age_and_grater_equal_test_score(students, 100);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "age": 11, "test_score": 100 },
            { "age": 12, "test_score": 189 }
          ]
        )
      })

      test("SELECT age, SUM(test_score) AS test_score_by_age FROM Student GROUP BY age HAVING test_score_by_age >=100", () => {
        const select_age_sum_test_score_by_age_having_grater_equal_test_score = (
          data,
          test_score
        ) => {
          const age_group = data
            .sort((a, b) => a.age - b.age)
            .map((i) => i.age)
            .filter((i, index, self) => self.indexOf(i) === index);

          const having = age_group.map((age) => {
            const list = data.filter((i) => i.age === age);
            return list.map((i) => {
              return {
                age: i.age,
                test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
              };
            })[0];
          });

          return having
            .map((i) => {
              if (i.test_score >= test_score) {
                return i;
              }
            })
            .filter((v) => v);
        };

        const result = select_age_sum_test_score_by_age_having_grater_equal_test_score(students, 100);

        console.table(result);
        expect(result).toStrictEqual(
          [
            { "age": 8, "test_score": 140 },
            { "age": 10, "test_score": 158 },
            { "age": 12, "test_score": 189 }
          ]
        );
      })

      test("SELECT age, SUM(test_score) AS test_score_by_age FROM Student GROUP BY age HAVING test_score_by_age >=100 ORDER BY test_score_by_age", () => {
        const select_age_sum_test_score_by_age_having_grater_equal_test_score_order_by_test_score =
          (data, test_score) => {
            const age_group = data
              .sort((a, b) => a.age - b.age)
              .map((i) => i.age)
              .filter((i, index, self) => self.indexOf(i) === index);

            const having = age_group.map((age) => {
              const list = data.filter((i) => i.age === age);
              return list.map((i) => {
                return {
                  age: i.age,
                  test_score: list.reduce((acc, cur) => acc + cur.test_score, 0),
                };
              })[0];
            });

            return having
              .map((i) => {
                if (i.test_score >= test_score) {
                  return i;
                }
              })
              .filter((v) => v)
              .sort((a, b) => b.test_score + a.test_score);
          };

        const result = select_age_sum_test_score_by_age_having_grater_equal_test_score_order_by_test_score(
          students,
          100
        );

        console.table(result);
        expect(result).toStrictEqual([
          { "age": 8, "test_score": 140 },
          { "age": 10, "test_score": 158 },
          { "age": 12, "test_score": 189 }
        ]
        );
      })
    })
  })

  describe("SQL初級編", () => {
    describe("INSERTでデータ追加", () => {
      test("INSERT INTO Student (id, name, age, gender, test_score, birthday) VALUE(11, '石田', 13, '女', 95, '2001/03/15'", () => {
        const insert_student = (data, item) => {
          const result = data.map((i) => i);
          result.push(item);
          return result;
        };

        const result = insert_student(students, {
          id: 11,
          name: "石田",
          age: 13,
          gender: "女",
          test_score: 95,
          birthday: "2001/03/15",
        });

        console.table(result);
        expect(result[10].id).toStrictEqual(11);
      })

      test("INSERT INTO Student (id, name, age, gender, test_score, birthday)VALUES(13,'石井',13,'男',47,'2001/02/14'),(14,'上原',13,'女',50,'2001/01/01')", () => {
        const insert_students = (data, items) => {
          const result = data.map((i) => i);
          items.map((i) => result.push(i));
          return result;
        };

        const result = insert_students(students, [
          {
            id: 13,
            name: "石田",
            age: 13,
            gender: "男",
            test_score: 47,
            birthday: "2001/02/14",
          },
          {
            id: 14,
            name: "上原",
            age: 13,
            gender: "女",
            test_score: 50,
            birthday: "2001/01/01",
          },
        ]).sort((a, b) => a.id - b.id);

        console.table(result);
        expect(result[11].id).toStrictEqual(14);
      })

      test("INSERT INTO Student (name, age, gender, test_score, birthday)VALUE('石田',13,'女',95,'2001/03/15'", () => {
        const insert_student_auto_increment = (data, item) => {
          const increment_id =
            data.map((i) => i.id).reduce((a, b) => Math.max(a, b)) + 1;
          const result = data.map((i) => i);
          result.push({ ...item, id: increment_id });
          return result;
        };

        const result = insert_student_auto_increment(students, {
          name: "石田",
          age: 13,
          gender: "女",
          test_score: 95,
          birthday: "2001/03/15",
        });

        console.table(result.sort((a, b) => a.id - b.id));
        expect(result[10].id).toStrictEqual(11);
      })
    })
    describe("UPDATEでデータ更新", () => {
      test("UPDATE Student set test_score=80 WHERE id=10", () => {
        const update_test_score = (data, id, test_score) =>
          data.map((i) => (i.id === id ? {...i, test_score} : i));

        const result = update_test_score(students, 10, 80);

        console.table(result);
        expect(result.filter((i) => i.id === 10)[0].test_score).toStrictEqual(80);
      })

      test("UPDATE Student set name=80 WHERE id=10", () => {
        const update_name = (data, id, name) =>
          data.map((i) => (i.id === id ? {...i, name} : i));

        const result = update_name(students, 10, "石田");

        console.table(result);
        expect(result.filter((i) => i.id === 10)[0].name).toStrictEqual("石田");
      })

      test("UPDATE Student set test_score=NULL WHERE id=10", () => {
        const update_test_score_null = (data, id) =>
          data.map((i) => (i.id === id ? {...i, test_score: null} : i));

        const result = update_test_score_null(students, 10);

        console.table(result);
        expect(result.filter((i) => i.id === 10)[0].test_score).toStrictEqual(null);
      })

      test("UPDATE Student set birthday=NULL WHERE id=10", () => {
        const update_birthday_null = (data, id) =>
          data.map((i) => (i.id === id ? {...i, birthday: null} : i));

        const result = update_birthday_null(students, 10);

        console.table(result);
        expect(result.filter((i) => i.id === 10)[0].birthday).toStrictEqual(null);
      })

      test("UPDATE Student set name='藤井', test_score=65 WHERE id=10", () => {
        const update_name_test_score = (data, id, name, test_score) =>
          data.map((i) => (i.id === id ? {...i, name, test_score} : i));

        const result = update_name_test_score(students, 10, "藤井", 65);

        console.table(result);
        expect(result.filter((i) => i.id === 10)[0].name).toStrictEqual("藤井");
        expect(result.filter((i) => i.id === 10)[0].test_score).toStrictEqual(65);
      })
    })

    describe("DELETEでデータ削除", () => {
      test("DELETE FROM Student WHERE id=10", () => {
        const delete_student = (data, id) => data.filter((i) => i.id !== id);

        const result = delete_student(students, 10);

        console.table(result);
        expect(result.filter((i) => i.id === 10).length).toStrictEqual(0);
      })

      test("DELETE FROM Student WHERE id=9 or id=10", () => {
        const delete_students = (data, ids) => data.filter((i) => !ids.includes(i.id));

        const result = delete_students(students, [9, 10]);

        console.table(result);
        expect(result.filter((i) => i.id === 9).length).toStrictEqual(0);
        expect(result.filter((i) => i.id === 10).length).toStrictEqual(0);
      })

      test("DELETE FROM Student ORDER BY id DESC LIMIT 1", () => {
        const delete_student_order_desc_limit = (data, limit) =>
          data.sort((a, b) => a.id - b.id).slice(0, -1 * limit);

        const result = delete_student_order_desc_limit(students, 1);

        console.table(result);
        expect(result.length).toStrictEqual(9);
      })
    })
  });
})
