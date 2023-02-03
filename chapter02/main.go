package main

import (
	"chapter02/section004/hello"
	"chapter02/section007/bool"
	"chapter02/section007/number"
	"chapter02/section007/string"
	"chapter02/section008/type"
	"chapter02/section009/convert"
	"chapter02/section010/arithmetic"
	"chapter02/section010/arithmetic_type"
	"chapter02/section010/compare"
	"chapter02/section010/inc_dec"
	"chapter02/section010/logical"
	"chapter02/section012/abbreviation"
	"chapter02/section016/break"
	"chapter02/section016/condition"
	"chapter02/section016/continue"
	"chapter02/section016/for"
	"chapter02/section016/infinity"
	"chapter02/section016/range"
	"chapter02/section016/range_strng"
	"chapter02/section017/falthrough"
	"chapter02/section017/if"
	"chapter02/section017/swithc_true"
	"chapter02/section017/swithch"
	"chapter02/section018/pointer"
	"chapter02/section018/pointer_value"
	"chapter02/section019/zero"
)

func main() {
	//Section004
	result := hello.Greeting()
	println(result)

	//Section007
	bool.Exec()
	number.Exec()
	string.Exec()

	//Section008
	type_.Exec()

	//Section009
	convert.Exec()

	//Section010
	arithmetic.Exec()
	arithmetic_type.Exec()
	compare.Exec()
	inc_dec.Exec()
	logical.Exec()

	//Section012
	abbreviation.Exec()

	//Section016
	break_.Exec()
	condition.Exec()
	continue_.Exec()
	for_.Exec()
	infinity.Exec()
	range_.Exec()
	range_string.Exec()

	//Section017
	falthrough.Exec()
	if_.Exec()
	swithc_true.Exec()
	swithch.Exec()

	//Section018
	pointer.Exec()
	pointer_value.Exec()

	//Section019
	zero.Exec()
}
