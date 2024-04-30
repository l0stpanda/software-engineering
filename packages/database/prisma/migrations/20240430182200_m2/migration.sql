/*
  Warnings:

  - Added the required column `serv_req_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "serv_req_id" INTEGER NOT NULL;
