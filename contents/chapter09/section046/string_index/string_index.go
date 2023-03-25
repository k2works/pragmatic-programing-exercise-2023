package main

import (
	"fmt"
	"strings"
)

func main() {

	fmt.Println(strings.Index("The Go Programing Language)", "Go"))

	fmt.Println(strings.Index("The Go Programing Language)", "xxx"))
}
