COMMENT ON TABLE credit_balance IS '与信残高データ';
COMMENT ON COLUMN credit_balance.comp_code IS '取引先コード';
COMMENT ON COLUMN credit_balance.order_balance IS '受注残高';
COMMENT ON COLUMN credit_balance.rec_balance IS '債権残高';
COMMENT ON COLUMN credit_balance.pay_balance IS '債務残高';
COMMENT ON COLUMN credit_balance.create_date IS '作成日時';
COMMENT ON COLUMN credit_balance.creator IS '作成者名';
COMMENT ON COLUMN credit_balance.update_date IS '更新日時';
COMMENT ON COLUMN credit_balance.updater IS '更新者名';
---
COMMENT ON TABLE auto_number IS '自動採番マスタ';
COMMENT ON COLUMN auto_number.slip_type IS '伝票種別コード';
COMMENT ON COLUMN auto_number.yearmonth IS '年月';
COMMENT ON COLUMN auto_number.last_silp_no IS '最終伝票番号';
