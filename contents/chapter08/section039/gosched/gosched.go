package gosched

import (
	"fmt"
	"os"
	"runtime"
)

func Exec() {
	go func() {
		fmt.Println("Goroutine")

		os.Exit(0)
	}()

	for {
		runtime.Gosched()
	}

}
