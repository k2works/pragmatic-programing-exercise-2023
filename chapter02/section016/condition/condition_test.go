package main

import "testing"

func TestCondition(t *testing.T) {
	i := 0

	for i < 5 {
		t.Log(i)
		i++
	}
}
