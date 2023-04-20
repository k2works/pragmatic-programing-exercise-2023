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
  usecase 従業員情報の管理 as UC11
  usecase 所属部署ごとの従業員リストの作成 as UC12
  usecase ログイン情報の管理 as UC13
  usecase 電話番号やファックス番号などの連絡先情報の管理 as UC14
  usecase 従業員の業務履歴の管理 as UC15
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
user --> UC11
user --> UC12
user --> UC13
user --> UC14
user --> UC15
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

entity "dept_mst" as dept_mst {
  +dept_code [PK]
  +start_date [PK]
  --
  dep_name
  dept_layer
  dept_psth
  bottom_type
  slit_yn
  create_date
  creator
  update_date
  updater
}

entity "employee" as employee {
  +emp_code [PK]
  --
  dept_code [FK]
  start_date [FK]
  emp_name
  emp_kana
  login_password
  tel
  fax
  occu_code
  approval_code
  create_date
  creator
  update_date
  updater
}

dept_mst ||--o{ employee

  entity "products" as prod {
  *prod_code : varchar(16) <<PK>> <<map: "pk_products">>
  --
  prod_fullname : varchar(40)
  prod_name : varchar(10)
  prod_kana : varchar(20)
  prod_type : varchar(1)
  serial_no : varchar(40)
  unitprice : int <<default(0)>>
  po_price : int <<default(0)>>
  prime_cost : int <<default(0)>>
  tax_type : int <<default(1)>>
  category_code : varchar(8)
  wide_use_type : int
  stock_manage_type : int <<default(1)>>
  stock_reserve_type : int
  sup_code : varchar(8)
  sup_sub_no : int
  create_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  creator : varchar(12)
  update_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  updater : varchar(12)
}

entity "product_category" as prod_cate {
  *category_code : varchar(8) <<PK>> <<map: "pk_product_category">>
  --
  prod_cate_name : varchar(30)
  category_layer : int <<default(0)>>
  category_path : varchar(100)
  lowest_flug : int <<default(0)>>
  create_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  creator : varchar(12)
  update_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  updater : varchar(12)
}

entity "pricebycustomer" as price {
  *prod_code : varchar(16) <<FK>> ..o{ *comp_code : varchar(8) <<FK>> <<map: "pk_pricebycustomer">>
  --
  unitprice : int <<default(0)>>
  create_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  creator : varchar(12)
  update_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  updater : varchar(12)
}

entity "companys_mst" as comp {
  *comp_code : varchar(8) <<PK>> <<map: "pk_companys_mst">>
  --
  comp_name : varchar(40)
  comp_kana : varchar(40)
  sup_type : int <<default(0)>>
  zip_code : char(8)
  state : varchar(4)
  address1 : varchar(40)
  address2 : varchar(40)
  no_sales_flg : int <<default(0)>>
  wide_use_type : int
  comp_group_code : varchar(4)
  max_credit : int
  temp_credit_up : int <<default(0)>>
  create_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  creator : varchar(12)
  update_date : datetime <<default(dbgenerated("CURRENT_DATE"))>> <<Timestamp(6)>>
  updater : varchar(12)
}

prod ||-o{ prod_cate : belongs to
price }o-|| comp : has price
prod }o--|| prod : has bom
prod }o--o| price : has price
@enduml
`;
dev.default({ contents, ui, usecase, uml, erd });
