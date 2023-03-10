package range_string

import "fmt"

func Exec() {
	str := "abcあいう"

	for i, u := range str {
		fmt.Println(i, u)
	}
}
