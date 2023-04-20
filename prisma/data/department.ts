import { dept_mst } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "department.csv");

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
      bottom_type,
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
      bottom_type: parseInt(bottom_type, 10),
    };
  });
