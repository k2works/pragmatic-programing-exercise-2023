package method_value

import "fmt"

type myType int

func (value *myType) add(increment myType) myType {
	*value += increment
	return *value
}

func Exec() {
	var i myType

	fmt.Println(i.add(3))

	mv := i.add
	fmt.Println(mv(3))
}
