/*
  Warnings:

  - The primary key for the `Owner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Owner` table. All the data in the column will be lost.
  - The primary key for the `Renter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Renter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RentRequest" DROP CONSTRAINT "RentRequest_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "RentRequest" DROP CONSTRAINT "RentRequest_renterId_fkey";

-- DropIndex
DROP INDEX "Owner_id_idx";

-- DropIndex
DROP INDEX "Renter_id_idx";

-- AlterTable
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- CreateIndex
CREATE INDEX "Owner_userId_idx" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_userId_key" ON "Renter"("userId");

-- CreateIndex
CREATE INDEX "Renter_userId_idx" ON "Renter"("userId");

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
