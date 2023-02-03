package string

import (
	"fmt"
	"unicode/utf8"
)

func Exec() {
	str := concatString()
	fmt.Println(str)

	var en string = "golang"
	var ja string = "Go言語"

	fmt.Println(en, "len:", stringLength(en))
	fmt.Println(ja, "len:", stringLength(ja))
	fmt.Println(ja, "len:", utf8.RuneCountInString(ja))
}

func concatString() string {
	var str string

	str = "あ"

	str = str + "い"

	str += "う"

	return str
}

func stringLength(s string) int {
	return len(s)
}
