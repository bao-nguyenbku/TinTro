-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('WAITING', 'CONFIRM');

-- CreateEnum
CREATE TYPE "RentingStatus" AS ENUM ('CHECKOUT', 'RENTING');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('RENTING', 'AVAILABLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://obedient-veil-production.up.railway.app/public/default-avatar.png',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromId" INTEGER NOT NULL,
    "messageSectionId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageSection" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "MessageSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Renter" (
    "userId" INTEGER NOT NULL,
    "rentRoomId" INTEGER
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "addressStreet" TEXT NOT NULL,
    "addressDistrict" TEXT NOT NULL,
    "addressCity" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "ownerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "utilities" TEXT[],

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "roomName" TEXT NOT NULL DEFAULT '',
    "status" "RoomStatus" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_users_in_message_section" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "Message_id_fromId_createdAt_idx" ON "Message"("id", "fromId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- CreateIndex
CREATE INDEX "Owner_userId_idx" ON "Owner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_userId_key" ON "Renter"("userId");

-- CreateIndex
CREATE INDEX "Renter_userId_idx" ON "Renter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_ownerId_key" ON "Accommodation"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "RentRequest_accommodationId_key" ON "RentRequest"("accommodationId");

-- CreateIndex
CREATE UNIQUE INDEX "Renting_renterId_key" ON "Renting"("renterId");

-- CreateIndex
CREATE UNIQUE INDEX "_users_in_message_section_AB_unique" ON "_users_in_message_section"("A", "B");

-- CreateIndex
CREATE INDEX "_users_in_message_section_B_index" ON "_users_in_message_section"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageSectionId_fkey" FOREIGN KEY ("messageSectionId") REFERENCES "MessageSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_rentRoomId_fkey" FOREIGN KEY ("rentRoomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRequest" ADD CONSTRAINT "RentRequest_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renting" ADD CONSTRAINT "Renting_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_A_fkey" FOREIGN KEY ("A") REFERENCES "MessageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
