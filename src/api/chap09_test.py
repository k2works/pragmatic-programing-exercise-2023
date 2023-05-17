

# %% [markdown]
# # 木構造と２分探索木
# %%
from __future__ import annotations
from typing import Any, MutableSequence, Sequence
import unittest
import doctest


# %% [markdown]
# ## 木構造
# %%


# %% [markdown]
# ## ２分木と２分探索木
# %%

class TestBst(unittest.TestCase):
    def test_２分探索木を生成(self):
        bst = BinarySearchTree()
        self.assertIsNone(bst.root)

    def test_挿入(self):
        bst = BinarySearchTree()
        self.assertTrue(bst.add(1, 'one'))
        self.assertTrue(bst.add(3, 'three'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertTrue(bst.add(2, 'two'))

    def test_削除(self):
        bst = BinarySearchTree()
        self.assertTrue(bst.add(1, 'one'))
        self.assertTrue(bst.add(3, 'three'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertTrue(bst.remove(2))
        self.assertFalse(bst.remove(2))

    def test_探索(self):
        bst = BinarySearchTree()
        self.assertTrue(bst.add(1, 'one'))
        self.assertTrue(bst.add(3, 'three'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertEqual(bst.search(2), 'two')
        self.assertIsNone(bst.search(4))

    def test_ダンプ(self):
        bst = BinarySearchTree()
        self.assertTrue(bst.add(1, 'one'))
        self.assertTrue(bst.add(3, 'three'))
        self.assertTrue(bst.add(2, 'two'))
        self.assertTrue(bst.add(2, 'two'))
        bst.dump()


class Node:
    """２分探索木のノード"""

    def __init__(self, key: Any, value: Any, left: Node = None, right: Node = None):
        """コンストラクタ"""
        self.key = key     # キー
        self.value = value  # 値
        self.left = left   # 左ポインタ（左の子への参照）
        self.right = right  # 右ポインタ（右の子への参照）


class BinarySearchTree:
    """２分探索木"""

    def __init__(self):
        """初期化"""
        self.root = None  # 根

    def search(self, key: Any) -> Any:
        """キーkeyをもつノードを探索"""
        p = self.root    # 根に着目
        while True:
            if p is None:       # これ以上進めないので失敗
                return None     # 探索失敗
            if key == p.key:    # keyとノードpのキーが一致すれば
                return p.value  # 探索成功
            elif key < p.key:   # keyのほうが小さければ
                p = p.left      # 左の子に進む
            else:               # keyのほうが大きければ
                p = p.right     # 右の子に進む

    def add(self, key: Any, value: Any) -> bool:
        """キーがkeyで値がvalueのノードを挿入"""

        def add_node(node: Node, key: Any, value: Any) -> None:
            """nodeを根とする部分木にキーがkeyで値がvalueのノードを挿入"""
            if key == node.key:
                return False  # keyは既に存在するので挿入失敗
            elif key < node.key:
                if node.left is None:
                    node.left = Node(key, value, None, None)
                else:
                    add_node(node.left, key, value)
            else:
                if node.right is None:
                    node.right = Node(key, value, None, None)
                else:
                    add_node(node.right, key, value)
            return True

        if self.root is None:
            self.root = Node(key, value, None, None)
            return True
        else:
            return add_node(self.root, key, value)

    def remove(self, key: Any) -> bool:
        """キーがkeyのノードを削除"""
        p = self.root  # 走査中のノード
        parent = None  # 走査中のノードの親ノード
        is_left_child = True  # pはparentの左子ノードか？

        while True:
            if p is None:     # これ以上進めないので削除失敗
                return False  # 削除失敗

            if key == p.key:  # keyとノードpのキーが一致すれば
                break         # 探索成功
            else:
                parent = p      # 枝をくだる前に親を設定
                if key < p.key:  # keyのほうが小さければ
                    is_left_child = True  # 左の子に進む
                    p = p.left    # 左の子に進む
                else:             # keyのほうが大きければ
                    is_left_child = False  # 右の子に進む
                    p = p.right   # 右の子に進む

        if p.left is None:  # pには左の子がいないか、左の子が葉ノード
            if p is self.root:
                self.root = p.right
            elif is_left_child:
                parent.left = p.right
            else:
                parent.right = p.right
        elif p.right is None:  # pには右の子がいないか、右の子が葉ノード
            if p is self.root:
                self.root = p.left
            elif is_left_child:
                parent.left = p.left  # 親の左ポインタが左の子を指すように
            else:
                parent.right = p.left  # 親の右ポインタが左の子を指すように
        else:
            parent = p
            left = p.left             # 部分木の中の最大ノード
            is_left_child = True
            while left.right is not None:  # 最大ノードleftを探索
                parent = left
                left = left.right
                is_left_child = False

            p.key = left.key        # leftのキーをpに移動
            p.value = left.value    # leftの値をpに移動
            if is_left_child:
                parent.left = left.left  # leftを削除
            else:
                parent.right = left.left  # leftを削除
        return True

    def dump(self) -> None:
        """ダンプ（全ノードをキーの昇順に表示）"""

        def print_subtree(node: Node):
            """nodeを根とする部分木のノードをキーの昇順に表示"""
            if node is not None:
                print_subtree(node.left)    # 左部分木をキーの昇順に表示
                print(f'{node.key}  {node.value}')  # nodeを表示
                print_subtree(node.right)   # 右部分木をキーの昇順に表示

        print_subtree(self.root)

    def min_key(self) -> Any:
        """最小のキー"""
        if self.root is None:
            return None
        p = self.root
        while p.left is not None:
            p = p.left
        return p.key

    def max_key(self) -> Any:
        """最大のキー"""
        if self.root is None:
            return None
        p = self.root
        while p.right is not None:
            p = p.right
        return p.key


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
# %%
