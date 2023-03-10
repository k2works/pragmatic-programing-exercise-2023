package inc_dec

import "fmt"

func Exec() {
	var inc int = 0
	var dec int = 0

	inc++
	dec--

	fmt.Println("0++ =", inc)
	fmt.Println("0-- =", dec)
}
