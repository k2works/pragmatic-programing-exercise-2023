-- RenameForeignKey
ALTER TABLE "invoice_details" RENAME CONSTRAINT "fk_invoice_請求データ明細" TO "fk_invoice_invoce_dtails";

-- AddForeignKey
ALTER TABLE "invoice_details" ADD CONSTRAINT "invoice_details_sales_no_row_no_fkey" FOREIGN KEY ("sales_no", "row_no") REFERENCES "sales_details"("sales_no", "row_no") ON DELETE RESTRICT ON UPDATE CASCADE;
