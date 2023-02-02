package number

import "testing"

func TestConvert(t *testing.T) {
	res := convert()
	if res != 12345 {
		t.Error("Expected 12345, got ", res)
	}
}
