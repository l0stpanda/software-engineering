-- CreateTable
CREATE TABLE "Staff" (
    "emp_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "add_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "Flowers" (
    "id" SERIAL NOT NULL,
    "room" TEXT NOT NULL,
    "sent_by" VARCHAR(50) NOT NULL,
    "deliverer" VARCHAR(50) NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(50),
    "status" TEXT NOT NULL,

    CONSTRAINT "Flowers_pkey" PRIMARY KEY ("id")
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
    "end_node" TEXT NOT NULL,
    "start_node" TEXT NOT NULL,

    CONSTRAINT "Edges_pkey" PRIMARY KEY ("end_node","start_node")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_deliverer_fkey" FOREIGN KEY ("deliverer") REFERENCES "Staff"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "Staff"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_room_fkey" FOREIGN KEY ("room") REFERENCES "Nodes"("node_id") ON DELETE RESTRICT ON UPDATE CASCADE;
