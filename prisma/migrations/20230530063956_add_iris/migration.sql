/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Iris" (
    "id" SERIAL NOT NULL,
    "sepal_length" DOUBLE PRECISION,
    "sepal_width" DOUBLE PRECISION,
    "petal_length" DOUBLE PRECISION,
    "petal_width" DOUBLE PRECISION,
    "species" TEXT,

    CONSTRAINT "Iris_pkey" PRIMARY KEY ("id")
);
