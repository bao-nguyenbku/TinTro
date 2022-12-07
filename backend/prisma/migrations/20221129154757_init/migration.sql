/*
  Warnings:

  - You are about to drop the column `isRead` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Message_Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fromId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Message_Session" DROP CONSTRAINT "Message_Session_latestUserId_fkey";

-- DropForeignKey
ALTER TABLE "Message_Session" DROP CONSTRAINT "Message_Session_userAId_fkey";

-- DropForeignKey
ALTER TABLE "Message_Session" DROP CONSTRAINT "Message_Session_userBId_fkey";

-- DropIndex
DROP INDEX "Message_id_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isRead",
DROP COLUMN "sessionId",
DROP COLUMN "updatedAt",
ADD COLUMN     "fromId" INTEGER NOT NULL,
ADD COLUMN     "toId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Message_Session";

-- CreateTable
CREATE TABLE "MessageSection" (
    "id" SERIAL NOT NULL,
    "currentUserId" INTEGER NOT NULL,
    "otherUserId" INTEGER NOT NULL,
    "isLatestFromCurrentUser" BOOLEAN NOT NULL,
    "latestMessageId" INTEGER NOT NULL,

    CONSTRAINT "MessageSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageSection_otherUserId_key" ON "MessageSection"("otherUserId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageSection_latestMessageId_key" ON "MessageSection"("latestMessageId");

-- CreateIndex
CREATE INDEX "Message_id_fromId_toId_createdAt_idx" ON "Message"("id", "fromId", "toId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageSection" ADD CONSTRAINT "MessageSection_currentUserId_fkey" FOREIGN KEY ("currentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageSection" ADD CONSTRAINT "MessageSection_otherUserId_fkey" FOREIGN KEY ("otherUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageSection" ADD CONSTRAINT "MessageSection_latestMessageId_fkey" FOREIGN KEY ("latestMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
