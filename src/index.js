import { ビールの歌, ビールの歌の歌詞 } from "./App.js";
import { setUp } from "./Dev.js";

console.log(ビールの歌(99, 0, ビールの歌の歌詞));

const 歌 = ビールの歌(99, 0, ビールの歌の歌詞);

let body = '';

for(let i = 0; i < 歌.length; i++) {
  body += `<div>${歌[i].join(" ")}</div>`;
}

document.getElementById("app").innerHTML = body;

