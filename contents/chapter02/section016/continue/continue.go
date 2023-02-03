package continue_

import "fmt"

func Exec() {
	for i := 0; i < 5; i++ {
		if i%2 != 0 {
			continue
		}

		fmt.Println(i)
	}
}
