/*
  Warnings:

  - A unique constraint covering the columns `[financesId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_financesId_key" ON "Category"("financesId");
