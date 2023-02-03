package function_literal

import "fmt"

func Exec() {
	val := 123

	func(i int) {
		fmt.Println(i * val)
	}(10)

	f := func(s string) {
		fmt.Println(s)
	}

	f("hoge")
}
