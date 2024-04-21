/*
  Warnings:

  - You are about to drop the column `name` on the `Flowers` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Flowers` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Flowers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flowers" DROP CONSTRAINT "Flowers_room_fkey";

-- AlterTable
ALTER TABLE "Flowers" DROP COLUMN "name",
DROP COLUMN "room",
DROP COLUMN "status",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Flowers_id_seq";

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
