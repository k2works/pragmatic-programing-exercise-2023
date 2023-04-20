import { employee } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "employee.csv");

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
      updater,
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
      updater,
    };
  });
