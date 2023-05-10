-- AddForeignKey
ALTER TABLE "destinations_mst" ADD CONSTRAINT "destinations_mst_comp_code_comp_sub_no_fkey" FOREIGN KEY ("comp_code", "comp_sub_no") REFERENCES "customers_mst"("cust_code", "cust_sub_no") ON DELETE RESTRICT ON UPDATE CASCADE;
