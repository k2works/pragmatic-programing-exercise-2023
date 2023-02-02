package main

import "testing"

func TestContinue(t *testing.T) {
	for i := 0; i < 5; i++ {
		if i%2 != 0 {
			continue
		}

		t.Log(i)
	}
}
