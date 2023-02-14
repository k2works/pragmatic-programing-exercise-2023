package scan

import "fmt"

func Exec() {
	var fname, name string
	fmt.Println("あなたのお名前は(姓　名a)?")
	fmt.Scanln(&fname, &name)

	fmt.Println("あなたの年齢は?")
	var age int
	fmt.Scanf("%d", &age)

	fmt.Printf("名前:%s %s 年齢:%d\n", fname, name, age)
}
