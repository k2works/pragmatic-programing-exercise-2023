package array_slice

import "fmt"

func Exec() {
	values := [...]int{0, 1, 2, 3, 4}

	double(values[:])

	fmt.Println(values)
}

func double(values []int) {
	for i := 0; i < len(values); i++ {
		values[i] *= 2
	}
}
