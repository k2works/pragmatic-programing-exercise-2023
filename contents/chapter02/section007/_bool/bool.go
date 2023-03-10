package _bool

import "fmt"

func Exec() {
	b := check()
	fmt.Println(b)
}

func check() bool {
	var b bool
	b = true
	b = false
	b = true || false
	return b
}
