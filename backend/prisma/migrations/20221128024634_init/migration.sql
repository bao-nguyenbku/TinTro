-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('RENTING', 'AVAILABLE');

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "addressStreet" TEXT NOT NULL,
    "addressDistrict" TEXT NOT NULL,
    "addressCity" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "utilities" TEXT[],

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "status" "RoomStatus" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_ownerId_key" ON "Accommodation"("ownerId");

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
