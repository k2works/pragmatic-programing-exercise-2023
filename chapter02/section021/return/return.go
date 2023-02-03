package _return

import "fmt"

func calc(a int, b int) (add int, sub int, mul int, div float32) {
	add = a + b
	sub = a - b
	mul = a * b
	div = float32(a) / float32(b)
	return
}

func Exec() {
	add, sub, mul, div := calc(10, 3)
	fmt.Println(add, sub, mul, div)
}
