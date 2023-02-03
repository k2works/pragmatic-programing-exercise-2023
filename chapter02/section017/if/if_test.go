package _if

import "testing"

func Test_main(t *testing.T) {
	for i := 0; i < 5; i++ {
		if i%2 == 0 {
			t.Log(i, "は偶数")
		} else {
			t.Log(i, "は奇数")
		}
	}
}
