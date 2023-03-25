import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";
const contents = `
## 機能名

SQLドリル

## 仕様

- すっきりわかるSQL入門 第3版

## TODOリスト
- [ ] [銀行データベース](https://flair.link/BS3F1)
  - [ ] 基本文法と四大命令
  - [ ] 操作する行の絞り込み
  - [ ] 検索結果の加工
  - [ ] 式と関数
  - [ ] 集計とグループ化
  - [ ] 副問い合わせ
  - [ ] 複数テーブルの結合
- [ ] [商品データベース](https://flair.link/BS3F2)
  - [ ] 基本文法と四大命令
  - [ ] 操作する行の絞り込み
  - [ ] 検索結果の加工
  - [ ] 式と関数
  - [ ] 集計とグループ化
  - [ ] 副問い合わせ
  - [ ] 複数テーブルの結合
- [ ] [RPGデータベース](https://flair.link/BS3F3)
  - [ ] 基本文法と四大命令
  - [ ] 操作する行の絞り込み
  - [ ] 検索結果の加工
  - [ ] 式と関数
  - [ ] 集計とグループ化
  - [ ] 副問い合わせ
  - [ ] 複数テーブルの結合
`;

const usecase = `
`;

const uml = `
`;

const erd = `
`;
render({ contents, usecase, uml, erd });