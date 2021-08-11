/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_coffeeShopId_fkey";

-- CreateTable
CREATE TABLE "_CategoryToCoffeeShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoffeeShop_AB_unique" ON "_CategoryToCoffeeShop"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoffeeShop_B_index" ON "_CategoryToCoffeeShop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoffeeShop" ADD FOREIGN KEY ("B") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
