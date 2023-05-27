import "./src/style.css";
import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";

const contents = `
## [スッキリわかるPythonによる機械学習入門](https://sukkiri.jp/books/sukkiri_ml)

## 第Ⅰ部 ようこそ機械学習の世界へ

- [第4章 機械学習の体験](./notebooks/chap4.html)

## 第Ⅱ部 教師あり学習の理解を深めよう

- [第5章 分類1:アヤメの判別](./notebooks/chap5.html)
- [第6章 回帰1:映画の興行収入の予測](./notebooks/chap6.html)
- [第7章 分類2:客船沈没事故での生存確率](./notebooks/chap7.html)
- [第8章 回帰2:住宅の平均価格の予測](./notebooks/chap8.html)
- [第9章 練習問題:の金融機関のキャンペーン分析](./notebooks/chap9.html)
- [第9章 練習問題:の金融機関のキャンペーン分析解答](./notebooks/chap09.html)

## 第Ⅲ部 中級者への最初の１歩を踏み出そう

- [第10章 より実践的な前処理](./notebooks/chap10.html)
- [第11章 さまざまな教師あり学習：回帰](./notebooks/chap11.html)

`;

const usecase = `
@startuml
@enduml
`;

const ui = `
@startsalt
@endsalt
`

const uiModel = `
@startuml
`

const uiInteraction = `
@startuml
@enduml
`

const uml = `
@startuml
@enduml
`;

const erd = `
@startuml
@enduml
`;

const mode = "DOC"; // "UI" or "API" or "DOC"
render({ contents, ui, uiModel, uiInteraction, usecase, uml, erd, mode });
