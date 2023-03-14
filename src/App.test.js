import { lyricSegment } from "./App.js";


describe("lyricSegment", () => {
  test("first line", () => {
    const result = lyricSegment(99);
    expect(result[0]).toBe("99 bottles of beer on the wall");
  });

  test("second line", () => {
    const result = lyricSegment(99);
    expect(result[1]).toBe("99 bottles of beer");
  });

  test("third line", () => {
    const result = lyricSegment(99);
    expect(result[2]).toBe("Take one down, pass it around");
  });

  test("last line", () => {
    const result = lyricSegment(99);
    expect(result[result.length - 1]).toBe("");
  });
});

