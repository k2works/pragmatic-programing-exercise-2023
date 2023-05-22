import "./src/style.css";
import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";

const contents = `
## 機能名

[スッキリわかるPythonによる機械学習入門](https://sukkiri.jp/books/sukkiri_ml)

## 仕様

- [第4章 機械学習の体験](./notebooks/chap4.html)
- [第5章 分類1:アヤメの判別](./notebooks/chap5.html)
- [第6章 回帰1:映画の興行収入の予測](./notebooks/chap6.html)
- [第7章 分類2:客船沈没事故での生存確率](./notebooks/chap7.html)
- [第8章 回帰2:住宅の平均価格の予測](./notebooks/chap8.html)
- [第9章 練習問題:の金融機関のキャンペーン分析](./notebooks/chap9.html)

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

const mode = "API"; // "UI" or "API"
render({ contents, ui, uiModel, uiInteraction, usecase, uml, erd, mode });
