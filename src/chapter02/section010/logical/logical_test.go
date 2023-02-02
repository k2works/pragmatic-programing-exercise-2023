package main

import "testing"

func Test_main(t *testing.T) {
	expected := true
	actual := true

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = false
	actual = true && false

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = false
	actual = false && true

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = false
	actual = false

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = true
	actual = true || false

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = true
	actual = false || true

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = false
	actual = false

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = false
	actual = !true

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	expected = true
	actual = !false

	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}
}
