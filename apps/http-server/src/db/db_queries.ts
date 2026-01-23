import { prisma } from "@repo/database";
import { randomCodeGenerator } from "../utils/randomCodeGenerator.js";

const getRoomOrNull = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: {
      roomId,
    },
  });

  return room;
};

const createRoom = async () => {
  const uniqueRoomId = randomCodeGenerator(8);

  if (await getRoomOrNull(uniqueRoomId)) {
    return await createRoom();
  }

  const room = await prisma.room.create({
    data: {
      roomId: uniqueRoomId,
    },
  });

  return room.roomId;
};

const closeRoom = async (roomId: string) => {
  const resp = await prisma.room.delete({
    where: {
      roomId,
    },
  });
};

const getRoomSketches = async (roomId: string) => {
  const data = await prisma.sketch.findUnique({
    where: { roomId },
  });

  if (!data) {
    return [];
  }

  return data.data;
};

const addSketch = async (roomId: string, sketchData: string) => {
  const resp = await prisma.sketch.upsert({
    where: { roomId: roomId },
    create: {
      roomId: roomId,
      data: [sketchData],
    },
    update: {
      data: {
        push: sketchData,
      },
    },
  });
};

export { getRoomOrNull, createRoom, closeRoom, getRoomSketches, addSketch };
