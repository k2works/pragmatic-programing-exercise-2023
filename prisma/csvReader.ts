import { User } from "@prisma/client";
import fs from "fs";
import path from "path";

const encodeing = "utf-8";
const filePath = (fileName: string) => path.join(`${__dirname}/data`, fileName);
export const users: User[] = fs
  .readFileSync(filePath("user.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      id,
      name,
      email
    ] = line.split(",");
    return {
      id: parseInt(id),
      name,
      email,
    };
  });
