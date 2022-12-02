-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('WAITING', 'CONFIRM');

-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_ownerId_fkey";

-- AlterTable
ALTER TABLE "Accommodation" ALTER COLUMN "images" SET DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renter" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rentRoomId" INTEGER,

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentRequest" (
    "id" SERIAL NOT NULL,
    "renterId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL,

    CONSTRAINT "RentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone_key" ON "Owner"("phone");

-- CreateIndex
CREATE INDEX "Owner_id_idx" ON "Owner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_email_key" ON "Renter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_phone_key" ON "Renter"("phone");

-- CreateIndex
CREATE INDEX "Renter_id_idx" ON "Renter"("id");

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_rentRoomId_fkey" FOREIGN KEY ("rentRoomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
