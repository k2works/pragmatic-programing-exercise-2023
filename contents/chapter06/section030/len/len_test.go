package _len

import "testing"

func TestArrays(t *testing.T) {
	var array1 [1]byte
	array1[0] = 100

	var array2 [5]*int
	array2[0] = new(int)
	*array2[0] = 10

	array2[1] = new(int)
	*array2[1] = 20

	array2[2] = new(int)
	*array2[2] = 30

	var array3 [8][3]int64
	array3[0][0] = 1
	array3[0][1] = 2
	array3[0][2] = 3

	array3[1][0] = 4
	array3[1][1] = 5
	array3[1][2] = 6

	var array4 [2]struct{ x, y int }
	array4[0].x = 7
	array4[0].y = 8

	array4[1].x = 9
	array4[1].y = 10

	expectedArray1 := [1]byte{100}
	if array1 != expectedArray1 {
		t.Errorf("Expected array1 to be %v, but got %v", expectedArray1, array1)
	}

	expectedArray2 := [5]*int{
		new(int),
		new(int),
		new(int),
		nil,
		nil,
	}
	*expectedArray2[0] = 10
	*expectedArray2[1] = 20
	*expectedArray2[2] = 30

	for i, v := range array2 {
		if v == nil && expectedArray2[i] == nil {
			continue
		}
		if v == nil || expectedArray2[i] == nil {
			t.Errorf("Expected array2[%d] to be %v, but got %v", i, expectedArray2[i], v)
		}
		if *v != *expectedArray2[i] {
			t.Errorf("Expected array2[%d] to be %v, but got %v", i, *expectedArray2[i], *v)
		}
	}

	expectedArray3 := [8][3]int64{
		{1, 2, 3},
		{4, 5, 6},
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
	}
	if array3 != expectedArray3 {
		t.Errorf("Expected array3 to be %v, but got %v", expectedArray3, array3)
	}

	expectedArray4 := [2]struct{ x, y int }{
		{7, 8},
		{9, 10},
	}
	if array4 != expectedArray4 {
		t.Errorf("Expected array4 to be %v, but got %v", expectedArray4, array4)
	}
}

func TestArray1(t *testing.T) {
	array1 := [1]byte{1}
	expected := [1]byte{1}
	if array1 != expected {
		t.Errorf("Expected %v, but got %v", expected, array1)
	}
}

func TestArray2(t *testing.T) {
	array2 := [5]int{0, 1, 2, 3, 4}
	expected := [5]int{0, 1, 2, 3, 4}
	for i := range array2 {
		if array2[i] != expected[i] {
			t.Errorf("Expected %v, but got %v", expected, array2)
		}
	}
}

func TestArray3(t *testing.T) {
	array3 := [8][3]int64{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}, {10, 11, 12}, {13, 14, 15}, {16, 17, 18}, {19, 20, 21}, {22, 23, 24}}
	expected := [8][3]int64{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}, {10, 11, 12}, {13, 14, 15}, {16, 17, 18}, {19, 20, 21}, {22, 23, 24}}
	for i := range array3 {
		for j := range array3[i] {
			if array3[i][j] != expected[i][j] {
				t.Errorf("Expected %v, but got %v", expected, array3)
			}
		}
	}
}

func TestArray4(t *testing.T) {
	array4 := [2]struct{ x, y int }{{1, 2}, {3, 4}}
	expected := [2]struct{ x, y int }{{1, 2}, {3, 4}}
	for i := range array4 {
		if array4[i] != expected[i] {
			t.Errorf("Expected %v, but got %v", expected, array4)
		}
	}
}
