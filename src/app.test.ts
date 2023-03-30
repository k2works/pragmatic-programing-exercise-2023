import { sum } from './app';

test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

/**
 * ランレングス圧縮
 * @param str 入力文字列
 * @returns 圧縮後の文字列
 *
 * @example
 * rle("") // ""
 * rle("AAABBCCCAAA") // "A3B2C3A3"
 */
function rle(str: string): string {
  if (str === "") {
    return "";
  }
  const [h, ...t] = str;
  return aux(1, h, t, h);
}

function aux(runLength: number, prevChar: string, s: string[], currentChar: string): string {
  if (s.length === 0) {
    return prevChar + String(runLength);
  }
  const [c, ...rest] = s;
  if (c === prevChar) {
    return aux(runLength + 1, prevChar, rest, currentChar);
  }
  return prevChar + runLength.toString() + aux(1, c, rest, c);
}

test("rle", () => {
  expect(rle("")).toBe("");
  expect(rle("AAABBCCCAAA")).toBe("A3B2C3A3");
});