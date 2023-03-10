package chdir

import (
  "fmt"
  "os"
)

func Exec() {
  current, _ := os.Getwd()
  fmt.Println(current)

  os.Chdir("..")

  current, _ = os.Getwd()
  fmt.Println(current)
}
