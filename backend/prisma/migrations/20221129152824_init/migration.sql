/*
  Warnings:

  - You are about to drop the column `fromId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `toId` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Message_Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `sessionId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toId_fkey";

-- DropIndex
DROP INDEX "Message_id_fromId_toId_createdAt_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "fromId",
DROP COLUMN "toId",
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message_Session" DROP CONSTRAINT "Message_Session_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Message_Session_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Message_id_idx" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Message_Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
