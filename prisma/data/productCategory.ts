import { product_category } from "@prisma/client";
import fs from "fs";
import path from "path";
const filePath = path.join(__dirname, "productCategory.csv");

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
