-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nodes" (
    "node_id" TEXT NOT NULL,
    "node_type" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "x_c" TEXT NOT NULL,
    "y_c" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "long_name" TEXT NOT NULL,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("node_id")
);

-- CreateTable
CREATE TABLE "Edges" (
    "id" TEXT NOT NULL,
    "end_node" TEXT NOT NULL,
    "start_node" TEXT NOT NULL,

    CONSTRAINT "Edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quant" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralService" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "long_name_loc" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "GeneralService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanitationRequest" (
    "id" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "hazardous" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "SanitationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicalDevice" (
    "id" INTEGER NOT NULL,
    "device" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "medicalDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostItem" (
    "id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "LostItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomScheduler" (
    "id" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "lengthRes" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "RoomScheduler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineRequest" (
    "id" INTEGER NOT NULL,
    "medicine_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "room_name" TEXT NOT NULL,

    CONSTRAINT "MedicineRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "subtasks" TEXT[],

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flowers" (
    "id" INTEGER NOT NULL,
    "sent_by" VARCHAR(50) NOT NULL,
    "sent_to" VARCHAR(50) NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(150),
    "room_name" TEXT NOT NULL,

    CONSTRAINT "Flowers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "GeneralService" ADD CONSTRAINT "GeneralService_location_fkey" FOREIGN KEY ("location") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationRequest" ADD CONSTRAINT "SanitationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicalDevice" ADD CONSTRAINT "medicalDevice_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostItem" ADD CONSTRAINT "LostItem_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomScheduler" ADD CONSTRAINT "RoomScheduler_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_id_fkey" FOREIGN KEY ("id") REFERENCES "GeneralService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
