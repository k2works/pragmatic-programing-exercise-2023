COMMENT ON TABLE products IS '商品マスタ';
COMMENT ON COLUMN products.prod_code IS '商品コード';
COMMENT ON COLUMN products.prod_fullname IS '商品正式名';
COMMENT ON COLUMN products.prod_name IS '商品名';
COMMENT ON COLUMN products.prod_kana IS '商品名カナ';
COMMENT ON COLUMN products.prod_type IS '商品区分,1:商品 2:製品 3:原材料 4:間接材';
COMMENT ON COLUMN products.serial_no IS '製品型番';
COMMENT ON COLUMN products.unitprice IS '販売単価';
COMMENT ON COLUMN products.po_price IS '仕入単価';
COMMENT ON COLUMN products.prime_cost IS '売上原価';
COMMENT ON COLUMN products.tax_type IS '税区分,1:外税 2:内税';
COMMENT ON COLUMN products.category_code IS '商品分類コード';
COMMENT ON COLUMN products.wide_use_type IS '雑区分';
COMMENT ON COLUMN products.stock_manage_type IS '在庫管理対象区分,0:対象外 1:在庫管理対象';
COMMENT ON COLUMN products.stock_reserve_type IS '在庫引当区分,0:対象外 1:即時 2:まとめ 3:手配品';
COMMENT ON COLUMN products.sup_code IS '仕入先コード';
COMMENT ON COLUMN products.sup_sub_no IS '仕入先枝番';
COMMENT ON COLUMN products.create_date IS '作成日時';
COMMENT ON COLUMN products.creator IS '作成者名';
COMMENT ON COLUMN products.update_date IS '更新日時';
COMMENT ON COLUMN products.updater IS '更新者名';
--
COMMENT ON TABLE product_category IS '商品分類マスタ';
COMMENT ON COLUMN product_category.category_code IS '商品分類コード';
COMMENT ON COLUMN product_category.prod_cate_name IS '商品分類名';
COMMENT ON COLUMN product_category.category_layer IS '商品分類階層';
COMMENT ON COLUMN product_category.category_path IS '商品分類パス';
COMMENT ON COLUMN product_category.lowest_flug IS '最下層区分';
COMMENT ON COLUMN product_category.create_date IS '作成日時';
COMMENT ON COLUMN product_category.creator IS '作成者名';
COMMENT ON COLUMN product_category.update_date IS '更新日時';
COMMENT ON COLUMN product_category.updater IS '更新者名';
--
COMMENT ON TABLE pricebycustomer IS '顧客別販売単価';
COMMENT ON COLUMN pricebycustomer.prod_code IS '商品コード';
COMMENT ON COLUMN pricebycustomer.comp_code IS '取引先コード';
COMMENT ON COLUMN pricebycustomer.unitprice IS '販売単価';
COMMENT ON COLUMN pricebycustomer.create_date IS '作成日時';
COMMENT ON COLUMN pricebycustomer.creator IS '作成者名';
COMMENT ON COLUMN pricebycustomer.update_date IS '更新日時';
COMMENT ON COLUMN pricebycustomer.updater IS '更新者名';
--
COMMENT ON TABLE companys_mst IS '取引先マスタ'
;
COMMENT ON COLUMN companys_mst.comp_code IS '取引先コード';
COMMENT ON COLUMN companys_mst.comp_name IS '取引先名';
COMMENT ON COLUMN companys_mst.comp_kana IS '取引先名カナ';
COMMENT ON COLUMN companys_mst.sup_type IS '仕入先区分';
COMMENT ON COLUMN companys_mst.zip_code IS '郵便番号';
COMMENT ON COLUMN companys_mst.state IS '都道府県';
COMMENT ON COLUMN companys_mst.address1 IS '住所１';
COMMENT ON COLUMN companys_mst.address2 IS '住所２';
COMMENT ON COLUMN companys_mst.no_sales_flg IS '取引禁止フラグ';
COMMENT ON COLUMN companys_mst.wide_use_type IS '雑区分';
COMMENT ON COLUMN companys_mst.comp_group_code IS '取引先グループコード';
COMMENT ON COLUMN companys_mst.max_credit IS '与信限度額';
COMMENT ON COLUMN companys_mst.temp_credit_up IS '与信一時増加枠';
COMMENT ON COLUMN companys_mst.create_date IS '作成日時';
COMMENT ON COLUMN companys_mst.creator IS '作成者名';
COMMENT ON COLUMN companys_mst.update_date IS '更新日時';
COMMENT ON COLUMN companys_mst.updater IS '更新者名';