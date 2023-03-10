package base64

import (
  "encoding/base64"
  "fmt"
)


func Exec() {
  data := []byte{0x00,0x01,0x02,0x03,0x04}

  enc := base64.StdEncoding.EncodeToString(data)

  fmt.Println(enc)

  dec, err := base64.StdEncoding.DecodeString(enc)

  fmt.Printf("%v %v", dec, err)
}
