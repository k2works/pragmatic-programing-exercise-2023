import { sum, totalInject, totalReduce, totalStructured, iteratorNotUsing, iteratorUsingSelect } from "./App.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test('totalStructured', () => {
  expect(totalStructured()).toBe(13);
});

test('totalFunctiohnal', () => {
  expect(totalInject()).toBe(13);
  expect(totalReduce()).toBe(13);
});

test('iteratorNotUsing', () => {
  expect(iteratorNotUsing()).toEqual([2, 4, 6, 8]);
});

test('iteratorUsing', () => {
  expect(iteratorUsingSelect()).toEqual([2, 4, 6, 8]);
});

describe('イテレータ', () => {
  test('繰り返しの処理', () => {
    const result = [1, 2, 3].map(n => n * n);
    expect(result).toEqual([1, 4, 9]);
  });

  test('特定の条件を満たす要素だけを配列に入れて返す: filter', () => {
    const result = [1.1, 2, 3.3, 4].filter(item => Number.isInteger(item));
    expect(result).toEqual([2, 4]);
  });

  test('特定の条件を満たさない要素だけを配列に入れて返す: reject', () => {
    const result = [1.1, 2, 3.3, 4].filter(item => !Number.isInteger(item));
    expect(result).toEqual([1.1, 3.3]);
  });

  test('新しい要素の配列を返す: map', () => {
    const result = ["apple", "orange", "pineapple", "strawberry"].map(item => item.length);
    expect(result).toEqual([5, 6, 9, 10]);
  });

  test('配列の中から、条件に一致する要素を取得する: find', () => {
    const result = ["apple", "orange", "pineapple", "strawberry"].find(item => item.length > 5);
    expect(result).toBe("orange");
  });

  test('指定した評価式で並び替えた配列を返す: sort', () => {
    const result = [1, 2, 10, 20, 3].sort((a, b) => a - b);
    expect(result).toEqual([1, 2, 3, 10, 20]);
  });

  test('配列の中から、条件に一致する要素を取得する: filter', () => {
    const result = ["apple", "orange", "pineapple", "strawberry", "apricot"].filter(item => /^a/.test(item));
    expect(result).toEqual(["apple", "apricot"]);
  });

  test('ブロック内の条件式が真である間までの要素を返す: takeWhile', () => {
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => item < 6);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('ブロック内の条件式が真である以降の要素を返す: dropWhile', () => {
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(item => item > 6);
    expect(result).toEqual([7, 8, 9]);
  });
});

describe('関数を受ける関数の作成', () => {
  test('関数を受け取れる関数の作成', () => {
    function argOne(callback) {
      return callback(1);
    }

    const result = argOne(x => x + 3);
    expect(result).toBe(4);
  });

  test('関数を受け取れる関数でもう少し複雑な関数を作成', () => {
    function argOneTwice(callback) {
      return callback(1) + callback(2);
    }

    const result = argOneTwice(x => x + 3);
    expect(result).toBe(9);
  });

  test('手続きオブジェクトとして関数を作成', () => {
    const plusthree = x => x + 3;

    const result = plusthree(1);
    expect(result).toBe(4);
  });

  test('lambdaで関数を作成', () => {
    const plusthree = function (x) { return x + 3; };

    const result = plusthree(1);
    expect(result).toBe(4);
  });

  test('引数の数の明確なチェック', function () {
    expect(function () {
      const plusthree = function (x) { return x + 3; };
      plusthree.call(null, 1, 2);
    }).not.toThrow();
  });
});
