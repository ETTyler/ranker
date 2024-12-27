/*
  Warnings:

  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_github_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_id",
ADD COLUMN     "userID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
