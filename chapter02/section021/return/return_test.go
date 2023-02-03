package _return

import (
	"testing"
)

func TestCalc(t *testing.T) {
	a := 10
	b := 5

	expectedAdd := a + b
	expectedSub := a - b
	expectedMul := a * b
	expectedDiv := float32(a) / float32(b)

	add, sub, mul, div := calc(a, b)

	if add != expectedAdd {
		t.Errorf("Expected add result to be %d but got %d", expectedAdd, add)
	}
	if sub != expectedSub {
		t.Errorf("Expected sub result to be %d but got %d", expectedSub, sub)
	}
	if mul != expectedMul {
		t.Errorf("Expected mul result to be %d but got %d", expectedMul, mul)
	}
	if div != expectedDiv {
		t.Errorf("Expected div result to be %f but got %f", expectedDiv, div)
	}
}
