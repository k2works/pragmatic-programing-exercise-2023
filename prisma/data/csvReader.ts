import {
  companys_mst,
  consumer,
  customers_mst,
  dept_mst,
  employee,
  pricebycustomer,
  product_category, supplier_mst
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
