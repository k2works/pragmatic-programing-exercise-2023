package mkdir

import "os"

func Exec() {
  os.Mkdir("newdir", 0777)
  os.MkdirAll("a/b/c", 0777)
}
