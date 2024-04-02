/*
  Warnings:

  - The primary key for the `Edges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edges" DROP CONSTRAINT "Edges_pkey",
ADD CONSTRAINT "Edges_pkey" PRIMARY KEY ("end_node", "start_node");

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "emp_id" DROP DEFAULT,
ALTER COLUMN "emp_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("emp_id");
DROP SEQUENCE "Staff_emp_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");
