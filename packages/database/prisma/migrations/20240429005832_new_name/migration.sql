-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "maintainType" TEXT NOT NULL,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityRequest" (
    "id" INTEGER NOT NULL,
    "incidentDescription" TEXT NOT NULL,
    "incidentTime" TEXT,
    "actionTaken" TEXT,

    CONSTRAINT "SecurityRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityRequest" ADD CONSTRAINT "SecurityRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
