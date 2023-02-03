package embed_literal

import "testing"

func TestEmployeeStruct(t *testing.T) {
	expectedID := 1
	expectedName := "Jhon"
	expectedAge := 23

	e := Employee{
		id: expectedID,
		Person: Person{
			name: expectedName,
			age:  expectedAge,
		},
	}

	if e.id != expectedID {
		t.Errorf("expected e.id to be %d, but got %d", expectedID, e.id)
	}
	if e.name != expectedName {
		t.Errorf("expected e.name to be %s, but got %s", expectedName, e.name)
	}
	if e.age != expectedAge {
		t.Errorf("expected e.age to be %d, but got %d", expectedAge, e.age)
	}
}
