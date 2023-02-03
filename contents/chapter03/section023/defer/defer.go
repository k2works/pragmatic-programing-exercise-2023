package _defer

import "fmt"

func Exec() {
	fmt.Println("開始")

	defer delay()

	fmt.Println("終了")
}

func delay() {
	fmt.Println("delayが呼び出されました")
}
