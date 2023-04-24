# Doctest
from collections import deque
from typing import Any, MutableSequence
import unittest
import doctest

# 単純交換ソート（バブルソート）


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


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
