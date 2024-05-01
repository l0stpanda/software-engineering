/*
  Warnings:

  - You are about to drop the column `generalServiceId` on the `SecurityRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SecurityRequest" DROP CONSTRAINT "SecurityRequest_generalServiceId_fkey";

-- AlterTable
ALTER TABLE "SecurityRequest" DROP COLUMN "generalServiceId";

-- AddForeignKey
ALTER TABLE "SecurityRequest" ADD CONSTRAINT "SecurityRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
