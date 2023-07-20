# %% [markdown]
# # 基本的なアルゴリズム
# %%
import unittest
import doctest

# %% [markdown]
# ## アルゴリズムとは

# %% [markdown]
# ### ３値の最大値

#  %% [markdown]
# #### List 1- 1 ３つの整数値を読み込んで最大値を求めて表示

# %% [markdown]
# ```python
# print('三つの整数値を読み込んで最大値を求めて表示')
# a = int(input('整数aの値 : '))
# b = int(input('整数bの値 : '))
# c = int(input('整数cの値 : '))
#
# maximum = a
# if b > maximum:
#    maximum = b
# if c > maximum:
#    maximum = c
# ```

# print(f'最大値は{maximum}です。')

# %% [markdown]
# #### List 1-2 三つの整数値を求めて表示（すべての大小関係に対して確認）

# %%


class TestMax3(unittest.TestCase):
    def test_max(self):
        for a, b, c, ans in [
            (3, 2, 1, 3),
            (3, 2, 2, 3),
            (3, 1, 2, 3),
            (3, 2, 3, 3),
            (2, 1, 3, 3),
            (3, 3, 2, 3),
            (3, 3, 3, 3),
            (2, 2, 3, 3),
            (2, 3, 1, 3),
            (2, 3, 2, 3),
            (1, 3, 2, 3),
            (2, 3, 3, 3),
            (1, 2, 3, 3),
        ]:
            with self.subTest(a=a,  b=b, c=c, ans=ans):
                self.assertEqual(max3(a, b, c), ans)


def max3(a, b, c):
    """三つの整数値を読み込んで最大値を求めて表示
    >>> max3(1, 3, 2)
    3
    """
    maximum = a
    if b > maximum:
        maximum = b
    if c > maximum:
        maximum = c

    return maximum

# %% [markdown]
# #### List 1C-1 三つの整数値を読み込んで中央値を求めて表示

# %%


class TestMed3(unittest.TestCase):
    def test_med3(self):
        for a, b, c, expected in [
            (3, 2, 1, 2),
            (3, 2, 2, 2),
            (3, 1, 2, 2),
            (3, 2, 3, 3),
            (2, 1, 3, 2),
            (3, 3, 2, 3),
            (3, 3, 3, 3),
            (2, 2, 3, 2),
            (2, 3, 1, 2),
            (2, 3, 2, 2),
            (1, 3, 2, 2),
            (2, 3, 3, 3),
            (1, 2, 3, 2),
        ]:
            with self.subTest(a=a,  b=b, c=c, expected=expected):
                self.assertEqual(expected, med3(a, b, c))


def med3(a, b, c):
    """a,b,cの中央値を求めて返却
    >>> med3(1, 3, 2)
    2
    """
    if a >= b:
        if b >= c:
            return b
        elif a <= c:
            return a
        else:
            return c
    elif a > c:
        return a
    elif b > c:
        return c
    else:
        return b

# %% [markdown]
# ### 条件判定と分岐

# %% [markdown]
# #### List 1-3 読み込んだ整数値の符号を表示
# ```python
# n = int(input('整数を入力してください：'))
#
# if n > 0:
#     print('その値は正です。')
# elif n < 0:
#     print('その値は負です。')
# else:
#     print('その値は0です。')
# ```

# %% [markdown]
# #### List 1-4 整数値の判定（その１）
# ```python
# n = int(input('整数：'))
# if n == 0:
#     print('A')
# elif n == 2:
#     print('B')
# else:
#     print('C')
# ```

# %% [markdown]
# #### List 1-5 整数値の判定（その２）
# ```python
# n = int(input('整数：'))
# if n == 0:
#     print('A')
# elif n == 1:
#     print('B')
# elif n == 2:
#     print('C')
# ```

# %% [markdown]
# #### List 1-6 整数値の判定（その２の正体）
# ```python
# n = int(input('整数：'))
# if n == 1:
#     print('A')
# elif n == 2:
#     print('B')
# elif n == 3:
#     print('C')
# else:
#     pass
# ```

# %%


class TestJudgeSign(unittest.TestCase):
    def test_judge_sign(self):
        self.assertEqual(judge_sign(17), 'その値は正です。')
        self.assertEqual(judge_sign(-5), 'その値は負です。')
        self.assertEqual(judge_sign(0), 'その値は0です。')


def judge_sign(n):
    """ 読み込んだ整数値の符号を表示
    >>> judge_sign(17)
    'その値は正です。'
    """
    if n > 0:
        return ('その値は正です。')
    elif n < 0:
        return ('その値は負です。')
    else:
        return ('その値は0です。')


# %% [markdown]
# ### フローチャート（流れ図）の記号

# %% [markdown]
# ## 繰り返し

# %% [markdown]
# ### 1からnまでの整数の総和を求める

# %% [markdown]
# #### List 1-7 1からnまでの総和を求める（while文）
# ```python
# print('1からnまでの総和を求めます。')
# n = int(input('nの値：'))

# sum = 0
# i = 1

# while i <= n:
#     sum += i
#     i += 1
# print(f'1から{n}までの総和は{sum}です。')
# ```

# %% [markdown]
# ### for文による繰返し

# %% [markdown]
# #### List 1-8 1からnまでの総和を求める（for文）
# ```python
# print('1からnまでの総和を求めます。')
# n = int(input('nの値：'))
#
# sum = 0
# for i in range(1, n + 1):
#     sum += i
#
# print(f'1から{n}までの総和は{sum}です。')
# ```

# %% [markdown]
# ### 2値のソートと2値の交換

# %% [markdown]
# #### List 1-9 aからbまでの総和を求める（for文）
# ```python
# print('aからbまでの総和を求めます。')
# a = int(input('整数a：'))
# b = int(input('整数b：'))
#
# if a > b:
#     a, b = b, a
#
# sum = 0
# for i in range(a, b + 1):
#     sum += i
#
# print(f'{a}から{b}までの総和は{sum}です。')
# ```

# %%
class TestSum1ToNWhile(unittest.TestCase):
    def test_sum_1_to_n_while(self):
        self.assertEqual(sum_1_to_n_while(5), 15)

    def test_sum_1_to_n_for(self):
        self.assertEqual(sum_1_to_n_for(5), 15)


def sum_1_to_n_while(n):
    """ while文による繰り返し
    >>> sum_1_to_n_while(5)
    15
    """
    sum = 0
    i = 1
    while i <= n:
        sum += i
        i += 1
    return sum


def sum_1_to_n_for(n):
    """ for文による繰り返し
    >>> sum_1_to_n_while(5)
    15
    """
    sum = 0
    for i in range(1, n + 1):
        sum += i

    return sum


# %% [markdown]
# ### 繰り返しの過程における条件判定（その１）

# %% [markdown]
# #### List 1-10 aからbまでの総和を求める（求める過程の式も表示：その１）
# ```python
# print('aからbまでの総和を求めます。')
# a = int(input('整数a：'))
# b = int(input('整数b：'))
#
# if a > b:
#     a, b = b, a
#
# sum = 0
# for i in range(a, b + 1):
#     if i < b:
#         print(f'{i} + ', end='')
#     else:
#         print(f'{i} = ', end='')
#     sum += i
#
# print(sum)
# ```

# %%
class TestSumVerbose(unittest.TestCase):
    def test_sum_verbose_1(self):
        self.assertEqual(sum_verbose_1(3, 3), '3 = 3')
        self.assertEqual(sum_verbose_1(3, 4), '3 + 4 = 7')
        self.assertEqual(sum_verbose_1(3, 7), '3 + 4 + 5 + 6 + 7 = 25')

    def test_sum_verbose_2(self):
        self.assertEqual(sum_verbose_2(3, 3), '3 = 3')
        self.assertEqual(sum_verbose_2(3, 4), '3 + 4 = 7')
        self.assertEqual(sum_verbose_2(3, 7), '3 + 4 + 5 + 6 + 7 = 25')


def sum_verbose_1(a, b):
    """ aからbまでの総和を求める
    >>> sum_verbose_1(3,4)
    '3 + 4 = 7'
    """

    if a > b:
        a, b = b, a

    sum = 0
    result = ''
    for i in range(a, b + 1):
        if i < b:
            result += f'{i} + '
        else:
            result += f'{i} ='
        sum += i
    result += f' {sum}'
    return result


def sum_verbose_2(a, b):
    """ aからbまでの総和を求める
    >>> sum_verbose_2(3,4)
    '3 + 4 = 7'
    """
    if a > b:
        a, b = b, a

    sum = 0
    result = ''
    for i in range(a, b):
        result += f'{i} + '
        sum += i
    sum += b
    result += f'{b} = {sum}'
    return result


# %% [markdown]
# #### List 1-11 aからbまでの総和を求める（求める過程の式も表示：その２）
#
#  ```python
# print('aからbまでの総和を求めます。')
# a = int(input('整数a：'))
# b = int(input('整数b：'))
#
# if a > b:
#     a, b = b, a
#
# sum = 0
# for i in range(a, b + 1):
#     print(f'{i} + ', end='')
#     sum += i
#
# print(f'{b} = ', end='')
# sum += b
#
# print(sum)
# ```

# %% [markdown]
# ### 繰り返しの過程における条件判定（その２）

# %% [markdown]
# #### List 1-12 記号文字+と-を交互に表示（その１）
# ```python
# print('記号文字+と-を交互に表示します。')
# n = int(input('全部で何個：'))
#
# for i in range(n):
#     if i % 2:
#         print('-', end='')
#     else:
#         print('+', end='')
# print()
# ```

# #### List 1-13 記号文字+と-を交互に表示（その２）
# ```python
# print('記号文字+と-を交互に表示します。')
# n = int(input('全部で何個：'))
#
# for _ in range(n // 2):
#     print('+-', end='')
#
# if n % 2:
#     print('+', end='')
# print()
# ```

# %%


class TestAlternative(unittest.TestCase):
    def test_alternative_1(self):
        self.assertEqual(alternative_1(12), '+-+-+-+-+-+-')

    def test_alternative_2(self):
        self.assertEqual(alternative_2(12), '+-+-+-+-+-+-')


def alternative_1(n):
    """ 記号文字+と-を交互に表示（その１）
    >>> alternative_1(12)
    '+-+-+-+-+-+-'
    """
    result = ''

    for i in range(n):
        if i % 2:
            result += '-'
        else:
            result += '+'

    return result


def alternative_2(n):
    """ 記号文字+と-を交互に表示（その２）
    >>> alternative_2(12)
    '+-+-+-+-+-+-'
    """
    result = ''
    for _ in range(n // 2):
        result += '+-'

    if n % 2:
        result += '+'

    return result

# %% [markdown]
# ### 繰り返しの過程における条件判定（その３）


# %% [markdown]
# #### List 1-14 n個の記号文字*をw個ごとに改行しながら表示（その１）
# ```python
# print('記号文字*を表示します。')
# n = int(input('全部で何個：'))
# w = int(input('何個ごとに改行しますか：'))
#
# for i in range(n):
#     print('*', end='')
#     if i % w == w - 1:
#         print()
#
# if n % w:
#     print()
# ```

# %% [markdown]
# #### List 1-15 n個の記号文字*をw個ごとに改行しながら表示（その２）
# ```python
# print('記号文字*を表示します。')
# n = int(input('全部で何個：'))
# w = int(input('何個ごとに改行しますか：'))
#
# for _ in range(n // w):
#     print('*' * w)
#
# rest = n % w
# if rest:
#     print('*' * rest)
# ```

# %%


class TestPrintStars(unittest.TestCase):
    def test_print_starts_1(self):
        self.assertEqual(print_starts_1(14, 5), '*****\n*****\n****\n')

    def test_print_starts_2(self):
        self.assertEqual(print_starts_2(14, 5), '*****\n*****\n****\n')


def print_starts_1(n, w):
    """ n個の記号文字*をw個ごとに改行しながら表示（その１）
    >>> print_starts_1(14,5)
    '*****\\n*****\\n****\\n'
    """
    result = ''
    for i in range(n):
        result += '*'
        if i % w == w - 1:
            result += '\n'

    if n % w:
        result += '\n'

    return result


def print_starts_2(n, w):
    """ n個の記号文字*をw個ごとに改行しながら表示（その２）
    >>> print_starts_2(14,5)
    '*****\\n*****\\n****\\n'
    """
    result = ''
    for _ in range(n // w):
        result += '*' * w + '\n'

    rest = n % w
    if rest:
        result += '*' * rest + '\n'

    return result


# %% [markdown]
# ### 正の値の読み込み

# %% [markdown]
# #### List 1-16 1からnまでの総和を求める（nに正の整数値を読み込む）

# ```python
# print('1からnまでの総和を求めます。')
#
# while True:
#     n = int(input('nの値：'))
#     if n > 0:
#         break
#
# sum = 0
# i = 1
#
# for i in range(1, n + 1):
#     sum += i
#     i += 1
# print(f'１から{n}までの総和は{sum}です。')
# ```

# %%


class TestSum1ToPositive(unittest.TestCase):
    def test_sum_1_to_positive(self):
        self.assertEqual(sum_1_to_positive(-6), None)
        self.assertEqual(sum_1_to_positive(0), None)
        self.assertEqual(sum_1_to_positive(10), 55)


def sum_1_to_positive(n):
    """ 1からnまでの総和を求める（ｎに正の整数値を読み込む）
    >>> sum_1_to_positive(10)
    55
    """
    result = ''
    if n <= 0:
        return None

    while True:
        if n > 0:
            break

    sum = 0
    i = 1

    for i in range(1, n + 1):
        sum += i
        i += 1

    return sum

# %% [markdown]
# ### 返と面積が整数値である長方形

# %% [markdown]
# #### List 1-17 縦横が整数で面積がareaの長方形の辺の長さを列挙
#
# ```python
# area = int(input('面積は：'))
#
# for i in range(1, area + 1):
#     if i * i > area:
#         break
#     if area % i:
#         continue
#     print(f'{i}×{area // i}')
# ```

# %% [markdown]
# #### List 1-18 10～99の乱数をn個生成（13が生成されたら中断）
# ```python
# import random
#
# n = int(input('乱数は何個：'))
#
# for _ in range(n):
#     r = random.randint(10, 99)
#     print(r, end=' ')
#     if r == 13:
#         print('\n終了します。')
#         break
# else:
#     print('\n乱数生成を終了します。')
# ```

# %%


class TestRectangle(unittest.TestCase):
    def test_rectangle(self):
        self.assertEqual(rectangle(32), '1x32 2x16 4x8 ')


def rectangle(area):
    """ 縦横が整数で面積がareaの長方形の辺の長さを列挙
    >>> rectangle(32)
    '1x32 2x16 4x8 '
    """
    result = ''
    for i in range(1, area + 1):
        if i * i > area:
            break
        if area % i:
            continue
        result += f'{i}x{area // i} '

    return result


class TestSkip(unittest.TestCase):
    def test_skip_1(self):
        self.assertEqual(skip_1(), '1 2 3 4 5 6 7 9 10 11 12 ')

    def test_skip_2(self):
        self.assertEqual(skip_2(), '1 2 3 4 5 6 7 9 10 11 12 ')


def skip_1():
    """ 1から12までを８をスキップして繰り返す（その１）
    >>> skip_1()
    '1 2 3 4 5 6 7 9 10 11 12 '
    """
    result = ''
    for i in range(1, 13):
        if i == 8:
            continue
        result += f'{i} '
    return result


def skip_2():
    """ 1から12までを８をスキップして繰り返す（その２）
    >>> skip_2()
    '1 2 3 4 5 6 7 9 10 11 12 '
    """
    result = ''
    for i in list(range(1, 8)) + list(range(9, 13)):
        result += f'{i} '
    return result


# %% [markdown]
# ### 繰り返しのスキップと複数のrangeの走査

# %% [markdown]
# #### List 1-19 1から12までを8をスキップして繰り返す（その１）

# %%
for i in range(1, 13):
    if i == 8:
        continue
    print(i, end=' ')
print()

# %% [markdown]
# #### List 1-20 1から12までを8をスキップして繰り返す（その２）

# %%
for i in list(range(1, 8)) + list(range(9, 13)):
    print(i, end=' ')
print()

# %% [markdown]
# #### List 1C-2 ２桁の正の整数値（10～99）を読み込む
# ```python
# print('２桁の整数値を入力してください。')
# while True:
#     no = int(input('値は：'))
#     if no >= 10 and no <= 99
#         break
# print(f'読み込んだのは{no}です。')
# ```

# %% [markdown]
# ### 構造化プログラミング

# %% [markdown]
# ### 多重ループ

# %% [markdown]
# #### 九九の表

# %% [markdown]
# #### List 1-21 九九の表を表示

# %%
print('-' * 27)
for i in range(1, 10):
    for j in range(1, 10):
        print(f'{i * j:3}', end='')
    print()
print('-' * 27)

# %%


class TestMultiplicationTable(unittest.TestCase):
    def test_multiplication_table(self):
        expected = """\
---------------------------
  1  2  3  4  5  6  7  8  9
  2  4  6  8 10 12 14 16 18
  3  6  9 12 15 18 21 24 27
  4  8 12 16 20 24 28 32 36
  5 10 15 20 25 30 35 40 45
  6 12 18 24 30 36 42 48 54
  7 14 21 28 35 42 49 56 63
  8 16 24 32 40 48 56 64 72
  9 18 27 36 45 54 63 72 81
---------------------------\
"""
        self.assertEqual(multiplication_table(), expected)


def multiplication_table():
    """ 九九の表を表示
    >>> multiplication_table()
    '---------------------------\\n  1  2  3  4  5  6  7  8  9\\n  2  4  6  8 10 12 14 16 18\\n  3  6  9 12 15 18 21 24 27\\n  4  8 12 16 20 24 28 32 36\\n  5 10 15 20 25 30 35 40 45\\n  6 12 18 24 30 36 42 48 54\\n  7 14 21 28 35 42 49 56 63\\n  8 16 24 32 40 48 56 64 72\\n  9 18 27 36 45 54 63 72 81\\n---------------------------'
    """
    result = '-' * 27
    result += '\n'
    for i in range(1, 10):
        for j in range(1, 10):
            result += f'{i * j:3}'
        result += '\n'
    result += '-' * 27
    return result

# %% [markdown]
# #### 直角三角形の表示

# %% [markdown]
# #### List 1-22 左下側が直角の二等辺三角形を表示
# ```python
# print('左下直角の二等辺三角形')
# n = int(input('短辺の長さ：'))
#
# for i in range(n):
#     for j in range(i + 1):
#         print('*', end='')
#     print()
# ```

# %% [markdown]
# #### List 1-23 右下側が直角の二等辺三角形を表示
# ```python
# print('右下直角の二等辺三角形')
# n = int(input('短辺の長さ：'))
#
# for i in range(n):
#     for _ in range(n - i - 1):
#         print(' ', end='')
#     for _ in range(i + 1):
#         print('*', end='')
#     print()
# ```

# %%


class TestTraiangleLb(unittest.TestCase):
    def test_traiangle_lb(self):
        expected = """\
*
**
***
****
*****
"""
        self.assertEqual(traiangle_lb(5), expected)


def traiangle_lb(n):
    """ 左下側が直角の二等辺三角形を表示
    >>> traiangle_lb(5)
    '*\\n**\\n***\\n****\\n*****\\n'
    """
    result = ''
    for i in range(n):
        for j in range(i + 1):
            result += '*'
        result += '\n'
    return result


class TestTriangleRb(unittest.TestCase):
    def test_triangle_rb(self):
        expected = """\
    *
   **
  ***
 ****
*****
"""
        self.assertEqual(traiangle_rg(5), expected)


def traiangle_rg(n):
    """ 右下側が直角の二等辺三角形を表示
    >>> traiangle_rg(5)
    '    *\\n   **\\n  ***\\n ****\\n*****\\n'
    """
    result = ''
    for i in range(n):
        for _ in range(n - i - 1):
            result += ' '
        for _ in range(i + 1):
            result += '*'
        result += '\n'
    return result
# %% [markdown]
# #### Pythonの変数について

# %% [markdown]
# #### List 1C-3


# %%
n = 1


def put_id():
    x = 1
    print(f'id(x) = {id(x)}')


print(f'id(1) = {id(1)}')
print(f'id(n) = {id(n)}')
put_id()

# %%  [markdown]
# #### List 1C-4

# %%
for i in range(1, 100):
    print(f'i = {i:3} id(i) = {id(i)}')

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
