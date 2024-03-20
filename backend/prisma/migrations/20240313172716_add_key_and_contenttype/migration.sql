/*
  Warnings:

  - Added the required column `contentType` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `contentType` VARCHAR(191) NOT NULL,
    ADD COLUMN `key` VARCHAR(191) NOT NULL;
