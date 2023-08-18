/*
  Warnings:

  - You are about to drop the column `adminId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevelId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `GradeLevel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_gradeLevelId_fkey";

-- DropIndex
DROP INDEX "Account_adminId_key";

-- DropIndex
DROP INDEX "Account_facultyId_key";

-- DropIndex
DROP INDEX "Account_studentId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "adminId",
DROP COLUMN "facultyId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "accountId" TEXT;

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "accountId" TEXT;

-- AlterTable
ALTER TABLE "GradeLevel" ADD COLUMN     "studentId" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gradeLevelId",
ADD COLUMN     "accountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_accountId_key" ON "Admin"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_accountId_key" ON "Faculty"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "GradeLevel_studentId_key" ON "GradeLevel"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_accountId_key" ON "Student"("accountId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeLevel" ADD CONSTRAINT "GradeLevel_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
