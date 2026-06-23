-- CreateEnum
CREATE TYPE "PlanTypes" AS ENUM ('monthly', 'hourly', 'yearly');

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "type" "PlanTypes" NOT NULL DEFAULT 'monthly',
    "duration" INTEGER NOT NULL,
    "dailyWorkingHours" INTEGER NOT NULL,
    "noOfSubs" INTEGER NOT NULL,
    "maidProfileId" TEXT,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plans" ADD CONSTRAINT "Plans_maidProfileId_fkey" FOREIGN KEY ("maidProfileId") REFERENCES "MaidProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
