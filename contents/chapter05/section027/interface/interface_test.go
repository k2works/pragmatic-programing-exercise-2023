package _interface

import "testing"

func TestCalculator(t *testing.T) {
	var add Add
	var sub Sub
	var cal Calculator

	cal = add
	expectedResult := 3
	result := cal.Calculate(1, 2)
	if result != expectedResult {
		t.Errorf("expected add result to be %d, but got %d", expectedResult, result)
	}

	cal = sub
	expectedResult = -1
	result = cal.Calculate(1, 2)
	if result != expectedResult {
		t.Errorf("expected sub result to be %d, but got %d", expectedResult, result)
	}
}
