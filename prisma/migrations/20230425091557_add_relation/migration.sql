-- AddForeignKey
ALTER TABLE "bom" ADD CONSTRAINT "bom_bom_code_fkey" FOREIGN KEY ("bom_code") REFERENCES "bom"("prod_code") ON DELETE RESTRICT ON UPDATE CASCADE;
