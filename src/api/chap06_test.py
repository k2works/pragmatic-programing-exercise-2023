# %% [markdown]
# # ソート
# %%
import bisect
from collections import deque
from typing import Any, Sequence, MutableSequence
import unittest
import doctest

from chap04_test import Stack

# %% [markdown]
# ## ソートとは

# %% [markdown]
# ### ソートとは

# %% [markdown]
# ## 単純交換ソート（バブルソート）

# %% [markdown]
# ### 単純交換ソート（バブルソート）

# %%  [markdown]
# #### List6-1 単純交換ソート
# %


class TestBubleSort1(unittest.TestCase):
    def test_buble_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def bubble_sort(a: MutableSequence) -> None:
    """単純交換ソート(バブルソート)"""
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1, i, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]

# %% [markdown]
# #### List6-2 単純交換ソート（ソート過程を表示）
# %%


class TestBubleSort1VerBose(unittest.TestCase):
    def test_buble_sort_verbose(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort_verbose(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def bubble_sort_verbose(a: MutableSequence) -> None:
    """単純交換ソート（ソート過程を表示)"""
    ccnt = 0  # 比較回数
    scnt = 0  # 交換回数
    n = len(a)
    for i in range(n - 1):
        print(f'パス{i + 1}')
        for j in range(n - 1, i, -1):
            for m in range(0, n - 1):
                print(f'{a[m]:2}' + ('  ' if m != j - 1 else
                                     ' +' if a[j - 1] > a[j] else ' -'),
                      end='')
                print(f'{a[n - 1]:2}')
                ccnt += 1
                if a[j - 1] > a[j]:
                    scnt += 1
                    a[j - 1], a[j] = a[j], a[j - 1]
            for m in range(0, n-1):
                print(f'{a[m]:2}', end='  ')
            print(f'{a[n - 1]:2}')
        print(f'比較は{ccnt}回でした。')
        print(f'比較は{scnt}回でした。')

# %% [markdown]
# #### List6-3 単純交換ソート（第2版：交換回数による打ち切り）
# %%


class TestBubleSort2(unittest.TestCase):
    def test_buble_sort2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def bubble_sort2(a: MutableSequence) -> None:
    """単純交換ソート（第2版：交換回数による打ち切り）"""
    n = len(a)
    for i in range(n - 1):
        exchng = 0  # パスにおける交換回数
        for j in range(n - 1, i, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]
                exchng += 1
        if exchng == 0:
            break

# %% [markdown]
# #### List6-4 単純交換ソート（第3版：捜査範囲を限定）
# %%


class TestBubleSort3(unittest.TestCase):
    def test_buble_sort3(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort3(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def bubble_sort3(a: MutableSequence) -> None:
    """単純交換ソート（第3版：捜査範囲の限定）"""
    n = len(a)
    k = 0
    while k < n - 1:
        last = n - 1
        for j in range(n - 1, k, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]
                last = j
        k = last


# %% [markdown]
# ### シューカーソート（双方向バブルソート）
# %% [markdown]
# #### List6-5 シェーカーソート（双方向バブルソート）
# %%
class TestShakerSort(unittest.TestCase):
    def test_shaker_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        shaker_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def shaker_sort(a: MutableSequence) -> None:
    """シェーカーソート（双方向バブルソート）"""
    left = 0
    right = len(a) - 1
    last = right
    while left < right:
        for j in range(right, left, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]
                last = j
            left = last

        for j in range(left, right):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                last = j
            right = last


# %% [markdown]
# ## 単純選択ソート

# %% [markdown]
# ### 単純選択ソート

# %% [markdown]
# #### List6-6 単純選択ソート
# %%
class TestSelectSort(unittest.TestCase):
    def test_select_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        selection_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def selection_sort(a: MutableSequence) -> None:
    """単純選択ソート"""
    n = len(a)
    for i in range(n - 1):
        min = i        # 未ソート部分から最小要素の添字
        for j in range(i + 1, n):
            if a[j] < a[min]:
                min = j
        a[i], a[min] = a[min], a[i]  # 未ソート部分の先頭要素と最小要素を交換


# %% [markdown]
# ## 単純挿入ソート

# %% [markdown]
# ### 単純挿入ソート

# %% [markdown]
# #### List6-7 単純挿入ソート
# %%

class TestInsertSort(unittest.TestCase):
    def test_insertion_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        insertion_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def insertion_sort(a: MutableSequence) -> None:
    """単純挿入ソート"""
    n = len(a)
    for i in range(1, n):
        j = i
        tmp = a[i]
        while j > 0 and a[j - 1] > tmp:
            a[j] = a[j - 1]
            j -= 1
        a[j] = tmp


# %% [markdown]
# #### ListC6-1 2分挿入ソート
# %%
class TestBinaryInsertionSort(unittest.TestCase):
    def test_binary_insertion_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        binary_insertion_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def binary_insertion_sort(a: MutableSequence) -> None:
    """２分挿入ソート"""
    n = len(a)
    for i in range(1, n):
        key = a[i]
        pl = 0       # 探索範囲の先頭要素の添字
        pr = i - 1   # 探索範囲の末尾要素の添字

        while True:
            pc = (pl + pr) // 2  # 探索範囲の中央要素の添字
            if a[pc] == key:    # 探索成功
                break
            elif a[pc] < key:
                pl = pc + 1
            else:
                pr = pc - 1
            if pl > pr:
                break
        # 挿入すべき位置の添字
        pd = pc + 1 if pl <= pr else pr + 1
        for j in range(i, pd, -1):
            a[j] = a[j - 1]
        a[pd] = key


# %% [markdown]
# #### ListC6-2 ２分挿入ソート（bisect.insortを利用）
# %%

class TestBinaryInsertionSort2(unittest.TestCase):
    def test_binary_insertion2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        binary_insertion_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def binary_insertion_sort2(a: MutableSequence) -> None:
    """２分挿入ソート（bisect.insortを利用）"""
    for i in range(1, len(a)):
        bisect.insort(a, a.pop(i), 0, i)


# %% [markdown]
# ## シェルソート

# %% [markdown]
# ### 単純挿入ソートの特徴

# %% [markdown]
# ### シェルソート

# %% [markdown]
# #### List6-8 シェルソート
# %
class TestShellSort(unittest.TestCase):
    def test_shell_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        shell_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def shell_sort(a: MutableSequence) -> None:
    """シェルソート"""
    n = len(a)
    h = n // 2
    while h > 0:
        for i in range(h, n):
            j = i - h
            tmp = a[i]
            while j >= 0 and a[j] > tmp:
                a[j + h] = a[j]
                j -= h
            a[j + h] = tmp
        h //= 2


# %% [markdown]
# #### List6-9 シェーカーソート（第2版: h = ..., 40, 13, 4, 1)
# %%
class TestShakerSort2(unittest.TestCase):
    def test_shaker_sort2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        shaker_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def shaker_sort2(a: MutableSequence) -> None:
    """シェルソート（第２版）"""
    n = len(a)
    h = 1
    while (h < n // 9):
        h = h * 3 + 1
    while h > 0:
        for i in range(h, n):
            j = i - h
            tmp = a[i]
            while j >= 0 and a[j] > tmp:
                a[j + h] = a[j]
                j -= h
            a[j + h] = tmp
        h //= 3


# %% [markdown]
# ## クイックソート

# %% [markdown]
# ### クイックソートの概略

# %% [markdown]
# ### 分割手順

# %% [markdown]
# #### List6-10 配列の分割
# %%
def partition(a: MutableSequence) -> None:
    """配列を分割して表示"""
    n = len(a)
    pl = 0           # 左カーソル
    pr = n - 1       # 右カーソル
    x = a[n // 2]    # 枢軸（中央の要素）

    while pl <= pr:
        while a[pl] < x:
            pl += 1
        while a[pr] > x:
            pr -= 1
        if pl <= pr:
            a[pl], a[pr] = a[pr], a[pl]
            pl += 1
            pr -= 1

    print(f'枢軸の値は{x}です。')

    print('枢軸以下のグループ')
    print(*a[0:pl])  # a[0]～a[pl - 1]

    if pl > pr + 1:
        print('枢軸と等しいグループ')
        print(*a[pr + 1:pl])

    print('枢軸以上のグループ')
    print(*a[pr + 1:n])  # a[pr + 1]～a[n - 1]


# %% [markdown]
# ### クイックソート

# %% [markdown]
# #### List6-11 クイックソート
# %%
class TestQuickSort(unittest.TestCase):
    def test_quick_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        partition(a)
        quick_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def qsort(a: MutableSequence, left: int, right: int) -> None:
    """a[left]～a[right]をクイックソート"""
    pl = left                   # 左カーソル
    pr = right                  # 右カーソル
    x = a[(left + right) // 2]  # 枢軸（中央の要素）

    while pl <= pr:
        while a[pl] < x:
            pl += 1
        while a[pr] > x:
            pr -= 1
        if pl <= pr:
            a[pl], a[pr] = a[pr], a[pl]
            pl += 1
            pr -= 1

    if left < pr:
        qsort(a, left, pr)
    if pl < right:
        qsort(a, pl, right)


def quick_sort(a: MutableSequence) -> None:
    """クイックソート"""
    qsort(a, 0, len(a) - 1)


# %% [markdown]
# ### 非再帰的クイックソート

# %% [markdown]
# #### List6-12 クイックソート（非再帰版）
# %%
class TestQuickSort(unittest.TestCase):
    def test_quick_sort_stack(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        quick_sort_stack(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def qsort_stack(a: MutableSequence, left: int, right: int) -> None:
    """a[left]～a[right]をクイックソート（非再帰版）"""
    range = Stack(right - left + 1)  # スタックを生成

    range.push((left, right))

    while not range.is_empty():
        pl, pr = left, right = range.pop()  # 左右カーソルを取り出す
        x = a[(left + right) // 2]         # 枢軸（中央の要素）

        while pl <= pr:
            while a[pl] < x:
                pl += 1
            while a[pr] > x:
                pr -= 1
            if pl <= pr:
                a[pl], a[pr] = a[pr], a[pl]
                pl += 1
                pr -= 1

        if left < pr:
            range.push((left, pr))  # 左グループのカーソルを保存
        if pl < right:
            range.push((pl, right))  # 右グループのカーソルを保存


def quick_sort_stack(a: MutableSequence) -> None:
    """クイックソート(非再帰版))"""
    qsort_stack(a, 0, len(a) - 1)


# %% [markdown]
# ### 枢軸の選択

# %% [markdown]
# ### 時間計算量

# %% [markdown]
# #### List6-13 クイックソート（第2版）
# %%
class TestQuickSort(unittest.TestCase):
    def test_quick_sort2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        quick_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def sort3(a: MutableSequence, idx1: int, idx2: int, idx3: int):
    """a[idx1], a[idx2], a[idx3]を昇順にソートして中央値の添字を返却"""
    if a[idx2] < a[idx1]:
        a[idx2], a[idx1] = a[idx1], a[idx2]
    if a[idx3] < a[idx2]:
        a[idx3], a[idx2] = a[idx2], a[idx3]
    if a[idx2] < a[idx1]:
        a[idx2], a[idx1] = a[idx1], a[idx2]


def insertion_sort2(a: MutableSequence, left: int, right: int) -> None:
    """a[left]～a[right]を挿入ソート"""
    for i in range(left + 1, right + 1):
        j = i
        tmp = a[i]
        while j > left and a[j - 1] > tmp:
            a[j] = a[j - 1]
            j -= 1
        a[j] = tmp


def qsort2(a: MutableSequence, left: int, right: int) -> None:
    """a[left]～a[right]をクイックソート"""
    if right - left < 9:  # 要素数が9未満であれば単純挿入ソートに切り替え
        insertion_sort2(a, left, right)
    else:
        pl = left      # 左カーソル
        pr = right     # 右カーソル
        m = sort3(a, pl, (pl + pr) // 2, pr)
        x = a[m]

        a[m], a[pr - 1] = a[pr - 1], a[m]
        pl += 1
        pr -= 2
        while pl <= pr:
            while a[pl] < x:
                pl += 1
            while a[pr] > x:
                pr -= 1
            if pl <= pr:
                a[pl], a[pr] = a[pr], a[pl]
                pl += 1
                pr -= 1

        if left < pr:
            qsort(a, left, pr)
        if pl < right:
            qsort(a, pl, right)


def quick_sort2(a: MutableSequence) -> None:
    """クイックソート"""
    qsort2(a, 0, len(a) - 1)


# %% [markdown]
# #### Column 6-4 sorted関数によるソート
# %%
class TestQuickSort(unittest.TestCase):
    def test_sorted(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        self.assertEqual(sorted(a), [1, 3, 4, 6, 7, 8, 9])
        self.assertEqual(sorted(a, reverse=True), [9, 8, 7, 6, 4, 3, 1])


# %% [markdown]
# ## マージソート

# %% [markdown]
# ### ソートすみ配列のマージ
# %% [markdown]
# ### マージソート

# %% [markdown]
# #### List6-15 マージソート
# %%
# %%
buff = ""


class TestMergeSort(unittest.TestCase):
    def test_merge_sort_list(self):
        a = [2, 4, 6, 8, 11, 13]
        b = [1, 2, 3, 4, 9, 16, 21]
        c = [None] * (len(a) + len(b))
        merge_sorted_list(a, b, c)
        self.assertEqual(c, [1, 2, 2, 3, 4, 4, 6, 8, 9, 11, 13, 16, 21])

    def test_merge_sort(self):
        a = [5, 8, 4, 2, 6, 1, 3, 9, 7]
        merge_sort(a)
        self.assertEqual(a, [1, 2, 3, 4, 5, 6, 7, 8, 9])


def merge_sorted_list(a: Sequence, b: Sequence, c: MutableSequence) -> None:
    """ソート済み配列aとbをマージしてcに格納"""
    pa, pb, pc = 0, 0, 0   # カーソルを
    na, nb, nc = len(a), len(b), len(c)  # 要素数

    while pa < na and pb < nb:  # 小さいほうを格納
        if a[pa] <= b[pb]:
            c[pc] = a[pa]
            pa += 1
        else:
            c[pc] = b[pb]
            pb += 1
        pc += 1

    while pa < na:              # aに残った要素をコピー
        c[pc] = a[pa]
        pa += 1
        pc += 1

    while pb < nb:
        c[pc] = b[pb]
        pb += 1
        pc += 1


def merge_sort(a: MutableSequence) -> None:
    """マージソート"""
    def _merge_sort(a: MutableSequence, left: int, right: int) -> None:
        """a[left]～a[right]を再帰的にマージソート"""
        if left < right:
            center = (left + right) // 2

            _merge_sort(a, left, center)    # 前半をマージソート
            _merge_sort(a, center + 1, right)   # 後半をマージソート

            p = j = 0
            i = k = left

            while i <= center:
                buff[p] = a[i]
                p += 1
                i += 1

            while i <= right and j < p:
                if buff[j] <= a[i]:
                    a[k] = buff[j]
                    j += 1
                else:
                    a[k] = a[i]
                    i += 1
                k += 1

            while j < p:
                a[k] = buff[j]
                k += 1
                j += 1

    n = len(a)
    buff = [None] * n           # 作業用配列を生成
    _merge_sort(a, 0, n - 1)    # 配列全体をマージソート
    del buff                    # 作業用配列を破棄

# %% [markdown]
# ## ヒープソート

# %% [markdown]
# ### ヒープ

# %% [markdown]
# ### ヒープソート

# %% [markdown]
# ### 根を削除したヒープの再構築

# %% [markdown]
# ### ヒープソートの拡張

# %% [markdown]
# ### 配列のヒープ

# %% [markdown]
# #### List6-16 ヒープソート
# %%


class TestHeapSort(unittest.TestCase):
    def test_heap_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        heap_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def heap_sort(a: MutableSequence) -> None:
    """ヒープソート"""
    def down_heap(a: MutableSequence, left: int, right: int) -> None:
        """a[left]～a[right]をヒープソート"""
        temp = a[left]  # 根

        parent = left
        while parent < (right + 1) // 2:
            cl = parent * 2 + 1  # 左の子
            cr = cl + 1          # 右の子
            child = cr if cr <= right and a[cr] > a[cl] else cl  # 大きいほう
            if temp >= a[child]:
                break
            a[parent] = a[child]
            parent = child
        a[parent] = temp

    n = len(a)

    for i in range((n - 1) // 2, -1, -1):   # a[i]～a[n-1]をヒープ化
        down_heap(a, i, n - 1)

    for i in range(n - 1, 0, -1):
        a[0], a[i] = a[i], a[0]     # 最大要素と未ソート部末尾要素を交換
        down_heap(a, 0, i - 1)      # a[0]～a[i-1]をヒープ化


# %% [markdown]
# ### ヒープソートの時間計算量

# %% [markdown]
# ## 度数ソート

# %% [markdown]
# ### 度数ソート


# %% [markdown]
# #### List6-17 度数ソート
# %%
class TestCountingSort(unittest.TestCase):
    def test_counting_sort(self):
        x = [22, 5, 11, 32, 120, 68, 70]
        counting_sort(x)
        self.assertEqual(x, [5, 11, 22, 32, 68, 70, 120])


def fsort(a: MutableSequence, max: int) -> None:
    """度数ソート(配列要素の値は0以上max以下)"""
    n = len(a)
    f = [0] * (max + 1)     # 累積度数
    b = [0] * n             # 作業用目的配列

    for i in range(n):      # 各要素の度数をカウント
        f[a[i]] += 1

    for i in range(1, max + 1):  # 累積度数を計算
        f[i] += f[i - 1]

    for i in range(n - 1, -1, -1):  # 各要素を作業用配列に格納
        f[a[i]] -= 1
        b[f[a[i]]] = a[i]

    for i in range(n):      # 作業用配列をaに移動
        a[i] = b[i]


def counting_sort(a: MutableSequence) -> None:
    """度数ソート"""
    fsort(a, max(a))


# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
