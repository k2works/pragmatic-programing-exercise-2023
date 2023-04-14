/*
  Warnings:

  - You are about to drop the column `取引事由ID` on the `取引` table. All the data in the column will be lost.
  - The primary key for the `取引事由` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `取引事由ID` on the `取引事由` table. All the data in the column will be lost.
  - Added the required column `取引事由ＩＤ` to the `取引` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "取引" DROP CONSTRAINT "取引_取引事由ID_fkey";

-- AlterTable
ALTER TABLE "取引" DROP COLUMN "取引事由ID",
ADD COLUMN     "取引事由ＩＤ" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "取引事由" DROP CONSTRAINT "取引事由_pkey",
DROP COLUMN "取引事由ID",
ADD COLUMN     "取引事由ＩＤ" SERIAL NOT NULL,
ADD CONSTRAINT "取引事由_pkey" PRIMARY KEY ("取引事由ＩＤ");

-- AddForeignKey
ALTER TABLE "取引" ADD CONSTRAINT "取引_取引事由ＩＤ_fkey" FOREIGN KEY ("取引事由ＩＤ") REFERENCES "取引事由"("取引事由ＩＤ") ON DELETE RESTRICT ON UPDATE CASCADE;
