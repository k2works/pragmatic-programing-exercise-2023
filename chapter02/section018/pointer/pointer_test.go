package pointer

import "testing"

func Test_main(t *testing.T) {
	var ptr *int
	var i int = 12345
	ptr = &i

	t.Log("iのアドレス:", &i)
	t.Log("ptrの値(変数iのアドレス):", ptr)

	t.Log("iの値:", i)
	t.Log("ポインタ経由のiの値:", *ptr)

	*ptr = 999

	t.Log("ポインタ経由で変更したiの値:", i)
}
