# %% [markdown]
# # 再帰的アルゴリズム
# %%
from collections import deque
from typing import Any
import unittest
import doctest


# %% [markdown]
# ## 再帰の基本

# %% [markdown]
# ### 再帰とは

# %% [markdown]
# ### 階上値

# %% [markdown]
# ### ユークリッドの互除法

# %% [markdown]
# ## 再帰アルゴリズムの解析

# %% [markdown]
# ### 再帰アルゴリズムの解析

# %% [markdown]
# ### 再帰アルゴリズムの非再帰表現

# %% [markdown]
# ## ハノイの塔

# %% [markdown]
# ### ハノイの塔

# %% [markdown]
# ## 8王妃問題

# %% [markdown]
# ### 8王妃問題とは

# %% [markdown]
# ### 王妃の配置

# %% [markdown]
# ### 分岐操作

# %% [markdown]
# ### 限定操作と分岐限定法

# %% [markdown]
# ### 8王妃問題を解くプログラム


class Stack:
    def __init__(self, maxlen: int = 256) -> None:
        self.capacity = maxlen
        self.__stk = deque([], maxlen)

    def __len__(self) -> int:
        return len(self.__stk)

    def is_empty(self) -> bool:
        return not self.__stk

    def is_full(self) -> bool:
        return len(self.__stk) == self.__stk.maxlen

    def push(self, value: Any) -> None:
        self.__stk.append(value)

    def pop(self) -> Any:
        return self.__stk.pop()

    def peek(self) -> Any:
        return self.__stk[-1]

    def clear(self) -> None:
        self.__stk.clear()

    def find(self, value: Any) -> Any:
        try:
            return self.__stk.index(value)
        except ValueError:
            return -1

    def count(self, value: Any) -> int:
        return self.__stk.count(value)

    def dump(self) -> Any:
        return list(self.__stk)

# 非負の整数の階乗値を求める


class TestFactorial(unittest.TestCase):
    def test_3の階乗は6(self):
        self.assertEqual(factorial(3), 6)


def factorial(n: int) -> int:
    """非負の整数nの階乗を再帰的に求める
    >>> factorial(3)
    6
    """
    if n > 0:
        return n * factorial(n - 1)
    else:
        return 1

# ユークリッドの互除法によって最大公約数を求める


class TestGcd(unittest.TestCase):
    def test_22と8の最大公約数は2(self):
        self.assertEqual(gcd(22, 8), 2)


def gcd(x: int, y: int) -> int:
    """整数値xとyの最大公約数を求めて返却
    >>> gcd(22, 8)
    2
    """
    if y == 0:
        return x
    else:
        return gcd(y, x % y)

# 真に再帰的な関数


class TestRecur(unittest.TestCase):
    def test_実行結果を配列で返す(self):
        self.assertEqual(recure(4, []), [1, 2, 3, 1, 4, 1, 2])

    def test_末尾再帰を除去した実行結果を配列で返す(self):
        self.assertEqual(recure2(4, []), [1, 2, 3, 1, 4, 1, 2])

    def test_スタックを用いて末尾再帰を除去した実行結果を配列で返す(self):
        self.assertEqual(recure3(4, []), [1, 2, 3, 1, 4, 1, 2])


def recure(n: int, list: list) -> list:
    """真に再帰的な関数recure
    >>> recure(4, [])
    [1, 2, 3, 1, 4, 1, 2]
    """
    if n > 0:
        recure(n - 1, list)
        list.append(n)
        recure(n - 2, list)

    return list


def recure2(n: int, list: list) -> list:
    """末尾再帰を除去した関数recure
    >>> recure2(4, [])
    [1, 2, 3, 1, 4, 1, 2]
    """
    while n > 0:
        recure(n - 1, list)
        list.append(n)
        n = n - 2

    return list


def recure3(n: int, list: list) -> list:
    """再帰を除去した関数recure
    >>> recure3(4, [])
    [1, 2, 3, 1, 4, 1, 2]
    """
    s = Stack(n)

    while True:
        if n > 0:
            s.push(n)
            n = n - 1
            continue
        if not s.is_empty():
            n = s.pop()
            list.append(n)
            n = n - 2
            continue
        break

    return list

# ハノイの等


class TestMove(unittest.TestCase):
    def test_円盤3枚(self):
        excepted = [
            '円盤[1]を1軸から3軸へ移動',
            '円盤[2]を1軸から2軸へ移動',
            '円盤[1]を3軸から2軸へ移動',
            '円盤[3]を1軸から3軸へ移動',
            '円盤[1]を2軸から1軸へ移動',
            '円盤[2]を2軸から3軸へ移動',
            '円盤[1]を1軸から3軸へ移動'
        ]
        actual = move(3, 1, 3, [])
        self.assertEquals(actual, excepted)


def move(no: int, x: int, y: int, result: list) -> list:
    """no枚の円盤x軸からy軸へ移動
    >>> move(3, 1, 3, [])
    ['円盤[1]を1軸から3軸へ移動', '円盤[2]を1軸から2軸へ移動', '円盤[1]を3軸から2軸へ移動', '円盤[3]を1軸から3軸へ移動', '円盤[1]を2軸から1軸へ移動', '円盤[2]を2軸から3軸へ移動', '円盤[1]を1軸から3軸へ移動']
    """
    if no > 1:
        move(no - 1, x, 6 - x - y, result)

    result.append(f'円盤[{no}]を{x}軸から{y}軸へ移動')

    if no > 1:
        move(no - 1, 6 - x - y, y, result)

    return result

# 8王妃問題


class TestEightQueen(unittest.TestCase):
    def test_各列に1個の王妃を配置する組み合わせを再帰的に列挙(self):
        eight_queen = EightQueen()
        eight_queen.set(0)
        self.assertEqual(len(eight_queen.result), 16777216)

    def test_各行各列に1個の王妃を配置する組合せを再帰的に列挙(self):
        eight_queen = EightQueen()
        eight_queen.set2(0)
        self.assertEqual(len(eight_queen.result), 40320)

    def test_8王妃問題を解くプログラム(self):
        eight_queen = EightQueen()
        eight_queen.set3(0)
        self.assertEqual(len(eight_queen.result), 92)


class EightQueen:
    def __init__(self):
        self.result = []
        self.__pos = [0] * 8
        self.__flag = [False] * 8
        self.__flag_a = [False] * 8
        self.__flag_b = [False] * 15
        self.__flag_c = [False] * 15

    def put(self) -> None:
        """盤面（各列の王妃の位置）を出力
        """
        row = []
        for i in range(8):
            row.append(self.__pos[i])
        self.result.append(row)

    def put2(self) -> None:
        """盤面を□と■で出力
        """
        row = []
        for j in range(8):
            for i in range(8):
                print('■' if self.__pos[i] == j else '□', end='')
            print()
        print()

    def set(self, i: int) -> None:
        """i列目に王妃を配置
        """
        for j in range(8):
            self.__pos[i] = j
            if i == 7:
                self.put()
            else:
                self.set(i + 1)

    def set2(self, i: int) -> None:
        """i列目の適切な位置に王妃を配置
        """
        for j in range(8):
            if not self.__flag[j]:
                self.__pos[i] = j
                if i == 7:
                    self.put()
                else:
                    self.__flag[j] = True
                    self.set2(i + 1)
                    self.__flag[j] = False

    def set3(self, i: int) -> None:
        """i列目の適切な位置に王妃を配置
        """
        for j in range(8):
            if (not self.__flag_a[j]
                and not self.__flag_b[i + j]
                    and not self.__flag_c[i - j + 7]):
                self.__pos[i] = j
                if i == 7:
                    self.put()
                    self.put2()
                else:
                    self.__flag_a[j] = self.__flag_b[i +
                                                     j] = self.__flag_c[i - j + 7] = True
                    self.set3(i + 1)
                    self.__flag_a[j] = self.__flag_b[i +
                                                     j] = self.__flag_c[i - j + 7] = False


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
