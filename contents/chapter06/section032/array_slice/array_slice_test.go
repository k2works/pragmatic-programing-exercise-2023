package array_slice

import "testing"

func TestDouble(t *testing.T) {
	values := []int{1, 2, 3, 4, 5}
	double(values)
	expected := []int{2, 4, 6, 8, 10}
	for i := 0; i < len(values); i++ {
		if values[i] != expected[i] {
			t.Errorf("Expected value at index %d to be %d, but got %d", i, expected[i], values[i])
		}
	}
}
