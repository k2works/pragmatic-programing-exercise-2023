package _goto

import "fmt"

func Exec() {
	for i := 0; i < 10; i++ {
		if i%2 == 0 {
			goto EVEN
		}
		fmt.Println("odd", i)
	EVEN:
	}
}
