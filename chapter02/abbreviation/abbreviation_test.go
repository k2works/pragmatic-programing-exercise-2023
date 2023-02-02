package main

import "testing"

func TestAbbreviation(t *testing.T) {
	a, b := 1, 2
	a, b, c := 3, 4, 5
	if a != 3 || b != 4 || c != 5 {
		t.Errorf("a = %d, b = %d, c = %d; want 3, 4, 5", a, b, c)
	}
}
