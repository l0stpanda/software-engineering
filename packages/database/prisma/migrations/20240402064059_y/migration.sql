/*
  Warnings:

  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Staff` table. All the data in the column will be lost.
  - The `emp_id` column on the `Staff` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Staff_email_key";

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
DROP COLUMN "email",
DROP COLUMN "emp_id",
ADD COLUMN     "emp_id" SERIAL NOT NULL,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("emp_id");
