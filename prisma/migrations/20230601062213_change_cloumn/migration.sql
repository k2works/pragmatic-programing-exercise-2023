/*
  Warnings:

  - You are about to drop the column `sns1` on the `Cinema` table. All the data in the column will be lost.
  - You are about to drop the column `sns2` on the `Cinema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "sns1",
DROP COLUMN "sns2",
ADD COLUMN     "SNS1" TEXT,
ADD COLUMN     "SNS2" TEXT;

COMMENT ON COLUMN "public"."Cinema"."SNS1" IS '公開後10日以内にSNS1でつぶやかれた数';
COMMENT ON COLUMN "public"."Cinema"."SNS2" IS '公開後10日以内にSNS2でつぶやかれた数';
