package list_init

import (
  "container/list"
  "fmt"
)

func Exec() {
  l := list.New()

  for i := 0; i < 5; i++ {
    l.PushBack(i)
  }

  l.Init()

  fmt.Println("要素数:", l.Len())
}
