-- CreateTable
CREATE TABLE "MedicineRequest" (
    "id" INTEGER NOT NULL,
    "medicine_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "MedicineRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
