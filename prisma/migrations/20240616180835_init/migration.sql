-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `perfilId` INTEGER NOT NULL,

    UNIQUE INDEX `User_nick_key`(`nick`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_perfilId_key`(`perfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Perfil_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user1Id` INTEGER NOT NULL,
    `user2Id` INTEGER NOT NULL,
    `pontuacaoUser1` INTEGER NOT NULL,
    `pontuacaoUser2` INTEGER NOT NULL,
    `userVencedorId` INTEGER NOT NULL,

    UNIQUE INDEX `Partida_user1Id_key`(`user1Id`),
    UNIQUE INDEX `Partida_user2Id_key`(`user2Id`),
    UNIQUE INDEX `Partida_userVencedorId_key`(`userVencedorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partida1Id` INTEGER NOT NULL,
    `partida2Id` INTEGER NOT NULL,
    `chaveAnteriorId` INTEGER NOT NULL,

    UNIQUE INDEX `Chave_partida1Id_key`(`partida1Id`),
    UNIQUE INDEX `Chave_partida2Id_key`(`partida2Id`),
    UNIQUE INDEX `Chave_chaveAnteriorId_key`(`chaveAnteriorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torneio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `jogo` VARCHAR(191) NOT NULL,
    `premiacao` VARCHAR(191) NOT NULL,
    `chaveId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Torneio_chaveId_key`(`chaveId`),
    UNIQUE INDEX `Torneio_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_userVencedorId_fkey` FOREIGN KEY (`userVencedorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chave` ADD CONSTRAINT `Chave_partida1Id_fkey` FOREIGN KEY (`partida1Id`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chave` ADD CONSTRAINT `Chave_partida2Id_fkey` FOREIGN KEY (`partida2Id`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chave` ADD CONSTRAINT `Chave_chaveAnteriorId_fkey` FOREIGN KEY (`chaveAnteriorId`) REFERENCES `Chave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `Torneio_chaveId_fkey` FOREIGN KEY (`chaveId`) REFERENCES `Chave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torneio` ADD CONSTRAINT `Torneio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
