package main

import "fmt"

func main() {
	i := myIntegerFunc()
	fmt.Println(i)

	s := myStructFunc()
	fmt.Println(s)
}

type myInteger int

func myIntegerFunc() myInteger {
	var i myInteger = 123

	i += 1

	return i
}

type myStruct struct {
	a int
	b int
}

func myStructFunc() myStruct {
	var s myStruct

	s.a = 1
	s.b = 2

	return s
}
