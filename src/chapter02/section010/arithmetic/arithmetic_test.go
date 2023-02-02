package main

import (
	"testing"
)

func TestArismatic(t *testing.T) {
	// Test 1 + 2
	expectedSum := 3
	sum := 1 + 2
	if sum != expectedSum {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", sum, expectedSum)
	}

	// Test "abc" + "XYZ"
	expectedConcat := "abcXYZ"
	concat := "abc" + "XYZ"
	if concat != expectedConcat {
		t.Errorf("Incorrect answer. Got: %s, Expected: %s", concat, expectedConcat)
	}

	// Test # - 2
	expectedSub := 1
	sub := 3 - 2
	if sub != expectedSub {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", sub, expectedSub)
	}

	// Test 2 * 3
	expectedMultiply := 6
	multiply := 2 * 3
	if multiply != expectedMultiply {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", multiply, expectedMultiply)
	}

	// Test 5 / 2
	expectedDiv := 2
	div := 5 / 2
	if div != expectedDiv {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", div, expectedDiv)
	}

	// Test -5 / 2
	expectedDivMinus := -2
	divMinus := -5 / 2
	if divMinus != expectedDivMinus {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", divMinus, expectedDivMinus)
	}

	// Test 5 % 2
	expectedModulo := 1
	modulo := 5 % 2
	if modulo != expectedModulo {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", modulo, expectedModulo)
	}

	// Test 3 & 6
	expectedBitwiseAnd := 2
	bitwiseAnd := 3 & 6
	if bitwiseAnd != expectedBitwiseAnd {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", bitwiseAnd, expectedBitwiseAnd)
	}

	// Test 3 | 6
	expectedBitwiseOr := 7
	bitwiseOr := 3 | 6
	if bitwiseOr != expectedBitwiseOr {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", bitwiseOr, expectedBitwiseOr)
	}

	// Test 3 &^ 6
	expectedBitwiseAndNot := 1
	bitwiseAndNot := 3 &^ 6
	if bitwiseAndNot != expectedBitwiseAndNot {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", bitwiseAndNot, expectedBitwiseAndNot)
	}

	// Test 2 << 1
	expectedShiftLeft := 4
	shiftLeft := 2 << 1
	if shiftLeft != expectedShiftLeft {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", shiftLeft, expectedShiftLeft)
	}

	// Test 2 >> 1
	expectedShiftRight := 1
	shiftRight := 2 >> 1
	if shiftRight != expectedShiftRight {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", shiftRight, expectedShiftRight)
	}
}
