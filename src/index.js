import { ビールの歌, ビールの歌の歌詞 } from "./App.js";

const createSongHTML = 歌 => 歌.map(
  (歌詞, i) => `<p>${歌詞.join("<br>")}</p>`
).join("");

document.getElementById("titlecontent").innerHTML = createSongHTML(ビールの歌(99, 0, ビールの歌の歌詞));

