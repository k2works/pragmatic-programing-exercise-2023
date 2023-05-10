-- AddForeignKey
ALTER TABLE "company_category_group" ADD CONSTRAINT "fk_company_mst_company_cate" FOREIGN KEY ("comp_code") REFERENCES "companys_mst"("comp_code") ON DELETE NO ACTION ON UPDATE NO ACTION;
