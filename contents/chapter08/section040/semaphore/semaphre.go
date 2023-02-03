package semaphore

import (
	"fmt"
	"math/rand"
	"time"
)

const goroutines = 10

const maxProcess = 3

func Exec() {
	semaphore := make(chan int, maxProcess)

	notify := make(chan int, goroutines)

	for i := 0; i < goroutines; i++ {
		go func(no int, semaphore chan int, notify chan<- int) {
			semaphore <- 0

			time.Sleep(time.Duration(rand.Int63n(10)) * time.Second)

			fmt.Println("処理完了", no)

			<-semaphore

			notify <- no
		}(i, semaphore, notify)
	}

	for i := 0; i < goroutines; i++ {
		<-notify
	}

	fmt.Println("すべて完了")
}
