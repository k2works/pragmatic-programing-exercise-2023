package main

import "fmt"

func main() {
	str := concatString()
	fmt.Println(str)
}

func concatString() string {
	var str string

	str = "あ"

	str = str + "い"

	str += "う"

	return str
}
