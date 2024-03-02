-- CreateTable
CREATE TABLE "Coasters" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "topTen" JSONB NOT NULL,

    CONSTRAINT "Coasters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coasters" ADD CONSTRAINT "Coasters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
