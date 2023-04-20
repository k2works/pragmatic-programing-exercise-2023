import { companys_mst } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "company.csv");

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
      updater,
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
      updater,
    };
  });
