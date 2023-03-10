package dir_list

import (
  "fmt"
  "io/ioutil"
  "runtime"
)

func Exec() {
  goroot := runtime.GOROOT()

  fileinfos, _ := ioutil.ReadDir(goroot)

  for _, fileinfo := range fileinfos {
    if !fileinfo.IsDir() {
      fmt.Println(fileinfo.Name())
    }
  }
}

