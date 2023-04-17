/*
  Warnings:

  - You are about to drop the column `受注枝番` on the `注文` table. All the data in the column will be lost.
  - You are about to drop the column `受注番号` on the `注文` table. All the data in the column will be lost.
  - You are about to drop the column `日付` on the `注文` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[注文番号,注文枝番]` on the table `注文` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `注文日` to the `注文` table without a default value. This is not possible if the table is not empty.
  - Added the required column `注文枝番` to the `注文` table without a default value. This is not possible if the table is not empty.
  - Added the required column `注文番号` to the `注文` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "注文_受注番号_受注枝番_key";

-- AlterTable
ALTER TABLE "注文" DROP COLUMN "受注枝番",
DROP COLUMN "受注番号",
DROP COLUMN "日付",
ADD COLUMN     "注文日" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "注文枝番" INTEGER NOT NULL,
ADD COLUMN     "注文番号" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "注文_注文番号_注文枝番_key" ON "注文"("注文番号", "注文枝番");
