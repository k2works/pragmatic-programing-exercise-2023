import {
  companys_mst,
  consumer,
  customers_mst,
  dept_mst,
  employee,
  pricebycustomer,
  product_category,
  supplier_mst,
  area_mst,
  destinations_mst,
  company_group_mst,
  category_type,
  company_category,
  company_category_group,
  wh_mst,
  orders as order,
  order_details as order_detail,
  sales as sale,
  sales_details as sale_detail,
  invoice,
  invoice_details,
  bank_acut_mst,
  credit,
  alternate_products,
  bom,
} from "@prisma/client";
import fs from "fs";
import path from "path";
import { products as product } from ".prisma/client";

let filePath = "";

filePath = path.join(__dirname, "department.csv");
export const departments: dept_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      dept_code,
      start_date,
      end_date,
      dep_name,
      dept_layer,
      dept_psth,
      slit_yn,
      create_date,
      creator,
      update_date,
      updater,
      bottom_type
    ] = line.split(",");
    return {
      dept_code,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      dep_name,
      dept_layer: parseInt(dept_layer, 10),
      dept_psth,
      slit_yn: Number(slit_yn),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater,
      bottom_type: parseInt(bottom_type, 10)
    };
  });

filePath = path.join(__dirname, "employee.csv");
export const employees: employee[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      emp_code,
      emp_name,
      emp_kana,
      login_password,
      tel,
      fax,
      dept_code,
      start_date,
      occu_code,
      approval_code,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      emp_code,
      emp_name,
      emp_kana,
      login_password,
      tel,
      fax,
      dept_code,
      start_date: new Date(start_date),
      occu_code,
      approval_code,
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater
    };
  });

filePath = path.join(__dirname, "product.csv");
export const products: product[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prod_code,
      prod_fullname,
      prod_name,
      prod_kana,
      prod_type,
      serial_no,
      unitprice,
      po_price,
      prime_cost,
      tax_type,
      category_code,
      wide_use_type,
      stock_manage_type,
      stock_reserve_type,
      sup_code,
      sup_sub_no,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      prod_code,
      prod_fullname,
      prod_name,
      prod_kana,
      prod_type,
      serial_no,
      unitprice: Number(unitprice),
      po_price: Number(po_price),
      prime_cost: Number(prime_cost),
      tax_type: Number(tax_type),
      category_code,
      wide_use_type: Number(wide_use_type),
      stock_manage_type: Number(stock_manage_type),
      stock_reserve_type: Number(stock_reserve_type),
      sup_code,
      sup_sub_no: Number(sup_sub_no),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater
    };
  });

filePath = path.join(__dirname, "productCategory.csv");
export const productCategories: product_category[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      category_code,
      prod_cate_name,
      category_layer,
      category_path,
      lowest_flug,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      category_code,
      prod_cate_name,
      category_layer: Number(category_layer),
      category_path,
      lowest_flug: Number(lowest_flug),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater
    };
  });

filePath = path.join(__dirname, "priceByCustomer.csv");
export const priceByCustomers: pricebycustomer[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prod_code,
      comp_code,
      unitprice,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      prod_code,
      comp_code,
      unitprice: Number(unitprice),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater
    };
  });

filePath = path.join(__dirname, "company.csv");
export const companys: companys_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      comp_code,
      comp_name,
      comp_kana,
      sup_type,
      zip_code,
      state,
      address1,
      address2,
      no_sales_flg,
      wide_use_type,
      comp_group_code,
      max_credit,
      temp_credit_up,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      comp_code,
      comp_name,
      comp_kana,
      sup_type: Number(sup_type),
      zip_code,
      state,
      address1,
      address2,
      no_sales_flg: Number(no_sales_flg),
      wide_use_type: Number(wide_use_type),
      comp_group_code,
      max_credit: Number(max_credit),
      temp_credit_up: Number(temp_credit_up),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater
    };
  });

filePath = path.join(__dirname, "customer.csv");
export const customers: customers_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      cust_code,
      cust_sub_no,
      cust_type,
      ar_code,
      ar_sub_no,
      payer_code,
      payer_sub_no,
      cust_name,
      cust_kana,
      emp_code,
      cust_user_name,
      cust_user_dep_name,
      cust_zip_code,
      cust_state,
      cust_address1,
      cust_address2,
      cust_tel,
      cust_fax,
      cust_email,
      cust_ar_flag,
      cust_close_date1,
      cust_pay_months1,
      cust_pay_dates1,
      cust_pay_method1,
      cust_close_date2,
      cust_pay_months2,
      cust_pay_dates2,
      cust_pay_method2,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      cust_code,
      cust_sub_no: Number(cust_sub_no),
      cust_type: Number(cust_type),
      ar_code,
      ar_sub_no: Number(ar_sub_no),
      payer_code: payer_code,
      payer_sub_no: Number(payer_sub_no),
      cust_name,
      cust_kana,
      emp_code,
      cust_user_name,
      cust_user_dep_name,
      cust_zip_code,
      cust_state,
      cust_address1,
      cust_address2,
      cust_tel,
      cust_fax,
      cust_email,
      cust_ar_flag: Number(cust_ar_flag),
      cust_close_date1: Number(cust_close_date1),
      cust_pay_months1: Number(cust_pay_months1),
      cust_pay_dates1: Number(cust_pay_dates1),
      cust_pay_method1: Number(cust_pay_method1),
      cust_close_date2: Number(cust_close_date2),
      cust_pay_months2: Number(cust_pay_months2),
      cust_pay_dates2: Number(cust_pay_dates2),
      cust_pay_method2: Number(cust_pay_method2),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "consumer.csv");
export const consumers: consumer[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      consumer_code,
      last_name,
      first_name,
      last_name_kana,
      first_name_kana,
      login_id,
      email,
      pwd,
      birth_date,
      sex,
      login_datetime,
      rest_point,
      withdrawal_date,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      consumer_code,
      last_name,
      first_name,
      last_name_kana,
      first_name_kana,
      login_id,
      email,
      pwd,
      birth_date: new Date(birth_date),
      sex: Number(sex),
      login_datetime: new Date(login_datetime),
      rest_point: Number(rest_point),
      withdrawal_date: new Date(withdrawal_date),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "supplier.csv");
export const suppliers: supplier_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      sup_code,
      sup_sub_no,
      sup_name,
      sup_kana,
      sup_emp_name,
      sup_dep_name,
      sup_zip_code,
      sup_state,
      sup_address1,
      sup_address2,
      sup_tel,
      sup_fax,
      sup_email,
      sup_close_date,
      sup_pay_months,
      sup_pay_dates,
      pay_method_type,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      sup_code,
      sup_sub_no: Number(sup_sub_no),
      sup_name,
      sup_kana,
      sup_emp_name,
      sup_dep_name,
      sup_zip_code,
      sup_state,
      sup_address1,
      sup_address2,
      sup_tel,
      sup_fax,
      sup_email,
      sup_close_date: Number(sup_close_date),
      sup_pay_months: Number(sup_pay_months),
      sup_pay_dates: Number(sup_pay_dates),
      pay_method_type: Number(pay_method_type),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "area.csv");
export const areas: area_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      area_code,
      area_name,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      area_code,
      area_name,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "destination.csv");
export const destinations: destinations_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      comp_code,
      comp_sub_no,
      dist_no,
      dist_name,
      area_code,
      zip_code,
      address1,
      address2,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      comp_code,
      comp_sub_no: Number(comp_sub_no),
      dist_no: Number(dist_no),
      dist_name,
      area_code,
      zip_code,
      address1,
      address2,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "companyGroup.csv");
export const companyGroups: company_group_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      comp_group_code,
      group_name,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      comp_group_code,
      group_name,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "categoryType.csv");
export const categoryTypes: category_type[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      category_type_code,
      cate_type_name,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      category_type_code,
      cate_type_name,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "companyCategory.csv");
export const companyCategories: company_category[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      category_type,
      comp_cate_code,
      comp_cate_name,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      category_type,
      comp_cate_code,
      comp_cate_name,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "companyCategoryGroup.csv");
export const companyCategoryGroups: company_category_group[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      category_type,
      comp_cate_code,
      comp_code,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      category_type,
      comp_cate_code,
      comp_code,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "wharehouse.csv");
export const wharehouses: wh_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      wh_code,
      wh_name,
      wh_type,
      zip_code,
      state,
      address1,
      address2,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      wh_code,
      wh_name,
      wh_type,
      zip_code,
      state,
      address1,
      address2,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "order.csv");
export const orders: order[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      order_no,
      order_date,
      dept_code,
      start_date,
      cust_code,
      cust_sub_no,
      emp_code,
      required_date,
      custorder_no,
      wh_code,
      order_amnt,
      cmp_tax,
      slip_comment,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      order_no,
      order_date: new Date(order_date),
      dept_code,
      start_date: new Date(start_date),
      cust_code,
      cust_sub_no: Number(cust_sub_no),
      emp_code,
      required_date: new Date(required_date),
      custorder_no,
      wh_code,
      order_amnt: Number(order_amnt),
      cmp_tax: Number(cmp_tax),
      slip_comment,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "orderDetail.csv");
export const orderDetails: order_detail[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      order_no,
      so_row_no,
      prod_code,
      prod_name,
      unitprice,
      quantity,
      cmp_tax_rate,
      reserve_qty,
      delivery_order_qty,
      delivered_qty,
      complete_flg,
      discount,
      delivery_date,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      order_no,
      so_row_no: Number(so_row_no),
      prod_code,
      prod_name,
      unitprice: Number(unitprice),
      quantity: Number(quantity),
      cmp_tax_rate: Number(cmp_tax_rate),
      reserve_qty: Number(reserve_qty),
      delivery_order_qty: Number(delivery_order_qty),
      delivered_qty: Number(delivered_qty),
      complete_flg: Number(complete_flg),
      discount: Number(discount),
      delivery_date: new Date(delivery_date),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "sales.csv");
export const sales: sale[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      sales_no,
      order_no,
      sales_date,
      sales_type,
      dept_code,
      start_date,
      comp_code,
      emp_code,
      sales_amnt,
      cmp_tax,
      slip_comment,
      updated_no,
      orgnl_no,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      sales_no,
      order_no,
      sales_date: new Date(sales_date),
      sales_type: Number(sales_type),
      dept_code,
      start_date: new Date(start_date),
      comp_code,
      emp_code,
      sales_amnt: Number(sales_amnt),
      cmp_tax: Number(cmp_tax),
      slip_comment,
      updated_no: Number(updated_no),
      orgnl_no,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "salesDetail.csv");
export const salesDetails: sale_detail[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      sales_no,
      row_no,
      prod_code,
      prod_name,
      unitprice,
      delivered_qty,
      quantity,
      discount,
      invoiced_date,
      invoice_no,
      invoice_delay_type,
      auto_journal_date,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      sales_no,
      row_no: Number(row_no),
      prod_code,
      prod_name,
      unitprice: Number(unitprice),
      delivered_qty: Number(delivered_qty),
      quantity: Number(quantity),
      discount: Number(discount),
      invoiced_date: new Date(invoiced_date),
      invoice_no,
      invoice_delay_type: Number(invoice_delay_type),
      auto_journal_date: new Date(auto_journal_date),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "invoice.csv");
export const invoices: invoice[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      invoice_no,
      invoiced_date,
      comp_code,
      cust_sub_no,
      last_received,
      month_sales,
      month_received,
      month_invoice,
      cmp_tax,
      invoice_received,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      invoice_no,
      invoiced_date: new Date(invoiced_date),
      comp_code,
      cust_sub_no: Number(cust_sub_no),
      last_received: Number(last_received),
      month_sales: Number(month_sales),
      month_received: Number(month_received),
      month_invoice: Number(month_invoice),
      cmp_tax: Number(cmp_tax),
      invoice_received: Number(invoice_received),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "invoiceDetail.csv");
export const invoiceDetails: invoice_details[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      invoice_no,
      sales_no,
      row_no,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      invoice_no,
      sales_no,
      row_no: Number(row_no),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater
    };
  });

filePath = path.join(__dirname, "bankAccount.csv");
export const bankAccounts: bank_acut_mst[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      bank_acut_code,
      recive_act_name,
      appl_start_date,
      appl_end_date,
      start_act_name,
      recive_bank_act_type,
      recive_act_no,
      bank_act_type,
      act_name,
      dept_code,
      start_date,
      a_bank_code,
      a_bank_blnc_code,
      create_date,
      creator,
      update_date,
      updater,
      update_plg_date,
      update_pgm
    ] = line.split(",");
    return {
      bank_acut_code,
      recive_act_name,
      appl_start_date: new Date(appl_start_date),
      appl_end_date: new Date(appl_end_date),
      start_act_name,
      recive_bank_act_type,
      recive_act_no,
      bank_act_type,
      act_name,
      dept_code,
      start_date: new Date(start_date),
      a_bank_code,
      a_bank_blnc_code,
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater,
      update_plg_date: new Date("2021-01-01"),
      update_pgm
    };
  });

filePath = path.join(__dirname, "credit.csv");
export const credits: credit[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      credit_no,
      credit_date,
      dept_code,
      start_date,
      comp_code,
      comp_sub_no,
      pay_method_type,
      bank_acut_code,
      received_amnt,
      received,
      create_date,
      creator,
      update_date,
      updater,
      update_plg_date,
      update_pgm
    ] = line.split(",");
    return {
      credit_no,
      credit_date: new Date(credit_date),
      dept_code,
      start_date: new Date(start_date),
      comp_code,
      comp_sub_no: Number(comp_sub_no),
      pay_method_type: Number(pay_method_type),
      bank_acut_code,
      received_amnt: Number(received_amnt),
      received: Number(received),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater,
      update_plg_date: new Date("2021-01-01"),
      update_pgm
    };
  });

filePath = path.join(__dirname, "alternateProduct.csv");
export const alterNateProducts: alternate_products[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prod_code,
      alt_prod_code,
      priority,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      prod_code,
      alt_prod_code,
      priority: Number(priority),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater,
    };
  });

filePath = path.join(__dirname, "bom.csv");
export const boms: bom[] = fs
  .readFileSync(filePath, { encoding: "utf-8" })
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prod_code,
      bom_code,
      quantity,
      create_date,
      creator,
      update_date,
      updater
    ] = line.split(",");
    return {
      prod_code,
      bom_code,
      quantity: Number(quantity),
      create_date: new Date("2021-01-01"),
      creator,
      update_date: new Date("2021-01-01"),
      updater,
    };
  });
