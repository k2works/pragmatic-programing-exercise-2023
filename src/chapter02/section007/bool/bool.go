package bool

import "fmt"

func main() {
	b := check()
	fmt.Println(b)
}

func check() bool {
	var b bool
	b = true
	b = false
	b = true || false
	return b
}
