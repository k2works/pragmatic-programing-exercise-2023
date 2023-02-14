package format

import "fmt"

func Exec() {
	s := fmt.Sprintf("%sの降水確率は%d%%です。", "沖縄", 30)

	fmt.Println(s)
}

