-- DropForeignKey
ALTER TABLE "bom" DROP CONSTRAINT "fk_products_bom";

-- AddForeignKey
ALTER TABLE "bom" ADD CONSTRAINT "fk_products_bom" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
