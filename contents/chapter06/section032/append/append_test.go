package _append

import (
	"reflect"
	"testing"
)

func TestAppend(t *testing.T) {
	s1 := []int{1, 2, 3, 4}
	s2 := append(s1, 5, 6)
	s3 := append(s2, s1...)

	expected := []int{1, 2, 3, 4, 5, 6, 1, 2, 3, 4}
	if !reflect.DeepEqual(s3, expected) {
		t.Errorf("Expected s3 to be %v, but got %v", expected, s3)
	}
}

func TestAppendBytes(t *testing.T) {
	var b1 []byte

	b1 = append(b1, "abc"...)

	expected := []byte{'a', 'b', 'c'}
	if !reflect.DeepEqual(b1, expected) {
		t.Errorf("Expected b1 to be %v, but got %v", expected, b1)
	}
}
