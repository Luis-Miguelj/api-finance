-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_id_fkey";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_financesId_fkey" FOREIGN KEY ("financesId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
