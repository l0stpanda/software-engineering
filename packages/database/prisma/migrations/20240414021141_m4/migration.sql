/*
  Warnings:

  - You are about to drop the column `employName` on the `RoomScheduler` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `RoomScheduler` table. All the data in the column will be lost.
  - You are about to drop the column `reqStatus` on the `RoomScheduler` table. All the data in the column will be lost.
  - You are about to drop the column `roomNum` on the `RoomScheduler` table. All the data in the column will be lost.
  - Added the required column `room_name` to the `RoomScheduler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomScheduler" DROP COLUMN "employName",
DROP COLUMN "priority",
DROP COLUMN "reqStatus",
DROP COLUMN "roomNum",
ADD COLUMN     "room_name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "RoomScheduler_id_seq";

-- CreateTable
CREATE TABLE "medicalDevice" (
    "id" INTEGER NOT NULL,
    "device" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "medicalDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostItem" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "LostItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medicalDevice" ADD CONSTRAINT "medicalDevice_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostItem" ADD CONSTRAINT "LostItem_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomScheduler" ADD CONSTRAINT "RoomScheduler_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
