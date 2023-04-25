# Doctest
import bisect
from collections import deque
from typing import Any, MutableSequence
import unittest
import doctest

# ソート


class TestSort(unittest.TestCase):
    def test_buble_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_buble_sort_verbose(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort_verbose(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_buble_sort2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_buble_sort3(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        bubble_sort3(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_shaker_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        shaker_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_select_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        selection_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_insertion_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        insertion_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_binary_insertion_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        binary_insertion_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_binary_insertion2(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        binary_insertion_sort2(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])

    def test_shell_sort(self):
        a = [6, 4, 3, 7, 1, 9, 8]
        shell_sort(a)
        self.assertEqual(a, [1, 3, 4, 6, 7, 8, 9])


def bubble_sort(a: MutableSequence) -> None:
    """単純交換ソート(バブルソート)"""
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1, i, -1):
            if a[j - 1] > a[j]:
                a[j - 1], a[j] = a[j], a[j - 1]


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


def selection_sort(a: MutableSequence) -> None:
    """単純選択ソート"""
    n = len(a)
    for i in range(n - 1):
        min = i        # 未ソート部分から最小要素の添字
        for j in range(i + 1, n):
            if a[j] < a[min]:
                min = j
        a[i], a[min] = a[min], a[i]  # 未ソート部分の先頭要素と最小要素を交換


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


def binary_insertion_sort2(a: MutableSequence) -> None:
    """２分挿入ソート（bisect.insortを利用）"""
    for i in range(1, len(a)):
        bisect.insort(a, a.pop(i), 0, i)


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


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
