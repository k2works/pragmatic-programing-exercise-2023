package logical

import "fmt"

func Exec() {
	fmt.Println("true && true =", true)
	fmt.Println("true && false =", true && false)
	fmt.Println("false && false =", false)
	fmt.Println("false && true =", false && true)

	fmt.Println("true || true =", true)
	fmt.Println("true || false =", true || false)
	fmt.Println("false || true =", false || true)
	fmt.Println("false || false =", false)

	fmt.Println("!true =", !true)
	fmt.Println("!false =", !false)
}
