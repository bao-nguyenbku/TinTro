/*
  Warnings:

  - A unique constraint covering the columns `[currentUserId,otherUserId]` on the table `MessageSection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MessageSection_otherUserId_key";

-- CreateIndex
CREATE UNIQUE INDEX "MessageSection_currentUserId_otherUserId_key" ON "MessageSection"("currentUserId", "otherUserId");
