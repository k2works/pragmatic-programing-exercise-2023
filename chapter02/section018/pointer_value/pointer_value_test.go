package pointer_value

import "testing"

// TestDouble verifies that double function multiplies two numbers correctly
func TestDouble(t *testing.T) {
	x := 5
	y := 10
	double(x, &y)
	if x != 5 || y != 20 {
		t.Error("double does not do multiplication correctly")
	}
}
