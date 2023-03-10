package slice

import (
	"reflect"
	"testing"
)

func TestArrayToSlice(t *testing.T) {
	x := [5]string{"a", "b", "c", "d", "e"}

	var s1 []string

	s1 = x[:]
	if !reflect.DeepEqual(s1, []string{"a", "b", "c", "d", "e"}) {
		t.Errorf("expected s1 to be %v, got %v", []string{"a", "b", "c", "d", "e"}, s1)
	}

	s2 := x[1:4]
	if !reflect.DeepEqual(s2, []string{"b", "c", "d"}) {
		t.Errorf("expected s2 to be %v, got %v", []string{"b", "c", "d"}, s2)
	}

	s3 := x[3:]
	if !reflect.DeepEqual(s3, []string{"d", "e"}) {
		t.Errorf("expected s3 to be %v, got %v", []string{"d", "e"}, s3)
	}

	s4 := x[:4]
	if !reflect.DeepEqual(s4, []string{"a", "b", "c", "d"}) {
		t.Errorf("expected s4 to be %v, got %v", []string{"a", "b", "c", "d"}, s4)
	}
}
