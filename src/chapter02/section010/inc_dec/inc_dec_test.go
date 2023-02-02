package inc_dec

import "testing"

func Test_main(t *testing.T) {
	var inc int = 0
	inc++

	expected := 1
	actual := inc
	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	var dec int = 0
	dec--

	expected = -1
	actual = dec
	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}
}
