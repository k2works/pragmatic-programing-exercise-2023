// 非負の整数の階乗値を求める

package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFactorial(t *testing.T) {
	assert.Equal(t, 6, factorial(3))
}

func factorial(n int) int {
	if n > 0 {
		return n * factorial(n-1)
	} else {
		return 1
	}
}

// ユークリッドの互除法によって最大公約数を求める

func TestGcd(t *testing.T) {
	assert.Equal(t, 2, gcd(22, 8))
}

func gcd(x, y int) int {
	if y == 0 {
		return x
	} else {
		return gcd(y, x%y)
	}
}

// 真に再帰的な関数
func TestRecur(t *testing.T) {
	expected1 := []int{1, 2, 3, 1, 4, 1, 2}
	assert.Equal(t, expected1, recure(4, []int{}))

	expected2 := []int{1, 2, 3, 1, 4, 1, 2}
	assert.Equal(t, expected2, recure2(4, []int{}))

	expected3 := []int{1, 2, 3, 1, 4, 1, 2}
	assert.Equal(t, expected3, recure3(4, []int{}))
}

type Stack2 struct {
	stack []int
}

func NewStack2() *Stack2 {
	return &Stack2{stack: make([]int, 0)}
}

func (s *Stack2) Push2(value int) {
	s.stack = append(s.stack, value)
}

func (s *Stack2) Pop2() int {
	value := s.stack[len(s.stack)-1]
	s.stack = s.stack[:len(s.stack)-1]
	return value
}

func (s *Stack2) IsEmpty2() bool {
	return len(s.stack) == 0
}

func recure(n int, list []int) []int {
	if n > 0 {
		list = recure(n-1, list)
		list = append(list, n)
		list = recure(n-2, list)
	}

	return list
}

func recure2(n int, list []int) []int {
	for n > 0 {
		list = recure2(n-1, list)
		list = append(list, n)
		n = n - 2
	}

	return list
}

func recure3(n int, list []int) []int {
	s := NewStack2()

	for {
		if n > 0 {
			s.Push2(n)
			n = n - 1
			continue
		}
		if !s.IsEmpty2() {
			n = s.Pop2()
			list = append(list, n)
			n = n - 2
			continue
		}
		break
	}

	return list
}

// ハノイの塔

func TestMove(t *testing.T) {
	expected := []string{
		"円盤[1]を1軸から3軸へ移動",
		"円盤[2]を1軸から2軸へ移動",
		"円盤[1]を3軸から2軸へ移動",
		"円盤[3]を1軸から3軸へ移動",
		"円盤[1]を2軸から1軸へ移動",
		"円盤[2]を2軸から3軸へ移動",
		"円盤[1]を1軸から3軸へ移動",
	}
	actual := move(3, 1, 3, []string{})
	assert.Equal(t, expected, actual)
}

func move(n, from, to int, list []string) []string {
	if n > 0 {
		list = move(n-1, from, 6-from-to, list)
		list = append(list, fmt.Sprintf("円盤[%d]を%d軸から%d軸へ移動", n, from, to))
		list = move(n-1, 6-from-to, to, list)
	}

	return list
}

// 8王妃問題
func TestEightQueen(t *testing.T) {
	eightQueen := NewEightQueen()

	// 各列に1個の王妃を配置する組み合わせを再帰的に列挙
	eightQueen.Set(0)
	assert.Equal(t, 16777216, len(eightQueen.Result))

	// 各行各列に1個の王妃を配置する組合せを再帰的に列挙
	eightQueen.Set2(0)
	assert.Equal(t, 16817536, len(eightQueen.Result))

	// 8王妃問題を解くプログラム
	eightQueen.Set3(0)
	assert.Equal(t, 16817628, len(eightQueen.Result))
}

type EightQueen struct {
	Result [][]int
	pos    []int
	flag   []bool
	flagA  []bool
	flagB  []bool
	flagC  []bool
}

func NewEightQueen() *EightQueen {
	return &EightQueen{
		Result: [][]int{},
		pos:    make([]int, 8),
		flag:   make([]bool, 8),
		flagA:  make([]bool, 8),
		flagB:  make([]bool, 15),
		flagC:  make([]bool, 15),
	}
}

func (eq *EightQueen) put() {
	row := make([]int, 8)
	copy(row, eq.pos)
	eq.Result = append(eq.Result, row)
}

func (eq *EightQueen) put2() {
	for j := 0; j < 8; j++ {
		for i := 0; i < 8; i++ {
			if eq.pos[i] == j {
				print("■")
			} else {
				print("□")
			}
		}
		println()
	}
	println()
}

func (eq *EightQueen) Set(i int) {
	for j := 0; j < 8; j++ {
		eq.pos[i] = j
		if i == 7 {
			eq.put()
		} else {
			eq.Set(i + 1)
		}
	}
}

func (eq *EightQueen) Set2(i int) {
	for j := 0; j < 8; j++ {
		if !eq.flag[j] {
			eq.pos[i] = j
			if i == 7 {
				eq.put()
			} else {
				eq.flag[j] = true
				eq.Set2(i + 1)
				eq.flag[j] = false
			}
		}
	}
}

func (eq *EightQueen) Set3(i int) {
	for j := 0; j < 8; j++ {
		if !eq.flagA[j] && !eq.flagB[i+j] && !eq.flagC[i-j+7] {
			eq.pos[i] = j
			if i == 7 {
				eq.put()
				eq.put2()
			} else {
				eq.flagA[j] = true
				eq.flagB[i+j] = true
				eq.flagC[i-j+7] = true
				eq.Set3(i + 1)
				eq.flagA[j] = false
				eq.flagB[i+j] = false
				eq.flagC[i-j+7] = false
			}
		}
	}
}
