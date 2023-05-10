-- CreateTable
CREATE TABLE "alternate_products" (
    "prod_code" VARCHAR(16) NOT NULL,
    "alt_prod_code" VARCHAR(16) NOT NULL,
    "priority" INTEGER DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_alternate_products" PRIMARY KEY ("prod_code","alt_prod_code")
);

-- CreateTable
CREATE TABLE "area_mst" (
    "area_code" VARCHAR(10) NOT NULL,
    "area_name" VARCHAR(20),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_地域マスタ" PRIMARY KEY ("area_code")
);

-- CreateTable
CREATE TABLE "auto_number" (
    "slip_type" VARCHAR(2) NOT NULL,
    "yearmonth" TIMESTAMP(6) NOT NULL,
    "last_silp_no" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "auto_number_pkey" PRIMARY KEY ("slip_type","yearmonth")
);

-- CreateTable
CREATE TABLE "bank_acut_mst" (
    "bank_acut_code" VARCHAR(8) NOT NULL,
    "recive_act_name" VARCHAR(30),
    "appl_start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "appl_end_date" TIMESTAMP(6) DEFAULT '2100-12-31 00:00:00'::timestamp without time zone,
    "start_act_name" VARCHAR(30),
    "recive_bank_act_type" VARCHAR(1),
    "recive_act_no" VARCHAR(12),
    "bank_act_type" VARCHAR(1),
    "act_name" VARCHAR(20),
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "a_bank_code" VARCHAR(4),
    "a_bank_blnc_code" VARCHAR(3),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),
    "update_plg_date" TIMESTAMP(6) DEFAULT CURRENT_DATE,
    "update_pgm" VARCHAR(50),

    CONSTRAINT "pk_bank_acut_mst" PRIMARY KEY ("bank_acut_code")
);

-- CreateTable
CREATE TABLE "bom" (
    "prod_code" VARCHAR(16) NOT NULL,
    "bom_code" VARCHAR(16) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_bom" PRIMARY KEY ("prod_code")
);

-- CreateTable
CREATE TABLE "category_type" (
    "category_type_code" VARCHAR(2) NOT NULL,
    "cate_type_name" VARCHAR(20),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_category_type" PRIMARY KEY ("category_type_code")
);

-- CreateTable
CREATE TABLE "company_category" (
    "category_type" VARCHAR(2) NOT NULL,
    "comp_cate_code" VARCHAR(8) NOT NULL,
    "comp_cate_name" VARCHAR(30),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_company_category" PRIMARY KEY ("comp_cate_code","category_type")
);

-- CreateTable
CREATE TABLE "company_category_group" (
    "category_type" VARCHAR(2) NOT NULL,
    "comp_cate_code" VARCHAR(8) NOT NULL,
    "comp_code" VARCHAR(8) NOT NULL,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_company_category_group" PRIMARY KEY ("category_type","comp_code","comp_cate_code")
);

-- CreateTable
CREATE TABLE "company_group_mst" (
    "comp_group_code" VARCHAR(4) NOT NULL,
    "group_name" VARCHAR(40),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_company_group_mst" PRIMARY KEY ("comp_group_code")
);

-- CreateTable
CREATE TABLE "companys_mst" (
    "comp_code" VARCHAR(8) NOT NULL,
    "comp_name" VARCHAR(40) NOT NULL,
    "comp_kana" VARCHAR(40),
    "sup_type" INTEGER DEFAULT 0,
    "zip_code" CHAR(8),
    "state" VARCHAR(4),
    "address1" VARCHAR(40),
    "address2" VARCHAR(40),
    "no_sales_flg" INTEGER DEFAULT 0,
    "wide_use_type" INTEGER,
    "comp_group_code" VARCHAR(4) NOT NULL,
    "max_credit" INTEGER,
    "temp_credit_up" INTEGER DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_companys_mst" PRIMARY KEY ("comp_code")
);

-- CreateTable
CREATE TABLE "consumer" (
    "consumer_code" VARCHAR(16) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name_kana" VARCHAR(40) NOT NULL,
    "first_name_kana" VARCHAR(40) NOT NULL,
    "login_id" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "pwd" VARCHAR(16) NOT NULL,
    "birth_date" TIMESTAMP(6) NOT NULL,
    "sex" INTEGER NOT NULL,
    "login_datetime" TIMESTAMP(6),
    "rest_point" INTEGER,
    "withdrawal_date" TIMESTAMP(6),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "customer_pk" PRIMARY KEY ("consumer_code")
);

-- CreateTable
CREATE TABLE "credit" (
    "credit_no" VARCHAR(10) NOT NULL,
    "credit_date" TIMESTAMP(6),
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "comp_code" VARCHAR(8) NOT NULL,
    "comp_sub_no" INTEGER,
    "pay_method_type" INTEGER DEFAULT 1,
    "bank_acut_code" VARCHAR(8),
    "received_amnt" INTEGER DEFAULT 0,
    "received" INTEGER DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),
    "update_plg_date" TIMESTAMP(6) DEFAULT CURRENT_DATE,
    "update_pgm" VARCHAR(50),

    CONSTRAINT "pk_credit" PRIMARY KEY ("credit_no")
);

-- CreateTable
CREATE TABLE "credit_balance" (
    "comp_code" VARCHAR(8) NOT NULL,
    "order_balance" INTEGER DEFAULT 0,
    "rec_balance" INTEGER DEFAULT 0,
    "pay_balance" INTEGER DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_credit_balance" PRIMARY KEY ("comp_code")
);

-- CreateTable
CREATE TABLE "customers_mst" (
    "cust_code" VARCHAR(8) NOT NULL,
    "cust_sub_no" INTEGER NOT NULL,
    "cust_type" INTEGER DEFAULT 0,
    "ar_code" VARCHAR(8) NOT NULL,
    "ar_sub_no" INTEGER,
    "payer_code" VARCHAR(8) NOT NULL,
    "payer_sub_no" INTEGER,
    "cust_name" VARCHAR(40) NOT NULL,
    "cust_kana" VARCHAR(40),
    "emp_code" VARCHAR(10) NOT NULL,
    "cust_user_name" VARCHAR(20),
    "cust_user_dep_name" VARCHAR(40),
    "cust_zip_code" CHAR(8),
    "cust_state" VARCHAR(4),
    "cust_address1" VARCHAR(40),
    "cust_address2" VARCHAR(40),
    "cust_tel" VARCHAR(13),
    "cust_fax" VARCHAR(13),
    "cust_email" VARCHAR(100),
    "cust_ar_flag" INTEGER,
    "cust_close_date1" INTEGER NOT NULL,
    "cust_pay_months1" INTEGER DEFAULT 1,
    "cust_pay_dates1" INTEGER,
    "cust_pay_method1" INTEGER DEFAULT 1,
    "cust_close_date2" INTEGER NOT NULL,
    "cust_pay_months2" INTEGER DEFAULT 1,
    "cust_pay_dates2" INTEGER,
    "cust_pay_method2" INTEGER DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_customers_mst" PRIMARY KEY ("cust_code","cust_sub_no")
);

-- CreateTable
CREATE TABLE "dept_mst" (
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "end_date" TIMESTAMP(6) DEFAULT '2100-12-31 00:00:00'::timestamp without time zone,
    "dep_name" VARCHAR(40),
    "dept_layer" INTEGER NOT NULL DEFAULT 0,
    "dept_psth" VARCHAR(100) NOT NULL,
    "slit_yn" INTEGER NOT NULL DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_dept_mst" PRIMARY KEY ("dept_code","start_date")
);

-- CreateTable
CREATE TABLE "destinations_mst" (
    "comp_code" VARCHAR(8) NOT NULL,
    "comp_sub_no" INTEGER NOT NULL,
    "dist_no" INTEGER NOT NULL,
    "dist_name" VARCHAR(40) NOT NULL,
    "area_code" VARCHAR(10) NOT NULL,
    "zip_code" CHAR(8),
    "address1" VARCHAR(40),
    "address2" VARCHAR(40),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_destinations_mst" PRIMARY KEY ("comp_code","dist_no","comp_sub_no")
);

-- CreateTable
CREATE TABLE "employee" (
    "emp_code" VARCHAR(10) NOT NULL,
    "emp_name" VARCHAR(20),
    "emp_kana" VARCHAR(40),
    "login_password" VARCHAR(8),
    "tel" VARCHAR(13),
    "fax" VARCHAR(13),
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "occu_code" VARCHAR(2) NOT NULL,
    "approval_code" VARCHAR(2) NOT NULL,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_employee" PRIMARY KEY ("emp_code")
);

-- CreateTable
CREATE TABLE "invoice" (
    "invoice_no" VARCHAR(10) NOT NULL,
    "invoiced_date" TIMESTAMP(6),
    "comp_code" VARCHAR(8) NOT NULL,
    "cust_sub_no" INTEGER,
    "last_received" INTEGER,
    "month_sales" INTEGER,
    "month_received" INTEGER,
    "month_invoice" INTEGER,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "invoice_received" INTEGER DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_invoice" PRIMARY KEY ("invoice_no")
);

-- CreateTable
CREATE TABLE "invoice_details" (
    "invoice_no" VARCHAR(10) NOT NULL,
    "sales_no" VARCHAR(10) NOT NULL,
    "row_no" INTEGER NOT NULL,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_invoice_details" PRIMARY KEY ("invoice_no","sales_no","row_no")
);

-- CreateTable
CREATE TABLE "location_mst" (
    "wh_code" VARCHAR(3) NOT NULL,
    "location_code" VARCHAR(4) NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_location_mst" PRIMARY KEY ("wh_code","location_code","prod_code")
);

-- CreateTable
CREATE TABLE "order_details" (
    "order_no" VARCHAR(10) NOT NULL,
    "so_row_no" INTEGER NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "prod_name" VARCHAR(10) NOT NULL,
    "unitprice" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cmp_tax_rate" INTEGER,
    "reserve_qty" INTEGER DEFAULT 0,
    "delivery_order_qty" INTEGER DEFAULT 0,
    "delivered_qty" INTEGER DEFAULT 0,
    "complete_flg" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "delivery_date" TIMESTAMP(6),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("order_no","so_row_no")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_no" VARCHAR(10) NOT NULL,
    "order_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "cust_code" VARCHAR(8) NOT NULL,
    "cust_sub_no" INTEGER,
    "emp_code" VARCHAR(10) NOT NULL,
    "required_date" TIMESTAMP(6),
    "custorder_no" VARCHAR(20),
    "wh_code" VARCHAR(3) NOT NULL,
    "order_amnt" INTEGER NOT NULL DEFAULT 0,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "slip_comment" VARCHAR(1000),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_orders" PRIMARY KEY ("order_no")
);

-- CreateTable
CREATE TABLE "pay" (
    "pay_no" VARCHAR(10) NOT NULL,
    "pay_date" INTEGER,
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "sup_code" VARCHAR(8) NOT NULL,
    "sup_sub_no" INTEGER,
    "pay_method_type" INTEGER DEFAULT 1,
    "pay_amnt" INTEGER,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "complete_flg" INTEGER NOT NULL DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_pay" PRIMARY KEY ("pay_no")
);

-- CreateTable
CREATE TABLE "po_details" (
    "po_no" VARCHAR(10) NOT NULL,
    "po_row_no" INTEGER NOT NULL,
    "po_row_dsp_no" INTEGER NOT NULL,
    "order_no" VARCHAR(10) NOT NULL,
    "so_row_no" INTEGER NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "prod_name" VARCHAR(10) NOT NULL,
    "po_price" INTEGER DEFAULT 0,
    "po_qt" INTEGER NOT NULL DEFAULT 1,
    "recived_qt" INTEGER NOT NULL DEFAULT 1,
    "complete_flg" INTEGER NOT NULL DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "po_details_pkey" PRIMARY KEY ("po_row_no","po_no")
);

-- CreateTable
CREATE TABLE "pricebycustomer" (
    "prod_code" VARCHAR(16) NOT NULL,
    "comp_code" VARCHAR(8) NOT NULL,
    "unitprice" INTEGER NOT NULL DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_pricebycustomer" PRIMARY KEY ("prod_code","comp_code")
);

-- CreateTable
CREATE TABLE "product_category" (
    "category_code" VARCHAR(8) NOT NULL,
    "prod_cate_name" VARCHAR(30),
    "category_layer" INTEGER NOT NULL DEFAULT 0,
    "category_path" VARCHAR(100),
    "lowest_flug" INTEGER DEFAULT 0,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_product_category" PRIMARY KEY ("category_code")
);

-- CreateTable
CREATE TABLE "products" (
    "prod_code" VARCHAR(16) NOT NULL,
    "prod_fullname" VARCHAR(40) NOT NULL,
    "prod_name" VARCHAR(10) NOT NULL,
    "prod_kana" VARCHAR(20) NOT NULL,
    "prod_type" VARCHAR(1),
    "serial_no" VARCHAR(40),
    "unitprice" INTEGER NOT NULL DEFAULT 0,
    "po_price" INTEGER DEFAULT 0,
    "prime_cost" INTEGER NOT NULL DEFAULT 0,
    "tax_type" INTEGER NOT NULL DEFAULT 1,
    "category_code" VARCHAR(8),
    "wide_use_type" INTEGER,
    "stock_manage_type" INTEGER DEFAULT 1,
    "stock_reserve_type" INTEGER,
    "sup_code" VARCHAR(8) NOT NULL,
    "sup_sub_no" INTEGER,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_products" PRIMARY KEY ("prod_code")
);

-- CreateTable
CREATE TABLE "pu" (
    "pu_no" VARCHAR(10) NOT NULL,
    "pu_date" TIMESTAMP(6) DEFAULT CURRENT_DATE,
    "sup_code" VARCHAR(8) NOT NULL,
    "sup_sub_no" INTEGER,
    "emp_code" VARCHAR(10) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "po_no" VARCHAR(10),
    "dept_code" VARCHAR(6) NOT NULL,
    "pu_ammount" INTEGER,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "slip_comment" VARCHAR(1000),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_pu" PRIMARY KEY ("pu_no")
);

-- CreateTable
CREATE TABLE "pu_details" (
    "pu_no" VARCHAR(10) NOT NULL,
    "pu_row_no" INTEGER NOT NULL,
    "pu_row_dsp_no" INTEGER NOT NULL,
    "po_row_no" INTEGER NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "wh_code" VARCHAR(3) NOT NULL,
    "prod_name" VARCHAR(10) NOT NULL,
    "po_price" INTEGER DEFAULT 0,
    "pu_quantity" INTEGER NOT NULL DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_pu_details" PRIMARY KEY ("pu_row_no","pu_no")
);

-- CreateTable
CREATE TABLE "purchase_orders" (
    "po_no" VARCHAR(10) NOT NULL,
    "po_date" TIMESTAMP(6),
    "order_no" VARCHAR(10) NOT NULL,
    "sup_code" VARCHAR(8) NOT NULL,
    "sup_sub_no" INTEGER,
    "emp_code" VARCHAR(10) NOT NULL,
    "due_date" TIMESTAMP(6),
    "wh_code" VARCHAR(3) NOT NULL,
    "po_amnt" INTEGER,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "slip_comment" VARCHAR(1000),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_purchase_orders" PRIMARY KEY ("po_no")
);

-- CreateTable
CREATE TABLE "sales" (
    "sales_no" VARCHAR(10) NOT NULL,
    "order_no" VARCHAR(10) NOT NULL,
    "sales_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "sales_type" INTEGER DEFAULT 1,
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "comp_code" VARCHAR(8) NOT NULL,
    "emp_code" VARCHAR(10) NOT NULL,
    "sales_amnt" INTEGER NOT NULL DEFAULT 0,
    "cmp_tax" INTEGER NOT NULL DEFAULT 0,
    "slip_comment" VARCHAR(1000),
    "updated_no" INTEGER,
    "orgnl_no" VARCHAR(10),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_sales" PRIMARY KEY ("sales_no")
);

-- CreateTable
CREATE TABLE "sales_details" (
    "sales_no" VARCHAR(10) NOT NULL,
    "row_no" INTEGER NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "prod_name" VARCHAR(10) NOT NULL,
    "unitprice" INTEGER NOT NULL DEFAULT 0,
    "delivered_qty" INTEGER DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "invoiced_date" TIMESTAMP(6),
    "invoice_no" VARCHAR(10),
    "invoice_delay_type" INTEGER,
    "auto_journal_date" TIMESTAMP(6),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_sales_details" PRIMARY KEY ("sales_no","row_no")
);

-- CreateTable
CREATE TABLE "stock" (
    "wh_code" VARCHAR(3) NOT NULL,
    "prod_code" VARCHAR(16) NOT NULL,
    "rot_no" VARCHAR(20) NOT NULL,
    "stock_type" VARCHAR(1) NOT NULL DEFAULT '1',
    "quality_type" VARCHAR(1) NOT NULL DEFAULT 'G',
    "actual" INTEGER NOT NULL DEFAULT 1,
    "valid" INTEGER NOT NULL DEFAULT 1,
    "last_delivery_date" TIMESTAMP(6),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_stock" PRIMARY KEY ("wh_code","prod_code","rot_no","stock_type","quality_type")
);

-- CreateTable
CREATE TABLE "supplier_mst" (
    "sup_code" VARCHAR(8) NOT NULL,
    "sup_sub_no" INTEGER NOT NULL,
    "sup_name" VARCHAR(40) NOT NULL,
    "sup_kana" VARCHAR(40),
    "sup_emp_name" VARCHAR(20),
    "sup_dep_name" VARCHAR(40),
    "sup_zip_code" CHAR(8),
    "sup_state" VARCHAR(4),
    "sup_address1" VARCHAR(40),
    "sup_address2" VARCHAR(40),
    "sup_tel" VARCHAR(13),
    "sup_fax" VARCHAR(13),
    "sup_email" VARCHAR(100),
    "sup_close_date" INTEGER NOT NULL,
    "sup_pay_months" INTEGER DEFAULT 1,
    "sup_pay_dates" INTEGER,
    "pay_method_type" INTEGER DEFAULT 1,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_supplier_mst" PRIMARY KEY ("sup_code","sup_sub_no")
);

-- CreateTable
CREATE TABLE "wh_dept_mst" (
    "wh_code" VARCHAR(3) NOT NULL,
    "dept_code" VARCHAR(6) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_wh_dept_mst" PRIMARY KEY ("wh_code","dept_code","start_date")
);

-- CreateTable
CREATE TABLE "wh_mst" (
    "wh_code" VARCHAR(3) NOT NULL,
    "wh_name" VARCHAR(20),
    "wh_type" VARCHAR(1) DEFAULT 'N',
    "zip_code" CHAR(8),
    "state" VARCHAR(4),
    "address1" VARCHAR(40),
    "address2" VARCHAR(40),
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "creator" VARCHAR(12),
    "update_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_DATE,
    "updater" VARCHAR(12),

    CONSTRAINT "pk_wh_mst" PRIMARY KEY ("wh_code")
);

-- AddForeignKey
ALTER TABLE "bank_acut_mst" ADD CONSTRAINT "fk_dept_mst_入金口座マスタ" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bom" ADD CONSTRAINT "fk_products_bom" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_category" ADD CONSTRAINT "fk_category_type_company_categ" FOREIGN KEY ("category_type") REFERENCES "category_type"("category_type_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_category_group" ADD CONSTRAINT "fk_company_category_company_ca" FOREIGN KEY ("comp_cate_code", "category_type") REFERENCES "company_category"("comp_cate_code", "category_type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "fk_dept_mst_credit" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit_balance" ADD CONSTRAINT "fk_companys_mst_credit_balanc" FOREIGN KEY ("comp_code") REFERENCES "companys_mst"("comp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customers_mst" ADD CONSTRAINT "fk_companys_mst_customers_mst" FOREIGN KEY ("cust_code") REFERENCES "companys_mst"("comp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "destinations_mst" ADD CONSTRAINT "fk_地域マスタ_destinations_mst" FOREIGN KEY ("area_code") REFERENCES "area_mst"("area_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "fk_invoice_請求データ明細" FOREIGN KEY ("invoice_no") REFERENCES "invoice"("invoice_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_mst" ADD CONSTRAINT "fk_products_棚番マスタ" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_mst" ADD CONSTRAINT "fk_wh_mst_棚番マスタ" FOREIGN KEY ("wh_code") REFERENCES "wh_mst"("wh_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "fk_orders_order_details" FOREIGN KEY ("order_no") REFERENCES "orders"("order_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_customers_mst_orders" FOREIGN KEY ("cust_code", "cust_sub_no") REFERENCES "customers_mst"("cust_code", "cust_sub_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_dept_mst_orders" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_employee_orders" FOREIGN KEY ("emp_code") REFERENCES "employee"("emp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_wh_mst_orders" FOREIGN KEY ("wh_code") REFERENCES "wh_mst"("wh_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "fk_dept_mst_pay" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pay" ADD CONSTRAINT "fk_supplier_mst_pay" FOREIGN KEY ("sup_code", "sup_sub_no") REFERENCES "supplier_mst"("sup_code", "sup_sub_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "po_details" ADD CONSTRAINT "fk_purchase_orders_po_details" FOREIGN KEY ("po_no") REFERENCES "purchase_orders"("po_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pricebycustomer" ADD CONSTRAINT "fk_companys_mst_pricebycustome" FOREIGN KEY ("comp_code") REFERENCES "companys_mst"("comp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pu" ADD CONSTRAINT "fk_dept_mst_仕入データ" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pu" ADD CONSTRAINT "fk_employee_仕入データ" FOREIGN KEY ("emp_code") REFERENCES "employee"("emp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pu_details" ADD CONSTRAINT "fk_products_pu_details" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pu_details" ADD CONSTRAINT "fk_wh_mst_pu_details" FOREIGN KEY ("wh_code") REFERENCES "wh_mst"("wh_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pu_details" ADD CONSTRAINT "fk_仕入データ_pu_details" FOREIGN KEY ("pu_no") REFERENCES "pu"("pu_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "fk_employee_purchase_orders" FOREIGN KEY ("emp_code") REFERENCES "employee"("emp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "fk_dept_mst_sales" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sales_details" ADD CONSTRAINT "fk_sales_sales_details" FOREIGN KEY ("sales_no") REFERENCES "sales"("sales_no") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "fk_wh_mst_stock" FOREIGN KEY ("wh_code") REFERENCES "wh_mst"("wh_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supplier_mst" ADD CONSTRAINT "fk_companys_mst_supplier_mst" FOREIGN KEY ("sup_code") REFERENCES "companys_mst"("comp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wh_dept_mst" ADD CONSTRAINT "fk_dept_mst_wh_dept_mst" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wh_dept_mst" ADD CONSTRAINT "fk_wh_mst_wh_dept_mst" FOREIGN KEY ("wh_code") REFERENCES "wh_mst"("wh_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

