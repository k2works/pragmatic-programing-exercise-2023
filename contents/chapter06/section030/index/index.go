package index

import "fmt"

func Exec() {
	var date [7]string
	date[0] = "日曜日"
	date[1] = "月曜日"
	date[2] = "火曜日"
	date[3] = "水曜日"
	date[4] = "木曜日"
	date[5] = "金曜日"
	date[6] = "土曜日"

	for i := 0; i < len(date); i++ {
		println(date[i], " ")
	}

	fmt.Println()

	for _, value := range date {
		println(value, " ")
	}

	fmt.Println()
}
