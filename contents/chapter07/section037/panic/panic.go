package _panic

func Exec() {
	f1()
}

func f1() {
	panic("パニック発生")
}
