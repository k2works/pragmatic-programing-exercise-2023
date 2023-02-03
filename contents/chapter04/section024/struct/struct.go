package _struct

import "fmt"

func Exec() {
	var x struct {
		i1, i2 int
		f      float32
		s      string
	}

	x.i1 = 1
	x.i2 = 2
	x.f = 3.14
	x.s = "go"

	fmt.Println(x)
}
