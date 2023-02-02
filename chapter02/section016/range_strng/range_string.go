package range_string

import "fmt"

func main() {
	str := "abcあいう"

	for i, u := range str {
		fmt.Println(i, u)
	}
}
