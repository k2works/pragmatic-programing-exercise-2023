package main

import "testing"

func TestMain(t *testing.T) {
	expected := "Hello, World!"
	actual := greeting()
	if actual != expected {
		t.Errorf("Test failed, expected: '%s', got:  '%s'", expected, actual)
	}
}
