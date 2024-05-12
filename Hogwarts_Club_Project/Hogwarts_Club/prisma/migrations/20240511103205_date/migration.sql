/*
  Warnings:

  - Made the column `cardId` on table `booster` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `booster` MODIFY `cardId` INTEGER NOT NULL DEFAULT 1;
