package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

// データ構造と配列
func TestTotal(t *testing.T) {
	expected := "318,63.6"

	assert.Equal(t, expected, total(32, 68, 72, 54, 92))
}

func total(tensu1, tensu2, tensu3, tensu4, tensu5 int) string {
	total := tensu1 + tensu2 + tensu3 + tensu4 + tensu5
	average := float64(total) / 5
	return fmt.Sprintf("%d,%.1f", total, average)
}

// 配列
// シーケンスの要素の最大値を表示する

func TestMaxOf(t *testing.T) {
	expected := 192

	assert.Equal(t, expected, MaxOf([]int{172, 153, 192, 140, 165}))
}

func MaxOf(a []int) int {
	maximum := a[0]
	for _, num := range a {
		if num > maximum {
			maximum = num
		}
	}
	return maximum
}

// ミュータブルなシーケンスの要素の並びを反転
func TestReverseArray(t *testing.T) {
	a := []int{2, 5, 1, 3, 9, 6, 7}
	reverseArray(a)
	expected := []int{7, 6, 9, 3, 1, 5, 2}

	assert.Equal(t, expected, a)
}

func reverseArray(a []int) {
	n := len(a)
	for i := 0; i < n/2; i++ {
		a[i], a[n-i-1] = a[n-i-1], a[i]
	}
}

func TestCardConv(t *testing.T) {
	assert.Equal(t, "111011", cardConv(59, 2))
	assert.Equal(t, "73", cardConv(59, 8))
	assert.Equal(t, "3B", cardConv(59, 16))
}

func cardConv(x, r int) string {
	d := ""
	dchar := "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	for x > 0 {
		d += string(dchar[x%r])
		x /= r
	}

	// Reverse the string
	n := len(d)
	reversed := make([]byte, n)
	for i := 0; i < n; i++ {
		reversed[i] = d[n-i-1]
	}

	return string(reversed)
}

func TestChange(t *testing.T) {
	x := []int{11, 22, 33, 44, 55}
	change(x, 2, 99)
	expected := []int{11, 22, 99, 44, 55}

	assert.Equal(t, expected, x)
}

func change(lst []int, idx, val int) {
	lst[idx] = val
}

// 素数の列挙
func TestPrime1(t *testing.T) {
	expected := 78022
	assert.Equal(t, expected, prime1(1000))
}

func prime1(x int) int {
	counter := 0
	for n := 2; n <= x; n++ {
		for i := 2; i < n; i++ {
			counter++
			if n%i == 0 {
				break
			}
		}
	}
	return counter
}

func TestPrime2(t *testing.T) {
	expected := 38678
	assert.Equal(t, expected, prime2(1000))
}

func prime2(x int) int {
	counter := 0
	ptr := 0
	prime := make([]int, 500)

	prime[ptr] = 2
	ptr++

	for n := 3; n <= x; n += 2 {
		for i := 1; i < ptr; i++ {
			counter++
			if n%prime[i] == 0 {
				break
			}
		}
		prime[ptr] = n
		ptr++
	}

	for i := 0; i < ptr; i++ {
		fmt.Println(prime[i])
	}
	fmt.Printf("counter: %d\n", counter)

	return counter
}

func TestPrime3(t *testing.T) {
	expected := 5200
	assert.Equal(t, expected, prime3(1000))
}

func prime3(x int) int {
	counter := 0
	ptr := 0
	prime := make([]int, 500)

	prime[ptr] = 2
	ptr++
	prime[ptr] = 3
	ptr++

	for n := 5; n <= x; n += 2 {
		i := 1
		for prime[i]*prime[i] <= n {
			counter += 2
			if n%prime[i] == 0 {
				break
			}
			i++
		}
		prime[ptr] = n
		ptr++
		counter++
	}

	for i := 0; i < ptr; i++ {
		fmt.Println(prime[i])
	}
	fmt.Printf("counter: %d\n", counter)

	return counter
}
