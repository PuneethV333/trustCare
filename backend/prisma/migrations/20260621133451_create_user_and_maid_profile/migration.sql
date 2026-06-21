-- CreateEnum
CREATE TYPE "roles" AS ENUM ('USER', 'HELPER', 'ADMIN');

-- CreateEnum
CREATE TYPE "type" AS ENUM ('nanny', 'maid', 'babysitter');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'USER',
    "phoneNumber" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profilePic" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaidProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "type" NOT NULL DEFAULT 'maid',
    "bio" TEXT,
    "experience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "skill" TEXT[],
    "rating" INTEGER NOT NULL DEFAULT 0,
    "costPerHour" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "profileCompletion" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "MaidProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "MaidProfile_userId_key" ON "MaidProfile"("userId");

-- AddForeignKey
ALTER TABLE "MaidProfile" ADD CONSTRAINT "MaidProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
