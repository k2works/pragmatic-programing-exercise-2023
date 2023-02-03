package convert

import (
	"fmt"
	"strconv"
)

func Exec() {
	i, u, f, s, b := convertVar()

	fmt.Println(i)
	fmt.Println(u)
	fmt.Println(f)
	fmt.Println(s)
	fmt.Println(b)
}

func convertVar() (int, uint32, float32, string, []byte) {
	var i int = 1234

	var u uint32 = uint32(i)

	var f float32 = float32(i)

	var s string = strconv.Itoa(i)

	var b []byte = []byte(s)

	return i, u, f, s, b
}
