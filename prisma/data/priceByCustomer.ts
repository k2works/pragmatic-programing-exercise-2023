import { pricebycustomer } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "priceByCustomer.csv");

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
