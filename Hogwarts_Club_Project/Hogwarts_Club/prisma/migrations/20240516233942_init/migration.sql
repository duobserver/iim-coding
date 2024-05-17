-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `lastConnected` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profileId` INTEGER NOT NULL,
    `boosterId` INTEGER NOT NULL,
    `settingsId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_profileId_key`(`profileId`),
    UNIQUE INDEX `User_boosterId_key`(`boosterId`),
    UNIQUE INDEX `User_settingsId_key`(`settingsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('Unknown', 'Male', 'Female', 'NonBinary') NOT NULL DEFAULT 'Unknown',
    `biography` VARCHAR(191) NOT NULL DEFAULT 'Hello, I like Hogwarts Club!',
    `icon` ENUM('Satisfied', 'Dissatisfied', 'Neutral', 'Sad', 'Excited', 'Calm', 'Stressed', 'Frustrated', 'Content', 'Worried') NOT NULL DEFAULT 'Satisfied',
    `color` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `joinedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profile_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `ownerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booster` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nextBooster` VARCHAR(191) NOT NULL DEFAULT '0',
    `isAvailable` BOOLEAN NOT NULL DEFAULT false,
    `cardId` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `traderId` INTEGER NOT NULL,
    `cardInId` INTEGER NOT NULL,
    `cardOutId` INTEGER NOT NULL,
    `tradeStatus` ENUM('PENDING', 'RECEIVED', 'ACCEPTED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `showCollection` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_boosterId_fkey` FOREIGN KEY (`boosterId`) REFERENCES `Booster`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_settingsId_fkey` FOREIGN KEY (`settingsId`) REFERENCES `Settings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
