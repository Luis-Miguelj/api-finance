/*
  Warnings:

  - You are about to drop the column `financesId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Category` table. All the data in the column will be lost.
  - Added the required column `category` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_financesId_fkey";

-- DropIndex
DROP INDEX "Category_financesId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "financesId",
DROP COLUMN "type",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "category" TEXT NOT NULL;
