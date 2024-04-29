/*
  Warnings:

  - You are about to drop the column `subtasks` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "subtasks";

-- CreateTable
CREATE TABLE "subTodo" (
    "id" SERIAL NOT NULL,
    "id_relation" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,

    CONSTRAINT "subTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subTodo" ADD CONSTRAINT "subTodo_id_relation_fkey" FOREIGN KEY ("id_relation") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
