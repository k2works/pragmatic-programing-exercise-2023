/*
  Warnings:

  - Added the required column `class_id` to the `Student2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student2` ADD COLUMN `class_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
