package number

import "fmt"

func main() {
	resutl := convert()
	fmt.Println(resutl)
}

func convert() int64 {
	var i int = 12345
	var i64 int64 = int64(i)
	return i64
}
