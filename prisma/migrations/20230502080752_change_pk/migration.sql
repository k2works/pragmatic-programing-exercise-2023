/*
  Warnings:

  - The primary key for the `bom` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "bom" DROP CONSTRAINT "bom_bom_code_fkey";

-- DropForeignKey
ALTER TABLE "bom" DROP CONSTRAINT "fk_products_bom";

-- AlterTable
ALTER TABLE "bom" DROP CONSTRAINT "pk_bom",
ADD CONSTRAINT "pk_bom" PRIMARY KEY ("bom_code");

-- AddForeignKey
ALTER TABLE "bom" ADD CONSTRAINT "fk_products_bom" FOREIGN KEY ("bom_code") REFERENCES "products"("prod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bom" ADD CONSTRAINT "bom_prod_code_fkey" FOREIGN KEY ("prod_code") REFERENCES "bom"("bom_code") ON DELETE RESTRICT ON UPDATE CASCADE;
