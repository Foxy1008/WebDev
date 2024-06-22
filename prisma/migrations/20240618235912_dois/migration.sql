-- CreateTable
CREATE TABLE `_TorneioToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TorneioToUser_AB_unique`(`A`, `B`),
    INDEX `_TorneioToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TorneioToUser` ADD CONSTRAINT `_TorneioToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Torneio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TorneioToUser` ADD CONSTRAINT `_TorneioToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
