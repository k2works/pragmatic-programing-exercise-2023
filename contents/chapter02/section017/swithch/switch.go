package swithch

import "fmt"

func Exec() {
	for i := 0; i < 5; i++ {
		switch i % 2 {
		case 0:
			fmt.Println("0")
		case 1, 2:
			fmt.Println("1または2")
		default:
			fmt.Println("その他")
		}
	}
}
