import { ビールの歌, ビールの歌の歌詞 } from "./App.js";

const 歌 = ビールの歌(99, 0, ビールの歌の歌詞);
let body = '';
for (let i = 0; i < 歌.length; i++) {
  body += `<p>${歌[i].join("<br>")}</p>`;
}

document.getElementById("titlecontent").innerHTML = body;

