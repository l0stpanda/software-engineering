-- CreateTable
CREATE TABLE "SanitationRequest" (
    "id" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "hazardous" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "SanitationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SanitationRequest" ADD CONSTRAINT "SanitationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
