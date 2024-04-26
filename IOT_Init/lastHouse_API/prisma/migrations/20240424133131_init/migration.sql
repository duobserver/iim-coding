/*
  Warnings:

  - The primary key for the `last` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `last` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `lastHouse` VARCHAR(191) NOT NULL DEFAULT 'Gryffindor',
    ADD PRIMARY KEY (`id`);
