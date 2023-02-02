package hello

import "fmt"

func main() {
	result := Greeting()
	fmt.Println(result)
}

func Greeting() string {
	return "Hello, World!"
}
