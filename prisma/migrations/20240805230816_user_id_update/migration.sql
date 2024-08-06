/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Coasters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coasters_userId_key" ON "Coasters"("userId");
