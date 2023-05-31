# %% [markdown]
# # データ構造と配列
# %%
import copy
from typing import MutableSequence, Sequence
import unittest
import doctest

from traitlets import Any

# %% [markdown]
# ## データ構造の定義

# %% [markdown]
# ### 配列の必要性

# %% [markdown]
# ##### List2-1 ５人の点数を読み込んで合計点・平均点を表示
# ```python
# print('5人の点数の合計と平均点を求めます。')
# tensu1 = int(input('1番の点数：'))
# tensu2 = int(input('2番の点数：'))
# tensu3 = int(input('3番の点数：'))
# tensu4 = int(input('4番の点数：'))
# tensu5 = int(input("5番の点数："))
#
# total = 0
# total += tensu1
# total += tensu2
# total += tensu3
# total += tensu4
# total += tensu5
#
# print(f'合計は{total}点です。')
# print(f'平均は{total/5}点です。')


# %% [markdown]
# ### リストとタプル

# %% [markdown]
# #### リスト

# %% [markdown]
# #### タプル

# %% [markdown]
# #### アンパック

# %%
x = [1, 2, 3]
a, b, c = x
x

# %% [markdown]
# ### インデックス式によるアクセス

# %% [markdown]
# #### インデックス式

# %% [markdown]
# ##### 2-2 リストとインデックス式
# %%
x = [11, 22, 33, 44, 55, 66, 77]
print(x[2])
print(x[-3])
x[-4] = 3.14
print(x)
# print(x[7])
# x[7] = 3.14

# %% [markdown]
# ### スライス式によるアクセス

# %% [markdown]
# #### スライス式による取り出し

# %% [markdown]
# ##### 2-3 リストとスライス式
# %%
s = [11, 22, 33, 44, 55, 66, 77]
print(s[0:6])
print(s[0:7])
print(s[0:7:2])
print(s[-4:-2])
print(s[3:1])

# %% [markdown]
# ### データ構造

# %% [markdown]
# > データ単位とデータ自身とのあいだの物理的または論理的な関係
# >> JIS X0015 03.01


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

# %% [markdown]
# ## 配列

# %% [markdown]
# ## 要素

# %% [markdown]
# ### 配列の要素の最大値を求める

# %% [markdown]
# #### 配列の要素の最大値を求める関数の実装

# %% [markdown]
# ##### List2-2 シーケンスの要素の最大値を求める
# ```python
# def max_of(a: Sequence) -> Any:
#     maximum = a[0]
#     for i in range(1, len(a)):
#         if a[i] > maximum:
#             maximum = a[i]
#     return maximum
#
#
# if __name__ == '__main__':
#     print('配列の最大値を求めます。')
#     num = int(input('要素数：'))
#     x = [None] * num
#
#     for i in range(num):
#         x[i] = int(input(f'x[{i}]：'))
#
#     print(f'最大値は{max_of(x)}です。')

# %%


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

# %% [markdown]
# #### アノテーションと型ヒント

# %% [markdown]
# #### 再利用可能なモジュールの構築

# %% [markdown]
# #### モジュールのテスト

# %% [markdown]
# ##### List2-3 配列の要素の最大値を求めて表示（要素の値を読み込む）
# ```python
# from typing import Any, Sequence
# from typing import MutableSequence
# print('配列の最大値を求めます。')
# print('注:Endで入力を終了。')
#
# number = 0
# x = []
#
# while True:
#     s = input(f'x[{number}]：')
#     if s == 'End':
#         break
#     x.append(int(s))
#     number += 1
#
# print(f'{number}個読み込みました。')
# print(f'最大値は{max_of(x)}です。')

# %% [markdown]
# #### 配列の要素の値を乱数で決定する


# %% [markdown]
# ##### List2-4 配列の要素の最大値を求めて表示（乱数を生成して代入）
# ```python
# import random
# from max import max_of
# print('配列の最大値を求めます。')
# num = int(input('乱数の個数：'))
# lo = int(input('乱数の下限：'))
# hi = int(input('乱数の上限：'))
# x = [None] * num
#
# for i in range(num):
#     x[i] = random.randint(lo, hi)
#
# print(f'{(x)}')
# print(f'最大値は{max_of(x)}です。')

# %% [markdown]
# #### タプルの最大値／文字列の最大値／文字列のリストの最大値を求める

# %% [markdown]
# ##### List2-5 配列の要素の最大値を求めて表示（タプル／文字列／文字列のリスト）
# ```python
# from max import max_of
#
# t = (4, 7, 5.6, 2, 3.14, 1)
# n = 'string'
# s = ['DTS', 'AAC', 'FLAC']
#
# print(f'{t}の最大値は{max_of(t)}です。')
# print(f'{n}の最大値は{max_of(n)}です。')
# print(f'{s}の最大値は{max_of(s)}です。')

# %% [markdown]
# ##### List2C-1 リストの全要素を走査(要素数を事前に取得)
# %%
x = ['John', 'George', 'Paul', 'Ringo']
for i in range(len(x)):
    print(f'x[{i}] = {x[i]}')

# %% [markdown]
# ##### List2C-2 リストの全要素をenumerate関数で走査
# %%
x = ['John', 'George', 'Paul', 'Ringo']
for i, name in enumerate(x):
    print(f'x[{i}] = {name}')

# %% [markdown]
# ##### List2C-3 リストの全要素をenumerate関数で走査（1からカウント）
# %%
x = ['John', 'George', 'Paul', 'Ringo']
for i, name in enumerate(x, 1):
    print(f'{i}番目 = {name}')

# %% [markdown]
# ##### List2C-4 リストの全要素を走査（インデックス値を使わない）
# %%
x = ['John', 'George', 'Paul', 'Ringo']
for i in x:
    print(i)

# %% [markdown]
# #### 配列の要素の並びを反転する

# %% [markdown]
# ##### List2-6 ミュータブルなシーケンスの要素の並びを反転
# ```python
# from typing import MutableSequence
#
# def reverse_array(a: MutableSequence) -> None:
#     n = len(a)
#     for i in range(n // 2):
#         a[i], a[n - i - 1] = a[n - i - 1], a[i]
#
#
# if __name__ == '__main__':
#     print('配列の要素の並びを反転します。')
#     nr = input('要素数は:')
#     x = [None] * int(nr)
#
#     for i in range(int(nr)):
#         x[i] = int(input(f'x[{i}]：'))
#
#     reverse_array(x)
#
#     print('配列の要素の並びを反転しました。')
#     for i in range(int(nr)):
#         print(f'x[{i}] = {x[i]}')

# %%


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


# %% [markdown]
# #### 基数変換

# %% [markdown]
# ##### List2-7[A] 読み込んだ10進整数を2進数～36進数の基数変換して表示
#
# ```python
# def card_conv(x: int, r: int) -> str:
#     d = ''
#     dchar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
#
#     while x > 0:
#         d += dchar[x % r]
#         x //= r
#
#     return d[::-1]

# %% [markdown]
# #### 関数間の引数の受け渡し

# %% [markdown]
# ##### List2-7[B] 読み込んだ10進整数を2進数～36進数の基数変換して表示
# ```python
# if __name__ == '__main__':
#     print('10進数を基数変換します。')
#     while True:
#         while True:
#             no = int(input('変換する非負の整数：'))
#             if no > 0:
#                 break
#
#         while True:
#             cd = int(input('何進数に変換しますか（2-36）：'))
#             if 2 <= cd <= 36:
#                 break
#
#         print(f'{cd}進数では{card_conv(no, cd)}です。')
#
#         retry = input('もう一度しますか（Y - はい／N - いいえ）：')
#         if retry in {'N', 'n'}:
#             break

# %% [markdown]
# ##### List2C-5 1からnまでの総和を求めるプログラム
# ```python
# def sum_1ton(n: int) -> int:
#     s = 0
#     while n > 0:
#         s += n
#         n -= 1
#     return s
#
#
# x = int(input('xの値を入力してください：'))
# print(f'1から{x}までの総和は{sum_1ton(x)}です。')

# %% [markdown]
# ##### List2C-6 リストの任意の要素の値を更新する
# ```python
# def change(lst, idr, val):
#     lst[idr] = val


# x = [11, 22, 33, 44, 55]
# print('x =', x)

# index = int(input('インデックス：'))
# value = int(input('新しいの値：'))

# change(x, index, value)
# print(f'x = {x}')

# %%
class TestPassList(unittest.TestCase):
    def test_change(self):
        x = [11, 22, 33, 44, 55]
        change(x, 2, 99)
        self.assertEqual(x, [11, 22, 99, 44, 55])


def change(lst, idx, val):
    """lst[idx]の値をvalに更新
    """
    lst[idx] = val

# %% [markdown]
# ### 素数の列挙


# %% [markdown]
# ##### List2-8 1000以下の素数を列挙（第1版）
count = 0
for n in range(2, 1001):
    for i in range(2, n):
        count += 1
        if i % n == 0:
            break
    else:
        print(i)
print(f'除算を行った回数：{count}')

# %% [markdown]
# #### アルゴリズムの改良（１）

# %% [markdown]
# ##### List2-9 1000以下の素数を列挙（第2版）
# %%
counter = 0
ptr = 0
prime = [None] * 500

prime[ptr] = 2
ptr += 1

for n in range(3, 1001, 2):
    for i in range(1, ptr):
        counter += 1
        if n % prime[i] == 0:
            break
    else:
        prime[ptr] = n
        ptr += 1

for i in range(ptr):
    print(prime[i])
print(f'除算を行った回数：{counter}')

# %% [markdown]
# #### アルゴリズムの改良（２）

# %% [markdown]
# ##### List2-10 1000以下の素数を列挙（第3版）
# %%
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

for i in range(ptr):
    print(prime[i])
print(f'乗除算を行った回数:{counter}')

# %%


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


# %% [markdown]
# #### リストの要素とコピー

# %% [markdown]
# ##### List2C-7 リストの要素の型が揃う必要がないことを確認
# %%
x = [15, 64, 7, 3.14, [32, 55], 'ABC']
for i in range(len(x)):
    print(f'x[{i}] = {x[i]}')

# %%
x = [[1, 2, 3], [4, 5, 6]]
y = x.copy()
print(f'x = {x}')
x[0][1] = 9
print(f'x = {x}')
print(f'y = {y}')

# %%
x = [[1, 2, 3], [4, 5, 6]]
y = copy.deepcopy(x)
print(f'x = {x}')
x[0][1] = 9
print(f'x = {x}')
print(f'y = {y}')


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
