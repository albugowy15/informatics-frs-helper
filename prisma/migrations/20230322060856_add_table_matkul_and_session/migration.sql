-- CreateTable
CREATE TABLE `Matkul` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lecturer` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `sks` INTEGER NOT NULL,
    `isAksel` BOOLEAN NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `taken` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matkul` ADD CONSTRAINT `Matkul_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
