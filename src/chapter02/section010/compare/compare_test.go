package compare

import "testing"

func Test_main(t *testing.T) {
	actual := 1 == 2
	expected := false
	if actual != expected {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual, expected)
	}

	actual2 := "abc" == "XYZ"
	expected2 := false
	if actual2 != expected2 {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual2, expected2)
	}

	actual3 := 3 != 2
	expected3 := true
	if actual3 != expected3 {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual3, expected3)
	}

	actual4 := 2 < 3
	expected4 := true
	if actual4 != expected4 {
		t.Errorf("Incorrect answer. Got: %v, Expected: %v", actual4, expected4)
	}
}
