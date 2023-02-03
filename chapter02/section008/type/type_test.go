package _type

import "testing"

func TestMyIntegerFunc(t *testing.T) {
	var expectedAnswer myInteger = 124
	answer := myIntegerFunc()

	if answer != expectedAnswer {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", answer, expectedAnswer)
	}
}

func TestMyStructFunc(t *testing.T) {
	s := myStructFunc()
	if s.a != 1 || s.b != 2 {
		t.Error("Expected values to be {1,2}, got {s.a, s.b}")
	}
}
