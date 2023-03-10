package temp

import (
  "fmt"
  "io/ioutil"
  "os"
)

func Exec() {
  dir := os.TempDir()

  file, _ := ioutil.TempFile(dir, "test")

  fmt.Println(file.Name())
}
