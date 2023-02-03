package _make

import "fmt"

func Exec() {
	s1 := make([]int, 10, 30)

	fmt.Println(s1)
	fmt.Println("len:", len(s1))
	fmt.Println("cap:", cap(s1))

	fmt.Println()

	s2 := make([]float32, 5)

	fmt.Println(s2)
	fmt.Println("len:", len(s2))
	fmt.Println("cap:", cap(s2))
}
