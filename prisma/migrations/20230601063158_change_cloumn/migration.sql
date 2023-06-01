/*
  Warnings:

  - The `actor` column on the `Cinema` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `SNS1` column on the `Cinema` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `SNS2` column on the `Cinema` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "actor",
ADD COLUMN     "actor" INTEGER,
DROP COLUMN "SNS1",
ADD COLUMN     "SNS1" INTEGER,
DROP COLUMN "SNS2",
ADD COLUMN     "SNS2" INTEGER;
