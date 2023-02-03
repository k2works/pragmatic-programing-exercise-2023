package infinity

import "testing"

func TestInfinity(t *testing.T) {
	i := 0

	for {
		t.Log(i)
		i++

		if i == 5 {
			break
		}
	}
}
