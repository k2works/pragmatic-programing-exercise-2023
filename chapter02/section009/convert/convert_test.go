package main

import (
	"reflect"
	"testing"
)

func TestConvertVar(t *testing.T) {
	i, u, f, s, b := convertVar()

	// int
	if i != 1234 {
		t.Errorf("Expected int to be %v, got %v instead", 134, i)
	}

	// uint32
	if u != 1234 {
		t.Errorf("Expected uint32 to be %v, got %v instead", 134, u)
	}

	// float32
	if f != 1234 {
		t.Errorf("Expected float32 to be %v, got %v instead", 134, f)
	}

	// string
	if s != "1234" {
		t.Errorf("Expected string to be %v, got %v instead", "134", s)
	}

	// []byte
	expectedB := []byte("1234")
	if !reflect.DeepEqual(b, expectedB) {
		t.Errorf("Expected []byte to be %v, got %v instead", expectedB, b)
	}
}
