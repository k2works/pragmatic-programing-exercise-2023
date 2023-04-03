import "./src/style.css";
import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";
const contents = `
## 機能名

オブジェクト指向UI設計の実践

## 仕様

### 学校名簿アプリケーションのタスク
- **ある生徒**が所属している**部活**を確認する
- **野球部**の**顧問教師**の**電話番号**を確認する
- **2年B組**の**担任**を確認する
- **ある生徒**が**何組**かを確認する
- **文化祭**の**主担当教員**を確認する
- **修学旅行**の**日付**を確認する
- **1年A組**の**名簿**を印刷する
- **運動部**の中で一番所属**生徒数**が多い**部**を確認する
- **3年C組**の**ある生徒**の**成績**を確認する

## TODOリスト

- [x] ステップ1 オブジェクトの抽出
- [ ] ステップ2 ビューとナビゲーションの検討
- [ ] ステップ3 レイアウトパターンの適用

`;

const usecase = `
@startuml
left to right direction
actor "生徒" as ac
rectangle 学校名後アプリケーション {
  usecase "一覧" as UC1
  usecase "登録" as UC2
  usecase "編集" as UC3
}
ac --> UC1
ac --> UC2
ac --> UC3
@enduml
`;

const ui = `
@startsalt
{+
  コレクション画面
  {+
  {
  生徒
  教員
  組
  部
  イベント
  } |
  {
    == 生徒
    { + <&zoom-in> (          )}
    {T#
    + 田尻　智裕  | 3年B組    | 野球部 写真部
    + 山田　太郎  | 3年A組    | 野球部
    + 鈴木　花子  | 3年A組    | 写真部
    }
  }
  }
----------------
  シングル画面
  {+
  {
  生徒
  教員
  組
  部
  イベント
  } |
  {
    {
      <&person> <b>田尻 智裕
    }
    {
      名前
      田尻　智裕
      組
      3年B組
      部
      野球部 写真部
      関連する生徒
      田尻　智裕 山田　太郎　鈴木　花子
    }
  }
  }
}
@endsalt

`

const uml = `
@startuml
生徒 *--* 部 
部 *-- 教員
教員 - 電話番号
組 - 教員
生徒 --* 組
イベント *- 教員
イベント -- 日付
カテゴリー -- 部
部 - 生徒数
生徒 - 成績

package "モデル" {
  class 部 {
    名称
    カテゴリー
    生徒数
    印刷()
    新規()
    削除()
  }
  class 生徒 {
    氏名
    成績
    印刷()
    新規()
    削除()
  }
  class 組 {
    名称
    印刷()
    新規()
    削除()
  }
  class 教員 {
    氏名
    電話番号
    印刷()
    新規()
    削除()
  }
  class イベント {
    名称
    日付
    印刷()
    新規()
    削除()
  }
  部 *-* 生徒
  部 *-- 教員
  イベント *- 教員
  生徒 --* 組
}

package "インタラクション" {
  生徒_コレクション -> 生徒_シングル
}
@enduml
`;

const erd = `
@startuml
@enduml
`;
render({ contents, ui, usecase, uml, erd });