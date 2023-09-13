// カーソルによる線形リスト

package array_list

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestArrayLinkedList(t *testing.T) {
	arrayList := NewArrayLinkedList(100)
	assert.Equal(t, 0, len(arrayList.n))

	arrayList.AddFirst(1)
	assert.Equal(t, 1, len(arrayList.n))
	arrayList.AddFirst(2)
	assert.Equal(t, 2, len(arrayList.n))
	arrayList.AddFirst(3)
	assert.Equal(t, 3, len(arrayList.n))

	arrayList.RemoveFirst()
	assert.Equal(t, 2, len(arrayList.n))
	arrayList.RemoveFirst()
	assert.Equal(t, 1, len(arrayList.n))
	arrayList.RemoveFirst()
	assert.Equal(t, 0, len(arrayList.n))

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	arrayList.RemoveLast()
	assert.Equal(t, 2, len(arrayList.n))
	arrayList.RemoveLast()
	assert.Equal(t, 1, len(arrayList.n))
	arrayList.RemoveLast()
	assert.Equal(t, 0, len(arrayList.n))

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	arrayList.Next()
	assert.Equal(t, 2, arrayList.GetCurrentData())
	arrayList.Next()
	assert.Equal(t, 1, arrayList.GetCurrentData())
	arrayList.Next()
	assert.Equal(t, 1, arrayList.GetCurrentData())

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	arrayList.Next()
	arrayList.RemoveCurrentNode()
	assert.Equal(t, 2, len(arrayList.n))
	assert.Equal(t, 3, arrayList.GetCurrentData())
	arrayList.Next()
	arrayList.RemoveCurrentNode()
	assert.Equal(t, 1, len(arrayList.n))
	assert.Equal(t, 3, arrayList.GetCurrentData())
	arrayList.Next()
	arrayList.RemoveCurrentNode()
	assert.Equal(t, 0, len(arrayList.n))
	assert.Equal(t, -1, arrayList.GetCurrentData())

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	arrayList.Clear()
	assert.Equal(t, 0, len(arrayList.n))

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	assert.Equal(t, 2, arrayList.Search(1))
	assert.Equal(t, 1, arrayList.Search(2))
	assert.Equal(t, 0, arrayList.Search(3))
	assert.Equal(t, -1, arrayList.Search(4))

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	assert.Equal(t, false, arrayList.IsEmpty())

	arrayList.AddFirst(1)
	arrayList.AddFirst(2)
	arrayList.AddFirst(3)
	assert.Equal(t, []int{3, 2, 1, 3, 2, 1, 3, 2, 1}, arrayList.ToArray())
}

func NewArrayLinkedList(capacity int) *ArrayLinkedList {
	return &ArrayLinkedList{
		head:     Null,
		current:  Null,
		max:      Null,
		deleted:  Null,
		capacity: capacity,
		n:        make([]Node, capacity),
		no:       0,
	}
}

type Node struct {
	data  int
	next  int
	dnext int
}

type ArrayLinkedList struct {
	head     int
	current  int
	max      int
	deleted  int
	capacity int
	n        []Node
	no       int
}

const Null = -1

func (list *ArrayLinkedList) Len() int {
	return len(list.n)
}

func (list *ArrayLinkedList) AddFirst(data int) {
	if list.deleted == Null {
		x := list.no
		list.no++
		list.n[x].data = data
		list.n[x].next = list.head
		list.head = x
	} else {
		x := list.deleted
		list.deleted = list.n[x].dnext
		list.n[x].data = data
		list.n[x].next = list.head
		list.head = x
	}
}

func (list *ArrayLinkedList) RemoveFirst() {
	if list.head != Null {
		x := list.head
		list.head = list.n[x].next
		list.n[x].dnext = list.deleted
		list.deleted = x
	}
}

func (list *ArrayLinkedList) RemoveLast() {
	if list.head != Null {
		if list.n[list.head].next == Null {
			list.RemoveFirst()
		} else {
			prev := list.head
			curr := list.n[prev].next
			for list.n[curr].next != Null {
				prev = curr
				curr = list.n[curr].next
			}
			list.n[prev].next = Null
			list.n[curr].dnext = list.deleted
			list.deleted = curr
		}
	}
}

func (list *ArrayLinkedList) Next() {
	if list.current != Null {
		list.current = list.n[list.current].next
	}
}

func (list *ArrayLinkedList) GetCurrentData() int {
	if list.current != Null {
		return list.n[list.current].data
	}
	return -1
}

func (list *ArrayLinkedList) RemoveCurrentNode() {
	if list.current != Null {
		if list.current == list.head {
			list.RemoveFirst()
		} else {
			prev := list.head
			curr := list.n[prev].next
			for curr != list.current {
				prev = curr
				curr = list.n[curr].next
			}
			list.n[prev].next = list.n[curr].next
			list.n[curr].dnext = list.deleted
			list.deleted = curr
			list.current = prev
		}
	}
}

func (list *ArrayLinkedList) Clear() {
	list.head = Null
	list.current = Null
	list.deleted = Null
}

func (list *ArrayLinkedList) Search(data int) int {
	x := list.head
	i := 0
	for x != Null {
		if list.n[x].data == data {
			return i
		}
		x = list.n[x].next
		i++
	}
	return -1
}

func (list *ArrayLinkedList) IsEmpty() bool {
	return list.head == Null
}

func (list *ArrayLinkedList) ToArray() []int {
	var arr []int
	x := list.head
	for x != Null {
		arr = append(arr, list.n[x].data)
		x = list.n[x].next
	}
	return arr
}
