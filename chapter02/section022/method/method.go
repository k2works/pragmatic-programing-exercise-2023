package method

import "fmt"

type myType int

func (value myType) println() {
	fmt.Println(value)
}

func Exec() {
	var z myType = 1234
	z.println()
}
