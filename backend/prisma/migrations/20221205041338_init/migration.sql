/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Renter` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Owner_email_key";

-- DropIndex
DROP INDEX "Owner_phone_key";

-- DropIndex
DROP INDEX "Renter_email_key";

-- DropIndex
DROP INDEX "Renter_phone_key";

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Renter" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "updatedAt";
