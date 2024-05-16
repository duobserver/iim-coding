/*
  Warnings:

  - You are about to drop the column `firstBooster` on the `booster` table. All the data in the column will be lost.
  - You are about to drop the column `lastTaken` on the `booster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booster` DROP COLUMN `firstBooster`,
    DROP COLUMN `lastTaken`,
    ADD COLUMN `nextBooster` INTEGER NOT NULL DEFAULT 0;
