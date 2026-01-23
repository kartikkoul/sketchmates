import WebSocket from "ws";
import { WebSocketServer } from "ws";
import { Room } from "@repo/types";
import { getRoomSketches, closeRoom, addRoomSketch } from "@repo/api";

const wss = new WebSocketServer({ port: 8080 });

const rooms: Room = {};

//Room exists
const roomExists = async (roomId: string) => {
  const data = await getRoomSketches(roomId);

  if (!data.sketches) {
    const error = {
      status: data?.error?.status,
      message: data?.error?.response?.data?.message
    }
    return error.status === 404 ? error : data?.error;
  }

  return true;
};

//Delete a room from backend
const deleteRoom = async (roomId: string) => {
  const data = await closeRoom(roomId);
  if (data?.error) {
    console.error(data?.error);
    console.error("Couldn't close room:: ", roomId, data?.error?.message || data?.error);
  }
};

//Add sketch to backend
const addSketch = async (roomId: string, sketchData: any) => {
  const data = await addRoomSketch(roomId, sketchData);
  if (data?.error) {
    return data.error;
  }
  return null;
};

const sendSocketError = (socket: WebSocket, errorType: string, errorMessage: string) => {
  socket.send(
    JSON.stringify({
      type: "error",
      errorType,
      message: errorMessage,
    }),
  );
};

const leaveRoom = async (socket: WebSocket, roomId?: string) => {
  if (!roomId) {
    for (const rId in rooms) {
      const socketIndex = rooms[rId]?.findIndex((s) => s === socket);
      if (socketIndex !== undefined && socketIndex >= 0) {
        rooms[rId]?.splice(socketIndex, 1);
      }
      if (rooms[rId] && rooms[rId].length <= 0) {
        delete rooms[rId];
        await deleteRoom(rId);
      }
    }
    return;
  }

  const socketIndex = rooms[roomId]?.findIndex((s) => s === socket);

  if (socketIndex !== undefined && socketIndex >= 0) {
    rooms[roomId]?.splice(socketIndex, 1);
  }
  if (rooms[roomId] && rooms[roomId].length <= 0) {
    delete rooms[roomId];
    await deleteRoom(roomId);
  }
};

wss.on("connection", (socket: WebSocket) => {
  socket.on("message", async (e) => {
    const message = JSON.parse(e.toString());
    const { type, roomId, data } = message;

    if (type === "join") {
      if (!rooms[roomId]) {
        const roomExistsInBackend = await roomExists(roomId);
        if (roomExistsInBackend !== true) {
          sendSocketError(
            socket,
            "join",
            `Couldn't join room because:: ${roomExistsInBackend?.message || roomExistsInBackend}`,
          );
          return;
        }
      }

      if (!rooms[roomId]) {
        rooms[roomId] = [socket];
      } else if (!rooms[roomId].includes(socket)) {
        rooms[roomId]?.push(socket);
      }

      socket.send(JSON.stringify({
        type:"ok",
        message:"Joined successfully"
      }));

      return;
    }

    if (type === "draw") {
      
      rooms[roomId]?.forEach((ws) => {
        if (ws !== socket) {
          ws.send(
            JSON.stringify({
              type,
              data,
            }),
          );
        }
      });

      const error = await addSketch(roomId, data);
      if(error){
        sendSocketError(socket, "addSketch",  `Couldn't add sketch to the backend because:: ` + (error?.message || error))
      }

      return;
    }

    if (type === "leave") {
      await leaveRoom(socket, roomId);
    }
  });

  socket.on("close", async() => {
    await leaveRoom(socket);
  });
});
