package assertion2

import (
	"fmt"
)

func Exec() {
	var i interface{} = "test"

	s1, ok := i.(string)
	fmt.Println(s1, ok)

	s2, ok := i.(interface{ dummy() })
	fmt.Println(s2, ok)
}
