/*
  Warnings:

  - You are about to drop the column `lecturer` on the `Class` table. All the data in the column will be lost.
  - Added the required column `lecturerId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Class` DROP COLUMN `lecturer`,
    ADD COLUMN `lecturerId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Lecturer` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_lecturerId_fkey` FOREIGN KEY (`lecturerId`) REFERENCES `Lecturer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
