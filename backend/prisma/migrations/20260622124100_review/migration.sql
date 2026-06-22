/*
  Warnings:

  - You are about to drop the column `rating` on the `MaidProfile` table. All the data in the column will be lost.
  - Made the column `profilePic` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MaidProfile" DROP COLUMN "rating",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePic" SET NOT NULL,
ALTER COLUMN "profilePic" SET DEFAULT 'https://ui-avatars.com/api/?name=User&background=random';

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "MaidProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
