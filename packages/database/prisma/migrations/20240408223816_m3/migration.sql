/*
  Warnings:

  - The primary key for the `Edges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Edges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flowers" DROP CONSTRAINT "Flowers_room_fkey";

-- DropIndex
DROP INDEX "Nodes_long_name_key";

-- AlterTable
ALTER TABLE "Edges" DROP CONSTRAINT "Edges_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Edges_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_room_fkey" FOREIGN KEY ("room") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;
