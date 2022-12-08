-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Message_Session" (
    "userAId" INTEGER NOT NULL,
    "userBId" INTEGER NOT NULL,
    "latestUserId" INTEGER NOT NULL,

    CONSTRAINT "Message_Session_pkey" PRIMARY KEY ("userAId","userBId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_Session_userAId_key" ON "Message_Session"("userAId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_Session_userBId_key" ON "Message_Session"("userBId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_Session_latestUserId_key" ON "Message_Session"("latestUserId");

-- AddForeignKey
ALTER TABLE "Message_Session" ADD CONSTRAINT "Message_Session_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_Session" ADD CONSTRAINT "Message_Session_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message_Session" ADD CONSTRAINT "Message_Session_latestUserId_fkey" FOREIGN KEY ("latestUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
