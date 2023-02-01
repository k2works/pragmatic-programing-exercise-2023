package main

import (
	"testing"
)

func TestStrResult(t *testing.T) {
	str := concatString()
	if str != "あいう" {
		t.Errorf("Expected str to be 'あいう' but got %s", str)
	}
}
