package falthrough

import (
	"testing"
	"time"
)

func Test_main(t *testing.T) {
	for day := time.Sunday; day <= time.Saturday; day++ {
		switch day {
		case time.Sunday:
			fallthrough
		case time.Saturday:
			t.Log(day, "休日")
		default:
			t.Log(day, "たぶん平日")
		}
	}
}
