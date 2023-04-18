/*
  Warnings:

  - You are about to drop the `イベントテーブル` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "経験イベント" DROP CONSTRAINT "経験イベント_イベント番号_fkey";

-- DropTable
DROP TABLE "イベントテーブル";

-- CreateTable
CREATE TABLE "イベント" (
    "イベント番号" SERIAL NOT NULL,
    "イベント名称" TEXT NOT NULL,
    "タイプ" TEXT NOT NULL,
    "前提イベント番号" INTEGER,
    "後続イベント番号" INTEGER,

    CONSTRAINT "イベント_pkey" PRIMARY KEY ("イベント番号")
);

-- AddForeignKey
ALTER TABLE "経験イベント" ADD CONSTRAINT "経験イベント_イベント番号_fkey" FOREIGN KEY ("イベント番号") REFERENCES "イベント"("イベント番号") ON DELETE RESTRICT ON UPDATE CASCADE;
