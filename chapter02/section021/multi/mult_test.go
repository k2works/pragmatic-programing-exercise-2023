package multi

import "testing"

func TestCalc(t *testing.T) {
	add, sub, mul, div := calc(1, 2)
	expectedAdd := 3
	expectedSub := -1
	expectedMul := 2
	var expectedDiv float32 = 0.5

	if add != expectedAdd {
		t.Errorf("Expected %d, but got %d", expectedAdd, add)
	}

	if sub != expectedSub {
		t.Errorf("Expected %d, but got %d", expectedSub, sub)
	}

	if mul != expectedMul {
		t.Errorf("Expected %d, but got %d", expectedMul, mul)
	}

	if div != expectedDiv {
		t.Errorf("Expected %f, but got %f", expectedDiv, div)
	}
}
