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
	_if "chapter02/section017/if"
	"chapter02/section017/swithc_true"
	"chapter02/section017/swithch"
	"chapter02/section018/pointer"
	"chapter02/section018/pointer_value"
	"chapter02/section019/zero"
	"chapter02/section020/goto"
	"chapter02/section020/label_break"
	"chapter02/section020/label_continue"
	"chapter02/section021/function"
	"chapter02/section021/function_literal"
	"chapter02/section021/function_type"
	"chapter02/section021/multi"
	"chapter02/section021/multi_param"
	_return "chapter02/section021/return"
	"chapter02/section021/variadic"
	"chapter02/section022/method"
	"chapter02/section022/method_value"
	"chapter02/section022/receiver_ptr"
	_defer "chapter02/section023/defer"
	"chapter02/section023/defer_close"
	_struct "chapter02/section024/struct"
	"chapter02/section025/embed"
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
	_type.Exec()

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
	_break.Exec()
	condition.Exec()
	continue_.Exec()
	_for.Exec()
	infinity.Exec()
	_range.Exec()
	range_string.Exec()

	//Section017
	falthrough.Exec()
	_if.Exec()
	swithc_true.Exec()
	swithch.Exec()

	//Section018
	pointer.Exec()
	pointer_value.Exec()

	//Section019
	zero.Exec()

	//Section020
	label_break.Exec()
	label_continue.Exec()
	_goto.Exec()

	//Section021
	function.Exec()
	multi.Exec()
	multi_param.Exec()
	variadic.Exec()
	_return.Exec()
	function_literal.Exec()
	function_type.Exec()

	//Section022
	method.Exec()
	receiver_ptr.Exec()
	method_value.Exec()

	//Section023
	_defer.Exec()
	defer_close.Exec()

	//Section024
	_struct.Exec()

	//Section025
	embed.Exec()
}
