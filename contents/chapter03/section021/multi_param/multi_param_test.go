package multi_param

import "testing"

func TestF1AndF2(t *testing.T) {
	a, b, c := f1()
	expectedA := 0
	expectedB := "xyz"
	var expectedC float32 = 3.14

	if a != expectedA {
		t.Errorf("Expected a to be %d, but got %d", expectedA, a)
	}
	if b != expectedB {
		t.Errorf("Expected b to be %s, but got %s", expectedB, b)
	}
	if c != expectedC {
		t.Errorf("Expected c to be %f, but got %f", expectedC, c)
	}

	f2(a, b, c)
	// Check the output of the function call to f2, to see if it matches the expected values
}
