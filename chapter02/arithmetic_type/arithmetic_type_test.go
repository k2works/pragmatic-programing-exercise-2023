package main

import (
	"bytes"
	"log"
	"testing"
)

func TestArithmeticType(t *testing.T) {
	var buffer bytes.Buffer
	log.SetOutput(&buffer)

	const C1 = 12345
	const C2 = 34567

	var actual int = C1 * C2
	expected := 426729615
	if actual != expected {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", actual, expected)
	}

	var a int32 = 123
	var b int64 = 234
	var actual2 int32 = a + int32(b)
	expected2 := int32(357)
	if actual2 != expected2 {
		t.Errorf("Incorrect answer. Got: %d, Expected: %d", actual2, expected2)
	}
}
