/*
  Warnings:

  - You are about to drop the column `class` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `isAksel` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `lecturer` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Matkul` table. All the data in the column will be lost.
  - You are about to drop the column `taken` on the `Matkul` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Matkul` DROP FOREIGN KEY `Matkul_sessionId_fkey`;

-- AlterTable
ALTER TABLE `Matkul` DROP COLUMN `class`,
    DROP COLUMN `code`,
    DROP COLUMN `day`,
    DROP COLUMN `isAksel`,
    DROP COLUMN `lecturer`,
    DROP COLUMN `sessionId`,
    DROP COLUMN `taken`;

-- CreateTable
CREATE TABLE `Plan` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `priority` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `matkulId` VARCHAR(191) NOT NULL,
    `lecturer` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `isAksel` BOOLEAN NOT NULL,
    `taken` INTEGER NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `planId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_matkulId_fkey` FOREIGN KEY (`matkulId`) REFERENCES `Matkul`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
