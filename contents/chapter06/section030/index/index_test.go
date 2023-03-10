package index

import "testing"

func TestArray(t *testing.T) {
	var date [7]string
	date[0] = "日曜日"
	date[1] = "月曜日"
	date[2] = "火曜日"
	date[3] = "水曜日"
	date[4] = "木曜日"
	date[5] = "金曜日"
	date[6] = "土曜日"

	expected := [7]string{"日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"}
	if date != expected {
		t.Errorf("Expected %v but got %v", expected, date)
	}
}
