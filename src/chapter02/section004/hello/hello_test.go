package hello

import "testing"

func TestGreeting(t *testing.T) {
	expected := "Hello, World!"
	actual := Greeting()
	if actual != expected {
		t.Errorf("Test failed, expected: '%s', got:  '%s'", expected, actual)
	}
}
