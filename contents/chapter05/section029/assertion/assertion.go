package assertion

import "fmt"

func Exec() {
	var i interface{} = "test"

	var s string = i.(string)

	fmt.Println(s)
}
