/*
  Warnings:

  - The primary key for the `Edges` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Edges" DROP CONSTRAINT "Edges_pkey",
ADD CONSTRAINT "Edges_pkey" PRIMARY KEY ("start_node", "end_node");
