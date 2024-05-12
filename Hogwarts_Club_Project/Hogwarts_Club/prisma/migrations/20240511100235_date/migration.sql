/*
  Warnings:

  - You are about to alter the column `lastTaken` on the `booster` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `booster` MODIFY `lastTaken` DATETIME(0) NOT NULL;
