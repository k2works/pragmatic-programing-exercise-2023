package _map

import (
	"reflect"
	"testing"
)

func TestMap(t *testing.T) {
	capitals := make(map[string]string)

	capitals["日本"] = "東京"
	capitals["アメリカ"] = "ワシントンD.C."
	capitals["中国"] = "北京"

	expected := map[string]string{
		"日本":   "東京",
		"アメリカ": "ワシントンD.C.",
		"中国":   "北京",
	}
	if !reflect.DeepEqual(capitals, expected) {
		t.Errorf("Expected capitals to be %v, but got %v", expected, capitals)
	}
}
