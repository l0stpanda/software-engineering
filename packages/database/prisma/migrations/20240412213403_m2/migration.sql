-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quant" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralService" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "GeneralService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- AddForeignKey
ALTER TABLE "GeneralService" ADD CONSTRAINT "GeneralService_location_fkey" FOREIGN KEY ("location") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;
