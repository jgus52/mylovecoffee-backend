/*
  Warnings:

  - You are about to drop the `_CategoryToCoffeeShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_B_fkey";

-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToCoffeeShop";

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
