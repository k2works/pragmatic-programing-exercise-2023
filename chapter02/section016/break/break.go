package break_

import "fmt"

func Exec() {
	for i := 0; i < 5; i++ {
		fmt.Println(i)

		if i == 2 {
			break
		}
	}
}
