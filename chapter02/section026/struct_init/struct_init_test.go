package struct_init

import "testing"

func TestPersonStruct(t *testing.T) {
	expectedName1 := "Jhon"
	expectedAge1 := 23
	expectedName2 := "Tom"
	expectedAge2 := 31
	expectedName3 := "Jone"
	expectedAge3 := 42
	expectedName4 := "Mike"
	expectedAge4 := 36

	p1 := Person{}
	p1.name = expectedName1
	p1.age = expectedAge1

	if p1.name != expectedName1 {
		t.Errorf("expected p1.name to be %s, but got %s", expectedName1, p1.name)
	}
	if p1.age != expectedAge1 {
		t.Errorf("expected p1.age to be %d, but got %d", expectedAge1, p1.age)
	}

	p2 := Person{age: expectedAge2, name: expectedName2}

	if p2.name != expectedName2 {
		t.Errorf("expected p2.name to be %s, but got %s", expectedName2, p2.name)
	}
	if p2.age != expectedAge2 {
		t.Errorf("expected p2.age to be %d, but got %d", expectedAge2, p2.age)
	}

	p3 := Person{expectedName3, expectedAge3}

	if p3.name != expectedName3 {
		t.Errorf("expected p3.name to be %s, but got %s", expectedName3, p3.name)
	}
	if p3.age != expectedAge3 {
		t.Errorf("expected p3.age to be %d, but got %d", expectedAge3, p3.age)
	}

	p4 := &Person{expectedName4, expectedAge4}

	if p4.name != expectedName4 {
		t.Errorf("expected p4.name to be %s, but got %s", expectedName4, p4.name)
	}
	if p4.age != expectedAge4 {
		t.Errorf("expected p4.age to be %d, but got %d", expectedAge4, p4.age)
	}
}
