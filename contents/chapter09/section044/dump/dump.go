package dump

import (
  "fmt"
  "encoding/hex"
)

func Exec() {
  data := make([]byte, 256)

  for i := 0; i < len(data); i++ {
    data[i] = byte(i)
  }

  fmt.Println(hex.Dump(data))
}
