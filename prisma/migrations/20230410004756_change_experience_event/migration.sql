/*
  Warnings:

  - You are about to drop the column `eventTableEventNumber` on the `経験イベント` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "経験イベント" DROP CONSTRAINT "経験イベント_eventTableEventNumber_fkey";

-- AlterTable
ALTER TABLE "経験イベント" DROP COLUMN "eventTableEventNumber";

-- AddForeignKey
ALTER TABLE "経験イベント" ADD CONSTRAINT "経験イベント_イベント番号_fkey" FOREIGN KEY ("イベント番号") REFERENCES "イベントテーブル"("イベント番号") ON DELETE RESTRICT ON UPDATE CASCADE;
