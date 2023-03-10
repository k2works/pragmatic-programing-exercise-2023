package slice_variadic

import "fmt"

func Exec() {
	s := []string{"a", "b", "c"}

	test(s...)

	test("a", "b", "c")
}

func test(s ...string) {
	fmt.Println(len(s), s)
}
