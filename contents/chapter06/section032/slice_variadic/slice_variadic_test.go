package slice_variadic

import (
	"reflect"
	"testing"
)

func TestVariadicFunction(t *testing.T) {
	test := func(s ...string) []string {
		return s
	}

	s := []string{"a", "b", "c"}

	actual := test(s...)
	expected := []string{"a", "b", "c"}
	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected s to be %v, but got %v", expected, actual)
	}

	actual = test("a", "b", "c")
	expected = []string{"a", "b", "c"}
	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected s to be %v, but got %v", expected, actual)
	}
}
