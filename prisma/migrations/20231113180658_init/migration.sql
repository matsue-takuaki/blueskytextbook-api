-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "school" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Textbook" (
    "id" SERIAL NOT NULL,
    "textbookName" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "Textbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "textbookId" INTEGER NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Textbook" ADD CONSTRAINT "Textbook_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_textbookId_fkey" FOREIGN KEY ("textbookId") REFERENCES "Textbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
