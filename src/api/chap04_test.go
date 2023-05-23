//固定長スタッククラス

package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFixedStack_Push(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	assert.Equal(t, 1, len(s.Dump()))
}

func TestFixedStack_Find(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 1, s.Find(2))
}

func TestFixedStack_Count(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	s.Push(1)
	s.Push(1)
	assert.Equal(t, 3, s.Count(1))
}

func TestFixedStack_Peek(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 3, s.Peek())
}

func TestFixedStack_Pop(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 3, s.Pop())
	assert.Equal(t, 2, len(s.Dump()))
}

func TestFixedStack_Clear(t *testing.T) {
	s := NewFixedStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	s.Clear()
	assert.Equal(t, 0, len(s.Dump()))
	assert.True(t, s.IsEmpty())
}

type FixedStack struct {
	stk      []int
	capacity int
	ptr      int
}

func NewFixedStack(capacity int) *FixedStack {
	return &FixedStack{
		stk:      make([]int, capacity),
		capacity: capacity,
		ptr:      0,
	}
}

func (s *FixedStack) Push(value int) {
	if s.IsFull() {
		panic("stack is full")
	}
	s.stk[s.ptr] = value
	s.ptr++
}

func (s *FixedStack) Find(value int) int {
	for i := s.ptr - 1; i >= 0; i-- {
		if s.stk[i] == value {
			return i
		}
	}
	return -1
}

func (s *FixedStack) Count(value int) int {
	c := 0
	for i := 0; i < s.ptr; i++ {
		if s.stk[i] == value {
			c++
		}
	}
	return c
}

func (s *FixedStack) Pop() int {
	if s.IsEmpty() {
		panic("stack is empty")
	}
	s.ptr--
	return s.stk[s.ptr]
}

func (s *FixedStack) Peek() int {
	if s.IsEmpty() {
		panic("stack is empty")
	}
	return s.stk[s.ptr-1]
}

func (s *FixedStack) Clear() {
	s.ptr = 0
}

func (s *FixedStack) Dump() []int {
	return s.stk[:s.ptr]
}

func (s *FixedStack) IsEmpty() bool {
	return s.ptr <= 0
}

func (s *FixedStack) IsFull() bool {
	return s.ptr >= s.capacity
}

// 固定長スタッククラス（collection.dequeを利用)

func TestStack_Push(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	assert.Equal(t, []interface{}{1}, s.Dump())
}

func TestStack_Find(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 1, s.Find(2))
}

func TestStack_Count(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	s.Push(1)
	s.Push(1)
	assert.Equal(t, 3, s.Count(1))
}

func TestStack_Peek(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 3, s.Peek())
}

func TestStack_Pop(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	assert.Equal(t, 3, s.Pop())
	assert.Equal(t, 2, len(s.Dump()))
}

func TestStack_Clear(t *testing.T) {
	s := NewStack(64)
	s.Push(1)
	s.Push(2)
	s.Push(3)
	s.Clear()
	assert.True(t, s.IsEmpty())
}

type Stack struct {
	capacity int
	stk      []interface{}
}

func NewStack(capacity int) *Stack {
	return &Stack{
		capacity: capacity,
		stk:      make([]interface{}, 0, capacity),
	}
}

func (s *Stack) IsEmpty() bool {
	return len(s.stk) == 0
}

func (s *Stack) Push(value interface{}) {
	s.stk = append(s.stk, value)
}

func (s *Stack) Pop() interface{} {
	if s.IsEmpty() {
		panic("Stack is empty")
	}
	value := s.stk[len(s.stk)-1]
	s.stk = s.stk[:len(s.stk)-1]
	return value
}

func (s *Stack) Peek() interface{} {
	if s.IsEmpty() {
		panic("Stack is empty")
	}
	return s.stk[len(s.stk)-1]
}

func (s *Stack) Clear() {
	s.stk = s.stk[:0]
}

func (s *Stack) Find(value interface{}) int {
	for i := len(s.stk) - 1; i >= 0; i-- {
		if s.stk[i] == value {
			return i
		}
	}
	return -1
}

func (s *Stack) Count(value interface{}) int {
	count := 0
	for _, v := range s.stk {
		if v == value {
			count++
		}
	}
	return count
}

func (s *Stack) Dump() []interface{} {
	return s.stk
}

// 固定長キュークラスFixedQueueの利用例

func TestFixedQueue_Enque(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	assert.Equal(t, 1, q.Dump()[0])
}

func TestFixedQueue_Deque(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	q.Enque(2)
	q.Enque(3)
	assert.Equal(t, 1, q.Deque())
}

func TestFixedQueue_Peek(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	q.Enque(2)
	q.Enque(3)
	assert.Equal(t, 1, q.Peek())
}

func TestFixedQueue_Find(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	q.Enque(2)
	q.Enque(3)
	assert.Equal(t, 1, q.Find(2))
}

func TestFixedQueue_Count(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(2)
	q.Enque(2)
	q.Enque(2)
	assert.Equal(t, 3, q.Count(2))
}

func TestFixedQueue_Clear(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	q.Enque(2)
	q.Enque(3)
	q.Clear()
}

func TestFixedQueue_Dump(t *testing.T) {
	q := NewFixedQueue(64)
	q.Enque(1)
	q.Enque(2)
	q.Enque(3)
	assert.Equal(t, 3, q.Dump()[2])
	q.Clear()
	assert.Nil(t, q.Dump())
}

type FixedQueue struct {
	no       int
	front    int
	rear     int
	capacity int
	que      []interface{}
}

func NewFixedQueue(capacity int) *FixedQueue {
	return &FixedQueue{
		no:       0,
		front:    0,
		rear:     0,
		capacity: capacity,
		que:      make([]interface{}, capacity),
	}
}

func (q *FixedQueue) Len() int {
	return q.no
}

func (q *FixedQueue) IsEmpty() bool {
	return q.no <= 0
}

func (q *FixedQueue) IsFull() bool {
	return q.no >= q.capacity
}

func (q *FixedQueue) Enque(x interface{}) {
	if q.IsFull() {
		panic("Queue is full")
	}
	q.que[q.rear] = x
	q.rear = (q.rear + 1) % q.capacity
	q.no++
}

func (q *FixedQueue) Deque() interface{} {
	if q.IsEmpty() {
		panic("Queue is empty")
	}
	x := q.que[q.front]
	q.front = (q.front + 1) % q.capacity
	q.no--
	return x
}

func (q *FixedQueue) Peek() interface{} {
	if q.IsEmpty() {
		panic("Queue is empty")
	}
	return q.que[q.front]
}

func (q *FixedQueue) Find(value interface{}) int {
	for i := 0; i < q.no; i++ {
		idx := (i + q.front) % q.capacity
		if q.que[idx] == value {
			return idx
		}
	}
	return -1
}

func (q *FixedQueue) Count(value interface{}) int {
	c := 0
	for i := 0; i < q.no; i++ {
		idx := (i + q.front) % q.capacity
		if q.que[idx] == value {
			c++
		}
	}
	return c
}

func (q *FixedQueue) Clear() {
	q.no, q.front, q.rear = 0, 0, 0
}

func (q *FixedQueue) Dump() []interface{} {
	if q.IsEmpty() {
		return nil
	}
	return q.que
}
