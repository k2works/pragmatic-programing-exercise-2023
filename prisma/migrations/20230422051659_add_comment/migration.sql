
COMMENT ON TABLE category_type IS '取引先分類種別マスタ';
COMMENT ON COLUMN category_type.category_type_code IS '取引先分類種別コード';
COMMENT ON COLUMN category_type.cate_type_name IS '取引先分類種別名';
COMMENT ON COLUMN category_type.create_date IS '作成日時';
COMMENT ON COLUMN category_type.creator IS '作成者名';
COMMENT ON COLUMN category_type.update_date IS '更新日時';
COMMENT ON COLUMN category_type.updater IS '更新者名';
---
COMMENT ON TABLE company_category IS '取引先分類マスタ';
COMMENT ON COLUMN company_category.category_type IS '取引先分類種別コード';
COMMENT ON COLUMN company_category.comp_cate_code IS '取引先分類コード';
COMMENT ON COLUMN company_category.comp_cate_name IS '取引先分類名';
COMMENT ON COLUMN company_category.create_date IS '作成日時';
COMMENT ON COLUMN company_category.creator IS '作成者名';
COMMENT ON COLUMN company_category.update_date IS '更新日時';
COMMENT ON COLUMN company_category.updater IS '更新者名';
---
COMMENT ON TABLE company_category_group IS '取引先分類所属マスタ';
COMMENT ON COLUMN company_category_group.category_type IS '取引先分類種別コード';
COMMENT ON COLUMN company_category_group.comp_cate_code IS '取引先分類コード';
COMMENT ON COLUMN company_category_group.comp_code IS '取引先コード';
COMMENT ON COLUMN company_category_group.create_date IS '作成日時';
COMMENT ON COLUMN company_category_group.creator IS '作成者名';
COMMENT ON COLUMN company_category_group.update_date IS '更新日時';
COMMENT ON COLUMN company_category_group.updater IS '更新者名';
