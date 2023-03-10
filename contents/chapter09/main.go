package main

import (
	"contens/chapter09/section042/csv_read"
	"contens/chapter09/section042/csv_write"
	"contens/chapter09/section042/fileio"
	"contens/chapter09/section042/format"
	"contens/chapter09/section042/format_stdout"
	"contens/chapter09/section043/chdir"
	"contens/chapter09/section043/delete"
	"contens/chapter09/section043/dir_list"
	"contens/chapter09/section043/mkdir"
	"contens/chapter09/section043/rename"
	"contens/chapter09/section043/temp"
	"contens/chapter09/section044/list"
	"contens/chapter09/section044/list_add"
	"contens/chapter09/section044/list_element"
	"contens/chapter09/section044/list_len"
)

func main() {
	format.Exec()
	format_stdout.Exec()
	fileio.Exec()
	csv_write.Exec()
	csv_read.Exec()

	mkdir.Exec()
	delete.Exec()
	chdir.Exec()
	rename.Exec()
	temp.Exec()
	dir_list.Exec()

	list.Exec()
	list_len.Exec()
	list_element.Exec()
	list_add.Exec()
}
