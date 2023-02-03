package _return

import (
	"fmt"
	"os"
)

func Exec() {
	file, err := os.Open("test.txt")
	if err != nil {
		fmt.Println(err.Error())

		os.Exit(1)
	}

	file.Close()

	fmt.Println("OK")
}
