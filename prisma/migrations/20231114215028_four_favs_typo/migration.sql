/*
  Warnings:

  - You are about to drop the column `foursFavs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "foursFavs",
ADD COLUMN     "fourFavs" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
