package zero

import "testing"

func TestExec(t *testing.T) {
	var b bool
	var i int
	var f float32
	var s string

	if b != false {
		t.Errorf("bool型のゼロ値がfalseではない")
	}
	if i != 0 {
		t.Errorf("int型のゼロ値が0ではない")
	}
	if f != 0 {
		t.Errorf("float32型のゼロ値が0ではない")
	}
	if s != "" {
		t.Errorf("string型のゼロ値が空文字列ではない")
	}
}
