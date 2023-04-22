# データ構造と配列
from typing import MutableSequence
from typing import Any, Sequence
import unittest
import doctest


class TestTotal(unittest.TestCase):
    def test_toal(self):
        self.assertEqual(total(32, 68, 72, 54, 92), '318,63.6')


def total(tensu1, tensu2, tensu3, tensu4, tensu5):
    """５人の点数を読み込んで合計点・平均点を返す
    >>> total(32,68,72,54,92)
    '318,63.6'
    """
    result = ''
    total = 0
    total += tensu1
    total += tensu2
    total += tensu3
    total += tensu4
    total += tensu5
    result = str(total)
    result += ','
    result += str(total/5)
    return result

# 配列

# シーケンスの要素の最大値を表示する


class TestMax(unittest.TestCase):
    def test_max_of(self):
        self.assertEqual(max_of([172, 153, 192, 140, 165]), 192)


def max_of(a: Sequence) -> Any:
    """シーケンスaの要素の最大値を返却する
    >>> max_of([172,153,192,140,165])
    192
    """
    maximum = a[0]
    for i in range(1, len(a)):
        if a[i] > maximum:
            maximum = a[i]
    return maximum

# ミュータブルなシーケンスの要素の並びを反転


class TestRverseArray(unittest.TestCase):
    def test_reverse_array(self):
        a = [2, 5, 1, 3, 9, 6, 7]
        reverse_array(a)
        self.assertEqual(a, [7, 6, 9, 3, 1, 5, 2])


def reverse_array(a: MutableSequence) -> None:
    """ミュータブルなシーケンスaの要素の並びを反転
    """
    n = len(a)
    for i in range(n // 2):
        a[i], a[n - i - 1] = a[n - i - 1], a[i]


class TestCardConv(unittest.TestCase):
    def test_card_conv(self):
        self.assertEqual(card_conv(29, 2), '11101')


def card_conv(x: int, r: int) -> str:
    """整数値xをr進数に変換した数値を表す文字列を返却
    >>> card_conv(29, 2)
    '11101'
    """
    d = ''
    dchar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    while x > 0:
        d += dchar[x % r]
        x //= r

    return d[::-1]


class TestPassList(unittest.TestCase):
    def test_change(self):
        x = [11, 22, 33, 44, 55]
        change(x, 2, 99)
        self.assertEqual(x, [11, 22, 99, 44, 55])


def change(lst, idx, val):
    """lst[idx]の値をvalに更新
    """
    lst[idx] = val

# 素数の列挙


class TestPrime(unittest.TestCase):
    def test_prime1(self):
        self.assertEqual(prime1(1000), 78022)

    def test_prime2(self):
        self.assertEqual(prime2(1000), 14622)

    def test_prime3(self):
        self.assertEqual(prime3(1000), 3774)


def prime1(x: int) -> int:
    """x以下の素数を列挙（第１版）
    >>> prime1(1000)
    78022
    """
    counter = 0
    for n in range(2, x+1):
        for i in range(2, n):
            counter += 1
            if n % i == 0:
                break
    return counter


def prime2(x: int) -> int:
    """x以下の素数を列挙（第２版）
    >>> prime2(1000)
    14622
    """
    counter = 0
    ptr = 0
    prime = [None] * 500

    prime[ptr] = 2
    ptr += 1

    for n in range(3, x+1, 2):
        for i in range(1, ptr):
            counter += 1
            if n % prime[i] == 0:
                break
        else:
            prime[ptr] = n
            ptr += 1

    return counter


def prime3(x: int) -> int:
    """x以下の素数を列挙（第３版）
    >>> prime3(1000)
    3774
    """
    counter = 0
    ptr = 0
    prime = [None] * 500

    prime[ptr] = 2
    ptr += 1
    prime[ptr] = 3
    ptr += 1

    for n in range(5, 1001, 2):
        i = 1
        while prime[i] * prime[i] <= n:
            counter += 2
            if n % prime[i] == 0:
                break
            i += 1
        else:
            prime[ptr] = n
            ptr += 1
            counter += 1

    return counter


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
