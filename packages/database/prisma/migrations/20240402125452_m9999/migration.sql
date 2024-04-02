/*
  Warnings:

  - The primary key for the `Edges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deliverer` on the `Flowers` table. All the data in the column will be lost.
  - Added the required column `sent_to` to the `Flowers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flowers" DROP CONSTRAINT "Flowers_deliverer_fkey";

-- DropForeignKey
ALTER TABLE "Flowers" DROP CONSTRAINT "Flowers_sent_by_fkey";

-- AlterTable
ALTER TABLE "Edges" DROP CONSTRAINT "Edges_pkey",
ADD CONSTRAINT "Edges_pkey" PRIMARY KEY ("end_node", "start_node");

-- AlterTable
ALTER TABLE "Flowers" DROP COLUMN "deliverer",
ADD COLUMN     "sent_to" VARCHAR(50) NOT NULL;
