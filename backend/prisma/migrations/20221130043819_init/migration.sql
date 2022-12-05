/*
  Warnings:

  - You are about to drop the column `isLatestFromCurrentUser` on the `MessageSection` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MessageSection_currentUserId_otherUserId_key";

-- AlterTable
ALTER TABLE "MessageSection" DROP COLUMN "isLatestFromCurrentUser";
