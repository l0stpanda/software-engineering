/*
  Warnings:

  - Made the column `emp_name` on table `GeneralService` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GeneralService" ALTER COLUMN "emp_name" SET NOT NULL;
