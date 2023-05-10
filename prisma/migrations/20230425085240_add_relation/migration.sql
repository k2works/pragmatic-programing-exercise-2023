-- AddForeignKey
ALTER TABLE "alternate_products" ADD CONSTRAINT "alternate_products_prod_code_fkey" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE RESTRICT ON UPDATE CASCADE;
