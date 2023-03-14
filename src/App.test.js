import { totalInject, totalReduce, totalStructured, iteratorNotUsing, iteratorUsingSelect } from "./App.js";

describe('関数呼び出し', () => {
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

})

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

  test('アロー関数で関数を作成', () => {
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

describe('クロージャー', () => {
  test('クロージャーの処理', () => {
    function multi(i) {
      const func = function (x) { return x * 2; };
      return func(i);
    }

    expect(multi(2)).toBe(4);
    expect(multi(6)).toBe(12);
  });

  test('Proc.newにブロックを直接指定', function () {
    function multi(i, func) {
      return func(i);
    }

    let result = multi(2, function (x) { return x * 6; });
    expect(result).toEqual(12);

    result = multi(6, function (x) { return x * 8; });
    expect(result).toEqual(48);

    expect(function () {
      multi(8, undefined);
    }).toThrow();
  });

  test('手続きオブジェクトのブロック内から外部のローカル変数を参照', function () {
    function count() {
      let number = 0;
      const func = function (i) {
        number += i;
        return number;
      };
      return func;
    }

    let c = count();
    expect(c(1)).toEqual(1);
    expect(c(2)).toEqual(3);
    expect(c(3)).toEqual(6);
    expect(c(4)).toEqual(10);
  });

  test('更新された値を保持', function () {
    function count() {
      let number = 0;
      const func = function (i) {
        number += i;
        return number;
      };
      return func;
    }

    let fun = count();
    expect(fun(1)).toEqual(1);
    expect(fun(2)).toEqual(3);
    expect(fun(3)).toEqual(6);
    expect(fun(4)).toEqual(10);
  });

  test('変数を使用したときの振る舞いを比較1', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation((message) => {
      output += message + '\n';
    });

    let x = 1;
    let output = '';

    const func = function (x) {
      console.log(x);
    };
    func(3);
    console.log(x);


    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(output).toEqual('3\n1\n');
  });

  test('変数を使用したときの振る舞いを比較2', () => {
    let x = 1;
    const func = (y) => {
      x = y;
      console.log(x);
    }
    func(3);
    console.log(x);

    expect(console.log.mock.calls).toEqual(
      [
        [
          3,
        ],
        [
          1,
        ],
        [
          3,
        ],
        [
          3,
        ],
      ]
    );
  });

  test('ブロックのローカル変数としての宣言', () => {
    let x = 1;
    const func = (y, x) => {
      x = y;
      console.log(x);
    }
    func(3, x);
    console.log(x);

    expect(console.log.mock.calls).toEqual(
      [
        [
          3,
        ],
        [
          1,
        ],
        [
          3,
        ],
        [
          3,
        ],
        [
          3,
        ],
        [
          1,
        ],
      ]
    );
  });

  test('&を使った処理', () => {
    const block_example = (callback) => {
      return callback();
    }

    const func = () => 'Block Example';
    expect(block_example(func)).toEqual('Block Example');
  });
});

describe('ファーストクラスオブジェクト', () => {
  test('アロー関数を使った代入の例', () => {
    const x = () => 'First Class Example';
    expect(x()).toEqual('First Class Example');

    const y = (word) => `${word} Class Example`;
    expect(y('First')).toEqual('First Class Example');

    const z = y;
    expect(z('First')).toEqual('First Class Example');
  });

  test('アロー関数を使った引数の例', () => {
    const x = () => 'First Class Example';
    const f = (callback) => callback();
    expect(f(x)).toEqual('First Class Example');
  });

  test('アロー関数を使った戻り値の例', () => {
    const x = () => {
      return () => 'First Class Return';
    }

    const z = x();
    expect(z()).toEqual('First Class Return');
  });

  test('アロー関数を使った代入の例2', () => {
    const x = () => 'First Class Example';
    expect(x()).toEqual('First Class Example');

    const y = (word) => `${word} Class Example`;
    expect(y('First')).toEqual('First Class Example');

    const z = y;
    expect(z('First')).toEqual('First Class Example');
  });

  test('アロー関数を使った引数の例2', () => {
    const x = (word) => `${word} Class Example`;
    const f = (x) => x('First');

    expect(f(x)).toEqual('First Class Example');
  });

  test('アロー関数を使った戻り値の例2', () => {
    const x = () => {
      return (word) => `${word} Class Return`;
    };

    const z = x();
    expect(z('First')).toEqual('First Class Return');
  });
});

describe('合成関数', () => {
  test('合成関数の例', () => {
    const f = (x) => x + 3;
    const g = (x) => x + 8;

    const h = (x) => g(f(x));
    expect(h(2)).toEqual(13);
  });
});


