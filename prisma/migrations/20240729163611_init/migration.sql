-- CreateTable
CREATE TABLE "Lesson" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL DEFAULT 'New lesson',

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);
