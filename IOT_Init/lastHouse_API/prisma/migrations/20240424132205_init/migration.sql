/*
  Warnings:

  - The primary key for the `last` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `lastHouse` on the `last` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `last` DROP PRIMARY KEY,
    MODIFY `lastHouse` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`lastHouse`);
