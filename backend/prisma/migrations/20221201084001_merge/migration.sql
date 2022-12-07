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
CREATE TABLE "_users_in_message_section" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Message_id_fromId_createdAt_idx" ON "Message"("id", "fromId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_users_in_message_section_AB_unique" ON "_users_in_message_section"("A", "B");

-- CreateIndex
CREATE INDEX "_users_in_message_section_B_index" ON "_users_in_message_section"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageSectionId_fkey" FOREIGN KEY ("messageSectionId") REFERENCES "MessageSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_A_fkey" FOREIGN KEY ("A") REFERENCES "MessageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
