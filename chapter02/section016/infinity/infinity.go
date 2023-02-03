package infinity

import "fmt"

func Exec() {
	i := 0

	for {
		fmt.Println(i)
		i++

		if i == 5 {
			break
		}
	}
}
