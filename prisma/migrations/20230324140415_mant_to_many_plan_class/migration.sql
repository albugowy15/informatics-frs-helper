/*
  Warnings:

  - You are about to drop the column `planId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Plan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_planId_fkey`;

-- AlterTable
ALTER TABLE `Class` DROP COLUMN `planId`;

-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `semester`;

-- CreateTable
CREATE TABLE `_ClassToPlan` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClassToPlan_AB_unique`(`A`, `B`),
    INDEX `_ClassToPlan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClassToPlan` ADD CONSTRAINT `_ClassToPlan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassToPlan` ADD CONSTRAINT `_ClassToPlan_B_fkey` FOREIGN KEY (`B`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
