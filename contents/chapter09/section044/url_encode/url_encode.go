package urlencode

import (
  "fmt"
  "net/url"
)

func Exec() {
  data := "abcあいう"

  enc := url.QueryEscape(data)

  fmt.Println(enc)

  dec, _ := url.QueryUnescape(enc)

  fmt.Println(dec)
}
