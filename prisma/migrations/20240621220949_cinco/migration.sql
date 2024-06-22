/*
  Warnings:

  - You are about to drop the `_torneiotouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_torneiotouser` DROP FOREIGN KEY `_TorneioToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_torneiotouser` DROP FOREIGN KEY `_TorneioToUser_B_fkey`;

-- DropTable
DROP TABLE `_torneiotouser`;

-- CreateTable
CREATE TABLE `_userTorneio` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_userTorneio_AB_unique`(`A`, `B`),
    INDEX `_userTorneio_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_userTorneio` ADD CONSTRAINT `_userTorneio_A_fkey` FOREIGN KEY (`A`) REFERENCES `Torneio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_userTorneio` ADD CONSTRAINT `_userTorneio_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
