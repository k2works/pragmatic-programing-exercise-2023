-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_code_fkey" FOREIGN KEY ("category_code") REFERENCES "product_category"("category_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricebycustomer" ADD CONSTRAINT "pricebycustomer_prod_code_fkey" FOREIGN KEY ("prod_code") REFERENCES "products"("prod_code") ON DELETE RESTRICT ON UPDATE CASCADE;
