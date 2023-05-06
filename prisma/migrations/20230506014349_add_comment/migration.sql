COMMENT ON TABLE purchase_orders IS '発注データ';
COMMENT ON COLUMN purchase_orders.po_no IS '発注番号';
COMMENT ON COLUMN purchase_orders.po_date IS '発注日';
COMMENT ON COLUMN purchase_orders.order_no IS '受注番号';
COMMENT ON COLUMN purchase_orders.sup_code IS '仕入先コード';
COMMENT ON COLUMN purchase_orders.sup_sub_no IS '仕入先枝番';
COMMENT ON COLUMN purchase_orders.emp_code IS '発注担当者コード';
COMMENT ON COLUMN purchase_orders.due_date IS '指定納期';
COMMENT ON COLUMN purchase_orders.wh_code IS '倉庫コード';
COMMENT ON COLUMN purchase_orders.po_amnt IS '発注金額合計';
COMMENT ON COLUMN purchase_orders.cmp_tax IS '消費税金額';
COMMENT ON COLUMN purchase_orders.slip_comment IS '備考';
COMMENT ON COLUMN purchase_orders.create_date IS '作成日時';
COMMENT ON COLUMN purchase_orders.creator IS '作成者名';
COMMENT ON COLUMN purchase_orders.update_date IS '更新日時';
COMMENT ON COLUMN purchase_orders.updater IS '更新者名';
---
COMMENT ON TABLE po_details IS '発注データ明細';
COMMENT ON COLUMN po_details.po_no IS '発注番号';
COMMENT ON COLUMN po_details.po_row_no IS '発注行番号';
COMMENT ON COLUMN po_details.po_row_dsp_no IS '発注行表示番号';
COMMENT ON COLUMN po_details.order_no IS '受注番号';
COMMENT ON COLUMN po_details.so_row_no IS '受注行番号';
COMMENT ON COLUMN po_details.prod_code IS '商品コード';
COMMENT ON COLUMN po_details.prod_name IS '商品名';
COMMENT ON COLUMN po_details.po_price IS '仕入単価';
COMMENT ON COLUMN po_details.po_qt IS '発注数量';
COMMENT ON COLUMN po_details.recived_qt IS '入荷済数量';
COMMENT ON COLUMN po_details.complete_flg IS '完了フラグ,0:未完了, 1:完了';
COMMENT ON COLUMN po_details.create_date IS '作成日時';
COMMENT ON COLUMN po_details.creator IS '作成者名';
COMMENT ON COLUMN po_details.update_date IS '更新日時';
COMMENT ON COLUMN po_details.updater IS '更新者名';
