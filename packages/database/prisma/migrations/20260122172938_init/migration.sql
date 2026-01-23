-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Sketch" (
    "roomId" TEXT NOT NULL,
    "data" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Sketch_roomId_key" ON "Sketch"("roomId");

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
