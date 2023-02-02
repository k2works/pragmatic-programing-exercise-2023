package range_

import "testing"

func TestRange(t *testing.T) {
	arr := [...]int{0, 1, 2, 3, 4}

	for i := range arr {
		t.Log(i)
	}
}
