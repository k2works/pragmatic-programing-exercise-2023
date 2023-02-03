package embed_literal

import "fmt"

type Person struct {
	name string
	age  int
}

type Employee struct {
	id int
	Person
}

func Exec() {
	e := Employee{
		id: 1,
		Person: Person{
			name: "Jhon",
			age:  23,
		},
	}
	fmt.Println(e)
}
