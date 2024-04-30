/*
  Warnings:

  - Added the required column `endTime` to the `RoomScheduler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomScheduler" ADD COLUMN     "endTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "dueDate" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "langInterpreter" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "modeOfInterp" TEXT NOT NULL,
    "specInstruct" TEXT,

    CONSTRAINT "langInterpreter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "langInterpreter" ADD CONSTRAINT "langInterpreter_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
