-- CreateTable
CREATE TABLE "_users_in_message_section" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_users_in_message_section_AB_unique" ON "_users_in_message_section"("A", "B");

-- CreateIndex
CREATE INDEX "_users_in_message_section_B_index" ON "_users_in_message_section"("B");

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_A_fkey" FOREIGN KEY ("A") REFERENCES "MessageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_in_message_section" ADD CONSTRAINT "_users_in_message_section_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
