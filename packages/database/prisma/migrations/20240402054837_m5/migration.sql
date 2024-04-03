-- DropForeignKey
ALTER TABLE "Flowers" DROP CONSTRAINT "Flowers_room_fkey";

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_room_fkey" FOREIGN KEY ("room") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;
