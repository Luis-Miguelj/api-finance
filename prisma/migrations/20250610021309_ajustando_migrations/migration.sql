/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Finance` table. All the data in the column will be lost.
  - Added the required column `financesId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "financesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "categoryId";
