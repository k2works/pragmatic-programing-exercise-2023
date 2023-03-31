import "./src/style.css";
import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";
const contents = `
## 機能名

オブジェクト指向UI設計の実践

## 仕様

## TODOリスト

- [ ] ステップ1 オブジェクトの抽出
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
package "モデル" {
  class 生徒 {
    氏名
    成績
    印刷する()
  }
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