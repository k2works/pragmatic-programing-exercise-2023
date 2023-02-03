package _len

func Exec() {
	var array1 [1]byte
	var array2 [5]*int
	var array3 [8][3]int64
	var array4 [2]struct{ x, y int }

	println(len(array1))
	println(len(array2))
	println(len(array3), len(array3[0]))
	println(len(array4))
}
