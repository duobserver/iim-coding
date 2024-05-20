/*
  Warnings:

  - You are about to alter the column `icon` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `icon` ENUM('satisfied', 'dissatisfied', 'neutral', 'sad', 'excited', 'calm', 'stressed', 'frustrated', 'content', 'worried') NOT NULL DEFAULT 'satisfied';
