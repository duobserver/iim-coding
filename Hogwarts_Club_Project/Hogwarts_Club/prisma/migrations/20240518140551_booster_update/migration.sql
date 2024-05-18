/*
  Warnings:

  - You are about to drop the column `boosterId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastConnected` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `booster` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_boosterId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `boosterId`,
    DROP COLUMN `lastConnected`,
    ADD COLUMN `nextBooster` VARCHAR(191) NOT NULL DEFAULT '0';

-- DropTable
DROP TABLE `booster`;
