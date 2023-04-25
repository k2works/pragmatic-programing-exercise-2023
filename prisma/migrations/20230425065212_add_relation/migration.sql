-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_comp_code_cust_sub_no_fkey" FOREIGN KEY ("comp_code", "cust_sub_no") REFERENCES "customers_mst"("cust_code", "cust_sub_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "credit_bank_acut_code_fkey" FOREIGN KEY ("bank_acut_code") REFERENCES "bank_acut_mst"("bank_acut_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit" ADD CONSTRAINT "credit_comp_code_comp_sub_no_fkey" FOREIGN KEY ("comp_code", "comp_sub_no") REFERENCES "customers_mst"("cust_code", "cust_sub_no") ON DELETE RESTRICT ON UPDATE CASCADE;
