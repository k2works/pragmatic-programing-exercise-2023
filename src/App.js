console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }
}

export function lyricSegment() {
  var lyrics = [];

  for (var bottles = 99; bottles > 0; bottles--) {
    lyrics.push(bottles + " bottles of beer on the wall");
    lyrics.push(bottles + " bottles of beer");
    lyrics.push("Take one down, pass it around");
    if (bottles > 1) {
      lyrics.push((bottles - 1) + " bottles of beer on the wall.");
    } else {
      lyrics.push("No more bottles of beer on the wall!");
    }
  }

  return lyrics;
}
