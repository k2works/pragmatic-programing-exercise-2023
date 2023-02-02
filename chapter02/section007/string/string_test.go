package string

import (
	"testing"
)

func TestStrResult(t *testing.T) {
	str := concatString()
	if str != "あいう" {
		t.Errorf("Expected str to be 'あいう' but got %s", str)
	}
}

func TestStringLength(t *testing.T) {
	tests := []struct {
		Name   string
		Input  string
		Output int
	}{
		{Name: "Empty string", Input: "", Output: 0},
		{Name: "One character", Input: "a", Output: 1},
		{Name: "Two characters", Input: "ab", Output: 2},
		{Name: "Ten characters", Input: "0123456789", Output: 10},
	}
	for _, test := range tests {
		t.Run(test.Name, func(t *testing.T) {
			res := stringLength(test.Input)
			if res != test.Output {
				t.Errorf("Expected length %d. Got %d.", test.Output, res)
			}
		})
	}
}
