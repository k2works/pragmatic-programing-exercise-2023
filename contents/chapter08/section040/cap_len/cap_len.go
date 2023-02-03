package cap_len

import "fmt"

func Exec() {
	c := make(chan int, 10)

	c <- 1

	fmt.Println("cap:", cap(c))
	fmt.Println("len:", len(c))
}
