-- DropForeignKey
ALTER TABLE "Sketch" DROP CONSTRAINT "Sketch_roomId_fkey";

-- AddForeignKey
ALTER TABLE "Sketch" ADD CONSTRAINT "Sketch_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
