COMMENT ON TABLE dept_mst IS '部門マスタ';
COMMENT ON COLUMN dept_mst.dept_code IS '部門コード';
COMMENT ON COLUMN dept_mst.start_date IS '開始日';
COMMENT ON COLUMN dept_mst.end_date IS '終了日';
COMMENT ON COLUMN dept_mst.dep_name IS '部門名';
COMMENT ON COLUMN dept_mst.dept_layer IS '組織階層';
COMMENT ON COLUMN dept_mst.dept_psth IS '部門パス';
COMMENT ON COLUMN dept_mst.bottom_type IS '最下層区分';
COMMENT ON COLUMN dept_mst.slit_yn IS '伝票入力可否,0:不可 1:可能';
COMMENT ON COLUMN dept_mst.create_date IS '作成日時';
COMMENT ON COLUMN dept_mst.creator IS '作成者名';
COMMENT ON COLUMN dept_mst.update_date IS '更新日時';
COMMENT ON COLUMN dept_mst.updater IS '更新者名';