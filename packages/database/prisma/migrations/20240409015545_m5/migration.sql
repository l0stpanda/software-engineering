-- CreateTable
CREATE TABLE "RoomScheduler" (
    "id" SERIAL NOT NULL,
    "employName" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "lengthRes" TEXT NOT NULL,
    "roomNum" TEXT NOT NULL,
    "reqStatus" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "RoomScheduler_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomScheduler" ADD CONSTRAINT "RoomScheduler_roomNum_fkey" FOREIGN KEY ("roomNum") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;
