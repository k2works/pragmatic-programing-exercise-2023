//  循環・重連結リスト

package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDoubleLinkedList(t *testing.T) {
	dllist := NewDoubleLinkedList()

	assert.Equal(t, 0, dllist.Len())
	assert.True(t, dllist.IsEmpty())

	dllist.AddFirst(1)
	assert.Equal(t, 1, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.AddFirst(2)
	assert.Equal(t, 2, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.AddLast(1)
	assert.Equal(t, 3, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.Add(4)
	assert.Equal(t, 4, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.RemoveFirst()
	assert.Equal(t, 3, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.RemoveLast()
	assert.Equal(t, 2, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.Next()
	dllist.Next()
	assert.Equal(t, 1, dllist.GetCurrentData())

	dllist.Prev()
	assert.Equal(t, 2, dllist.GetCurrentData())

	dllist.RemoveCurrentNode()
	assert.Equal(t, 2, dllist.Len())
	assert.False(t, dllist.IsEmpty())

	dllist.Clear()
	assert.Equal(t, 0, dllist.Len())
	assert.True(t, dllist.IsEmpty())

	dllist.AddFirst(1)
	dllist.AddFirst(2)
	dllist.AddFirst(3)
	assert.Equal(t, 1, dllist.Search(2))
	assert.Equal(t, 0, dllist.Search(3))
	assert.Equal(t, -1, dllist.Search(4))
}

func TestDoubleLinkedListIterator(t *testing.T) {
	dllist := NewDoubleLinkedList()
	dllist.AddFirst(1)
	dllist.AddFirst(2)
	dllist.AddFirst(3)

	// Forward iteration
	expectedForward := []int{3, 2, 1}
	for data := range dllist.Iterate() {
		assert.Equal(t, expectedForward[dllist.size-1], data)
		dllist.Prev()
	}

	// Reverse iteration
	expectedReverse := []int{1, 2, 3}
	for data := range dllist.ReverseIterate() {
		assert.Equal(t, expectedReverse[dllist.size-1], data)
		dllist.Next()
	}
}

type Node struct {
	data interface{}
	prev *Node
	next *Node
}

type DoubleLinkedList struct {
	head    *Node
	current *Node
	size    int
}

func NewDoubleLinkedList() *DoubleLinkedList {
	head := &Node{}
	head.prev = head
	head.next = head

	return &DoubleLinkedList{
		head:    head,
		current: head,
		size:    0,
	}
}

func (dllist *DoubleLinkedList) Len() int {
	return dllist.size
}

func (dllist *DoubleLinkedList) IsEmpty() bool {
	return dllist.head.next == dllist.head
}

func (dllist *DoubleLinkedList) GetCurrentData() interface{} {
	return dllist.current.data
}

func (dllist *DoubleLinkedList) Search(data interface{}) int {
	cnt := 0
	ptr := dllist.head.next

	for ptr != dllist.head {
		if data == ptr.data {
			dllist.current = ptr
			return cnt
		}
		cnt++
		ptr = ptr.next
	}

	return -1
}

func (dllist *DoubleLinkedList) Add(data interface{}) {
	newNode := &Node{data: data}

	newNode.prev = dllist.head.prev
	newNode.next = dllist.head
	dllist.head.prev.next = newNode
	dllist.head.prev = newNode

	dllist.size++
}

func (dllist *DoubleLinkedList) AddFirst(data interface{}) {
	newNode := &Node{data: data}

	newNode.prev = dllist.head
	newNode.next = dllist.head.next
	dllist.head.next.prev = newNode
	dllist.head.next = newNode

	dllist.size++
}

func (dllist *DoubleLinkedList) AddLast(data interface{}) {
	newNode := &Node{data: data}

	newNode.prev = dllist.head.prev
	newNode.next = dllist.head
	dllist.head.prev.next = newNode
	dllist.head.prev = newNode

	dllist.size++
}

func (dllist *DoubleLinkedList) RemoveCurrentNode() {
	if dllist.current == dllist.head {
		return
	}

	dllist.current.prev.next = dllist.current.next
	dllist.current.next.prev = dllist.current.prev

	dllist.current = dllist.current.next

	dllist.size--
}

func (dllist *DoubleLinkedList) RemoveFirst() {
	if dllist.head.next == dllist.head {
		return
	}

	dllist.head.next = dllist.head.next.next
	dllist.head.next.prev = dllist.head

	dllist.size--
}

func (dllist *DoubleLinkedList) RemoveLast() {
	if dllist.head.next == dllist.head {
		return
	}

	dllist.head.prev = dllist.head.prev.prev
	dllist.head.prev.next = dllist.head

	dllist.size--
}

func (dllist *DoubleLinkedList) Next() {
	if dllist.current.next != dllist.head {
		dllist.current = dllist.current.next
	}
}

func (dllist *DoubleLinkedList) Prev() {
	if dllist.current != dllist.head {
		dllist.current = dllist.current.prev
	}
}

func (dllist *DoubleLinkedList) Clear() {
	dllist.head.next = dllist.head
	dllist.head.prev = dllist.head
	dllist.current = dllist.head
	dllist.size = 0
}

func (dllist *DoubleLinkedList) Iterate() <-chan interface{} {
	ch := make(chan interface{})

	go func() {
		ptr := dllist.head.next

		for ptr != dllist.head {
			ch <- ptr.data
			ptr = ptr.next
		}

		close(ch)
	}()

	return ch
}

func (dllist *DoubleLinkedList) ReverseIterate() <-chan interface{} {
	ch := make(chan interface{})

	go func() {
		ptr := dllist.head.prev

		for ptr != dllist.head {
			ch <- ptr.data
			ptr = ptr.prev
		}

		close(ch)
	}()

	return ch
}
