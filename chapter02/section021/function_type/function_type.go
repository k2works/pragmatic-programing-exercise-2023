package function_type

import "fmt"

func Exec() {
	var f func(int, int) int

	f = func(a int, b int) int {
		return a + b
	}

	fmt.Println(f(1, 2))

	f = multiply

	fmt.Println(f(1, 2))
}

func multiply(x int, y int) int {
	return x * y
}
