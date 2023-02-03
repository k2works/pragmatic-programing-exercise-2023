package main

import (
	"chapter02/section004/hello"
	_ "chapter02/section007/bool"
	_ "chapter02/section007/number"
	_ "chapter02/section007/string"
	_ "chapter02/section008/type"
	_ "chapter02/section009/convert"
	_ "chapter02/section010/arithmetic"
	_ "chapter02/section010/arithmetic_type"
	_ "chapter02/section010/compare"
	_ "chapter02/section010/inc_dec"
	_ "chapter02/section010/logical"
	_ "chapter02/section012/abbreviation"
	_ "chapter02/section016/break"
	_ "chapter02/section016/continue"
	_ "chapter02/section016/for"
	_ "chapter02/section016/infinity"
	_ "chapter02/section016/range"
	_ "chapter02/section016/range_strng"
	_ "chapter02/section017/if"
)

func main() {
	result := hello.Greeting()
	println(result)
}
