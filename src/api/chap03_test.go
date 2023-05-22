// 探索アルゴリズム
package main

// 線形探索

import (
	"crypto/md5"
	"fmt"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSsearchWhile(t *testing.T) {
	a := []interface{}{6, 4, 3, 2, 1, 2, 8}
	expected1 := 3
	assert.Equal(t, expected1, ssearchWhile(a, 2))

	b := []interface{}{12.7, 3.14, 6.4, 7.2, "End"}
	expected2 := 2
	assert.Equal(t, expected2, ssearchWhile(b, 6.4))

	c := []interface{}{4, 7, 5.6, 2, 3.14, 1}
	expected3 := 2
	assert.Equal(t, expected3, ssearchWhile(c, 5.6))

	d := []interface{}{"DTS", "AAC", "FLAC"}
	expected4 := 0
	assert.Equal(t, expected4, ssearchWhile(d, "DTS"))
}

func ssearchWhile(a []interface{}, key interface{}) int {
	i := 0
	for i < len(a) {
		if a[i] == key {
			return i
		}
		i++
	}
	return -1
}

func TestSsearchFor(t *testing.T) {
	a := []interface{}{6, 4, 3, 2, 1, 2, 8}
	expected1 := 3
	assert.Equal(t, expected1, ssearchFor(a, 2))

	b := []interface{}{12.7, 3.14, 6.4, 7.2, "End"}
	expected2 := 2
	assert.Equal(t, expected2, ssearchFor(b, 6.4))

	c := []interface{}{4, 7, 5.6, 2, 3.14, 1}
	expected3 := 2
	assert.Equal(t, expected3, ssearchFor(c, 5.6))

	d := []interface{}{"DTS", "AAC", "FLAC"}
	expected4 := 0
	assert.Equal(t, expected4, ssearchFor(d, "DTS"))
}

func ssearchFor(a []interface{}, key interface{}) int {
	for i, val := range a {
		if val == key {
			return i
		}
	}
	return -1
}

// 線形探索（番兵法）

func TestSsearchSentinel(t *testing.T) {
	seq := []interface{}{6, 4, 3, 2, 1, 2, 8}
	expected := 3
	assert.Equal(t, expected, ssearchSentinel(seq, 2))
}

func ssearchSentinel(seq []interface{}, key interface{}) int {
	a := make([]interface{}, len(seq)+1)
	copy(a, seq)
	a[len(seq)] = key

	i := 0
	for a[i] != key {
		i++
	}

	if i == len(seq) {
		return -1
	}
	return i
}

// ２分探索
func TestBsearch(t *testing.T) {
	a := []interface{}{1, 2, 3, 5, 7, 8, 9}
	key := 5
	expected := 3
	assert.Equal(t, bsearch(a, key), expected)
}

func bsearch(a []interface{}, key interface{}) int {
	pl := 0
	pr := len(a) - 1

	for pl <= pr {
		pc := (pl + pr) / 2

		// Type switch to handle comparison based on underlying types
		switch element := a[pc].(type) {
		case int:
			if element == key.(int) {
				return pc
			} else if element < key.(int) {
				pl = pc + 1
			} else {
				pr = pc - 1
			}
		case float64:
			if element == key.(float64) {
				return pc
			} else if element < key.(float64) {
				pl = pc + 1
			} else {
				pr = pc - 1
			}
		// Add additional cases for other types as needed
		default:
			// Handle unsupported type
			return -1
		}
	}

	return -1
}

// ハッシュ法

func TestChainedHash(t *testing.T) {
	hash := NewChainedHash(13)
	hash.Add(1, "赤尾")
	hash.Add(5, "武田")
	hash.Add(10, "小野")
	hash.Add(12, "鈴木")
	hash.Add(14, "神崎")

	t.Run("Search", func(t *testing.T) {
		assert.Equal(t, "赤尾", hash.Search(1))
		assert.Equal(t, "神崎", hash.Search(14))
		assert.Nil(t, hash.Search(100))
	})

	t.Run("Add", func(t *testing.T) {
		assert.True(t, hash.Add(100, "山田"))
		assert.Equal(t, "山田", hash.Search(100))
	})

	t.Run("Remove", func(t *testing.T) {
		hash.Add(100, "山田")
		assert.True(t, hash.Remove(100))
		assert.Nil(t, hash.Search(100))
	})

	t.Run("Dump", func(t *testing.T) {
		expected := `0
1   -> 14 (神崎)   -> 1 (赤尾)
2
3
4
5   -> 5 (武田)
6
7
8
9
10   -> 10 (小野)
11
12   -> 12 (鈴木)
`
		assert.Equal(t, expected, hash.Dump())
	})
}

type Node struct {
	Key   interface{}
	Value interface{}
	Next  *Node
}

type ChainedHash struct {
	Capacity int
	Table    []*Node
}

func NewChainedHash(capacity int) *ChainedHash {
	return &ChainedHash{
		Capacity: capacity,
		Table:    make([]*Node, capacity),
	}
}

func (h *ChainedHash) hashValue(key interface{}) int {
	if k, ok := key.(int); ok {
		return k % h.Capacity
	}
	// Add your custom hash function here for non-integer keys
	return 0
}

func (h *ChainedHash) Search(key interface{}) interface{} {
	hash := h.hashValue(key)
	p := h.Table[hash]

	for p != nil {
		if p.Key == key {
			return p.Value
		}
		p = p.Next
	}

	return nil
}

func (h *ChainedHash) Add(key interface{}, value interface{}) bool {
	hash := h.hashValue(key)
	p := h.Table[hash]

	for p != nil {
		if p.Key == key {
			return false
		}
		p = p.Next
	}

	temp := &Node{
		Key:   key,
		Value: value,
		Next:  h.Table[hash],
	}
	h.Table[hash] = temp
	return true
}

func (h *ChainedHash) Remove(key interface{}) bool {
	hash := h.hashValue(key)
	p := h.Table[hash]
	var pp *Node

	for p != nil {
		if p.Key == key {
			if pp == nil {
				h.Table[hash] = p.Next
			} else {
				pp.Next = p.Next
			}
			return true
		}
		pp = p
		p = p.Next
	}

	return false
}

func (h *ChainedHash) Dump() string {
	result := ""
	for i := 0; i < h.Capacity; i++ {
		p := h.Table[i]
		result += fmt.Sprintf("%d", i)
		for p != nil {
			result += fmt.Sprintf("   -> %v (%v)", p.Key, p.Value)
			p = p.Next
		}
		result += "\n"
	}
	return result
}

func TestOpenHash_Search(t *testing.T) {
	hash := NewOpenHash(13)
	hash.Add(1, "赤尾")
	assert.Equal(t, "赤尾", hash.Search(1))
}

func TestOpenHash_Add(t *testing.T) {
	hash := NewOpenHash(13)
	hash.Add(100, "山田")
	assert.Equal(t, "山田", hash.Search(100))
}

func TestOpenHash_Remove(t *testing.T) {
	hash := NewOpenHash(13)
	hash.Remove(100)
	assert.Equal(t, nil, hash.Search(100))
}

func TestOpenHash_Dump(t *testing.T) {
	hash := NewOpenHash(13)
	hash.Add(1, "赤尾")
	hash.Add(5, "武田")
	hash.Add(10, "小野")
	hash.Add(12, "鈴木")
	hash.Add(14, "神崎")

	expected := ` 0 -- 未登録 --
 1 1 (赤尾)
 2 14 (神崎)
 3 -- 未登録 --
 4 -- 未登録 --
 5 5 (武田)
 6 -- 未登録 --
 7 -- 未登録 --
 8 -- 未登録 --
 9 -- 未登録 --
10 10 (小野)
11 -- 未登録 --
12 12 (鈴木)
`
	assert.Equal(t, expected, hash.Dump())
}

type Status int

const (
	OCCUPIED Status = iota
	EMPTY
	DELETED
)

type Bucket struct {
	key   interface{}
	value interface{}
	stat  Status
}

func NewBucket(key, value interface{}, stat Status) *Bucket {
	return &Bucket{
		key:   key,
		value: value,
		stat:  stat,
	}
}

type OpenHash struct {
	capacity int
	table    []*Bucket
}

func NewOpenHash(capacity int) *OpenHash {
	table := make([]*Bucket, capacity)
	for i := 0; i < capacity; i++ {
		table[i] = NewBucket(nil, nil, EMPTY)
	}
	return &OpenHash{
		capacity: capacity,
		table:    table,
	}
}

func (h *OpenHash) hashValue(key interface{}) int {
	switch k := key.(type) {
	case int:
		return k % h.capacity
	case string:
		bytes := md5.Sum([]byte(k))
		hash := fmt.Sprintf("%x", bytes)
		hashInt, _ := strconv.ParseInt(hash, 16, 64)
		return int(hashInt) % h.capacity
	default:
		return 0
	}
}

func (h *OpenHash) rehashValue(key interface{}) int {
	hash := h.hashValue(key)
	return (hash + 1) % h.capacity
}

func (h *OpenHash) searchNode(key interface{}) *Bucket {
	hash := h.hashValue(key)
	p := h.table[hash]
	for i := 0; i < h.capacity; i++ {
		if p.stat == EMPTY {
			break
		} else if p.stat == OCCUPIED && p.key == key {
			return p
		}
		hash = h.rehashValue(hash)
		p = h.table[hash]
	}
	return nil
}

func (h *OpenHash) Search(key interface{}) interface{} {
	p := h.searchNode(key)
	if p != nil {
		return p.value
	} else {
		return nil
	}
}

func (h *OpenHash) Add(key, value interface{}) bool {
	if h.Search(key) != nil {
		return false
	}

	hash := h.hashValue(key)
	p := h.table[hash]
	for i := 0; i < h.capacity; i++ {
		if p.stat == EMPTY || p.stat == DELETED {
			h.table[hash] = NewBucket(key, value, OCCUPIED)
			return true
		}
		hash = h.rehashValue(hash)
		p = h.table[hash]
	}
	return false
}

func (h *OpenHash) Remove(key interface{}) bool {
	p := h.searchNode(key)
	if p == nil {
		return false
	}
	p.stat = DELETED
	return true
}

func (h *OpenHash) Dump() string {
	result := ""
	for i := 0; i < h.capacity; i++ {
		result += fmt.Sprintf("%2d ", i)
		switch h.table[i].stat {
		case OCCUPIED:
			result += fmt.Sprintf("%v (%v)", h.table[i].key, h.table[i].value)
		case EMPTY:
			result += "-- 未登録 --"
		case DELETED:
			result += "-- 削除ずみ --"
		}
		result += "\n"
	}
	return result
}
