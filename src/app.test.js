import { sum } from "./app.js";

test("adds 1 + 2 to equal 3", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

describe("らしからぬコード", () => {
  // ランレングス圧縮
  // rle :: String -> String
  function rle(s) {
    if (s === '') return '';

    const [h, ...t] = s;
    return aux(1, h, t, h);

    // aux :: Int -> Char -> String -> Char -> String
    function aux(runLength, prevChar, str, currentChar) {
      if (str.length === 0) return prevChar + runLength;

      const [c, ...s] = str;
      if (c === prevChar) {
        return aux(runLength + 1, prevChar, s, currentChar);
      } else {
        return prevChar + runLength + aux(1, c, s, c);
      }
    }
  }

  test('rle', () => {
    expect(rle('')).toBe('');
    expect(rle('A')).toBe('A1');
    expect(rle('AA')).toBe('A2');
    expect(rle('AAA')).toBe('A3');
    expect(rle('AAAA')).toBe('A4');
    expect(rle('AB')).toBe('A1B1');
    expect(rle('ABB')).toBe('A1B2');
    expect(rle('AABBB')).toBe('A2B3');
    expect(rle('AABBBB')).toBe('A2B4');
    expect(rle('AABBBBC')).toBe('A2B4C1');
  });
})

describe("らしいコード", () => {
  const rle = (str) => {
    const groups = ((str) => {
      const result = [];
      let currentGroup = null;
      for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (currentGroup === null || currentGroup.char !== char) {
          currentGroup = { char: char, length: 1 };
          result.push(currentGroup);
        } else {
          currentGroup.length++;
        }
      }
      return result;
    })(str)

    return groups.length === 0 ? "" : groups.map((group) => group.char + group.length).join("");
  }


  test('rle', () => {
    expect(rle('')).toBe('');
    expect(rle('A')).toBe('A1');
    expect(rle('AA')).toBe('A2');
    expect(rle('AAA')).toBe('A3');
    expect(rle('AAAA')).toBe('A4');
    expect(rle('AB')).toBe('A1B1');
    expect(rle('ABB')).toBe('A1B2');
    expect(rle('AABBB')).toBe('A2B3');
    expect(rle('AABBBB')).toBe('A2B4');
    expect(rle('AABBBBC')).toBe('A2B4C1');
  });
})