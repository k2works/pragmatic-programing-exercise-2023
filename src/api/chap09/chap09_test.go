//  木構造と２分探索木

// 木構造

// ２分木と２分探索木

package chap09

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBinarySearchTree(t *testing.T) {
	bst := NewBinarySearchTree()

	// ２分探索木を生成のテスト
	assert.Nil(t, bst.root)

	// 挿入のテスト
	assert.True(t, bst.Add(1, "one"))
	assert.True(t, bst.Add(3, "three"))
	assert.True(t, bst.Add(2, "two"))
	assert.True(t, bst.Add(2, "two"))

	// 削除のテスト
	assert.True(t, bst.Add(1, "one"))
	assert.True(t, bst.Add(3, "three"))
	assert.True(t, bst.Add(2, "two"))
	assert.True(t, bst.Add(2, "two"))
	assert.True(t, bst.Remove(2))
	assert.False(t, bst.Remove(2))

	// 探索のテスト
	assert.True(t, bst.Add(1, "one"))
	assert.True(t, bst.Add(3, "three"))
	assert.True(t, bst.Add(2, "two"))
	assert.True(t, bst.Add(2, "two"))
	assert.Equal(t, "two", bst.Search(2))
	assert.Nil(t, bst.Search(4))

	// ダンプのテスト
	assert.True(t, bst.Add(1, "one"))
	assert.True(t, bst.Add(3, "three"))
	assert.True(t, bst.Add(2, "two"))
	assert.True(t, bst.Add(2, "two"))
	bst.Dump()
}

type Node struct {
	key   int
	value interface{}
	left  *Node
	right *Node
}

type BinarySearchTree struct {
	root *Node
}

func NewBinarySearchTree() *BinarySearchTree {
	return &BinarySearchTree{}
}

func (bst *BinarySearchTree) Search(key int) interface{} {
	p := bst.root
	for p != nil {
		if key == p.key {
			return p.value
		} else if key < p.key {
			p = p.left
		} else {
			p = p.right
		}
	}
	return nil
}

func (bst *BinarySearchTree) Add(key int, value interface{}) bool {
	var addNode func(node *Node, key int, value interface{}) bool
	addNode = func(node *Node, key int, value interface{}) bool {
		if key == node.key {
			return false
		} else if key < node.key {
			if node.left == nil {
				node.left = &Node{key: key, value: value}
			} else {
				return addNode(node.left, key, value)
			}
		} else {
			if node.right == nil {
				node.right = &Node{key: key, value: value}
			} else {
				return addNode(node.right, key, value)
			}
		}
		return true
	}

	if bst.root == nil {
		bst.root = &Node{key: key, value: value}
		return true
	} else {
		return addNode(bst.root, key, value)
	}
}

func (bst *BinarySearchTree) Remove(key int) bool {
	var removeNode func(node *Node, key int, parent *Node, isLeftChild bool) bool
	removeNode = func(node *Node, key int, parent *Node, isLeftChild bool) bool {
		if node == nil {
			return false
		}

		if key == node.key {
			// ノードの削除
			if node.left == nil && node.right == nil {
				// 葉ノードの場合
				if parent != nil {
					if isLeftChild {
						parent.left = nil
					} else {
						parent.right = nil
					}
				} else {
					bst.root = nil
				}
			} else if node.left == nil {
				// 右の子ノードだけを持つ場合
				if parent != nil {
					if isLeftChild {
						parent.left = node.right
					} else {
						parent.right = node.right
					}
				} else {
					bst.root = node.right
				}
			} else if node.right == nil {
				// 左の子ノードだけを持つ場合
				if parent != nil {
					if isLeftChild {
						parent.left = node.left
					} else {
						parent.right = node.left
					}
				} else {
					bst.root = node.left
				}
			} else {
				// 左右の子ノードを持つ場合
				successor := bst.findSuccessor(node)
				node.key = successor.key
				node.value = successor.value
				bst.Remove(successor.key)
			}

			return true
		} else if key < node.key {
			return removeNode(node.left, key, node, true)
		} else {
			return removeNode(node.right, key, node, false)
		}
	}

	return removeNode(bst.root, key, nil, false)
}

func (bst *BinarySearchTree) findSuccessor(node *Node) *Node {
	successor := node.right
	for successor.left != nil {
		successor = successor.left
	}
	return successor
}

func (bst *BinarySearchTree) Dump() {
	bst.dumpTree(bst.root, 0)
}

func (bst *BinarySearchTree) dumpTree(node *Node, level int) {
	if node != nil {
		bst.dumpTree(node.left, level+1)
		for i := 0; i < level; i++ {
			print("    ")
		}
		println(node.key, node.value)
		bst.dumpTree(node.right, level+1)
	}
}
