import { companys_mst, dept_mst, employee, pricebycustomer, product_category } from "@prisma/client";
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
      updater,
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
      updater,
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
      updater,
    ] = line.split(",");
    return {
      prod_code,
      comp_code,
      unitprice: Number(unitprice),
      create_date: new Date(create_date),
      creator,
      update_date: new Date(update_date),
      updater,
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
