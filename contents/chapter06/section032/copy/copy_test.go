package _copy

import (
	"reflect"
	"testing"
)

func TestCopy(t *testing.T) {
	dst := []int{1, 2, 3, 4}
	src := []int{5, 6, 7}

	count := copy(dst[2:], src)

	expected := []int{1, 2, 5, 6}
	if !reflect.DeepEqual(dst, expected) {
		t.Errorf("Expected dst to be %v, but got %v", expected, dst)
	}

	if count != 2 {
		t.Errorf("Expected count to be %d, but got %d", len(src), count)
	}
}
