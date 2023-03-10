package _defer

import "fmt"

func Exec() {
	defer fmt.Println("defer")

	f1()
}

func f1() {
	panic("パニック発生")
}
