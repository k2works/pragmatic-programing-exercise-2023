// 単純挿入ソート

package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBubbleSort(t *testing.T) {
	// バブルソート
	a := []int{6, 4, 3, 7, 1, 9, 8}
	bubbleSort(a)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, a)

	// バブルソート（ソート過程を表示）
	b := []int{6, 4, 3, 7, 1, 9, 8}
	bubbleSortVerbose(b)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, b)

	// バブルソート（交換回数による打ち切り）
	c := []int{6, 4, 3, 7, 1, 9, 8}
	bubbleSort2(c)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, c)

	// バブルソート（捜査範囲の限定）
	d := []int{6, 4, 3, 7, 1, 9, 8}
	bubbleSort3(d)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, d)

	// シェーカーソート（双方向バブルソート）
	e := []int{6, 4, 3, 7, 1, 9, 8}
	shakerSort(e)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, e)
}

func bubbleSort(a []int) {
	n := len(a)
	for i := 0; i < n-1; i++ {
		for j := n - 1; j > i; j-- {
			if a[j-1] > a[j] {
				a[j-1], a[j] = a[j], a[j-1]
			}
		}
	}
}

func bubbleSortVerbose(a []int) {
	ccnt := 0 // 比較回数
	scnt := 0 // 交換回数
	n := len(a)
	for i := 0; i < n-1; i++ {
		println("パス", i+1)
		for j := n - 1; j > i; j-- {
			for m := 0; m < n-1; m++ {
				if m != j-1 {
					print(a[m], "  ")
				} else {
					if a[j-1] > a[j] {
						print(a[m], " +")
					} else {
						print(a[m], " -")
					}
				}
			}
			println(a[n-1])
			ccnt++
			if a[j-1] > a[j] {
				scnt++
				a[j-1], a[j] = a[j], a[j-1]
			}
			for m := 0; m < n-1; m++ {
				print(a[m], "  ")
			}
			println(a[n-1])
		}
		println("比較は", ccnt, "回でした。")
		println("比較は", scnt, "回でした。")
	}
}

func bubbleSort2(a []int) {
	n := len(a)
	for i := 0; i < n-1; i++ {
		exchng := 0 // パスにおける交換回数
		for j := n - 1; j > i; j-- {
			if a[j-1] > a[j] {
				a[j-1], a[j] = a[j], a[j-1]
				exchng++
			}
		}
		if exchng == 0 {
			break
		}
	}
}

func bubbleSort3(a []int) {
	n := len(a)
	k := 0
	for k < n-1 {
		last := n - 1
		for j := n - 1; j > k; j-- {
			if a[j-1] > a[j] {
				a[j-1], a[j] = a[j], a[j-1]
				last = j
			}
		}
		k = last
	}
}

func shakerSort(a []int) {
	left := 0
	right := len(a) - 1
	last := right
	for left < right {
		for j := right; j > left; j-- {
			if a[j-1] > a[j] {
				a[j-1], a[j] = a[j], a[j-1]
				last = j
			}
		}
		left = last

		for j := left; j < right; j++ {
			if a[j] > a[j+1] {
				a[j], a[j+1] = a[j+1], a[j]
				last = j
			}
		}
		right = last
	}
}

// 単純選択ソート

func TestSort(t *testing.T) {
	a := []int{6, 4, 3, 7, 1, 9, 8}

	selectionSort(a)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, a)

	insertionSort(a)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, a)

	binaryInsertionSort(a)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, a)

	binaryInsertionSort2(a)
	assert.Equal(t, []int{1, 3, 4, 6, 7, 8, 9}, a)
}

func selectionSort(a []int) {
	n := len(a)
	for i := 0; i < n-1; i++ {
		min := i
		for j := i + 1; j < n; j++ {
			if a[j] < a[min] {
				min = j
			}
		}
		a[i], a[min] = a[min], a[i]
	}
}

func insertionSort(a []int) {
	n := len(a)
	for i := 1; i < n; i++ {
		j := i
		tmp := a[i]
		for j > 0 && a[j-1] > tmp {
			a[j] = a[j-1]
			j--
		}
		a[j] = tmp
	}
}

func binaryInsertionSort(a []int) {
	n := len(a)
	for i := 1; i < n; i++ {
		key := a[i]
		pl := 0
		pr := i - 1

		var pc int
		for pc = (pl + pr) / 2; pl <= pr; pc = (pl + pr) / 2 {
			if a[pc] == key {
				break
			} else if a[pc] < key {
				pl = pc + 1
			} else {
				pr = pc - 1
			}
		}
		pd := pc + 1
		for j := i; j > pd; j-- {
			a[j] = a[j-1]
		}
		a[pd] = key
	}
}

func binaryInsertionSort2(a []int) {
	for i := 1; i < len(a); i++ {
		bisectInsert(a, i)
	}
}

func bisectInsert(a []int, i int) {
	low := 0
	high := i - 1
	for low <= high {
		mid := (low + high) / 2
		if a[i] < a[mid] {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	for j := i; j > low; j-- {
		a[j] = a[j-1]
	}
	a[low] = a[i]
}

// シェルソート
func TestShellSort(t *testing.T) {
	testCases := []struct {
		name   string
		input  []int
		output []int
	}{
		{
			name:   "ShellSort",
			input:  []int{6, 4, 3, 7, 1, 9, 8},
			output: []int{1, 3, 4, 6, 7, 8, 9},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			assert.Equal(t, tc.output, shellSort(tc.input))
		})
	}
}

func shellSort(a []int) []int {
	n := len(a)
	h := n / 2
	for h > 0 {
		for i := h; i < n; i++ {
			j := i - h
			tmp := a[i]
			for j >= 0 && a[j] > tmp {
				a[j+h] = a[j]
				j -= h
			}
			a[j+h] = tmp
		}
		h /= 2
	}
	return a
}

// クイックソート

func TestQuickSort(t *testing.T) {
	testCases := []struct {
		name   string
		input  []int
		output []int
	}{
		{
			name:   "QuickSort",
			input:  []int{6, 4, 3, 7, 1, 9, 8},
			output: []int{1, 3, 4, 6, 7, 8, 9},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := make([]int, len(tc.input))
			copy(a, tc.input)
			quickSort(a)
			assert.Equal(t, tc.output, a)
		})
	}
}

func partition(a []int) {
	n := len(a)
	pl := 0     // 左カーソル
	pr := n - 1 // 右カーソル
	x := a[n/2] // 枢軸（中央の要素）

	for pl <= pr {
		for a[pl] < x {
			pl++
		}
		for a[pr] > x {
			pr--
		}
		if pl <= pr {
			a[pl], a[pr] = a[pr], a[pl]
			pl++
			pr--
		}
	}

	// 結果を出力
}

func qsort(a []int, left int, right int) {
	pl := left             // 左カーソル
	pr := right            // 右カーソル
	x := a[(left+right)/2] // 枢軸（中央の要素）

	for pl <= pr {
		for a[pl] < x {
			pl++
		}
		for a[pr] > x {
			pr--
		}
		if pl <= pr {
			a[pl], a[pr] = a[pr], a[pl]
			pl++
			pr--
		}
	}

	if left < pr {
		qsort(a, left, pr)
	}
	if pl < right {
		qsort(a, pl, right)
	}
}

func quickSort(a []int) {
	qsort(a, 0, len(a)-1)
}

// マージソート

func TestMergeSort(t *testing.T) {
	testCases := []struct {
		name   string
		input  []int
		output []int
	}{
		{
			name:   "MergeSort",
			input:  []int{5, 8, 4, 2, 6, 1, 3, 9, 7},
			output: []int{1, 2, 3, 4, 5, 6, 7, 8, 9},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := make([]int, len(tc.input))
			copy(a, tc.input)
			mergeSort(a)
			assert.Equal(t, tc.output, a)
		})
	}
}

func mergeSort(a []int) {
	n := len(a)
	if n <= 1 {
		return
	}
	m := n / 2
	mergeSort(a[:m])
	mergeSort(a[m:])
	b := make([]int, n)
	copy(b, a)
	merge(a, b[:m], b[m:])
}

func merge(a []int, b []int, c []int) {
	p, q, r := 0, 0, 0
	n, m := len(b), len(c)
	for p < n && q < m {
		if b[p] <= c[q] {
			a[r] = b[p]
			p++
		} else {
			a[r] = c[q]
			q++
		}
		r++
	}
	if p == n {
		for i := q; i < m; i++ {
			a[r] = c[i]
			r++
		}
	} else {
		for i := p; i < n; i++ {
			a[r] = b[i]
			r++
		}
	}
}

// ヒープソート

func TestHeapSort(t *testing.T) {
	testCases := []struct {
		name   string
		input  []int
		output []int
	}{
		{
			name:   "HeapSort",
			input:  []int{6, 4, 3, 7, 1, 9, 8},
			output: []int{1, 3, 4, 6, 7, 8, 9},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := make([]int, len(tc.input))
			copy(a, tc.input)
			heapSort(a)
			assert.Equal(t, tc.output, a)
		})
	}
}

func downHeap(a []int, left int, right int) {
	temp := a[left] // 根

	parent := left
	for parent < (right+1)/2 {
		cl := parent*2 + 1 // 左の子
		cr := cl + 1       // 右の子
		child := cl
		if cr <= right && a[cr] > a[cl] {
			child = cr // 大きいほう
		}
		if temp >= a[child] {
			break
		}
		a[parent] = a[child]
		parent = child
	}
	a[parent] = temp
}

func heapSort(a []int) {
	n := len(a)

	for i := (n - 1) / 2; i >= 0; i-- {
		downHeap(a, i, n-1)
	}

	for i := n - 1; i > 0; i-- {
		a[0], a[i] = a[i], a[0] // 最大要素と未ソート部末尾要素を交換
		downHeap(a, 0, i-1)     // a[0]～a[i-1]をヒープ化
	}
}

// 度数ソート

func TestCountingSort(t *testing.T) {
	testCases := []struct {
		name   string
		input  []int
		output []int
	}{
		{
			name:   "CountingSort",
			input:  []int{22, 5, 11, 32, 120, 68, 70},
			output: []int{5, 11, 22, 32, 68, 70, 120},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := make([]int, len(tc.input))
			copy(a, tc.input)
			countingSort(a)
			assert.Equal(t, tc.output, a)
		})
	}
}

func countingSort(a []int) {
	maxValue := findMaxValue(a)
	n := len(a)
	f := make([]int, maxValue+1) // 累積度数
	b := make([]int, n)          // 作業用目的配列

	for i := 0; i < n; i++ { // 各要素の度数をカウント
		f[a[i]]++
	}

	for i := 1; i <= maxValue; i++ { // 累積度数を計算
		f[i] += f[i-1]
	}

	for i := n - 1; i >= 0; i-- { // 各要素を作業用配列に格納
		f[a[i]]--
		b[f[a[i]]] = a[i]
	}

	for i := 0; i < n; i++ { // 作業用配列をaに移動
		a[i] = b[i]
	}
}

func findMaxValue(a []int) int {
	max := a[0]
	for _, num := range a {
		if num > max {
			max = num
		}
	}
	return max
}
