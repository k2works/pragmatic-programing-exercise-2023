package function

import "testing"

func TestPlus(t *testing.T) {
	result := plus(1, 2)
	expected := 3
	if result != expected {
		t.Errorf("Expected %d, but got %d", expected, result)
	}
}
