package _range

import "fmt"

func Exec() {
	arr := [...]int{0, 1, 2, 3, 4}

	for i := range arr {
		fmt.Println(i)
	}
}
