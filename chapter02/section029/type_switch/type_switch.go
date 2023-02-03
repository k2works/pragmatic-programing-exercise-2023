package type_switch

func Exec() {
	showType(nil)
	showType(12345)
	showType("abcdef")
	showType(3.14)
}

func showType(x interface{}) {
	switch x.(type) {
	case nil:
		println("nil")
	case int, int32, int64:
		println("整数")
	case string:
		println("文字列")
	default:
		println("不明")
	}
}
