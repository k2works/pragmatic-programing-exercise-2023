//  線形リスト

package Linke_list

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

//  線形リスト

func TestLinkedList(t *testing.T) {
	ll := NewLinkedList()
	assert.Equal(t, 0, ll.Len())
	assert.Nil(t, ll.head)
	assert.Nil(t, ll.current)
}

func TestLinkedList_AddFirst(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	assert.Equal(t, 1, ll.no)
	assert.Equal(t, 1, ll.head.data)
	assert.Equal(t, 1, ll.current.data)
}

func TestLinkedList_AddLast(t *testing.T) {
	ll := NewLinkedList()
	ll.AddLast(1)
	assert.Equal(t, 1, ll.no)
	assert.Equal(t, 1, ll.head.data)
	assert.Equal(t, 1, ll.current.data)
}

func TestLinkedList_RemoveFirst(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.RemoveFirst()
	assert.Equal(t, 0, ll.no)
	assert.Nil(t, ll.head)
	assert.Nil(t, ll.current)
}

func TestLinkedList_RemoveLast(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.RemoveLast()
	assert.Equal(t, 0, ll.no)
	assert.Nil(t, ll.head)
	assert.Nil(t, ll.current)
}

func TestLinkedList_MoveNext(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.MoveNext()
	assert.Equal(t, 1, ll.current.data)
}

func TestLinkedList_RemoveCurrentNode(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.MoveNext()
	ll.RemoveCurrentNode()
	assert.Equal(t, 2, ll.current.data)
}

func TestLinkedList_Clear(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.Clear()
	assert.Equal(t, 0, ll.no)
	assert.Nil(t, ll.head)
	assert.Nil(t, ll.current)
}

func TestLinkedList_Search(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.AddFirst(3)
	assert.Equal(t, 2, ll.Search(1))
	assert.Equal(t, 1, ll.Search(2))
	assert.Equal(t, 0, ll.Search(3))
	assert.Equal(t, -1, ll.Search(4))
}

func TestLinkedList_Contains(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.AddFirst(3)
	assert.True(t, ll.Contains(1))
	assert.False(t, ll.Contains(4))
}

func TestLinkedList_Traverse(t *testing.T) {
	ll := NewLinkedList()
	ll.AddFirst(1)
	ll.AddFirst(2)
	ll.AddFirst(3)
	result := []int{}
	for e := range ll.Traverse() {
		result = append(result, e.(int))
	}
	expected := []int{3, 2, 1}
	assert.Equal(t, expected, result)
}

func NewNode(data interface{}, next *Node) *Node {
	return &Node{
		data: data,
		next: next,
	}
}

type Node struct {
	data interface{}
	next *Node
}

type LinkedList struct {
	no      int
	head    *Node
	current *Node
}

func NewLinkedList() *LinkedList {
	return &LinkedList{}
}

func (ll *LinkedList) Len() int {
	return ll.no
}

func (ll *LinkedList) Search(data interface{}) int {
	cnt := 0
	ptr := ll.head
	for ptr != nil {
		if ptr.data == data {
			ll.current = ptr
			return cnt
		}
		cnt++
		ptr = ptr.next
	}
	return -1
}

func (ll *LinkedList) Contains(data interface{}) bool {
	return ll.Search(data) >= 0
}

func (ll *LinkedList) AddFirst(data interface{}) {
	ptr := ll.head
	ll.head = NewNode(data, ptr)
	ll.current = ll.head
	ll.no++
}

func (ll *LinkedList) AddLast(data interface{}) {
	if ll.head == nil {
		ll.AddFirst(data)
	} else {
		ptr := ll.head
		for ptr.next != nil {
			ptr = ptr.next
		}
		ptr.next = NewNode(data, nil)
		ll.current = ptr.next
		ll.no++
	}
}

func (ll *LinkedList) RemoveFirst() {
	if ll.head != nil {
		ll.head, ll.current = ll.head.next, ll.head.next
		ll.no--
	}
}

func (ll *LinkedList) RemoveLast() {
	if ll.head != nil {
		if ll.head.next == nil {
			ll.RemoveFirst()
		} else {
			ptr := ll.head
			pre := ll.head
			for ptr.next != nil {
				pre = ptr
				ptr = ptr.next
			}
			pre.next = nil
			ll.current = pre
			ll.no--
		}
	}
}

func (ll *LinkedList) Remove(p *Node) {
	if ll.head != nil {
		if p == ll.head {
			ll.RemoveFirst()
		} else {
			ptr := ll.head
			for ptr.next != p {
				ptr = ptr.next
				if ptr == nil {
					return
				}
			}
			ptr.next = p.next
			ll.current = ptr
			ll.no--
			p = nil
		}
	}
}

func (ll *LinkedList) RemoveCurrentNode() {
	ll.Remove(ll.current)
}

func (ll *LinkedList) Clear() {
	for ll.head != nil {
		ll.RemoveFirst()
	}
	ll.current = nil
	ll.no = 0
}

func (ll *LinkedList) MoveNext() bool {
	if ll.current == nil || ll.current.next == nil {
		return false
	}
	ll.current = ll.current.next
	return true
}

func (ll *LinkedList) PrintCurrentNode() {
	if ll.current == nil {
		fmt.Println("着目ノードはありません。")
	} else {
		fmt.Println(ll.current.data)
	}
}

func (ll *LinkedList) Print() {
	ptr := ll.head
	for ptr != nil {
		fmt.Println(ptr.data)
		ptr = ptr.next
	}
}

func (ll *LinkedList) Traverse() <-chan interface{} {
	ch := make(chan interface{})
	go func() {
		defer close(ch)
		ptr := ll.head
		for ptr != nil {
			ch <- ptr.data
			ptr = ptr.next
		}
	}()
	return ch
}
