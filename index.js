import { App } from "./src/app.js";
const app = new App();

import render from "@k2works/full-stack-lab";
const contents = `
## 機能名

すっきりわかるSQL入門 第3版 SQLドリル

## 仕様

[データベース定義](./erd/public/index.html)

以下のER図は、以下のようなテーブル間の関係を表しています。

* 「取引」と「取引事由」は1対多の関係になります。

また、ER図の表現方法については以下の通りです。

- entity：テーブルを表します。
- PK：プライマリキーを表します。
- FK：外部キーを表します。
- "--"：フィールドを表します。
- "|"：1の関係を表します。
- "*"：多数の関係を表します。
- "o"：必須の関係を表します。

## TODOリスト
- [x] [銀行データベース](https://flair.link/BS3F1)
  - [x] 基本文法と四大命令
  - [x] 操作する行の絞り込み
  - [x] 検索結果の加工
  - [x] 式と関数
  - [x] 集計とグループ化
  - [x] 副問い合わせ
  - [x] 複数テーブルの結合
- [ ] [商品データベース](https://flair.link/BS3F2)
  - [x] 基本文法と四大命令
  - [x] 操作する行の絞り込み
  - [x] 検索結果の加工
  - [x] 式と関数
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
@startuml

' hide the spot
hide circle
' avoid problems with angled crows feet
skinparam linetype ortho

package "銀行口座データベース" {
  entity "口座" as account {
    * 口座番号 : text <<PK>>
    --
    * 名義 : text
    * 種別 : text
    * 残高 : integer
    更新日 : timestamp
  }

  entity "廃止口座" as closed_account {
    * 口座番号 : text <<PK>>
    --
    * 名義 : text
    * 種別 : text
    * 解約時残高 : integer
    解約日 : timestamp
  }

  entity "取引" as transaction {
    * 取引番号 : integer <<PK>>
    --
    口座番号 : text
    入金額 : integer
    出金額 : integer
    日付 : timestamp
    取引事由ID : integer <<FK>>
  }

  entity "取引事由" as transaction_reason {
    * 取引事由ID : integer <<PK>>
    --
    * 取引事由名 : text
  }
  transaction }o..|| transaction_reason : "n" -up- "1" 取引事由ID
}

package "商品データベース" {
  entity "商品" as product {

  商品コード : text <<PK>>
  --
  商品名 : text
  単価 : integer
  商品区分 : text
  関連商品コード : text
  }
  entity "廃番商品" as retired_product {

  商品コード : text <<PK>>
  --
  商品名 : text
  単価 : integer
  商品区分 : text
  廃番日 : timestamp
  売上個数 : integer
  }
  entity "注文" as order {

  日付 : timestamp <<PK>>
  受注番号 : text <<PK>>
  受注枝番 : integer <<PK>>
  --
  商品コード : text
  数量 : integer
  クーポン割引料 : integer
  }

  product ||..o{ product : "n" -up- "1" 関連商品コード
}


@enduml
`;
render({ contents, usecase, uml, erd });
