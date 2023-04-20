import { products as product } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "product.csv");

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
      updater,
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
      updater,
    };
  });
