/*
  Warnings:

  - You are about to drop the column `toId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `currentUserId` on the `MessageSection` table. All the data in the column will be lost.
  - You are about to drop the column `latestMessageId` on the `MessageSection` table. All the data in the column will be lost.
  - You are about to drop the column `otherUserId` on the `MessageSection` table. All the data in the column will be lost.
  - Added the required column `messageSectionId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toId_fkey";

-- DropForeignKey
ALTER TABLE "MessageSection" DROP CONSTRAINT "MessageSection_currentUserId_fkey";

-- DropForeignKey
ALTER TABLE "MessageSection" DROP CONSTRAINT "MessageSection_latestMessageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageSection" DROP CONSTRAINT "MessageSection_otherUserId_fkey";

-- DropIndex
DROP INDEX "Message_id_fromId_toId_createdAt_idx";

-- DropIndex
DROP INDEX "MessageSection_latestMessageId_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "toId",
ADD COLUMN     "messageSectionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MessageSection" DROP COLUMN "currentUserId",
DROP COLUMN "latestMessageId",
DROP COLUMN "otherUserId";

-- CreateIndex
CREATE INDEX "Message_id_fromId_createdAt_idx" ON "Message"("id", "fromId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageSectionId_fkey" FOREIGN KEY ("messageSectionId") REFERENCES "MessageSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
