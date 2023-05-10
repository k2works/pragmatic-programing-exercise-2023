CREATE DATABASE Sales
CREATE TABLE consumer
(
    consumer_code                   VARCHAR(16) NOT NULL,
    last_name                       VARCHAR(20) NOT NULL,
    first_name                      VARCHAR(20) NOT NULL,
    last_name_kana                  VARCHAR(40) NOT NULL,
    first_name_kana                 VARCHAR(40) NOT NULL,
    login_id                        VARCHAR(256) NOT NULL,
    email                           VARCHAR(256) NOT NULL,
    pwd                             VARCHAR(16) NOT NULL,
    birth_date                      DATETIME NOT NULL,
    sex                             INT NOT NULL,
    login_datetime                  DATETIME NULL,
    rest_point                      INT NULL,
    withdrawal_date                 DATETIME NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE consumer
    ADD CONSTRAINT customer_pk PRIMARY KEY NONCLUSTERED (consumer_code)
go
exec sp_addextendedproperty 'MS_Description', N'個人客,顧客', 'schema', N'dbo', 'table', N'consumer'
go
exec sp_addextendedproperty 'MS_Description', N'個人客コード', 'schema', N'dbo', 'table', N'consumer', 'column', N'consumer_code'
go
exec sp_addextendedproperty 'MS_Description', N'姓', 'schema', N'dbo', 'table', N'consumer', 'column', N'last_name'
go
exec sp_addextendedproperty 'MS_Description', N'名', 'schema', N'dbo', 'table', N'consumer', 'column', N'first_name'
go
exec sp_addextendedproperty 'MS_Description', N'姓カナ', 'schema', N'dbo', 'table', N'consumer', 'column', N'last_name_kana'
go
exec sp_addextendedproperty 'MS_Description', N'名カナ', 'schema', N'dbo', 'table', N'consumer', 'column', N'first_name_kana'
go
exec sp_addextendedproperty 'MS_Description', N'ログインid', 'schema', N'dbo', 'table', N'consumer', 'column', N'login_id'
go
exec sp_addextendedproperty 'MS_Description', N'メールアドレス', 'schema', N'dbo', 'table', N'consumer', 'column', N'email'
go
exec sp_addextendedproperty 'MS_Description', N'パスワード', 'schema', N'dbo', 'table', N'consumer', 'column', N'pwd'
go
exec sp_addextendedproperty 'MS_Description', N'生年月日', 'schema', N'dbo', 'table', N'consumer', 'column', N'birth_date'
go
exec sp_addextendedproperty 'MS_Description', N'性別', 'schema', N'dbo', 'table', N'consumer', 'column', N'sex'
go
exec sp_addextendedproperty 'MS_Description', N'ログイン日時', 'schema', N'dbo', 'table', N'consumer', 'column', N'login_datetime'
go
exec sp_addextendedproperty 'MS_Description', N'ポイント残高', 'schema', N'dbo', 'table', N'consumer', 'column', N'rest_point'
go
exec sp_addextendedproperty 'MS_Description', N'退会日', 'schema', N'dbo', 'table', N'consumer', 'column', N'withdrawal_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'consumer', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'consumer', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'consumer', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'consumer', 'column', N'updater'
go
-- CREATE INDEX CUSTOMER_IX4
-- ON CUSTOMER ("LAST_NAME"||"FIRST_NAME", "LAST_NAME_KANA"||"FIRST_NAME_KANA")
-- TABLESPACE TS_CUSTOMER_I01
-- /
go
CREATE TABLE customers_mst
(
    cust_code                       VARCHAR(8) NOT NULL,
    cust_sub_no                     INT NOT NULL,
    cust_type                       INT DEFAULT 0 NULL,
    ar_code                         VARCHAR(8) NOT NULL,
    ar_sub_no                       INT NULL,
    payer_code                      VARCHAR(8) NOT NULL,
    payer_sub_no                    INT NULL,
    cust_name                       VARCHAR(40) NOT NULL,
    cust_kana                       VARCHAR(40) NULL,
    emp_code                        VARCHAR(10) NOT NULL,
    cust_user_name                  VARCHAR(20) NULL,
    cust_user_dep_name              VARCHAR(40) NULL,
    cust_zip_code                   CHAR(8) NULL,
    cust_state                      VARCHAR(4) NULL,
    cust_address1                   VARCHAR(40) NULL,
    cust_address2                   VARCHAR(40) NULL,
    cust_tel                        VARCHAR(13) NULL,
    cust_fax                        VARCHAR(13) NULL,
    cust_email                      VARCHAR(100) NULL,
    cust_ar_flag                    INT NULL,
    cust_close_date1                INT NOT NULL,
    cust_pay_months1                INT DEFAULT 1 NULL,
    cust_pay_dates1                 INT NULL,
    cust_pay_method1                INT DEFAULT 1 NULL,
    cust_close_date2                INT NOT NULL,
    cust_pay_months2                INT DEFAULT 1 NULL,
    cust_pay_dates2                 INT NULL,
    cust_pay_method2                INT DEFAULT 1 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE customers_mst
    ADD CONSTRAINT pk_customers_mst PRIMARY KEY NONCLUSTERED (cust_code, cust_sub_no)
go
exec sp_addextendedproperty 'MS_Description', N'顧客マスタ', 'schema', N'dbo', 'table', N'customers_mst'
go
exec sp_addextendedproperty 'MS_Description', N'顧客コード', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客枝番', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'顧客区分', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_type'
go
exec sp_addextendedproperty 'MS_Description', N'請求先コード', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'ar_code'
go
exec sp_addextendedproperty 'MS_Description', N'請求先枝番', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'ar_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'回収先コード', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'payer_code'
go
exec sp_addextendedproperty 'MS_Description', N'回収先枝番', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'payer_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'顧客名', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_name'
go
exec sp_addextendedproperty 'MS_Description', N'顧客名カナ', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_kana'
go
exec sp_addextendedproperty 'MS_Description', N'自社担当者コード', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客担当者名', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_user_name'
go
exec sp_addextendedproperty 'MS_Description', N'顧客部門名', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_user_dep_name'
go
exec sp_addextendedproperty 'MS_Description', N'顧客郵便番号', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_zip_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客都道府県', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_state'
go
exec sp_addextendedproperty 'MS_Description', N'顧客住所１', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_address1'
go
exec sp_addextendedproperty 'MS_Description', N'顧客住所２', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_address2'
go
exec sp_addextendedproperty 'MS_Description', N'顧客電話番号', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_tel'
go
exec sp_addextendedproperty 'MS_Description', N'顧客fax番号', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_fax'
go
exec sp_addextendedproperty 'MS_Description', N'顧客メールアドレス', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_email'
go
exec sp_addextendedproperty 'MS_Description', N'顧客請求区分,1:都度請求,2:締請求', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_ar_flag'
go
exec sp_addextendedproperty 'MS_Description', N'顧客締日１,15:15日締め', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_close_date1'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払月１,0:当月,1:翌月,2:翌々月', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_months1'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払日１,10:10日払い,99：末日', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_dates1'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払方法１,1:振込,2:手形', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_method1'
go
exec sp_addextendedproperty 'MS_Description', N'顧客締日２,99:末締め', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_close_date2'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払月２,0:当月,1:翌月,2:翌々月', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_months2'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払日２,10:10日払い,99：末日', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_dates2'
go
exec sp_addextendedproperty 'MS_Description', N'顧客支払方法２,1:振込,2:手形', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'cust_pay_method2'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'customers_mst', 'column', N'updater'
go
CREATE TABLE pricebycustomer
(
    prod_code                       VARCHAR(16) NOT NULL,
    comp_code                       VARCHAR(8) NOT NULL,
    unitprice                       INT DEFAULT 0 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE pricebycustomer
    ADD CONSTRAINT pk_pricebycustomer PRIMARY KEY NONCLUSTERED (prod_code, comp_code)
go
exec sp_addextendedproperty 'MS_Description', N'顧客別販売単価', 'schema', N'dbo', 'table', N'pricebycustomer'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'販売単価', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'unitprice'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'pricebycustomer', 'column', N'updater'
go
CREATE TABLE stock
(
    wh_code                         VARCHAR(3) NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    rot_no                          VARCHAR(20) NOT NULL,
    stock_type                      VARCHAR(1) DEFAULT '1' NOT NULL,
    quality_type                    VARCHAR(1) DEFAULT 'G' NOT NULL,
    actual                          INT DEFAULT 1 NOT NULL,
    valid                           INT DEFAULT 1 NOT NULL,
    last_delivery_date              DATETIME NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE stock
    ADD CONSTRAINT pk_stock PRIMARY KEY NONCLUSTERED (wh_code, prod_code, rot_no, stock_type, quality_type)
go
exec sp_addextendedproperty 'MS_Description', N'在庫データ', 'schema', N'dbo', 'table', N'stock'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'stock', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'stock', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'ロット番号', 'schema', N'dbo', 'table', N'stock', 'column', N'rot_no'
go
exec sp_addextendedproperty 'MS_Description', N'在庫区分,1:自社在庫 2:預り在庫', 'schema', N'dbo', 'table', N'stock', 'column', N'stock_type'
go
exec sp_addextendedproperty 'MS_Description', N'良品区分,G:良品 F:不良品 U:未検品', 'schema', N'dbo', 'table', N'stock', 'column', N'quality_type'
go
exec sp_addextendedproperty 'MS_Description', N'実在庫数', 'schema', N'dbo', 'table', N'stock', 'column', N'actual'
go
exec sp_addextendedproperty 'MS_Description', N'有効在庫数', 'schema', N'dbo', 'table', N'stock', 'column', N'valid'
go
exec sp_addextendedproperty 'MS_Description', N'最終出荷日', 'schema', N'dbo', 'table', N'stock', 'column', N'last_delivery_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'stock', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'stock', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'stock', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'stock', 'column', N'updater'
go
CREATE TABLE pu
(
    pu_no                           VARCHAR(10) NOT NULL,
    pu_date                         DATETIME DEFAULT GETDATE() NULL,
    sup_code                        VARCHAR(8) NOT NULL,
    sup_sub_no                      INT NULL,
    emp_code                        VARCHAR(10) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    po_no                           VARCHAR(10) NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    pu_ammount                      INT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    slip_comment                    VARCHAR(1000) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE pu
    ADD CONSTRAINT pk_pu PRIMARY KEY NONCLUSTERED (pu_no)
go
exec sp_addextendedproperty 'MS_Description', N'仕入データ', 'schema', N'dbo', 'table', N'pu'
go
exec sp_addextendedproperty 'MS_Description', N'仕入番号', 'schema', N'dbo', 'table', N'pu', 'column', N'pu_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入日', 'schema', N'dbo', 'table', N'pu', 'column', N'pu_date'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先コード', 'schema', N'dbo', 'table', N'pu', 'column', N'sup_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先枝番', 'schema', N'dbo', 'table', N'pu', 'column', N'sup_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入担当者コード', 'schema', N'dbo', 'table', N'pu', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'開始日', 'schema', N'dbo', 'table', N'pu', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'発注番号', 'schema', N'dbo', 'table', N'pu', 'column', N'po_no'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'pu', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入金額合計', 'schema', N'dbo', 'table', N'pu', 'column', N'pu_ammount'
go
exec sp_addextendedproperty 'MS_Description', N'消費税金額', 'schema', N'dbo', 'table', N'pu', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'備考', 'schema', N'dbo', 'table', N'pu', 'column', N'slip_comment'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'pu', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'pu', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'pu', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'pu', 'column', N'updater'
go
CREATE TABLE pu_details
(
    pu_no                           VARCHAR(10) NOT NULL,
    pu_row_no                       INT NOT NULL,
    pu_row_dsp_no                   INT NOT NULL,
    po_row_no                       INT NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    wh_code                         VARCHAR(3) NOT NULL,
    prod_name                       VARCHAR(10) NOT NULL,
    po_price                        INT DEFAULT 0 NULL,
    pu_quantity                     INT DEFAULT 1 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE pu_details
    ADD CONSTRAINT pk_pu_details PRIMARY KEY NONCLUSTERED (pu_row_no, pu_no)
go
exec sp_addextendedproperty 'MS_Description', N'仕入データ明細', 'schema', N'dbo', 'table', N'pu_details'
go
exec sp_addextendedproperty 'MS_Description', N'仕入番号', 'schema', N'dbo', 'table', N'pu_details', 'column', N'pu_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入行番号', 'schema', N'dbo', 'table', N'pu_details', 'column', N'pu_row_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入行表示番号', 'schema', N'dbo', 'table', N'pu_details', 'column', N'pu_row_dsp_no'
go
exec sp_addextendedproperty 'MS_Description', N'発注行番号', 'schema', N'dbo', 'table', N'pu_details', 'column', N'po_row_no'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'pu_details', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'pu_details', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品名', 'schema', N'dbo', 'table', N'pu_details', 'column', N'prod_name'
go
exec sp_addextendedproperty 'MS_Description', N'仕入単価', 'schema', N'dbo', 'table', N'pu_details', 'column', N'po_price'
go
exec sp_addextendedproperty 'MS_Description', N'仕入数量', 'schema', N'dbo', 'table', N'pu_details', 'column', N'pu_quantity'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'pu_details', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'pu_details', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'pu_details', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'pu_details', 'column', N'updater'
go
CREATE TABLE supplier_mst
(
    sup_code                        VARCHAR(8) NOT NULL,
    sup_sub_no                      INT NOT NULL,
    sup_name                        VARCHAR(40) NOT NULL,
    sup_kana                        VARCHAR(40) NULL,
    sup_emp_name                    VARCHAR(20) NULL,
    sup_dep_name                    VARCHAR(40) NULL,
    sup_zip_code                    CHAR(8) NULL,
    sup_state                       VARCHAR(4) NULL,
    sup_address1                    VARCHAR(40) NULL,
    sup_address2                    VARCHAR(40) NULL,
    sup_tel                         VARCHAR(13) NULL,
    sup_fax                         VARCHAR(13) NULL,
    sup_email                       VARCHAR(100) NULL,
    sup_close_date                  INT NOT NULL,
    sup_pay_months                  INT DEFAULT 1 NULL,
    sup_pay_dates                   INT NULL,
    pay_method_type                 INT DEFAULT 1 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE supplier_mst
    ADD CONSTRAINT pk_supplier_mst PRIMARY KEY NONCLUSTERED (sup_code, sup_sub_no)
go
ALTER TABLE supplier_mst
    ADD CHECK (pay_method_type IN (1,2))
go
exec sp_addextendedproperty 'MS_Description', N'仕入先マスタ', 'schema', N'dbo', 'table', N'supplier_mst'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先コード', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先枝番', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先名', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_name'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先名カナ', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_kana'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先担当者名', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_emp_name'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先部門名', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_dep_name'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先郵便番号', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_zip_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先都道府県', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_state'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先住所１', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_address1'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先住所２', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_address2'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先電話番号', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_tel'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先fax番号', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_fax'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先メールアドレス', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_email'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先締日,15:15日締め', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_close_date'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先支払月,0:当月,1:翌月,2:翌々月', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_pay_months'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先支払日,10:10日払い,99：末日', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'sup_pay_dates'
go
exec sp_addextendedproperty 'MS_Description', N'支払方法区分,1:振込,2:手形', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'pay_method_type'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'supplier_mst', 'column', N'updater'
go
CREATE TABLE pay
(
    pay_no                          VARCHAR(10) NOT NULL,
    pay_date                        INT NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    sup_code                        VARCHAR(8) NOT NULL,
    sup_sub_no                      INT NULL,
    pay_method_type                 INT DEFAULT 1 NULL,
    pay_amnt                        INT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    complete_flg                    INT DEFAULT 0 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE pay
    ADD CONSTRAINT pk_pay PRIMARY KEY NONCLUSTERED (pay_no)
go
ALTER TABLE pay
    ADD CHECK (pay_method_type IN (1,2))
go
ALTER TABLE pay
    ADD CHECK (complete_flg IN (0,1))
go
exec sp_addextendedproperty 'MS_Description', N'支払データ', 'schema', N'dbo', 'table', N'pay'
go
exec sp_addextendedproperty 'MS_Description', N'支払番号', 'schema', N'dbo', 'table', N'pay', 'column', N'pay_no'
go
exec sp_addextendedproperty 'MS_Description', N'支払日,10:10日払い,99：末日', 'schema', N'dbo', 'table', N'pay', 'column', N'pay_date'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'pay', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'部門開始日', 'schema', N'dbo', 'table', N'pay', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先コード', 'schema', N'dbo', 'table', N'pay', 'column', N'sup_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先枝番', 'schema', N'dbo', 'table', N'pay', 'column', N'sup_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'支払方法区分,1:振込,2:手形', 'schema', N'dbo', 'table', N'pay', 'column', N'pay_method_type'
go
exec sp_addextendedproperty 'MS_Description', N'支払金額', 'schema', N'dbo', 'table', N'pay', 'column', N'pay_amnt'
go
exec sp_addextendedproperty 'MS_Description', N'消費税金額', 'schema', N'dbo', 'table', N'pay', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'支払完了フラグ,0:未完了, 1:完了', 'schema', N'dbo', 'table', N'pay', 'column', N'complete_flg'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'pay', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'pay', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'pay', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'pay', 'column', N'updater'
go
CREATE TABLE auto_number
(
    slip_type                       VARCHAR(2) NOT NULL,
    yearmonth                       DATETIME NOT NULL,
    last_silp_no                    INT DEFAULT 0 NOT NULL
)
go
ALTER TABLE auto_number
    ADD PRIMARY KEY NONCLUSTERED (slip_type, yearmonth)
go
exec sp_addextendedproperty 'MS_Description', N'自動採番マスタ', 'schema', N'dbo', 'table', N'auto_number'
go
exec sp_addextendedproperty 'MS_Description', N'伝票種別コード', 'schema', N'dbo', 'table', N'auto_number', 'column', N'slip_type'
go
exec sp_addextendedproperty 'MS_Description', N'年月', 'schema', N'dbo', 'table', N'auto_number', 'column', N'yearmonth'
go
exec sp_addextendedproperty 'MS_Description', N'最終伝票番号', 'schema', N'dbo', 'table', N'auto_number', 'column', N'last_silp_no'
go
CREATE TABLE employee
(
    emp_code                        VARCHAR(10) NOT NULL,
    emp_name                        VARCHAR(20) NULL,
    emp_kana                        VARCHAR(40) NULL,
    login_password                  VARCHAR(8) NULL,
    tel                             VARCHAR(13) NULL,
    fax                             VARCHAR(13) NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    occu_code                       VARCHAR(2) NOT NULL,
    approval_code                   VARCHAR(2) NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE employee
    ADD CONSTRAINT pk_employee PRIMARY KEY NONCLUSTERED (emp_code)
go
exec sp_addextendedproperty 'MS_Description', N'社員マスタ', 'schema', N'dbo', 'table', N'employee'
go
exec sp_addextendedproperty 'MS_Description', N'社員コード', 'schema', N'dbo', 'table', N'employee', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'社員名', 'schema', N'dbo', 'table', N'employee', 'column', N'emp_name'
go
exec sp_addextendedproperty 'MS_Description', N'社員名カナ', 'schema', N'dbo', 'table', N'employee', 'column', N'emp_kana'
go
exec sp_addextendedproperty 'MS_Description', N'パスワード', 'schema', N'dbo', 'table', N'employee', 'column', N'login_password'
go
exec sp_addextendedproperty 'MS_Description', N'電話番号', 'schema', N'dbo', 'table', N'employee', 'column', N'tel'
go
exec sp_addextendedproperty 'MS_Description', N'fax番号', 'schema', N'dbo', 'table', N'employee', 'column', N'fax'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'employee', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'開始日', 'schema', N'dbo', 'table', N'employee', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'職種コード', 'schema', N'dbo', 'table', N'employee', 'column', N'occu_code'
go
exec sp_addextendedproperty 'MS_Description', N'承認権限コード', 'schema', N'dbo', 'table', N'employee', 'column', N'approval_code'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'employee', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'employee', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'employee', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'employee', 'column', N'updater'
go
CREATE TABLE company_group_mst
(
    comp_group_code                 VARCHAR(4) NOT NULL,
    group_name                      VARCHAR(40) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE company_group_mst
    ADD CONSTRAINT pk_company_group_mst PRIMARY KEY  CLUSTERED (comp_group_code)
go
exec sp_addextendedproperty 'MS_Description', N'取引先グループマスタ', 'schema', N'dbo', 'table', N'company_group_mst'
go
exec sp_addextendedproperty 'MS_Description', N'取引先グループコード', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'comp_group_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先グループ名', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'group_name'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'company_group_mst', 'column', N'updater'
go
CREATE TABLE companys_mst
(
    comp_code                       VARCHAR(8) NOT NULL,
    comp_name                       VARCHAR(40) NOT NULL,
    comp_kana                       VARCHAR(40) NULL,
    sup_type                        INT DEFAULT 0 NULL,
    zip_code                        CHAR(8) NULL,
    state                           VARCHAR(4) NULL,
    address1                        VARCHAR(40) NULL,
    address2                        VARCHAR(40) NULL,
    no_sales_flg                    INT DEFAULT 0 NULL,
    wide_use_type                   INT NULL,
    comp_group_code                 VARCHAR(4) NOT NULL,
    max_credit                      INT NULL,
    temp_credit_up                  INT DEFAULT 0 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE companys_mst
    ADD CONSTRAINT pk_companys_mst PRIMARY KEY  CLUSTERED (comp_code)
go
ALTER TABLE companys_mst
    ADD CHECK (no_sales_flg IN (0,1))
go
exec sp_addextendedproperty 'MS_Description', N'取引先マスタ', 'schema', N'dbo', 'table', N'companys_mst'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先名', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'comp_name'
go
exec sp_addextendedproperty 'MS_Description', N'取引先名カナ', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'comp_kana'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先区分', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'sup_type'
go
exec sp_addextendedproperty 'MS_Description', N'郵便番号', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'zip_code'
go
exec sp_addextendedproperty 'MS_Description', N'都道府県', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'state'
go
exec sp_addextendedproperty 'MS_Description', N'住所１', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'address1'
go
exec sp_addextendedproperty 'MS_Description', N'住所２', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'address2'
go
exec sp_addextendedproperty 'MS_Description', N'取引禁止フラグ', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'no_sales_flg'
go
exec sp_addextendedproperty 'MS_Description', N'雑区分', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'wide_use_type'
go
exec sp_addextendedproperty 'MS_Description', N'取引先グループコード', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'comp_group_code'
go
exec sp_addextendedproperty 'MS_Description', N'与信限度額', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'max_credit'
go
exec sp_addextendedproperty 'MS_Description', N'与信一時増加枠', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'temp_credit_up'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'companys_mst', 'column', N'updater'
go
CREATE TABLE company_category
(
    category_type                   VARCHAR(2) NOT NULL,
    comp_cate_code                  VARCHAR(8) NOT NULL,
    comp_cate_name                  VARCHAR(30) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE company_category
    ADD CONSTRAINT pk_company_category PRIMARY KEY  CLUSTERED (comp_cate_code, category_type)
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類マスタ', 'schema', N'dbo', 'table', N'company_category'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類種別コード', 'schema', N'dbo', 'table', N'company_category', 'column', N'category_type'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類コード', 'schema', N'dbo', 'table', N'company_category', 'column', N'comp_cate_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類名', 'schema', N'dbo', 'table', N'company_category', 'column', N'comp_cate_name'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'company_category', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'company_category', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'company_category', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'company_category', 'column', N'updater'
go
CREATE TABLE category_type
(
    category_type_code              VARCHAR(2) NOT NULL,
    cate_type_name                  VARCHAR(20) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE category_type
    ADD CONSTRAINT pk_category_type PRIMARY KEY  CLUSTERED (category_type_code)
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類種別マスタ', 'schema', N'dbo', 'table', N'category_type'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類種別コード', 'schema', N'dbo', 'table', N'category_type', 'column', N'category_type_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類種別名', 'schema', N'dbo', 'table', N'category_type', 'column', N'cate_type_name'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'category_type', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'category_type', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'category_type', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'category_type', 'column', N'updater'
go
CREATE TABLE company_category_group
(
    category_type                   VARCHAR(2) NOT NULL,
    comp_cate_code                  VARCHAR(8) NOT NULL,
    comp_code                       VARCHAR(8) NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE company_category_group
    ADD CONSTRAINT pk_company_category_group PRIMARY KEY NONCLUSTERED (category_type, comp_code, comp_cate_code)
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類所属マスタ', 'schema', N'dbo', 'table', N'company_category_group'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類種別コード', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'category_type'
go
exec sp_addextendedproperty 'MS_Description', N'取引先分類コード', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'comp_cate_code'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'company_category_group', 'column', N'updater'
go
CREATE TABLE orders
(
    order_no                        VARCHAR(10) NOT NULL,
    order_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    cust_code                       VARCHAR(8) NOT NULL,
    cust_sub_no                     INT NULL,
    emp_code                        VARCHAR(10) NOT NULL,
    required_date                   DATETIME NULL,
    custorder_no                    VARCHAR(20) NULL,
    wh_code                         VARCHAR(3) NOT NULL,
    order_amnt                      INT DEFAULT 0 NOT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    slip_comment                    VARCHAR(1000) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE orders
    ADD CONSTRAINT pk_orders PRIMARY KEY NONCLUSTERED (order_no)
go
exec sp_addextendedproperty 'MS_Description', N'受注データ', 'schema', N'dbo', 'table', N'orders'
go
exec sp_addextendedproperty 'MS_Description', N'受注番号', 'schema', N'dbo', 'table', N'orders', 'column', N'order_no'
go
exec sp_addextendedproperty 'MS_Description', N'受注日', 'schema', N'dbo', 'table', N'orders', 'column', N'order_date'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'orders', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'部門開始日', 'schema', N'dbo', 'table', N'orders', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'顧客コード', 'schema', N'dbo', 'table', N'orders', 'column', N'cust_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客枝番', 'schema', N'dbo', 'table', N'orders', 'column', N'cust_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'社員コード', 'schema', N'dbo', 'table', N'orders', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'希望納期', 'schema', N'dbo', 'table', N'orders', 'column', N'required_date'
go
exec sp_addextendedproperty 'MS_Description', N'客先注文番号', 'schema', N'dbo', 'table', N'orders', 'column', N'custorder_no'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'orders', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'受注金額合計', 'schema', N'dbo', 'table', N'orders', 'column', N'order_amnt'
go
exec sp_addextendedproperty 'MS_Description', N'消費税金額', 'schema', N'dbo', 'table', N'orders', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'備考', 'schema', N'dbo', 'table', N'orders', 'column', N'slip_comment'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'orders', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'orders', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'orders', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'orders', 'column', N'updater'
go
CREATE TABLE order_details
(
    order_no                        VARCHAR(10) NOT NULL,
    so_row_no                       INT NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    prod_name                       VARCHAR(10) NOT NULL,
    unitprice                       INT DEFAULT 0 NOT NULL,
    quantity                        INT DEFAULT 1 NOT NULL,
    cmp_tax_rate                    INT NULL,
    reserve_qty                     INT DEFAULT 0 NULL,
    delivery_order_qty              INT DEFAULT 0 NULL,
    delivered_qty                   INT DEFAULT 0 NULL,
    complete_flg                    INT DEFAULT 0 NOT NULL,
    discount                        INT DEFAULT 0 NOT NULL,
    delivery_date                   DATETIME NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY NONCLUSTERED (order_no, so_row_no)
go
ALTER TABLE order_details
    ADD CHECK (delivered_qty >= 0)
go
ALTER TABLE order_details
    ADD CHECK (complete_flg IN (0,1))
go
exec sp_addextendedproperty 'MS_Description', N'受注データ明細', 'schema', N'dbo', 'table', N'order_details'
go
exec sp_addextendedproperty 'MS_Description', N'受注番号', 'schema', N'dbo', 'table', N'order_details', 'column', N'order_no'
go
exec sp_addextendedproperty 'MS_Description', N'受注行番号', 'schema', N'dbo', 'table', N'order_details', 'column', N'so_row_no'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'order_details', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品名', 'schema', N'dbo', 'table', N'order_details', 'column', N'prod_name'
go
exec sp_addextendedproperty 'MS_Description', N'販売単価', 'schema', N'dbo', 'table', N'order_details', 'column', N'unitprice'
go
exec sp_addextendedproperty 'MS_Description', N'受注数量', 'schema', N'dbo', 'table', N'order_details', 'column', N'quantity'
go
exec sp_addextendedproperty 'MS_Description', N'消費税率', 'schema', N'dbo', 'table', N'order_details', 'column', N'cmp_tax_rate'
go
exec sp_addextendedproperty 'MS_Description', N'引当数量', 'schema', N'dbo', 'table', N'order_details', 'column', N'reserve_qty'
go
exec sp_addextendedproperty 'MS_Description', N'出荷指示数量', 'schema', N'dbo', 'table', N'order_details', 'column', N'delivery_order_qty'
go
exec sp_addextendedproperty 'MS_Description', N'出荷済数量', 'schema', N'dbo', 'table', N'order_details', 'column', N'delivered_qty'
go
exec sp_addextendedproperty 'MS_Description', N'完了フラグ,0:未完了, 1:完了', 'schema', N'dbo', 'table', N'order_details', 'column', N'complete_flg'
go
exec sp_addextendedproperty 'MS_Description', N'値引金額', 'schema', N'dbo', 'table', N'order_details', 'column', N'discount'
go
exec sp_addextendedproperty 'MS_Description', N'納期', 'schema', N'dbo', 'table', N'order_details', 'column', N'delivery_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'order_details', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'order_details', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'order_details', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'order_details', 'column', N'updater'
go
CREATE TABLE destinations_mst
(
    comp_code                       VARCHAR(8) NOT NULL,
    comp_sub_no                     INT NOT NULL,
    dist_no                         INT NOT NULL,
    dist_name                       VARCHAR(40) NOT NULL,
    area_code                       VARCHAR(10) NOT NULL,
    zip_code                        CHAR(8) NULL,
    address1                        VARCHAR(40) NULL,
    address2                        VARCHAR(40) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE destinations_mst
    ADD CONSTRAINT pk_destinations_mst PRIMARY KEY NONCLUSTERED (comp_code, dist_no, comp_sub_no)
go
exec sp_addextendedproperty 'MS_Description', N'出荷先マスタ', 'schema', N'dbo', 'table', N'destinations_mst'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客枝番', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'comp_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'出荷先番号', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'dist_no'
go
exec sp_addextendedproperty 'MS_Description', N'出荷先名', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'dist_name'
go
exec sp_addextendedproperty 'MS_Description', N'地域コード', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'area_code'
go
exec sp_addextendedproperty 'MS_Description', N'出荷先郵便番号', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'zip_code'
go
exec sp_addextendedproperty 'MS_Description', N'出荷先住所１', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'address1'
go
exec sp_addextendedproperty 'MS_Description', N'出荷先住所２', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'address2'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'destinations_mst', 'column', N'updater'
go
CREATE TABLE products
(
    prod_code                       VARCHAR(16) NOT NULL,
    prod_fullname                   VARCHAR(40) NOT NULL,
    prod_name                       VARCHAR(10) NOT NULL,
    prod_kana                       VARCHAR(20) NOT NULL,
    prod_type                       VARCHAR(1) NULL,
    serial_no                       VARCHAR(40) NULL,
    unitprice                       INT DEFAULT 0 NOT NULL,
    po_price                        INT DEFAULT 0 NULL,
    prime_cost                      INT DEFAULT 0 NOT NULL,
    tax_type                        INT DEFAULT 1 NOT NULL,
    category_code                   VARCHAR(8) NULL,
    wide_use_type                   INT NULL,
    stock_manage_type               INT DEFAULT 1 NULL,
    stock_reserve_type              INT NULL,
    sup_code                        VARCHAR(8) NOT NULL,
    sup_sub_no                      INT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE products
    ADD CONSTRAINT pk_products PRIMARY KEY NONCLUSTERED (prod_code)
go
ALTER TABLE products
    ADD CHECK (tax_type IN (0,1))
go
exec sp_addextendedproperty 'MS_Description', N'商品マスタ', 'schema', N'dbo', 'table', N'products'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'products', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品正式名', 'schema', N'dbo', 'table', N'products', 'column', N'prod_fullname'
go
exec sp_addextendedproperty 'MS_Description', N'商品名', 'schema', N'dbo', 'table', N'products', 'column', N'prod_name'
go
exec sp_addextendedproperty 'MS_Description', N'商品名カナ', 'schema', N'dbo', 'table', N'products', 'column', N'prod_kana'
go
exec sp_addextendedproperty 'MS_Description', N'商品区分,1:商品 2:製品 3:原材料 4:間接材', 'schema', N'dbo', 'table', N'products', 'column', N'prod_type'
go
exec sp_addextendedproperty 'MS_Description', N'製品型番', 'schema', N'dbo', 'table', N'products', 'column', N'serial_no'
go
exec sp_addextendedproperty 'MS_Description', N'販売単価', 'schema', N'dbo', 'table', N'products', 'column', N'unitprice'
go
exec sp_addextendedproperty 'MS_Description', N'仕入単価', 'schema', N'dbo', 'table', N'products', 'column', N'po_price'
go
exec sp_addextendedproperty 'MS_Description', N'売上原価', 'schema', N'dbo', 'table', N'products', 'column', N'prime_cost'
go
exec sp_addextendedproperty 'MS_Description', N'税区分,1:外税 2:内税', 'schema', N'dbo', 'table', N'products', 'column', N'tax_type'
go
exec sp_addextendedproperty 'MS_Description', N'商品分類コード', 'schema', N'dbo', 'table', N'products', 'column', N'category_code'
go
exec sp_addextendedproperty 'MS_Description', N'雑区分', 'schema', N'dbo', 'table', N'products', 'column', N'wide_use_type'
go
exec sp_addextendedproperty 'MS_Description', N'在庫管理対象区分,0:対象外 1:在庫管理対象', 'schema', N'dbo', 'table', N'products', 'column', N'stock_manage_type'
go
exec sp_addextendedproperty 'MS_Description', N'在庫引当区分,0:対象外 1:即時 2:まとめ 3:手配品', 'schema', N'dbo', 'table', N'products', 'column', N'stock_reserve_type'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先コード', 'schema', N'dbo', 'table', N'products', 'column', N'sup_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先枝番', 'schema', N'dbo', 'table', N'products', 'column', N'sup_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'products', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'products', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'products', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'products', 'column', N'updater'
go
CREATE TABLE product_category
(
    category_code                   VARCHAR(8) NOT NULL,
    prod_cate_name                  VARCHAR(30) NULL,
    category_layer                  INT DEFAULT 0 NOT NULL,
    category_path                   VARCHAR(100) NULL,
    lowest_flug                     INT DEFAULT 0 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE product_category
    ADD CONSTRAINT pk_product_category PRIMARY KEY NONCLUSTERED (category_code)
go
exec sp_addextendedproperty 'MS_Description', N'商品分類マスタ', 'schema', N'dbo', 'table', N'product_category'
go
exec sp_addextendedproperty 'MS_Description', N'商品分類コード', 'schema', N'dbo', 'table', N'product_category', 'column', N'category_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品分類名', 'schema', N'dbo', 'table', N'product_category', 'column', N'prod_cate_name'
go
exec sp_addextendedproperty 'MS_Description', N'商品分類階層', 'schema', N'dbo', 'table', N'product_category', 'column', N'category_layer'
go
exec sp_addextendedproperty 'MS_Description', N'商品分類パス', 'schema', N'dbo', 'table', N'product_category', 'column', N'category_path'
go
exec sp_addextendedproperty 'MS_Description', N'最下層区分', 'schema', N'dbo', 'table', N'product_category', 'column', N'lowest_flug'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'product_category', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'product_category', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'product_category', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'product_category', 'column', N'updater'
go
CREATE TABLE invoice
(
    invoice_no                      VARCHAR(10) NOT NULL,
    invoiced_date                   DATETIME NULL,
    comp_code                       VARCHAR(8) NOT NULL,
    cust_sub_no                     INT NULL,
    last_received                   INT NULL,
    month_sales                     INT NULL,
    month_received                  INT NULL,
    month_invoice                   INT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    invoice_received                INT DEFAULT 0 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE invoice
    ADD CONSTRAINT pk_invoice PRIMARY KEY NONCLUSTERED (invoice_no)
go
exec sp_addextendedproperty 'MS_Description', N'請求データ', 'schema', N'dbo', 'table', N'invoice'
go
exec sp_addextendedproperty 'MS_Description', N'請求番号', 'schema', N'dbo', 'table', N'invoice', 'column', N'invoice_no'
go
exec sp_addextendedproperty 'MS_Description', N'請求日', 'schema', N'dbo', 'table', N'invoice', 'column', N'invoiced_date'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'invoice', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客枝番', 'schema', N'dbo', 'table', N'invoice', 'column', N'cust_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'前回入金額', 'schema', N'dbo', 'table', N'invoice', 'column', N'last_received'
go
exec sp_addextendedproperty 'MS_Description', N'当月売上額', 'schema', N'dbo', 'table', N'invoice', 'column', N'month_sales'
go
exec sp_addextendedproperty 'MS_Description', N'当月入金額', 'schema', N'dbo', 'table', N'invoice', 'column', N'month_received'
go
exec sp_addextendedproperty 'MS_Description', N'当月請求額', 'schema', N'dbo', 'table', N'invoice', 'column', N'month_invoice'
go
exec sp_addextendedproperty 'MS_Description', N'消費税金額', 'schema', N'dbo', 'table', N'invoice', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'請求消込金額', 'schema', N'dbo', 'table', N'invoice', 'column', N'invoice_received'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'invoice', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'invoice', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'invoice', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'invoice', 'column', N'updater'
go
CREATE TABLE invoice_details
(
    invoice_no                      VARCHAR(10) NOT NULL,
    sales_no                        VARCHAR(10) NOT NULL,
    row_no                          INT NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE invoice_details
    ADD CONSTRAINT pk_invoice_details PRIMARY KEY NONCLUSTERED (invoice_no, sales_no, row_no)
go
exec sp_addextendedproperty 'MS_Description', N'請求データ明細', 'schema', N'dbo', 'table', N'invoice_details'
go
exec sp_addextendedproperty 'MS_Description', N'請求番号', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'invoice_no'
go
exec sp_addextendedproperty 'MS_Description', N'売上番号', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'sales_no'
go
exec sp_addextendedproperty 'MS_Description', N'売上行番号', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'row_no'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'invoice_details', 'column', N'updater'
go
CREATE TABLE wh_mst
(
    wh_code                         VARCHAR(3) NOT NULL,
    wh_name                         VARCHAR(20) NULL,
    wh_type                         VARCHAR(1) DEFAULT 'N' NULL,
    zip_code                        CHAR(8) NULL,
    state                           VARCHAR(4) NULL,
    address1                        VARCHAR(40) NULL,
    address2                        VARCHAR(40) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE wh_mst
    ADD CONSTRAINT pk_wh_mst PRIMARY KEY  CLUSTERED (wh_code)
go
exec sp_addextendedproperty 'MS_Description', N'倉庫マスタ', 'schema', N'dbo', 'table', N'wh_mst'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫名', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'wh_name'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫区分,N:通常倉庫 C:得意先 S:仕入先 D:部門倉庫 P:製品倉庫 M:原材料倉庫', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'wh_type'
go
exec sp_addextendedproperty 'MS_Description', N'郵便番号', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'zip_code'
go
exec sp_addextendedproperty 'MS_Description', N'都道府県', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'state'
go
exec sp_addextendedproperty 'MS_Description', N'住所１', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'address1'
go
exec sp_addextendedproperty 'MS_Description', N'住所２', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'address2'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'wh_mst', 'column', N'updater'
go
CREATE TABLE wh_dept_mst
(
    wh_code                         VARCHAR(3) NOT NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE wh_dept_mst
    ADD CONSTRAINT pk_wh_dept_mst PRIMARY KEY NONCLUSTERED (wh_code, dept_code, start_date)
go
exec sp_addextendedproperty 'MS_Description', N'倉庫部門マスタ', 'schema', N'dbo', 'table', N'wh_dept_mst'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'開始日', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'wh_dept_mst', 'column', N'updater'
go
CREATE TABLE alternate_products
(
    prod_code                       VARCHAR(16) NOT NULL,
    alt_prod_code                   VARCHAR(16) NOT NULL,
    priority                        INT DEFAULT 1 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE alternate_products
    ADD CONSTRAINT pk_alternate_products PRIMARY KEY NONCLUSTERED (prod_code, alt_prod_code)
go
exec sp_addextendedproperty 'MS_Description', N'代替商品', 'schema', N'dbo', 'table', N'alternate_products'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'代替商品コード', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'alt_prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'優先順位', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'priority'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'alternate_products', 'column', N'updater'
go
CREATE TABLE location_mst
(
    wh_code                         VARCHAR(3) NOT NULL,
    location_code                   VARCHAR(4) NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE location_mst
    ADD CONSTRAINT pk_location_mst PRIMARY KEY NONCLUSTERED (wh_code, location_code, prod_code)
go
exec sp_addextendedproperty 'MS_Description', N'棚番マスタ', 'schema', N'dbo', 'table', N'location_mst'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'location_mst', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'棚番コード', 'schema', N'dbo', 'table', N'location_mst', 'column', N'location_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'location_mst', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'location_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'location_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'location_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'location_mst', 'column', N'updater'
go
CREATE TABLE area_mst
(
    area_code                       VARCHAR(10) NOT NULL,
    area_name                       VARCHAR(20) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE area_mst
    ADD CONSTRAINT pk_地域マスタ PRIMARY KEY  CLUSTERED (area_code)
go
exec sp_addextendedproperty 'MS_Description', N'地域マスタ', 'schema', N'dbo', 'table', N'area_mst'
go
exec sp_addextendedproperty 'MS_Description', N'地域コード', 'schema', N'dbo', 'table', N'area_mst', 'column', N'area_code'
go
exec sp_addextendedproperty 'MS_Description', N'地域名', 'schema', N'dbo', 'table', N'area_mst', 'column', N'area_name'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'area_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'area_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'area_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'area_mst', 'column', N'updater'
go
CREATE TABLE credit
(
    credit_no                       VARCHAR(10) NOT NULL,
    credit_date                     DATETIME NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    comp_code                       VARCHAR(8) NOT NULL,
    comp_sub_no                     INT NULL,
    pay_method_type                 INT DEFAULT 1 NULL,
    bank_acut_code                  VARCHAR(8) NULL,
    received_amnt                   INT DEFAULT 0 NULL,
    received                        INT DEFAULT 0 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL,
    update_plg_date                 DATETIME DEFAULT GETDATE() NULL,
    update_pgm                      VARCHAR(50) NULL
)
go
ALTER TABLE credit
    ADD CONSTRAINT pk_credit PRIMARY KEY NONCLUSTERED (credit_no)
go
ALTER TABLE credit
    ADD CHECK (pay_method_type IN (1,2))
go
exec sp_addextendedproperty 'MS_Description', N'入金データ', 'schema', N'dbo', 'table', N'credit'
go
exec sp_addextendedproperty 'MS_Description', N'入金番号', 'schema', N'dbo', 'table', N'credit', 'column', N'credit_no'
go
exec sp_addextendedproperty 'MS_Description', N'入金日', 'schema', N'dbo', 'table', N'credit', 'column', N'credit_date'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'credit', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'開始日', 'schema', N'dbo', 'table', N'credit', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'顧客コード', 'schema', N'dbo', 'table', N'credit', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'顧客枝番', 'schema', N'dbo', 'table', N'credit', 'column', N'comp_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'支払方法区分,1:振込,2:手形', 'schema', N'dbo', 'table', N'credit', 'column', N'pay_method_type'
go
exec sp_addextendedproperty 'MS_Description', N'入金口座コード', 'schema', N'dbo', 'table', N'credit', 'column', N'bank_acut_code'
go
exec sp_addextendedproperty 'MS_Description', N'入金金額', 'schema', N'dbo', 'table', N'credit', 'column', N'received_amnt'
go
exec sp_addextendedproperty 'MS_Description', N'消込金額', 'schema', N'dbo', 'table', N'credit', 'column', N'received'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'credit', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'credit', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'credit', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'credit', 'column', N'updater'
go
exec sp_addextendedproperty 'MS_Description', N'プログラム更新日時', 'schema', N'dbo', 'table', N'credit', 'column', N'update_plg_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新プログラム名', 'schema', N'dbo', 'table', N'credit', 'column', N'update_pgm'
go
CREATE TABLE bank_acut_mst
(
    bank_acut_code                  VARCHAR(8) NOT NULL,
    recive_act_name                 VARCHAR(30) NULL,
    appl_start_date                 DATETIME DEFAULT GETDATE() NOT NULL,
    appl_end_date                   DATETIME DEFAULT '2100/12/31' NULL,
    start_act_name                  VARCHAR(30) NULL,
    recive_bank_act_type            VARCHAR(1) NULL,
    recive_act_no                   VARCHAR(12) NULL,
    bank_act_type                   VARCHAR(1) NULL,
    act_name                        VARCHAR(20) NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    a_bank_code                     VARCHAR(4) NULL,
    a_bank_blnc_code                VARCHAR(3) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL,
    update_plg_date                 DATETIME DEFAULT GETDATE() NULL,
    update_pgm                      VARCHAR(50) NULL
)
go
ALTER TABLE bank_acut_mst
    ADD CONSTRAINT pk_bank_acut_mst PRIMARY KEY NONCLUSTERED (bank_acut_code)
go
exec sp_addextendedproperty 'MS_Description', N'入金口座マスタ', 'schema', N'dbo', 'table', N'bank_acut_mst'
go
exec sp_addextendedproperty 'MS_Description', N'入金口座コード', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'bank_acut_code'
go
exec sp_addextendedproperty 'MS_Description', N'入金口座名', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'recive_act_name'
go
exec sp_addextendedproperty 'MS_Description', N'適用開始日', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'appl_start_date'
go
exec sp_addextendedproperty 'MS_Description', N'適用終了日', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'appl_end_date'
go
exec sp_addextendedproperty 'MS_Description', N'適用開始後入金口座名', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'start_act_name'
go
exec sp_addextendedproperty 'MS_Description', N'入金口座区分,B:銀行 P:郵便局', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'recive_bank_act_type'
go
exec sp_addextendedproperty 'MS_Description', N'入金口座番号,銀行:7桁 郵便局:12桁', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'recive_act_no'
go
exec sp_addextendedproperty 'MS_Description', N'銀行口座種別,O:普通 C:当座', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'bank_act_type'
go
exec sp_addextendedproperty 'MS_Description', N'口座名義人', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'act_name'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'部門開始日', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'全銀協銀行コード', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'a_bank_code'
go
exec sp_addextendedproperty 'MS_Description', N'全銀協支店コード', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'a_bank_blnc_code'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'updater'
go
exec sp_addextendedproperty 'MS_Description', N'プログラム更新日時', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'update_plg_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新プログラム名', 'schema', N'dbo', 'table', N'bank_acut_mst', 'column', N'update_pgm'
go
CREATE TABLE sales
(
    sales_no                        VARCHAR(10) NOT NULL,
    order_no                        VARCHAR(10) NOT NULL,
    sales_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    sales_type                      INT DEFAULT 1 NULL,
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    comp_code                       VARCHAR(8) NOT NULL,
    emp_code                        VARCHAR(10) NOT NULL,
    sales_amnt                      INT DEFAULT 0 NOT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    slip_comment                    VARCHAR(1000) NULL,
    updated_no                      INT NULL,
    orgnl_no                        VARCHAR(10) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE sales
    ADD CONSTRAINT pk_sales PRIMARY KEY NONCLUSTERED (sales_no)
go
exec sp_addextendedproperty 'MS_Description', N'売上データ', 'schema', N'dbo', 'table', N'sales'
go
exec sp_addextendedproperty 'MS_Description', N'売上番号', 'schema', N'dbo', 'table', N'sales', 'column', N'sales_no'
go
exec sp_addextendedproperty 'MS_Description', N'受注番号', 'schema', N'dbo', 'table', N'sales', 'column', N'order_no'
go
exec sp_addextendedproperty 'MS_Description', N'売上日,出荷日', 'schema', N'dbo', 'table', N'sales', 'column', N'sales_date'
go
exec sp_addextendedproperty 'MS_Description', N'売上区分,1:売上 2:売上返品', 'schema', N'dbo', 'table', N'sales', 'column', N'sales_type'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'sales', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'部門開始日', 'schema', N'dbo', 'table', N'sales', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'sales', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'社員コード', 'schema', N'dbo', 'table', N'sales', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'売上金額合計', 'schema', N'dbo', 'table', N'sales', 'column', N'sales_amnt'
go
exec sp_addextendedproperty 'MS_Description', N'消費税合計', 'schema', N'dbo', 'table', N'sales', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'備考', 'schema', N'dbo', 'table', N'sales', 'column', N'slip_comment'
go
exec sp_addextendedproperty 'MS_Description', N'赤黒伝票番号', 'schema', N'dbo', 'table', N'sales', 'column', N'updated_no'
go
exec sp_addextendedproperty 'MS_Description', N'元伝票番号', 'schema', N'dbo', 'table', N'sales', 'column', N'orgnl_no'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'sales', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'sales', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'sales', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'sales', 'column', N'updater'
go
CREATE TABLE sales_details
(
    sales_no                        VARCHAR(10) NOT NULL,
    row_no                          INT NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    prod_name                       VARCHAR(10) NOT NULL,
    unitprice                       INT DEFAULT 0 NOT NULL,
    delivered_qty                   INT DEFAULT 0 NULL,
    quantity                        INT DEFAULT 1 NOT NULL,
    discount                        INT DEFAULT 0 NOT NULL,
    invoiced_date                   DATETIME NULL,
    invoice_no                      VARCHAR(10) NULL,
    invoice_delay_type              INT NULL,
    auto_journal_date               DATETIME NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE sales_details
    ADD CONSTRAINT pk_sales_details PRIMARY KEY NONCLUSTERED (sales_no, row_no)
go
exec sp_addextendedproperty 'MS_Description', N'売上データ明細', 'schema', N'dbo', 'table', N'sales_details'
go
exec sp_addextendedproperty 'MS_Description', N'売上番号', 'schema', N'dbo', 'table', N'sales_details', 'column', N'sales_no'
go
exec sp_addextendedproperty 'MS_Description', N'売上行番号', 'schema', N'dbo', 'table', N'sales_details', 'column', N'row_no'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'sales_details', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品名', 'schema', N'dbo', 'table', N'sales_details', 'column', N'prod_name'
go
exec sp_addextendedproperty 'MS_Description', N'販売単価', 'schema', N'dbo', 'table', N'sales_details', 'column', N'unitprice'
go
exec sp_addextendedproperty 'MS_Description', N'出荷数量', 'schema', N'dbo', 'table', N'sales_details', 'column', N'delivered_qty'
go
exec sp_addextendedproperty 'MS_Description', N'売上数量', 'schema', N'dbo', 'table', N'sales_details', 'column', N'quantity'
go
exec sp_addextendedproperty 'MS_Description', N'値引金額', 'schema', N'dbo', 'table', N'sales_details', 'column', N'discount'
go
exec sp_addextendedproperty 'MS_Description', N'請求日', 'schema', N'dbo', 'table', N'sales_details', 'column', N'invoiced_date'
go
exec sp_addextendedproperty 'MS_Description', N'請求番号', 'schema', N'dbo', 'table', N'sales_details', 'column', N'invoice_no'
go
exec sp_addextendedproperty 'MS_Description', N'請求遅延区分', 'schema', N'dbo', 'table', N'sales_details', 'column', N'invoice_delay_type'
go
exec sp_addextendedproperty 'MS_Description', N'自動仕訳処理日', 'schema', N'dbo', 'table', N'sales_details', 'column', N'auto_journal_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'sales_details', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'sales_details', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'sales_details', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'sales_details', 'column', N'updater'
go
CREATE TABLE purchase_orders
(
    po_no                           VARCHAR(10) NOT NULL,
    po_date                         DATETIME NULL,
    order_no                        VARCHAR(10) NOT NULL,
    sup_code                        VARCHAR(8) NOT NULL,
    sup_sub_no                      INT NULL,
    emp_code                        VARCHAR(10) NOT NULL,
    due_date                        DATETIME NULL,
    wh_code                         VARCHAR(3) NOT NULL,
    po_amnt                         INT NULL,
    cmp_tax                         INT DEFAULT 0 NOT NULL,
    slip_comment                    VARCHAR(1000) NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE purchase_orders
    ADD CONSTRAINT pk_purchase_orders PRIMARY KEY NONCLUSTERED (po_no)
go
exec sp_addextendedproperty 'MS_Description', N'発注データ', 'schema', N'dbo', 'table', N'purchase_orders'
go
exec sp_addextendedproperty 'MS_Description', N'発注番号', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'po_no'
go
exec sp_addextendedproperty 'MS_Description', N'発注日', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'po_date'
go
exec sp_addextendedproperty 'MS_Description', N'受注番号', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'order_no'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先コード', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'sup_code'
go
exec sp_addextendedproperty 'MS_Description', N'仕入先枝番', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'sup_sub_no'
go
exec sp_addextendedproperty 'MS_Description', N'発注担当者コード', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'emp_code'
go
exec sp_addextendedproperty 'MS_Description', N'指定納期', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'due_date'
go
exec sp_addextendedproperty 'MS_Description', N'倉庫コード', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'wh_code'
go
exec sp_addextendedproperty 'MS_Description', N'発注金額合計', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'po_amnt'
go
exec sp_addextendedproperty 'MS_Description', N'消費税金額', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'cmp_tax'
go
exec sp_addextendedproperty 'MS_Description', N'備考', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'slip_comment'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'purchase_orders', 'column', N'updater'
go
CREATE TABLE po_details
(
    po_no                           VARCHAR(10) NOT NULL,
    po_row_no                       INT NOT NULL,
    po_row_dsp_no                   INT NOT NULL,
    order_no                        VARCHAR(10) NOT NULL,
    so_row_no                       INT NOT NULL,
    prod_code                       VARCHAR(16) NOT NULL,
    prod_name                       VARCHAR(10) NOT NULL,
    po_price                        INT DEFAULT 0 NULL,
    po_qt                           INT DEFAULT 1 NOT NULL,
    recived_qt                      INT DEFAULT 1 NOT NULL,
    complete_flg                    INT DEFAULT 0 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE po_details
    ADD CONSTRAINT po_details_pkey PRIMARY KEY NONCLUSTERED (po_row_no, po_no)
go
ALTER TABLE po_details
    ADD CHECK (complete_flg IN (0,1))
go
exec sp_addextendedproperty 'MS_Description', N'発注データ明細', 'schema', N'dbo', 'table', N'po_details'
go
exec sp_addextendedproperty 'MS_Description', N'発注番号', 'schema', N'dbo', 'table', N'po_details', 'column', N'po_no'
go
exec sp_addextendedproperty 'MS_Description', N'発注行番号', 'schema', N'dbo', 'table', N'po_details', 'column', N'po_row_no'
go
exec sp_addextendedproperty 'MS_Description', N'発注行表示番号', 'schema', N'dbo', 'table', N'po_details', 'column', N'po_row_dsp_no'
go
exec sp_addextendedproperty 'MS_Description', N'受注番号', 'schema', N'dbo', 'table', N'po_details', 'column', N'order_no'
go
exec sp_addextendedproperty 'MS_Description', N'受注行番号', 'schema', N'dbo', 'table', N'po_details', 'column', N'so_row_no'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'po_details', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'商品名', 'schema', N'dbo', 'table', N'po_details', 'column', N'prod_name'
go
exec sp_addextendedproperty 'MS_Description', N'仕入単価', 'schema', N'dbo', 'table', N'po_details', 'column', N'po_price'
go
exec sp_addextendedproperty 'MS_Description', N'発注数量', 'schema', N'dbo', 'table', N'po_details', 'column', N'po_qt'
go
exec sp_addextendedproperty 'MS_Description', N'入荷済数量', 'schema', N'dbo', 'table', N'po_details', 'column', N'recived_qt'
go
exec sp_addextendedproperty 'MS_Description', N'完了フラグ,0:未完了, 1:完了', 'schema', N'dbo', 'table', N'po_details', 'column', N'complete_flg'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'po_details', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'po_details', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'po_details', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'po_details', 'column', N'updater'
go
CREATE TABLE bom
(
    prod_code                       VARCHAR(16) NOT NULL,
    bom_code                        VARCHAR(16) NOT NULL,
    quantity                        INT DEFAULT 1 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE bom
    ADD CONSTRAINT pk_bom PRIMARY KEY NONCLUSTERED (prod_code)
go
exec sp_addextendedproperty 'MS_Description', N'部品表', 'schema', N'dbo', 'table', N'bom'
go
exec sp_addextendedproperty 'MS_Description', N'商品コード', 'schema', N'dbo', 'table', N'bom', 'column', N'prod_code'
go
exec sp_addextendedproperty 'MS_Description', N'部品コード', 'schema', N'dbo', 'table', N'bom', 'column', N'bom_code'
go
exec sp_addextendedproperty 'MS_Description', N'部品数量', 'schema', N'dbo', 'table', N'bom', 'column', N'quantity'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'bom', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'bom', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'bom', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'bom', 'column', N'updater'
go
CREATE TABLE dept_mst
(
    dept_code                       VARCHAR(6) NOT NULL,
    start_date                      DATETIME DEFAULT GETDATE() NOT NULL,
    end_date                        DATETIME DEFAULT '2100/12/31' NULL,
    dep_name                        VARCHAR(40) NULL,
    dept_layer                      INT DEFAULT 0 NOT NULL,
    dept_psth                       VARCHAR(100) NOT NULL,
    最下層区分                      INT DEFAULT 0 NOT NULL,
    slit_yn                         INT DEFAULT 1 NOT NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE dept_mst
    ADD CONSTRAINT pk_dept_mst PRIMARY KEY  CLUSTERED (dept_code, start_date)
go
exec sp_addextendedproperty 'MS_Description', N'部門マスタ', 'schema', N'dbo', 'table', N'dept_mst'
go
exec sp_addextendedproperty 'MS_Description', N'部門コード', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'dept_code'
go
exec sp_addextendedproperty 'MS_Description', N'開始日', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'start_date'
go
exec sp_addextendedproperty 'MS_Description', N'終了日', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'end_date'
go
exec sp_addextendedproperty 'MS_Description', N'部門名', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'dep_name'
go
exec sp_addextendedproperty 'MS_Description', N'組織階層', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'dept_layer'
go
exec sp_addextendedproperty 'MS_Description', N'部門パス', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'dept_psth'
go
exec sp_addextendedproperty 'MS_Description', N'最下層区分', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'最下層区分'
go
exec sp_addextendedproperty 'MS_Description', N'伝票入力可否,0:不可 1:可能', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'slit_yn'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'dept_mst', 'column', N'updater'
go
CREATE TABLE credit_balance
(
    comp_code                       VARCHAR(8) NOT NULL,
    order_balance                   INT DEFAULT 0 NULL,
    rec_balance                     INT DEFAULT 0 NULL,
    pay_balance                     INT DEFAULT 0 NULL,
    create_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    creator                         VARCHAR(12) NULL,
    update_date                     DATETIME DEFAULT GETDATE() NOT NULL,
    updater                         VARCHAR(12) NULL
)
go
ALTER TABLE credit_balance
    ADD CONSTRAINT pk_credit_balance PRIMARY KEY NONCLUSTERED (comp_code)
go
exec sp_addextendedproperty 'MS_Description', N'与信残高データ', 'schema', N'dbo', 'table', N'credit_balance'
go
exec sp_addextendedproperty 'MS_Description', N'取引先コード', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'comp_code'
go
exec sp_addextendedproperty 'MS_Description', N'受注残高', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'order_balance'
go
exec sp_addextendedproperty 'MS_Description', N'債権残高', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'rec_balance'
go
exec sp_addextendedproperty 'MS_Description', N'債務残高', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'pay_balance'
go
exec sp_addextendedproperty 'MS_Description', N'作成日時', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'create_date'
go
exec sp_addextendedproperty 'MS_Description', N'作成者名', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'creator'
go
exec sp_addextendedproperty 'MS_Description', N'更新日時', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'update_date'
go
exec sp_addextendedproperty 'MS_Description', N'更新者名', 'schema', N'dbo', 'table', N'credit_balance', 'column', N'updater'
go
ALTER TABLE order_details
    ADD CONSTRAINT FK_ORDERS_ORDER_DETAILS FOREIGN KEY(order_no) REFERENCES orders (order_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pricebycustomer
    ADD CONSTRAINT FK_COMPANYS_MST_PRICEBYCUSTOME FOREIGN KEY(comp_code) REFERENCES companys_mst (comp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE supplier_mst
    ADD CONSTRAINT FK_COMPANYS_MST_SUPPLIER_MST FOREIGN KEY(sup_code) REFERENCES companys_mst (comp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE company_category
    ADD CONSTRAINT FK_CATEGORY_TYPE_COMPANY_CATEG FOREIGN KEY(category_type) REFERENCES category_type (category_type_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE company_category_group
    ADD CONSTRAINT FK_COMPANY_CATEGORY_COMPANY_CA FOREIGN KEY(comp_cate_code, category_type) REFERENCES company_category (comp_cate_code, category_type) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE orders
    ADD CONSTRAINT FK_EMPLOYEE_ORDERS FOREIGN KEY(emp_code) REFERENCES employee (emp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE orders
    ADD CONSTRAINT FK_CUSTOMERS_MST_ORDERS FOREIGN KEY(cust_code, cust_sub_no) REFERENCES customers_mst (cust_code, cust_sub_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE sales_details
    ADD CONSTRAINT FK_SALES_SALES_DETAILS FOREIGN KEY(sales_no) REFERENCES sales (sales_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE customers_mst
    ADD CONSTRAINT FK_COMPANYS_MST_CUSTOMERS_MST FOREIGN KEY(cust_code) REFERENCES companys_mst (comp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE invoice_details
    ADD CONSTRAINT FK_INVOICE_請求データ明細 FOREIGN KEY(invoice_no) REFERENCES invoice (invoice_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE bom
    ADD CONSTRAINT FK_PRODUCTS_BOM FOREIGN KEY(prod_code) REFERENCES products (prod_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE purchase_orders
    ADD CONSTRAINT FK_EMPLOYEE_PURCHASE_ORDERS FOREIGN KEY(emp_code) REFERENCES employee (emp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE po_details
    ADD CONSTRAINT FK_PURCHASE_ORDERS_PO_DETAILS FOREIGN KEY(po_no) REFERENCES purchase_orders (po_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE orders
    ADD CONSTRAINT FK_WH_MST_ORDERS FOREIGN KEY(wh_code) REFERENCES wh_mst (wh_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE stock
    ADD CONSTRAINT FK_WH_MST_STOCK FOREIGN KEY(wh_code) REFERENCES wh_mst (wh_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE wh_dept_mst
    ADD CONSTRAINT FK_WH_MST_WH_DEPT_MST FOREIGN KEY(wh_code) REFERENCES wh_mst (wh_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE wh_dept_mst
    ADD CONSTRAINT FK_DEPT_MST_WH_DEPT_MST FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE location_mst
    ADD CONSTRAINT FK_WH_MST_棚番マスタ FOREIGN KEY(wh_code) REFERENCES wh_mst (wh_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE location_mst
    ADD CONSTRAINT FK_PRODUCTS_棚番マスタ FOREIGN KEY(prod_code) REFERENCES products (prod_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pu
    ADD CONSTRAINT FK_EMPLOYEE_仕入データ FOREIGN KEY(emp_code) REFERENCES employee (emp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pu_details
    ADD CONSTRAINT FK_仕入データ_PU_DETAILS FOREIGN KEY(pu_no) REFERENCES pu (pu_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pu_details
    ADD CONSTRAINT FK_PRODUCTS_PU_DETAILS FOREIGN KEY(prod_code) REFERENCES products (prod_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pu
    ADD CONSTRAINT FK_DEPT_MST_仕入データ FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pu_details
    ADD CONSTRAINT FK_WH_MST_PU_DETAILS FOREIGN KEY(wh_code) REFERENCES wh_mst (wh_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pay
    ADD CONSTRAINT FK_SUPPLIER_MST_PAY FOREIGN KEY(sup_code, sup_sub_no) REFERENCES supplier_mst (sup_code, sup_sub_no) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE pay
    ADD CONSTRAINT FK_DEPT_MST_PAY FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE credit_balance
    ADD CONSTRAINT FK_COMPANYS_MST_CREDIT_BALANC FOREIGN KEY(comp_code) REFERENCES companys_mst (comp_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE credit
    ADD CONSTRAINT FK_DEPT_MST_CREDIT FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE bank_acut_mst
    ADD CONSTRAINT FK_DEPT_MST_入金口座マスタ FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE destinations_mst
    ADD CONSTRAINT FK_地域マスタ_DESTINATIONS_MST FOREIGN KEY(area_code) REFERENCES area_mst (area_code) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE orders
    ADD CONSTRAINT FK_DEPT_MST_ORDERS FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
ALTER TABLE sales
    ADD CONSTRAINT FK_DEPT_MST_SALES FOREIGN KEY(dept_code, start_date) REFERENCES dept_mst (dept_code, start_date) ON UPDATE NO ACTION ON DELETE NO ACTION
go
SELECT
A.PROD_CODE PROD_CODE,
A.PROD_FULLNAME PROD_FULLNAME,
A.PROD_NAME PROD_NAME,
A.PROD_KANA PROD_KANA,
A.PROD_TYPE PROD_TYPE,
A.SERIAL_NO SERIAL_NO,
A.UNITPRICE UNITPRICE,
A.PO_PRICE PO_PRICE,
A.prime_cost COST,
A.TAX_TYPE TAX_TYPE,
B.PROD_CATE_NAME PROD_CATE_NAME,
B.category_layer LAYER
FROM PRODUCTS A, PRODUCT_CATEGORY B
WHERE A.CATEGORY_CODE = B.CATEGORY_CODE
go
-- exec sp_addextendedproperty 'MS_Description', N'商品ビュー', 'schema', N'dbo', 'VIEW', N'products_v2'
-- go
