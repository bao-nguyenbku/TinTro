-- DropIndex
DROP INDEX "Message_id_fromId_toId_idx";

-- CreateIndex
CREATE INDEX "Message_id_fromId_toId_createdAt_idx" ON "Message"("id", "fromId", "toId", "createdAt");
