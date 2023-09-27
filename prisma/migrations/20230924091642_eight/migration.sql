/*
  Warnings:

  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `verifyAt` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'INVITED', 'VERIFIED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "updatedAt",
DROP COLUMN "verifyAt",
ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "expiresAt" TIMESTAMP(3);
