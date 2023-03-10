package main

import (
	"contens/chapter08/section039/goroutine"
	"contens/chapter08/section040/cap_len"
	_channel "contens/chapter08/section040/channel"
	"contens/chapter08/section040/semaphore"
	_sync "contens/chapter08/section040/sync"
	_select "contens/chapter08/section041/select"
)

func main() {
	goroutine.Exec()
	//_fail.Exec()
	//gosched.Exec()

	_channel.Exec()
	cap_len.Exec()
	_sync.Exec()
	semaphore.Exec()
	//share.Exec()

	//Section041
	_select.Exec()
}
