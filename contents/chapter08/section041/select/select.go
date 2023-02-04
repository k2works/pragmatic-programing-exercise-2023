package _select

import (
	"fmt"
	"os"
)

func Exec() {
	ch1 := make(chan int)
	ch2 := make(chan string)

	go func() {
		for i := 0; i < 10; i++ {
			select {
			case ch1 <- 0:
				fmt.Println("ch1への送信完了")
			case ch2 <- "test":
				fmt.Println("ch2への送信完了")
			}
		}
		os.Exit(0)
	}()

	for {
		select {
		case val := <-ch1:
			fmt.Println("ch1からの受信完了:", val)
		case text := <-ch2:
			fmt.Println("ch2からの受信完了:", text)
		}
	}
}
