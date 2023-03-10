package list_element

import (
  "container/list"
  "fmt"
)

func Exec() {
  l := list.New()

  for i := 0; i < 5; i++ {
    l.PushBack(i)
  }

  target := getElem(l, 3)

  fmt.Println("変更前:", target.Value)

  target.Value = "change"

  for e := l.Front(); e != nil; e = e.Next() {
    fmt.Println(e.Value)
  }
}

func getElem(l *list.List, index int) *list.Element {
  for e, i := l.Front(), 0; e != nil; e, i = e.Next(), i+1 {
    if i == index {
      return e
    }

    i++
  }

  panic("インデックス不正")
}
