-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nextBooster` VARCHAR(191) NOT NULL DEFAULT '0',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pseudo` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('Unknown', 'Male', 'Female', 'NonBinary') NOT NULL DEFAULT 'Unknown',
    `biography` VARCHAR(191) NOT NULL DEFAULT 'Hello, I like Hogwarts Club!',
    `icon` ENUM('Satisfied', 'Dissatisfied', 'Neutral', 'Sad', 'Excited', 'Calm', 'Stressed', 'Frustrated', 'Content', 'Worried') NOT NULL DEFAULT 'Satisfied',
    `color` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `joinedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_pseudo_key`(`pseudo`),
    UNIQUE INDEX `Profile_userId_key`(`userId`),
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
CREATE TABLE `Trade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,
    `cardForAuthorId` INTEGER NOT NULL,
    `cardForTargetId` INTEGER NOT NULL,
    `message` VARCHAR(128) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `showCollection` BOOLEAN NOT NULL DEFAULT true,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Settings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
