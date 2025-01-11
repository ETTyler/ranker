-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "topTen" JSONB NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movies_userId_key" ON "Movies"("userId");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
