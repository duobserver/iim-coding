-- CreateTable
CREATE TABLE `Last` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `lastHouse` ENUM('Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw') NOT NULL DEFAULT 'Gryffindor',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
