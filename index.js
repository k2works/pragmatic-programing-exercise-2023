import "./src/style.css";
import { App } from './src/app.js';
const app = new App();

import render from "@k2works/full-stack-lab";

const contents = `
## 第1部 統計学を始めよう
## 第2部 PythonとJupyter Notebookの基本
## [第3部 記述統計](./notebooks/part1.html)
## [第4部 確率と確率分布の基本](./notebooks/part2.html)
## [第5部 推測統計](./notebooks/part3.html)
## 第6部 統計的仮説検定
## 第7部 統計モデルの基本
## 第8部 正規線形モデル
## 第9部 一般化線形モデル
## 第10部 統計学と機械学習
`;

const usecase = `
@startuml
left to right direction
actor "Actor" as ac
rectangle Application {
  usecase "UseCase1" as UC1
  usecase "UseCase2" as UC2
  usecase "UseCase3" as UC3
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

const uiModel = `
@startuml
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
`

const uiInteraction = `
@startuml
  イベント_コレクション --> イベント_シングル
  イベント_シングル --> 教員_シングル
  教員_コレクション --> 教員_シングル
  教員_シングル --> 部_コレクション
  教員_シングル <-> 組_シングル
  組_コレクション --> 組_シングル
  組_シングル --> 生徒_コレクション
  生徒_コレクション --> 生徒_シングル
  生徒_シングル -> 組_シングル
  生徒_シングル --> 部_コレクション
  部_コレクション --> 部_シングル
  部_シングル --> 生徒_コレクション
@enduml
`

const uml = `
@startuml
abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection
List <|-- AbstractList
Collection <|-- AbstractCollection
Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList
class ArrayList {
  Object[] elementData
  size()
}
enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}
annotation SuppressWarnings
@enduml
`;

const erd = `
@startuml
' hide the spot
hide circle
' avoid problems with angled crows feet
skinparam linetype ortho
entity "Entity01" as e01 {
  *e1_id : number <<generated>>
  --
  *name : text
  description : text
}
entity "Entity02" as e02 {
  *e2_id : number <<generated>>
  --
  *e1_id : number <<FK>>
  other_details : text
}
entity "Entity03" as e03 {
  *e3_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}
e01 ||..o{ e02
e01 |o..o{ e03
@enduml
`;

const mode = "DOC"; // "UI" or "API" or "DOC"
render({ contents, ui, uiModel, uiInteraction, usecase, uml, erd, mode });
