package list_len

import (
  "container/list"
  "fmt"
)

func Exec() {
  l := list.New()

  for i := 0; i < 5; i++ {
    l.PushBack(i)
  }

  fmt.Println("要素数:", l.Len())
}
