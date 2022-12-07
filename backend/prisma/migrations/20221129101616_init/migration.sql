-- DropIndex
DROP INDEX "Message_id_idx";

-- CreateIndex
CREATE INDEX "Message_id_fromId_toId_idx" ON "Message"("id", "fromId", "toId");
