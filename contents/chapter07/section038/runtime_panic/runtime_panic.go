package runtime_panic

func Exec() {
	arr := [...]int{1, 2, 3}

	index := 10

	arr[index] = index
}
