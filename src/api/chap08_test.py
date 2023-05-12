
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

class TestLinkedList(unittest.TestCase):
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
# ## カーソルによる線形リスト
# %%


class TestArrayList(unittest.TestCase):
    def test_線形リストを生成(self):
        array_list = ArrayLinkedList(100)
        self.assertEqual(len(array_list), 0)

    def test_先頭に挿入(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        self.assertEqual(len(array_list), 1)
        array_list.add_first(2)
        self.assertEqual(len(array_list), 2)
        array_list.add_first(3)
        self.assertEqual(len(array_list), 3)

    def test_先頭を削除(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        array_list.remove_first()
        self.assertEqual(len(array_list), 2)
        array_list.remove_first()
        self.assertEqual(len(array_list), 1)
        array_list.remove_first()
        self.assertEqual(len(array_list), 0)

    def test_末尾を削除(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        array_list.remove_last()
        self.assertEqual(len(array_list), 2)
        array_list.remove_last()
        self.assertEqual(len(array_list), 1)
        array_list.remove_last()
        self.assertEqual(len(array_list), 0)

    def test_着目を進める(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        array_list.next()
        self.assertEqual(array_list.get_current_data(), 2)
        array_list.next()
        self.assertEqual(array_list.get_current_data(), 1)
        array_list.next()
        self.assertEqual(array_list.get_current_data(), 1)

    def test_着目を削除(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        array_list.next()
        array_list.remove_current_node()
        self.assertEqual(len(array_list), 2)
        self.assertEqual(array_list.get_current_data(), 3)
        array_list.next()
        array_list.remove_current_node()
        self.assertEqual(len(array_list), 1)
        self.assertEqual(array_list.get_current_data(), 3)
        array_list.next()
        array_list.remove_current_node()
        self.assertEqual(len(array_list), 0)
        self.assertEqual(array_list.get_current_data(), -1)

    def test_全削除(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        array_list.clear()
        self.assertEqual(len(array_list), 0)

    def test_探索(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        self.assertEqual(array_list.search(1), 2)
        self.assertEqual(array_list.search(2), 1)
        self.assertEqual(array_list.search(3), 0)
        self.assertEqual(array_list.search(4), -1)

    def test_帰属性判定(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        self.assertEqual(array_list.is_empty(), False)

    def test_全ノードを走査(self):
        array_list = ArrayLinkedList(100)
        array_list.add_first(1)
        array_list.add_first(2)
        array_list.add_first(3)
        self.assertEqual(list(array_list), [3, 2, 1])


Null = -1


class Node:
    """線形リストノードクラス（配列カーソル版）"""

    def __init__(self, data=Null, next=Null, dnext=Null):
        """初期化"""
        self.data = data
        self.next = next
        self.dnext = dnext


class ArrayLinkedList:
    """線形リストクラス（配列カーソル版）"""

    def __init__(self, capacity: int):
        """初期化"""
        self.head = Null                 # 先頭ノード
        self.current = Null              # 着目ノード
        self.max = Null                  # 利用中の末尾レコード
        self.deleted = Null              # フリーリストの先頭ノード
        self.capacity = capacity         # リストの容量
        self.n = [Node()] * self.capacity  # リスト本体
        self.no = 0

    def __len__(self) -> int:
        """線形リストの長さを返す"""
        return self.no

    def is_empty(self) -> bool:
        """線形リストは空か？"""
        return self.head == Null

    def get_current_data(self) -> Any:
        """着目ノードのデータを返す"""
        if self.current is None:
            return Null                     # 着目ノードはない
        return self.n[self.current].data

    def get_insert_index(self):
        """次に挿入するレコードの添字を求める"""
        if self.deleted == Null:         # 削除レコードは存在しない
            if self.max + 1 < self.capacity:
                self.max += 1
                return self.max           # 新しいレコードを利用
            else:
                return Null               # 容量オーバ
        else:
            rec = self.deleted            # フリーリストから
            self.deleted = self.n[rec].dnext
            return rec

    def delete_index(self, idx: int) -> None:
        """レコードidxをフリーリストに登録"""
        if self.deleted == Null:         # 削除レコードは存在しない
            self.deleted = idx           # idxをフリーリストの
            self.n[idx].dnext = Null     # 先頭に登録
        else:
            rec = self.deleted            # idxをフリーリストの
            self.deleted = idx
            self.n[idx].dnext = rec       # 先頭に挿入

    def search(self, data: Any) -> int:
        """dataと等価なノードを探索"""
        cnt = 0
        ptr = self.head                  # 現在走査中のノード

        while ptr != Null:
            if self.n[ptr].data == data:
                self.current = ptr
                return cnt                # 探索成功
            cnt += 1
            ptr = self.n[ptr].next        # 後続ノードに着目
        return Null                       # 探索失敗

    def __contains__(self, data: Any) -> bool:
        """線形リストにdataは含まれているか"""
        return self.search(data) >= 0

    def add_first(self, data: Any) -> None:
        """先頭にノードを挿入"""
        ptr = self.head                  # 挿入前の先頭ノード
        rec = self.get_insert_index()
        if rec != Null:
            self.head = self.current = rec  # 第recレコードに挿入
            self.n[self.head] = Node(data, ptr)
            self.no += 1

    def add_last(self, data: Any) -> None:
        """末尾にノードを挿入"""
        if self.head == Null:            # リストが空であれば
            self.add_first(data)         # 先頭に挿入
        else:
            ptr = self.head
            while self.n[ptr].next != Null:
                ptr = self.n[ptr].next
            rec = self.get_insert_index()
            if rec != Null:
                self.n[ptr].next = self.current = rec
                self.n[rec] = Node(data)
                self.no += 1

    def remove_first(self) -> None:
        """先頭ノードを削除"""
        if self.head != Null:            # リストが空でなければ
            ptr = self.n[self.head].next
            self.delete_index(self.head)
            self.head = self.current = ptr
            self.no -= 1

    def remove_last(self) -> None:
        """末尾ノードを削除"""
        if self.head != Null:
            if self.n[self.head].next == Null:  # ノードが一つだけであれば
                self.remove_first()             # 先頭ノードを削除
            else:
                ptr = self.head                 # 走査中のノード
                pre = self.head                 # 走査中のノードの先行ノード

                while self.n[ptr].next != Null:
                    pre = ptr
                    ptr = self.n[ptr].next
                self.n[pre].next = Null        # preは削除後の末尾ノード
                self.delete_index(ptr)
                self.current = pre
                self.no -= 1

    def remove(self, p: int) -> None:
        """レコードpを削除"""
        if self.head != Null:
            if p == self.head:              # pが先頭ノードであれば
                self.remove_first()         # 先頭ノードを削除
            else:
                ptr = self.head

                while self.n[ptr].next != p:
                    ptr = self.n[ptr].next
                    if ptr == Null:
                        return                # pはリスト上に存在しない
                self.n[ptr].next = Null       # pは削除後の末尾ノード
                self.delete_index(p)
                self.n[ptr].next = self.n[p].next
                self.current = ptr
                self.no -= 1

    def remove_current_node(self) -> None:
        """着目ノードを削除"""
        self.remove(self.current)

    def clear(self) -> None:
        """全ノードを削除"""
        while self.head != Null:          # 空になるまで
            self.remove_first()           # 先頭ノードを削除
        self.current = Null

    def next(self) -> bool:
        """着目ノードを一つ後方に進める"""
        if self.current == Null or self.n[self.current].next == Null:
            return False                 # 進めることはできなかった
        self.current = self.n[self.current].next
        return True

    def print_current_node(self) -> None:
        """着目ノードを表示"""
        if self.current == Null:
            print('着目ノードはありません。')
        else:
            print(self.n[self.current].data)

    def print(self) -> None:
        """全ノードを表示"""
        ptr = self.head

        while ptr != Null:
            print(self.n[ptr].data)
            ptr = self.n[ptr].next

    def dump(self) -> None:
        """全ノードをダンプ"""
        for i in self.n:
            print(f'[{i}] {i.data} {i.next} {i.dnext}')

    def __iter__(self) -> ArrayLinkedListIterator:
        """イテレータを返す"""
        return ArrayLinkedListIterator(self.n, self.head)


class ArrayLinkedListIterator:
    """クラスArrayLinkedListのイテレータ用クラス"""

    def __init__(self, n: int, head: int):
        self.n = n
        self.current = head

    def __iter__(self) -> ArrayLinkedListIterator:
        return self

    def __next__(self) -> Any:
        if self.current == Null:
            raise StopIteration
        else:
            data = self.n[self.current].data
            self.current = self.n[self.current].next
            return data

# %% [markdown]
# ## 循環・重連結リスト
# %%


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
# %%
