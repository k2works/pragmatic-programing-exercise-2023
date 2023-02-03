package _break

import "fmt"

func Exec() {
	for i := 0; i < 5; i++ {
		fmt.Println(i)

		if i == 2 {
			break
		}
	}
}
