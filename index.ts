import "./src/style.css";
import { App } from "./src/app";
const app = new App();

const dev = require("@k2works/full-stack-lab");
const contents = `
## 機能名

販売管理システム

## 仕様

## TODOリスト

- [ ] 部門／社員／商品マスタの設計
- [ ] 取引先（顧客／仕入先）マスタの設計

`;

const usecase = `
left to right direction
actor "ユーザー" as user
rectangle "部門情報管理システム" {
  usecase "部門情報の追加・変更・削除" as UC1
  usecase "部門情報の参照" as UC2
  usecase "部門階層の把握" as UC3
  usecase "部門位置の把握" as UC4
  usecase "従業員情報の参照" as UC5
  usecase "従業員業績の分析" as UC6
  usecase "部門業績の分析" as UC7
  usecase "財務情報の分析" as UC8
  usecase "人事施策の策定" as UC9
  usecase "戦略・経営計画策定情報収集" as UC10
}
user --> UC1
user --> UC2
user --> UC3
user --> UC4
user --> UC5
user --> UC6
user --> UC7
user --> UC8
user --> UC9
user --> UC10
`;

const ui = `
@startsalt
{+
{* File | Edit | Source | Refactor
 Refactor | New | Open File | - | Close | Close All }
{/ General | Fullscreen | Behavior | Saving }
{
{ Open image in: | ^Smart Mode^ }
[X] Smooth images when zoomed
[X] Confirm image deletion
[ ] Show hidden images
}
[Close]
}
@endsalt
`;

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
dev.default({ contents, ui, usecase, uml, erd });
