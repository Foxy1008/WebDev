-- DropForeignKey
ALTER TABLE `chave` DROP FOREIGN KEY `Chave_chaveAnteriorId_fkey`;

-- DropForeignKey
ALTER TABLE `chave` DROP FOREIGN KEY `Chave_partida2Id_fkey`;

-- DropForeignKey
ALTER TABLE `partida` DROP FOREIGN KEY `Partida_user1Id_fkey`;

-- DropForeignKey
ALTER TABLE `partida` DROP FOREIGN KEY `Partida_user2Id_fkey`;

-- DropForeignKey
ALTER TABLE `partida` DROP FOREIGN KEY `Partida_userVencedorId_fkey`;

-- DropForeignKey
ALTER TABLE `torneio` DROP FOREIGN KEY `Torneio_chaveId_fkey`;

-- DropForeignKey
ALTER TABLE `torneio` DROP FOREIGN KEY `Torneio_userId_fkey`;

-- AlterTable
ALTER TABLE `chave` MODIFY `partida2Id` INTEGER NULL,
    MODIFY `chaveAnteriorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `partida` MODIFY `user1Id` INTEGER NULL,
    MODIFY `user2Id` INTEGER NULL,
    MODIFY `userVencedorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `torneio` MODIFY `chaveId` INTEGER NULL,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_userVencedorId_fkey` FOREIGN KEY (`userVencedorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chave` ADD CONSTRAINT `Chave_partida2Id_fkey` FOREIGN KEY (`partida2Id`) REFERENCES `Partida`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chave` ADD CONSTRAINT `Chave_chaveAnteriorId_fkey` FOREIGN KEY (`chaveAnteriorId`) REFERENCES `Chave`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `Torneio_chaveId_fkey` FOREIGN KEY (`chaveId`) REFERENCES `Chave`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `Torneio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
