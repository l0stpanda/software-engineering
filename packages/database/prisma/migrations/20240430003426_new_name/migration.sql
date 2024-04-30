-- CreateTable
CREATE TABLE "langInterpreter" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "modeOfInterp" TEXT NOT NULL,
    "specInstruct" TEXT,

    CONSTRAINT "langInterpreter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "langInterpreter" ADD CONSTRAINT "langInterpreter_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
