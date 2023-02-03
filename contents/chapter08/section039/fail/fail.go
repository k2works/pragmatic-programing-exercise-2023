package _fail

import (
	"fmt"
	"os"
)

func Exec() {
	go func() {
		fmt.Println("Goroutine")
		os.Exit(0)
	}()

	for {
	}
}
