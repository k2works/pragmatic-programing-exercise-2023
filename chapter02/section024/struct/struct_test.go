package _struct

import "testing"

func TestXStruct(t *testing.T) {
	expectedI1 := 1
	expectedI2 := 2
	expectedF := float32(3.14)
	expectedS := "go"

	type MyData struct {
		i1, i2 int
		f      float32
		s      string
	}

	var x MyData = struct {
		i1, i2 int
		f      float32
		s      string
	}{
		i1: expectedI1,
		i2: expectedI2,
		f:  expectedF,
		s:  expectedS,
	}

	if x.i1 != expectedI1 {
		t.Errorf("expected i1 to be %d, but got %d", expectedI1, x.i1)
	}
	if x.i2 != expectedI2 {
		t.Errorf("expected i2 to be %d, but got %d", expectedI2, x.i2)
	}
	if x.f != expectedF {
		t.Errorf("expected f to be %f, but got %f", expectedF, x.f)
	}
	if x.s != expectedS {
		t.Errorf("expected s to be %s, but got %s", expectedS, x.s)
	}
}
