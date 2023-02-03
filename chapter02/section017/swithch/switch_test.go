package swithch

import "testing"

func Test_main(t *testing.T) {
	for i := 0; i < 5; i++ {
		switch i % 2 {
		case 0:
			t.Log("0")
		case 1, 2:
			t.Log("1または2")
		default:
			t.Log("その他")
		}
	}
}
