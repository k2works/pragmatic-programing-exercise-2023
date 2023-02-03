package receiver_ptr

type myType int

func (value myType) setByValue(newValue myType) {
	value = newValue
}

func (value *myType) setByPointer(newValue myType) {
	*value = newValue
}

func Exec() {
	var x myType = 0

	x.setByValue(1)
	println(x)

	x.setByPointer(2)
	println(x)
}
