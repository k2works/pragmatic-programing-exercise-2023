package break_

import "testing"

func TestBreak(t *testing.T) {
	for i := 0; i < 5; i++ {
		t.Logf("%d", i)

		if i == 2 {
			break
		}
	}
}
