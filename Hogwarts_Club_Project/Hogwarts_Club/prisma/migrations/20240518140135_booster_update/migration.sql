/*
  Warnings:

  - You are about to drop the column `cardId` on the `booster` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `booster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booster` DROP COLUMN `cardId`,
    DROP COLUMN `isAvailable`;
