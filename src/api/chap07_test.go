// 文字列検索

// 力まかせ法

package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBFMatch(t *testing.T) {
	testCases := []struct {
		name     string
		text     string
		pattern  string
		expected int
	}{
		{
			name:     "Exact match",
			text:     "ABC",
			pattern:  "ABC",
			expected: 0,
		},
		{
			name:     "No match",
			text:     "ABC",
			pattern:  "ABD",
			expected: -1,
		},
		{
			name:     "Partial match",
			text:     "ABC",
			pattern:  "ABABC",
			expected: -1,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := bfMatch(tc.text, tc.pattern)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func bfMatch(text, pattern string) int {
	pt := 0 // textをなぞるカーソル
	pp := 0 // patternをなぞるカーソル

	for pt != len(text) && pp != len(pattern) {
		if text[pt] == pattern[pp] {
			pt++
			pp++
		} else {
			pt = pt - pp + 1
			pp = 0
		}
	}

	if pp == len(pattern) {
		return pt - pp
	}

	return -1
}

// KMP法

func TestKMPMatch(t *testing.T) {
	testCases := []struct {
		name     string
		text     string
		pattern  string
		expected int
	}{
		{
			name:     "Exact match",
			text:     "ABC",
			pattern:  "ABC",
			expected: 0,
		},
		{
			name:     "No match",
			text:     "ABC",
			pattern:  "ABD",
			expected: -1,
		},
		{
			name:     "Partial match",
			text:     "ABC",
			pattern:  "ABABC",
			expected: -1,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := kmpMatch(tc.text, tc.pattern)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func kmpMatch(text, pattern string) int {
	pr := 1                             // textをなぞるカーソル
	pt := 0                             // patternをなぞるカーソル
	skip := make([]int, len(pattern)+1) // スキップテーブル

	// スキップテーブルの作成
	skip[pr] = 0
	for pr != len(pattern) {
		if pattern[pr] == pattern[pt] {
			pr++
			pt++
			skip[pr] = pt
			continue
		}

		if pt == 0 {
			pr++
			skip[pr] = pt
		} else {
			pt = skip[pt]
		}
	}

	// 探索
	pt = 0
	pr = 0
	for pt != len(text) && pr != len(pattern) {
		if text[pt] == pattern[pr] {
			pt++
			pr++
		} else if pr == 0 {
			pt++
		} else {
			pr = skip[pr]
		}
	}

	if pr == len(pattern) {
		return pt - pr
	}

	return -1
}

// Boyer-Moore法
func TestBmMatch(t *testing.T) {
	assert.Equal(t, 0, bmMatch("ABC", "ABC"))
	assert.Equal(t, -1, bmMatch("ABC", "ABD"))
	assert.Equal(t, -1, bmMatch("ABC", "ABABC"))
}

func bmMatch(txt, pat string) int {
	skip := make([]int, 256) // スキップテーブル

	for pt := 0; pt < 256; pt++ {
		skip[pt] = len(pat)
	}
	for pt := 0; pt < len(pat); pt++ {
		skip[int(pat[pt])] = len(pat) - pt - 1
	}

	pt := len(pat) - 1
	for pt < len(txt) {
		pp := len(pat) - 1
		for txt[pt] == pat[pp] {
			if pp == 0 {
				return pt
			}
			pt--
			pp--
		}
		pt += max(skip[int(txt[pt])], len(pat)-pp)
	}

	return -1
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
