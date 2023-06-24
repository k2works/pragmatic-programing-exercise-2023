import { Iris, Cinema, Survived, Boston } from "@prisma/client";
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

export const cinemas: Cinema[] = fs
  .readFileSync(filePath("cinema.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      cinema_id,
      sns1,
      sns2,
      actor,
      original,
      sales,
    ] = line.split(",");
    return {
      cinema_id: cinema_id ? parseInt(cinema_id) : 0,
      SNS1: sns1 ? parseInt(sns1) : null,
      SNS2: sns2 ? parseInt(sns2) : null,
      actor: actor ? parseInt(actor) : null,
      original: original ? parseInt(original) : null,
      sales: sales ? parseInt(sales) : null,
    };
  });

export const surviveds: Survived[] = fs
  .readFileSync(filePath("Survived.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      passengerId,
      survived,
      pclass,
      sex,
      age,
      sibSp,
      parch,
      ticket,
      fare,
      cabin,
      embarked,
    ] = line.split(",");
    return {
      PassengerId: passengerId ? parseInt(passengerId) : 0,
      Survived: survived ? parseInt(survived) : null,
      Pclass: pclass ? parseInt(pclass) : null,
      Sex: sex,
      Age: age ? parseFloat(age) : null,
      SibSp: sibSp ? parseInt(sibSp) : null,
      Parch: parch ? parseInt(parch) : null,
      Ticket: ticket,
      Fare: fare ? parseFloat(fare) : null,
      Cabin: cabin,
      Embarked: embarked,
    };
  });

const idSequence = (function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
})();
export const bostons: Boston[] = fs
  .readFileSync(filePath("Boston.csv"), encodeing)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [
      CRIME,
      ZN,
      INDUS,
      CHAS,
      NOX,
      RM,
      AGE,
      DIS,
      RAD,
      TAX,
      PTRATIO,
      B,
      LSTAT,
      PRICE,
    ] = line.split(",");
    return {
      ID: idSequence.next().value,
      CRIME: CRIME ? CRIME : null,
      ZN: ZN ? parseFloat(ZN) : null,
      INDUS: INDUS ? parseFloat(INDUS) : null,
      CHAS: CHAS ? parseFloat(CHAS) : null,
      NOX: NOX ? parseFloat(NOX) : null,
      RM: RM ? parseFloat(RM) : null,
      AGE: AGE ? parseFloat(AGE) : null,
      DIS: DIS ? parseFloat(DIS) : null,
      RAD: RAD ? parseFloat(RAD) : null,
      TAX: TAX ? parseFloat(TAX) : null,
      PTRATIO: PTRATIO ? parseFloat(PTRATIO) : null,
      B: B ? parseFloat(B) : null,
      LSTAT: LSTAT ? parseFloat(LSTAT) : null,
      PRICE: PRICE ? parseFloat(PRICE) : null,
    };
  });
