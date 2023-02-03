package swithc_true

import "fmt"

func Exec() {
	for i := -2; i <= 2; i++ {
		switch true {
		case i > 0:
			fmt.Println("+")
		case i < 0:
			fmt.Println("-")
		default:
			fmt.Println("0")
		}
	}
}
