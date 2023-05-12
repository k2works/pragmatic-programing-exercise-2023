import {
  Department,
  Employee,
  Product,
  PriceByCustomer,
  ProductCategory,
  AlternateProduct
} from "@prisma/client";
import fs from "fs";
import path from "path";

const encodeing = "utf-8";
const filePath = (fileName: string) => path.join(`${__dirname}/data`, fileName);
export const departments: Department[] = fs
  .readFileSync(filePath("department.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      deptCode,
      startDate,
      endDate,
      name,
      layer,
      psth,
      bottomType,
      slitYn,
      createDate,
      creator,
      updateDate,
      updater,
    ] = line.split(",");
    return {
      deptCode,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      name,
      layer: parseInt(layer, 10),
      psth,
      bottomType: parseInt(bottomType, 10),
      slitYn: Number(slitYn),
      createDate: new Date(createDate),
      creator,
      updateDate: new Date(updateDate),
      updater,
    };
  });

export const employees: Employee[] = fs
  .readFileSync(filePath("employee.csv"), encodeing)
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      empCode,
      name,
      kana,
      loginPassword,
      tel,
      fax,
      deptCode,
      startDate,
      occuCode,
      approvalCode,
      createDate,
      creator,
      updateDate,
      updater
    ] = line.split(",");
    return {
      empCode,
      name,
      kana,
      loginPassword,
      tel,
      fax,
      deptCode,
      startDate: new Date(startDate),
      occuCode,
      approvalCode,
      createDate: new Date(createDate),
      creator,
      updateDate: new Date(updateDate),
      updater
    };
  });

export const products: Product[] = fs
  .readFileSync(filePath("product.csv"), encodeing)
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prodCode,
      fullname,
      name,
      kana,
      prodType,
      serialNo,
      unitprice,
      poPrice,
      primeCost,
      taxType,
      categoryCode,
      wideUseType,
      stockManageType,
      stockReserveType,
      supCode,
      supSubNo,
      createDate,
      creator,
      updateDate,
      updater
    ] = line.split(",");
    return {
      prodCode,
      fullname,
      name,
      kana,
      prodType,
      serialNo,
      unitprice: Number(unitprice),
      poPrice: Number(poPrice),
      primeCost: Number(primeCost),
      taxType: Number(taxType),
      categoryCode,
      wideUseType: Number(wideUseType),
      stockManageType: Number(stockManageType),
      stockReserveType: Number(stockReserveType),
      supCode,
      supSubNo: Number(supSubNo),
      createDate: new Date(createDate),
      creator,
      updateDate: new Date(updateDate),
      updater
    };
  });

export const productCategories: ProductCategory[] = fs
  .readFileSync(filePath("productCategory.csv"), encodeing)
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      categoryCode,
      name,
      layer,
      path,
      lowestType,
      createDate,
      creator,
      updateDate,
      updater
    ] = line.split(",");
    return {
      categoryCode,
      name,
      layer: Number(layer),
      path,
      lowestType: Number(lowestType),
      createDate: new Date(createDate),
      creator,
      updateDate: new Date(updateDate),
      updater
    };
  });

export const priceByCustomers: PriceByCustomer[] = fs
  .readFileSync(filePath("priceByCustomer.csv"), encodeing)
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prodCode,
      compCode,
      unitprice,
      createDate,
      creator,
      updateDate,
      updater
    ] = line.split(",");
    return {
      prodCode,
      compCode,
      unitprice: Number(unitprice),
      createDate: new Date(createDate),
      creator,
      updateDate: new Date(updateDate),
      updater
    };
  });

export const alterNateProducts: AlternateProduct[] = fs
  .readFileSync(filePath("alternateProduct.csv"), encodeing)
  .trim() // 末尾の改行を削除
  .split("\n") // 行単位で分割
  .slice(1) // ヘッダー行を除外
  .map((line) => {
    const [
      prodCode,
      altProdCode,
      priority,
      createDate,
      creator,
      updateDate,
      updater
    ] = line.split(",");
    return {
      prodCode,
      altProdCode,
      priority: Number(priority),
      createDate: new Date("2021-01-01"),
      creator,
      updateDate: new Date("2021-01-01"),
      updater,
    };
  });
