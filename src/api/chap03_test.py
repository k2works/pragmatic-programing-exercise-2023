# %% [markdown]
# # 検索
# %%
import unittest
import doctest


# %% [markdown]
# ## 探索アルゴリズム

# %% [markdown]
# ### 探索とキー

# %% [markdown]
# ### 配列からの探索

# %% [markdown]
# ## 線形探索

# %% [markdown]
# ### 線形探索

# %% [markdown]
# #### List3-1 線形探索(while文)
# %% [markdown]
# ```python
# from __future__ import annotations
# from typing import Any, Sequence
# import doctest
# import unittest
# import copy
# import hashlib
# from enum import Enum
#
#
# def seq_search(a: Sequence, key: Any) -> int:
#     i = 0
#     while True:
#         if i == len(a):
#             return -1
#         if a[i] == key:
#             return i
#         i += 1
#
#
# if __name__ == '__main__':
#     num = int(input('要素数: '))
#     x = [None] * num
#
#     for i in range(num):
#         x[i] = int(input(f'x[{i}]: '))
#
#     ky = int(input('探す値: '))
#
#     idx = seq_search(x, ky)
#
#     if idx == -1:
#         print('その値の要素は存在しません。')
#     else:
#         print(f'その値はx[{idx}]にあります。')

# %% [markdown]
# #### List3-2 線形探索（for文）
# %%
from typing import Sequence
from traitlets import Any


def seq_search(a: Sequence, key: Any) -> int:
    for i in range(len(a)):
        if a[i] == key:
            return i
    return -1

# %% [markdown]
# ### いろいろな型のシーケンスからの検索


# %% [markdown]
# #### List3C-1 線形検索を行う関数seq_searchの利用例（その１）
# %% [markdown]
# ```python
# print('実数の探索を行います。')
# print('Endを入力すると終了します。')
#
# number = 0
# x = []
#
# while True:
#     s = input(f'x[{number}]: ')
#     if s == 'End':
#         break
#     x.append(float(s))
#     number += 1
#
# ky = float(input('探す値: '))
#
# idx = seq_search(x, ky)
# if idx == -1:
#     print('その値の要素は存在しません。')
# else:
#     print(f'その値はx[{idx}]にあります。')

# %% [markdown]
# #### List3C-2 線形検索を行う関数seq_searchの利用例（その２）
# %%
t = (4, 7, 5.6, 2, 3.14, 1)
s = 'string'
a = ['DTS', 'AAC', 'FLAC']

print(f'{t}中の5,6の添字は{seq_search(t, 5.6)}です。')
print(f'{s}中のnの添字は{seq_search(s, "n")}です。')
print(f'{a}中のDTSの添字は{seq_search(a, "DTS")}です。')

# %%


class TestSsearch(unittest.TestCase):
    def test_ssearch_while(self):
        self.assertEqual(ssearch_while([6, 4, 3, 2, 1, 2, 8], 2), 3)
        self.assertEqual(ssearch_while([12.7, 3.14, 6.4, 7.2, 'End'], 6.4), 2)
        self.assertEqual(ssearch_while((4, 7, 5.6, 2, 3.14, 1), 5.6), 2)
        self.assertEqual(ssearch_while(['DTS', 'AAC', 'FLAC'], 'DTS'), 0)

    def test_ssearch_for(self):
        self.assertEqual(ssearch_for([6, 4, 3, 2, 1, 2, 8], 2), 3)
        self.assertEqual(ssearch_for([12.7, 3.14, 6.4, 7.2, 'End'], 6.4), 2)
        self.assertEqual(ssearch_for((4, 7, 5.6, 2, 3.14, 1), 5.6), 2)
        self.assertEqual(ssearch_for(['DTS', 'AAC', 'FLAC'], 'DTS'), 0)


def ssearch_while(a: Sequence, key: Any) -> int:
    """シーケンスaからkeyと等価な要素を線形探索（while文)
    >>> ssearch_while([6, 4, 3, 2, 1, 2, 8], 2)
    3
    """
    i = 0

    while True:
        if i == len(a):
            return -1
        if a[i] == key:
            return i
        i += 1


def ssearch_for(a: Sequence, key: Any) -> int:
    """シーケンスaからkeyと等価な要素を線形探索（for文）
    >>> ssearch_for([6, 4, 3, 2, 1, 2, 8], 2)
    3
    """
    for i in range(len(a)):
        if a[i] == key:
            return i
    return -1


# %% [markdown]
# ### 番兵法

# %% [markdown]
# ## ２分探索

# %% [markdown]
# ### ２分探索

# %% [markdown]
# ### 計算量

# %% [markdown]
# ## ハッシュ法

# %% [markdown]
# ### ソート済み配列の操作

# %% [markdown]
# ### ハッシュ法

# %% [markdown]
# ### 衝突

# %% [markdown]
# ### チェイン法

# %% [markdown]
# ### オープンアドレス法


# 探索アルゴリズム


# 線形探索


# 線形探索（番兵法）

class TestSseachSentinel(unittest.TestCase):
    def test_sseach_sentinel(self):
        self.assertEqual(ssearch_sentinel([6, 4, 3, 2, 1, 2, 8], 2), 3)


def ssearch_sentinel(seq: Sequence, key: Any) -> int:
    """シーケンスseqからkeyと一致する要素を線形探索（番兵法）
    >>> ssearch_sentinel([6, 4, 3, 2, 1, 2, 8], 2)
    3
    """
    a = copy.deepcopy(seq)
    a.append(key)

    i = 0
    while True:
        if a[i] == key:
            break
        i += 1
    return -1 if i == len(seq) else i

# ２分探索


class TestBseach(unittest.TestCase):
    def test_bseach(self):
        self.assertEqual(bseach([1, 2, 3, 5, 7, 8, 9], 5), 3)


def bseach(a: Sequence, key: Any) -> int:
    """シーケンスaからkeyと一致する要素を２文検索
    >>> bseach([1, 2, 3, 5, 7, 8, 9], 5)
    3
    """
    pl = 0
    pr = len(a) - 1

    while True:
        pc = (pl + pr) // 2
        if a[pc] == key:
            return pc
        elif a[pc] < key:
            pl = pc + 1
        else:
            pr = pc - 1
        if pl > pr:
            break
    return -1


def bseach_verbose(a: Sequence, key: Any) -> int:
    pl = 0
    pr = len(a) - 1

    print('   |', end='')
    for i in range(len(a)):
        print(f'{i:4}', end='')
    print()
    print('---+' + (4 * len(a) + 2) * '-')

    while True:
        pc = (pl + pr) // 2

        print('   |', end='')
        if pl != pc:
            print((pl * 4 + 1) * ' ' + '<-' +
                  ((pc - pl) * 4) * ' ' + '+', end='')
        else:
            print((pc * 4 + 1) * ' ' + '<+', end='')
        if pc != pr:
            print(((pr - pc) * 4 - 2) * ' ' + '->')
        else:
            print('->')
        print(f'{pc:3}|', end='')
        for i in range(len(a)):
            print(f'{a[i]:4}', end='')
        print('\n   |')

        if a[pc] == key:
            return pc
        elif a[pc] < key:
            pl = pc + 1
        else:
            pr = pc - 1
        if pl > pr:
            break
    return -1


bseach_verbose([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 8)

# ハッシュ法


class TestChainedHash(unittest.TestCase):
    def setUp(self):
        self.hash = ChainedHash(13)
        self.hash.add(1, '赤尾')
        self.hash.add(5, '武田')
        self.hash.add(10, '小野')
        self.hash.add(12, '鈴木')
        self.hash.add(14, '神崎')

    def test_seach(self):
        self.assertEqual(self.hash.seach(1), '赤尾')
        self.assertEqual(self.hash.seach(14), '神崎')
        self.assertEqual(self.hash.seach(100), None)

    def test_add(self):
        self.hash.add(100, '山田')
        self.assertEqual(self.hash.seach(100), '山田')

    def test_remove(self):
        self.hash.add(100, '山田')
        self.hash.remove(100)
        self.assertEqual(self.hash.seach(100), None)

    def test_dump(self):
        expected = """\
0
1   -> 14 (神崎)   -> 1 (赤尾)
2
3
4
5   -> 5 (武田)
6
7
8
9
10   -> 10 (小野)
11
12   -> 12 (鈴木)
"""
        actual = self.hash.dump()
        self.assertEqual(self.hash.dump(), expected)


class Node:
    """ハッシュを構成するノード
    """

    def __init__(self, key: Any, value: Any, next: Node) -> None:
        self.key = key
        self.value = value
        self.next = next


class ChainedHash:
    """チェイン法を実現するハッシュクラス
    >>> hash = ChainedHash(13)
    >>> hash.add(1, '赤尾')
    True
    >>> hash.seach(1)
    '赤尾'
    >>> hash.remove(1)
    True
    >>> hash.seach(1)
    """

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.table = [None] * self.capacity

    def hash_value(self, key: Any) -> int:
        if isinstance(key, int):
            return key % self.capacity
        return (int(hashlib.sha256(str(key).encode())).hexdigest(), 16)

    def seach(self, key: Any) -> Any:
        hash = self.hash_value(key)
        p = self.table[hash]

        while p is not None:
            if p.key == key:
                return p.value
            p = p.next

        return None

    def add(self, key: Any, value: Any) -> bool:
        hash = self.hash_value(key)
        p = self.table[hash]

        while p is not None:
            if p.key == key:
                return False
            p = p.next

        temp = Node(key, value, self.table[hash])
        self.table[hash] = temp
        return True

    def remove(self, key: Any) -> bool:
        hash = self.hash_value(key)
        p = self.table[hash]
        pp = None

        while p is not Node:
            if p.key == key:
                if pp is None:
                    self.table[hash] = p.next
                else:
                    pp.next = p.next
                return True
            pp = p
            p = p.next
        return False

    def dump(self) -> str:
        result = ''
        for i in range(self.capacity):
            p = self.table[i]
            result += f'{i}'
            while p is not None:
                result += f'   -> {p.key} ({p.value})'
                p = p.next
            result += '\n'
        return result


class TestOpenHash(unittest.TestCase):
    def setUp(self):
        self.hash = OpenHash(13)
        self.hash.add(1, '赤尾')
        self.hash.add(5, '武田')
        self.hash.add(10, '小野')
        self.hash.add(12, '鈴木')
        self.hash.add(14, '神崎')

    def test_seach(self):
        self.assertEqual(self.hash.search(1), '赤尾')

    def test_add(self):
        self.hash.add(100, '山田')
        self.assertEqual(self.hash.search(100), '山田')

    def test_remove(self):
        self.hash.remove(100)
        self.assertEqual(self.hash.search(100), None)

    def test_dump(self):
        expected = """\
 0 -- 未登録 --
 1 1 (赤尾)
 2 14 (神崎)
 3 -- 未登録 --
 4 -- 未登録 --
 5 5 (武田)
 6 -- 未登録 --
 7 -- 未登録 --
 8 -- 未登録 --
 9 -- 未登録 --
10 10 (小野)
11 -- 未登録 --
12 12 (鈴木)
"""
        self.assertEqual(self.hash.dump(), expected)


class Status(Enum):
    OCCUPIED = 0
    EMPTY = 1
    DELETED = 2


class Bucket:
    def __init__(self, key: Any = None, value: Any = None, stat: Status = Status.EMPTY) -> None:
        self.key = key
        self.value = value
        self.stat = stat

    def set(self, key: Any, value: Any, stat: Status) -> None:
        self.key = key
        self.value = value
        self.stat = stat

    def set_status(self, stat: Status) -> None:
        self.stat = stat


class OpenHash:
    """オープンアドレス法を実現するハッシュクラス
    >>> hash = OpenHash(13)
    >>> hash.add(1, '赤尾')
    True
    >>> hash.search(1)
    '赤尾'
    >>> hash.remove(1)
    True
    >>> hash.search(1)
    """

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.table = [Bucket()] * self.capacity

    def hash_value(self, key: Any) -> int:
        if isinstance(key, int):
            return key % self.capacity
        return (int(hashlib.md5(str(key).encode()).hexdigest(), 16) % self.capacity)

    def rehash_value(self, key: Any) -> int:
        return (self.hash_value(key) + 1) % self.capacity

    def seach_node(self, key: Any) -> Any:
        hash = self.hash_value(key)
        p = self.table[hash]
        for i in range(self.capacity):
            if p.stat == Status.EMPTY:
                break
            elif p.stat == Status.OCCUPIED and p.key == key:
                return p
            hash = self.rehash_value(hash)
            p = self.table[hash]
        return None

    def search(self, key: Any) -> Any:
        p = self.seach_node(key)
        if p is not None:
            return p.value
        else:
            return None

    def add(self, key: Any, value: Any) -> bool:
        if self.search(key) is not None:
            return False

        hash = self.hash_value(key)
        p = self.table[hash]
        for i in range(self.capacity):
            if p.stat == Status.EMPTY or p.stat == Status.DELETED:
                self.table[hash] = Bucket(key, value, Status.OCCUPIED)
                return True
            hash = self.rehash_value(hash)
            p = self.table[hash]
        return False

    def remove(self, key: Any) -> int:
        p = self.seach_node(key)
        if p is None:
            return False
        p.set_status(Status.DELETED)
        return True

    def dump(self) -> str:
        result = ''
        for i in range(self.capacity):
            result += f'{i:2} '
            if self.table[i].stat == Status.OCCUPIED:
                result += f'{self.table[i].key} ({self.table[i].value})'
            elif self.table[i].stat == Status.EMPTY:
                result += '-- 未登録 --'
            elif self.table[i].stat == Status.DELETED:
                result += '-- 削除ずみ --'
            result += '\n'
        return result


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
