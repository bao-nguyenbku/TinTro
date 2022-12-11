/*
  Warnings:

  - A unique constraint covering the columns `[accommodationId]` on the table `RentRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RentingStatus" AS ENUM ('CHECKOUT', 'RENTING');

-- DropIndex
DROP INDEX "RentRequest_renterId_key";

-- CreateTable
CREATE TABLE "Renting" (
    "id" SERIAL NOT NULL,
    "renterId" INTEGER NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "status" "RentingStatus" NOT NULL,

    CONSTRAINT "Renting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renting_accommodationId_key" ON "Renting"("accommodationId");

-- CreateIndex
CREATE UNIQUE INDEX "RentRequest_accommodationId_key" ON "RentRequest"("accommodationId");

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
