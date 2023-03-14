console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }
}

export function ビールの歌() {
  let 歌詞 = [];

  for (let 本数 = 99; 本数 > 0; 本数--) {
    歌詞.push(本数 + " 本のビールが残っている");
    歌詞.push(本数 + " 本のビール");
    歌詞.push("ひとつ取って、隣に回せ");
    if (本数 > 1) {
      歌詞.push((本数 - 1) + " 本のビールが残っている");
    } else {
      歌詞.push("もうビールは残っていない");
    }
  }

  return 歌詞;
}
