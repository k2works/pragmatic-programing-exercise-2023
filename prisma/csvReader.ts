import { Iris } from "@prisma/client";
import fs from "fs";
import path from "path";

const encodeing = "utf-8";
const filePath = (fileName: string) => path.join(`${__dirname}/data`, fileName);
export const irises: Iris[] = fs
  .readFileSync(filePath("iris.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      sepal_length,
      sepal_width,
      petal_length,
      petal_width,
      species,
    ] = line.split(",");
    return {
      id: 0,
      sepal_length: sepal_length ? parseFloat(sepal_length) : null,
      sepal_width: sepal_width ? parseFloat(sepal_width) : null,
      petal_length: petal_length ? parseFloat(petal_length) : null,
      petal_width: petal_width ? parseFloat(petal_width) : null,
      species,
    };
  });
