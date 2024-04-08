-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flowers" (
    "id" SERIAL NOT NULL,
    "room" TEXT NOT NULL,
    "sent_by" VARCHAR(50) NOT NULL,
    "sent_to" VARCHAR(50) NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" VARCHAR(150),
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

-- AddForeignKey
ALTER TABLE "Flowers" ADD CONSTRAINT "Flowers_room_fkey" FOREIGN KEY ("room") REFERENCES "Nodes"("node_id") ON DELETE CASCADE ON UPDATE CASCADE;
