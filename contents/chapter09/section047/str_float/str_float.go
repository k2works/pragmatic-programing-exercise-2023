package main

import (
	"fmt"
	"strconv"
)

func main() {
	f64, err := strconv.ParseFloat("123.4567890", 32)

	fmt.Println(float32(f64), err)
}
