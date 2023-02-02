package main

import "testing"

func TestRangeString(t *testing.T) {
	str := "abcあいう"

	for i, u := range str {
		t.Logf("%d %d", i, u)
	}
}
