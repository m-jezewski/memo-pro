/*
  Warnings:

  - A unique constraint covering the columns `[orderIndex]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "orderIndex" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_orderIndex_key" ON "Note"("orderIndex");
