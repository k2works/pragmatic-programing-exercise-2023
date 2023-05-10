
# %% [markdown]
# # 線形リスト
# %%
from __future__ import annotations
from typing import Any, MutableSequence, Sequence
import unittest
import doctest


# %% [markdown]
# ## 線形リスト
# %%

class TestNode(unittest.TestCase):
    def test_linked_list(self):
        ll = LinkedList()
        self.assertEqual(ll.no, 0)
        self.assertEqual(ll.head, None)
        self.assertEqual(ll.current, None)

    def test_先頭に挿入(self):
        ll = LinkedList()
        ll.add_first(1)
        self.assertEqual(ll.no, 1)
        self.assertEqual(ll.head.data, 1)
        self.assertEqual(ll.current.data, 1)

    def test_末尾に挿入(self):
        ll = LinkedList()
        ll.add_last(1)
        self.assertEqual(ll.no, 1)
        self.assertEqual(ll.head.data, 1)
        self.assertEqual(ll.current.data, 1)

    def test_先頭を削除(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.remove_first()
        self.assertEqual(ll.no, 0)
        self.assertEqual(ll.head, None)
        self.assertEqual(ll.current, None)

    def test_末尾を削除(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.remove_last()
        self.assertEqual(ll.no, 0)
        self.assertEqual(ll.head, None)
        self.assertEqual(ll.current, None)

    def test_着目を進める(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.next()
        ll.print_current_node()
        self.assertEqual(ll.current.data, 1)

    def test_着目を削除(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.next()
        ll.remove_current_node()
        self.assertEqual(ll.current.data, 2)

    def test_全削除(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.clear()
        self.assertEqual(ll.no, 0)
        self.assertEqual(ll.head, None)
        self.assertEqual(ll.current, None)

    def test_探索(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.add_first(3)
        self.assertEqual(ll.search(1), 2)
        self.assertEqual(ll.search(2), 1)
        self.assertEqual(ll.search(3), 0)
        self.assertEqual(ll.search(4), -1)

    def test_帰属性判定(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.add_first(3)
        self.assertTrue(1 in ll)
        self.assertFalse(4 in ll)

    def test_走査(self):
        ll = LinkedList()
        ll.add_first(1)
        ll.add_first(2)
        ll.add_first(3)
        for e in ll:
            print(e)


class Node:
    """線形リスト用ノードクラス"""

    def __init__(self, data: Any = None, next: Node = None):  # type: ignore
        """初期化"""
        self.data = data  # データ
        self.next = next  # 後続ポインタ


class LinkedList:
    """線形リストクラス"""

    def __init__(self) -> None:
        """初期化"""
        self.no = 0  # ノードの個数
        self.head = None  # 先頭ノード
        self.current = None  # 着目ノード

    def __len__(self) -> int:
        """線形リストのノード数を返す"""
        return self.no

    def search(self, data: Any) -> int:
        """dataと一致するノードを探索"""
        cnt = 0
        ptr = self.head
        while ptr is not None:
            if ptr.data == data:
                self.current = ptr
                return cnt
            cnt += 1
            ptr = ptr.next
        return -1

    def __containes__(self, data: Any) -> bool:
        """線形リストにdataが含まれているかどうか"""
        return self.search(data) >= 0

    def add_first(self, data: Any) -> None:
        """先頭にノードを挿入"""
        ptr = self.head
        self.head = self.current = Node(data, ptr)
        self.no += 1

    def add_last(self, data: Any) -> None:
        """末尾にノードを挿入"""
        if self.head is None:              # リストが空であれば
            self.add_first(data)           # 先頭に挿入
        else:
            ptr = self.head
            while ptr.next is not None:
                ptr = ptr.next
            ptr.next = self.current = Node(data, None)
            self.no += 1

    def remove_first(self) -> None:
        """先頭ノードを削除"""
        if self.head is not None:         # リストが空でなければ
            self.head = self.current = self.head.next
        self.no -= 1

    def remove_last(self) -> None:
        """末尾ノードを削除"""
        if self.head is not None:
            if self.head.next is None:    # ノードが一つだけであれば
                self.remove_first()       # 先頭ノードを削除
            else:
                ptr = self.head           # 走査中のノード
                pre = self.head           # 走査中のノードの前方ノード

                while ptr.next is not None:
                    pre = ptr
                    ptr = ptr.next
                pre.next = None           # preは削除後の末尾ノード
                self.current = pre
                self.no -= 1

    def remove(self, p: Node) -> None:
        """ノードpを削除"""
        if self.head is not None:
            if p is self.head:            # pが先頭ノードであれば
                self.remove_first()       # 先頭ノードを削除
            else:
                ptr = self.head

                while ptr.next is not p:
                    ptr = ptr.next
                    if ptr is None:
                        return              # pはリスト上に存在しない
                ptr.next = p.next
                self.current = ptr
                self.no -= 1

    def remove_current_node(self) -> None:
        """着目ノードを削除"""
        self.remove(self.current)

    def clear(self) -> None:
        """全ノードを削除"""
        while self.head is not None:       # 空になるまで
            self.remove_first()            # 先頭ノードを削除
        self.current = None
        self.no = 0

    def next(self) -> bool:
        """着目ノードを一つ後方に進める"""
        if self.current is None or self.current.next is None:
            return False                   # 進めることができない
        self.current = self.current.next
        return True

    def print_current_node(self) -> None:
        """着目ノードを表示"""
        if self.current is None:
            print('着目ノードはありません。')
        else:
            print(self.current.data)

    def print(self) -> None:
        """全ノードを表示"""
        ptr = self.head

        while ptr is not None:
            print(ptr.data)
            ptr = ptr.next

    def __iter__(self) -> LinkedListIterator:
        """線形リストをイテレータで走査"""
        return LinkedListIterator(self.head)


class LinkedListIterator:
    """クラスLinkedListのイテレータ用クラス"""

    def __init__(self, head: Node):
        self.current = head

    def __iter__(self) -> LinkedListIterator:
        return self

    def __next__(self) -> Any:
        if self.current is None:
            raise StopIteration
        else:
            data = self.current.data
            self.current = self.current.next
            return data

# %% [markdown]
# ## 循環・重連結リスト
# %%


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
# %%
