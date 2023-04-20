-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_dept_code_start_date_fkey" FOREIGN KEY ("dept_code", "start_date") REFERENCES "dept_mst"("dept_code", "start_date") ON DELETE RESTRICT ON UPDATE CASCADE;
