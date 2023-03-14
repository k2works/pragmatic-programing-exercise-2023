import { lyricSegment } from "./App.js";


describe("lyricSegment", () => {
  let result;
  beforeEach(() => {
    result = lyricSegment();
  });

  test("first line", () => {
    expect(result[0]).toBe("99 bottles of beer on the wall");
  });

  test("second line", () => {
    expect(result[1]).toBe("99 bottles of beer");
  });

  test("third line", () => {
    expect(result[2]).toBe("Take one down, pass it around");
  });

  test("last line", () => {
    expect(result[result.length - 1]).toBe("No more bottles of beer on the wall!");
  });
});

