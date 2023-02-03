package swithc_true

import "testing"

func Test_main(t *testing.T) {
	for i := -2; i <= 2; i++ {
		switch true {
		case i > 0:
			t.Log("+")
		case i < 0:
			t.Log("-")
		default:
			t.Log("0")
		}
	}
}
