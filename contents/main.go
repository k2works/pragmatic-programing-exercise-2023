package main

import (
	"contens/chapter02/section004/hello"
	"contens/chapter02/section007/_bool"
	"contens/chapter02/section007/number"
	_string "contens/chapter02/section007/string"
	_type "contens/chapter02/section008/type"
	"contens/chapter02/section009/convert"
	"contens/chapter02/section010/arithmetic"
	"contens/chapter02/section010/arithmetic_type"
	"contens/chapter02/section010/compare"
	"contens/chapter02/section010/inc_dec"
	"contens/chapter02/section010/logical"
	"contens/chapter02/section012/abbreviation"
	_break "contens/chapter02/section016/break"
	"contens/chapter02/section016/condition"
	continue_ "contens/chapter02/section016/continue"
	_for "contens/chapter02/section016/for"
	"contens/chapter02/section016/infinity"
	_range "contens/chapter02/section016/range"
	range_string "contens/chapter02/section016/range_strng"
	"contens/chapter02/section017/falthrough"
	_if "contens/chapter02/section017/if"
	"contens/chapter02/section017/swithc_true"
	"contens/chapter02/section017/swithch"
	"contens/chapter02/section018/pointer"
	"contens/chapter02/section018/pointer_value"
	"contens/chapter02/section019/zero"
	_goto "contens/chapter02/section020/goto"
	"contens/chapter02/section020/label_break"
	"contens/chapter02/section020/label_continue"
	"contens/chapter03/section021/function"
	"contens/chapter03/section021/function_literal"
	"contens/chapter03/section021/function_type"
	"contens/chapter03/section021/multi"
	"contens/chapter03/section021/multi_param"
	_return "contens/chapter03/section021/return"
	"contens/chapter03/section021/variadic"
	"contens/chapter03/section022/method"
	"contens/chapter03/section022/method_value"
	"contens/chapter03/section022/receiver_ptr"
	_defer "contens/chapter03/section023/defer"
	"contens/chapter03/section023/defer_close"
	_struct "contens/chapter04/section024/struct"
	"contens/chapter04/section025/embed"
	"contens/chapter04/section026/embed_literal"
	"contens/chapter04/section026/struct_init"
	_interface "contens/chapter05/section027/interface"
	"contens/chapter05/section029/assertion"
	"contens/chapter05/section029/assertion2"
	"contens/chapter05/section029/type_switch"
	"contens/chapter06/section030/index"
  _len "contens/chapter06/section030/len"
	"contens/chapter06/section031/literal"
	_append "contens/chapter06/section032/append"
	"contens/chapter06/section032/array_slice"
	_cap "contens/chapter06/section032/cap"
	_copy "contens/chapter06/section032/copy"
	"contens/chapter06/section032/slice"
	"contens/chapter06/section032/slice_variadic"
	"contens/chapter06/section032/string_slice"
	_make "contens/chapter06/section033/make"
	"contens/chapter06/section033/slice_literal"
	_map "contens/chapter06/section034/map"
	"contens/chapter06/section035/map_literal"
	_error "contens/chapter07/section036/error"
	_return2 "contens/chapter07/section036/return"
	_recover "contens/chapter07/section037/recover"
	"contens/chapter08/section039/goroutine"
	"contens/chapter08/section040/cap_len"
	_channel "contens/chapter08/section040/channel"
	"contens/chapter08/section040/semaphore"
	_sync "contens/chapter08/section040/sync"
	_select "contens/chapter08/section041/select"
	"contens/chapter09/section042/format"
	"contens/chapter09/section042/format_stdout"
  "contens/chapter09/section042/fileio"
  "contens/chapter09/section042/csv_write"
  "contens/chapter09/section042/csv_read"
  "contens/chapter09/section043/mkdir"
  "contens/chapter09/section043/delete"
  "contens/chapter09/section043/chdir"
  "contens/chapter09/section043/rename"
  "contens/chapter09/section043/temp"
  "contens/chapter09/section043/dir_list"
  "contens/chapter09/section044/list"
  "contens/chapter09/section044/list_len"
  "contens/chapter09/section044/list_element"
  "contens/chapter09/section044/list_add"
  "contens/chapter09/section044/list_init"
  "contens/chapter09/section044/_hash"
)

func main() {
	//Section004
	result := hello.Greeting()
	println(result)

	//Section007
	_bool.Exec()
	number.Exec()
	_string.Exec()

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

	//Section026
	struct_init.Exec()
	embed_literal.Exec()

	//Section027
	_interface.Exec()

	//Section029
	assertion.Exec()
	assertion2.Exec()
	type_switch.Exec()

	//Section030
	_len.Exec()
	index.Exec()

	//Section031
	literal.Exec()

	//Section032
	slice.Eexec()
	array_slice.Exec()
	_cap.Exec()
	string_slice.Exec()
	_append.Exec()
	_copy.Exec()
	slice_variadic.Exec()

	//Section033
	_make.Exec()
	slice_literal.Exec()

	//Section034
	_map.Exec()

	//Section035
	map_literal.Exec()

	//Section036
	_return2.Exec()
	_error.Exec()

	//Section037
	//_panic.Exec()
	//_defer2.Exec()
	_recover.Exec()

	//Section038
	//runtime_panic.Exec()

	//Section039
	goroutine.Exec()
	//_fail.Exec()
	//gosched.Exec()

	//Section040
	_channel.Exec()
	cap_len.Exec()
	_sync.Exec()
	semaphore.Exec()
	//share.Exec()

	//Section041
	_select.Exec()

	//Section042
	format.Exec()
	format_stdout.Exec()
  fileio.Exec()
  csv_write.Exec()
  csv_read.Exec()

  //Section043
  mkdir.Exec()
  delete.Exec()
  chdir.Exec()
  rename.Exec()
  temp.Exec()
  dir_list.Exec()

  //Section044
  list.Exec()
  list_len.Exec()
  list_element.Exec()
  list_add.Exec()
  _hash.Exec()
}
