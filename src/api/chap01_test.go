package main

import (
	"fmt"
	"strconv"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

// 3値の最大値

func TestMax3(t *testing.T) {
	testCases := []struct {
		a, b, c, expected int
	}{
		{3, 2, 1, 3},
		{3, 2, 2, 3},
		{3, 1, 2, 3},
		{3, 2, 3, 3},
		{2, 1, 3, 3},
		{3, 3, 2, 3},
		{3, 3, 3, 3},
		{2, 2, 3, 3},
		{2, 3, 1, 3},
		{2, 3, 2, 3},
		{1, 3, 2, 3},
		{2, 3, 3, 3},
		{1, 2, 3, 3},
	}

	for _, tc := range testCases {
		t.Run("", func(t *testing.T) {
			result := max3(tc.a, tc.b, tc.c)
			assert.Equal(t, tc.expected, result, "max3(%d, %d, %d) should return %d", tc.a, tc.b, tc.c, tc.expected)
		})
	}
}

func max3(a, b, c int) int {
	maximum := a
	if b > maximum {
		maximum = b
	}
	if c > maximum {
		maximum = c
	}
	return maximum
}

// 条件判定と分岐
func TestJudgeSign(t *testing.T) {
	assert := assert.New(t)

	assert.Equal(judgeSign(17), "その値は正です。")
	assert.Equal(judgeSign(-5), "その値は負です。")
	assert.Equal(judgeSign(0), "その値は0です。")
}

func judgeSign(n int) string {
	if n > 0 {
		return "その値は正です。"
	} else if n < 0 {
		return "その値は負です。"
	} else {
		return "その値は0です。"
	}
}

// 繰り返し
func TestSum1ToNWhile(t *testing.T) {
	assert := assert.New(t)

	assert.Equal(sum1ToNWhile(5), 15)
}

func TestSum1ToNFor(t *testing.T) {
	assert := assert.New(t)

	assert.Equal(sum1ToNFor(5), 15)
}

func TestSumGauss(t *testing.T) {
	assert := assert.New(t)

	assert.Equal(sumGauss(5), 15)
}

func sum1ToNWhile(n int) int {
	sum := 0
	i := 1
	for i <= n {
		sum += i
		i += 1
	}
	return sum
}

func sum1ToNFor(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum
}

func sumGauss(n int) int {
	sum := n * (n + 1) / 2
	return sum
}

// 2値のソートと2値の交換
func TestSum(t *testing.T) {
	assert.Equal(t, sum(3, 8), 33)
}

func sum(a int, b int) int {
	if a > b {
		a, b = b, a
	}
	sum := 0
	for i := a; i <= b; i++ {
		sum += i
	}

	return sum
}

// 繰り返しの過程における条件判定（その１）
func TestSumVerbose1(t *testing.T) {
	expected1 := "3 = 3"
	assert.Equal(t, expected1, sumVerbose1(3, 3))

	expected2 := "3 + 4 = 7"
	assert.Equal(t, expected2, sumVerbose1(3, 4))

	expected3 := "3 + 4 + 5 + 6 + 7 = 25"
	assert.Equal(t, expected3, sumVerbose1(3, 7))
}

func TestSumVerbose2(t *testing.T) {
	expected1 := "3 = 3"
	assert.Equal(t, expected1, sumVerbose2(3, 3))

	expected2 := "3 + 4 = 7"
	assert.Equal(t, expected2, sumVerbose2(3, 4))

	expected3 := "3 + 4 + 5 + 6 + 7 = 25"
	assert.Equal(t, expected3, sumVerbose2(3, 7))
}

func sumVerbose1(a, b int) string {
	if a > b {
		a, b = b, a
	}

	sum := 0
	result := ""
	for i := a; i <= b; i++ {
		if i < b {
			result += fmt.Sprintf("%d + ", i)
		} else {
			result += fmt.Sprintf("%d =", i)
		}
		sum += i
	}
	result += fmt.Sprintf(" %d", sum)
	return result
}

func sumVerbose2(a, b int) string {
	if a > b {
		a, b = b, a
	}

	sum := 0
	result := ""
	for i := a; i < b; i++ {
		result += fmt.Sprintf("%d + ", i)
		sum += i
	}
	sum += b
	result += fmt.Sprintf("%d = %d", b, sum)
	return result
}

// 繰返しの過程における条件判定（その２）
func TestAlternative1(t *testing.T) {
	expected := "+-+-+-+-+-+-"
	result := alternative1(12)
	assert.Equal(t, expected, result, "Unexpected result")
}

func TestAlternative2(t *testing.T) {
	expected := "+-+-+-+-+-+-"
	result := alternative2(12)
	assert.Equal(t, expected, result, "Unexpected result")
}

func alternative1(n int) string {
	var result strings.Builder
	for i := 0; i < n; i++ {
		if i%2 == 0 {
			result.WriteRune('+')
		} else {
			result.WriteRune('-')
		}
	}
	return result.String()
}

func alternative2(n int) string {
	var result strings.Builder
	for i := 0; i < n/2; i++ {
		result.WriteString("+-")
	}
	if n%2 == 1 {
		result.WriteRune('+')
	}
	return result.String()
}

// 繰返しの過程における条件判定（その３）
func TestPrintStars(t *testing.T) {
	expected := "*****\n*****\n****\n"

	assert.Equal(t, printStars1(14, 5), expected)
	assert.Equal(t, printStars2(14, 5), expected)
}

func printStars1(n, w int) string {
	var sb strings.Builder
	for i := 0; i < n; i++ {
		sb.WriteByte('*')
		if i%w == w-1 {
			sb.WriteByte('\n')
		}
	}
	if n%w != 0 {
		sb.WriteByte('\n')
	}
	return sb.String()
}

func printStars2(n, w int) string {
	var sb strings.Builder
	for i := 0; i < n/w; i++ {
		sb.WriteString(strings.Repeat("*", w))
		sb.WriteByte('\n')
	}
	rest := n % w
	if rest != 0 {
		sb.WriteString(strings.Repeat("*", rest))
		sb.WriteByte('\n')
	}
	return sb.String()
}

// 正の値の読み込み
func TestSum1ToPositive(t *testing.T) {
	assert.Equal(t, sum_1_to_positive(-6), nil)
	assert.Equal(t, sum_1_to_positive(0), nil)
	assert.Equal(t, sum_1_to_positive(10), 55)
}

func sum_1_to_positive(n int) interface{} {
	/*
	   1からnまでの総和を求める（ｎに正の整数値を読み込む）
	   >>> sum_1_to_positive(10)
	   55
	*/
	if n <= 0 {
		return nil
	}

	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}

	return sum
}

// 辺と面積が整数値である長方形
func TestRectangle(t *testing.T) {
	result := rectangle(32)
	expected := "1x32 2x16 4x8 "
	assert.Equal(t, expected, result)
}

func rectangle(area int) string {
	result := ""
	for i := 1; i <= area; i++ {
		if i*i > area {
			break
		}
		if area%i != 0 {
			continue
		}
		result += strconv.Itoa(i) + "x" + strconv.Itoa(area/i) + " "
	}
	return result
}

func TestSkip(t *testing.T) {
	result1 := skip1()
	expected1 := "1 2 3 4 5 6 7 9 10 11 12"
	assert.Equal(t, expected1, result1)

	result2 := skip2()
	expected2 := "1 2 3 4 5 6 7 9 10 11 12"
	assert.Equal(t, expected2, result2)
}

func skip1() string {
	result := ""
	for i := 1; i <= 12; i++ {
		if i == 8 {
			continue
		}
		result += strconv.Itoa(i) + " "
	}
	return strings.TrimSpace(result)
}

func skip2() string {
	numbers := []int{1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12}
	result := ""
	for _, num := range numbers {
		result += strconv.Itoa(num) + " "
	}
	return strings.TrimSpace(result)
}

// 多重ループ
func TestMultiplicationTable(t *testing.T) {
	expected := `---------------------------
  1  2  3  4  5  6  7  8  9
  2  4  6  8 10 12 14 16 18
  3  6  9 12 15 18 21 24 27
  4  8 12 16 20 24 28 32 36
  5 10 15 20 25 30 35 40 45
  6 12 18 24 30 36 42 48 54
  7 14 21 28 35 42 49 56 63
  8 16 24 32 40 48 56 64 72
  9 18 27 36 45 54 63 72 81
---------------------------`
	result := multiplicationTable()

	if result != expected {
		t.Errorf("Unexpected result:\n%s", result)
	}
}

func multiplicationTable() string {
	/* 九九の表を表示 */
	var sb strings.Builder

	sb.WriteString("---------------------------\n")

	for i := 1; i <= 9; i++ {
		for j := 1; j <= 9; j++ {
			sb.WriteString(fmt.Sprintf("%3d", i*j))
		}
		sb.WriteString("\n")
	}

	sb.WriteString("---------------------------")

	return sb.String()
}

// 直角三角形の表示
func TestTraiangleLb(t *testing.T) {
	expected := `*
**
***
****
*****
`
	assert.Equal(t, expected, traiangleLb(5))
}

func traiangleLb(n int) string {
	var result strings.Builder
	for i := 0; i < n; i++ {
		for j := 0; j <= i; j++ {
			result.WriteString("*")
		}
		result.WriteString("\n")
	}
	return result.String()
}

func TestTriangleRb(t *testing.T) {
	expected := `    *
   **
  ***
 ****
*****
`
	assert.Equal(t, expected, traiangleRb(5))
}

func traiangleRb(n int) string {
	var result strings.Builder
	for i := 0; i < n; i++ {
		for j := 0; j < n-i-1; j++ {
			result.WriteString(" ")
		}
		for j := 0; j <= i; j++ {
			result.WriteString("*")
		}
		result.WriteString("\n")
	}
	return result.String()
}
