import { Department } from "@prisma/client";
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
      code,
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
      code,
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