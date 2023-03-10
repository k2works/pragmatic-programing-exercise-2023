package literal

import "testing"

func TestArrays(t *testing.T) {
	array1 := [5]float32{}
	if len(array1) != 5 {
		t.Errorf("Expected length of array1 to be 5, but got %d", len(array1))
	}

	array2 := [6]int{1, 2, 3, 4}
	if len(array2) != 6 {
		t.Errorf("Expected length of array2 to be 6, but got %d", len(array2))
	}
	expectedValues := []int{1, 2, 3, 4, 0, 0}
	for i, v := range array2 {
		if v != expectedValues[i] {
			t.Errorf("Expected array2[%d] to be %d, but got %d", i, expectedValues[i], v)
		}
	}

	array3 := [...]string{"One", "Two", "Three"}
	if len(array3) != 3 {
		t.Errorf("Expected length of array3 to be 3, but got %d", len(array3))
	}
	expectedStrings := []string{"One", "Two", "Three"}
	for i, v := range array3 {
		if v != expectedStrings[i] {
			t.Errorf("Expected array3[%d] to be %s, but got %s", i, expectedStrings[i], v)
		}
	}
}
