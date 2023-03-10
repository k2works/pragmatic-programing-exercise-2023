package label_break

import "fmt"

func Exec() {
LBL:
	for i := 0; i < 5; i++ {
		switch {
		case i == 3:
			break LBL
		default:
			fmt.Println(i)
		}
	}
}
