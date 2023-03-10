package map_literal

import "fmt"

func Exec() {
	capitals := map[string]string{
		"日本":   "東京",
		"アメリカ": "ワシントンD.C.",
		"中国":   "北京",
	}

	fmt.Println(capitals)
}
