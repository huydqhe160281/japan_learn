-- CreateEnum
CREATE TYPE "AlphabetType" AS ENUM ('hiragana', 'katakana');

-- CreateTable
CREATE TABLE "japanese_characters" (
    "id" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "romaji" TEXT NOT NULL,
    "type" "AlphabetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "japanese_characters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "japanese_characters_type_idx" ON "japanese_characters"("type");
