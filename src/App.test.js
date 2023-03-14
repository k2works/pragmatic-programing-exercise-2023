import { ビールの歌 } from "./App.js";


describe("ビールの歌", () => {
  let result;
  beforeEach(() => {
    result = ビールの歌();
  });

  test("最初の行", () => {
    expect(result[0]).toBe("99 本のビールが残っている");
  });

  test("２行目", () => {
    expect(result[1]).toBe("99 本のビール");
  });

  test("３行目", () => {
    expect(result[2]).toBe("ひとつ取って、隣に回せ");
  });

  test("４行目", () => {
    expect(result[3]).toBe("98 本のビールが残っている");
  });

  test("最後の行", () => {
    expect(result[result.length - 1]).toBe("もうビールは残っていない");
  });
});

