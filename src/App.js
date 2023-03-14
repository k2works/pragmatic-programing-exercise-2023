console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }
}

import * as _ from "lodash";

export function ビールの歌の歌詞(本数) {
  return _.chain([])
  .push(本数 + " 本のビールが残っている")
  .push(本数 + " 本のビール")
  .push("ひとつ取って、隣に回せ")
  .tap(歌詞 => {
    if (本数 > 1) {
      歌詞.push((本数 - 1) + " 本のビールが残っている");
    } else {
      歌詞.push("もうビールは残っていない");
    }
  })
  .value();
}

export function ビールの歌(start, end, 歌詞) {
  return _.reduce(
    _.range(start, end, -1),
    (acc, n) => {
    return acc.concat([歌詞(n)]);
    },
    []
  );
}
