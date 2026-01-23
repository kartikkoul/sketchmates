import {
  Canvas,
  FabricObject,
  PencilBrush,
  SerializedObjectProps,
  SprayBrush,
  util,
} from "fabric";
import { Tool } from "@repo/types";
import { getRoomSketches } from "@repo/api";

async function DrawingPadInit(canvas: Canvas, socket: WebSocket, roomId: string, brush:Tool, color:string) {

  //Get already existing sketches for the room
  const sketches = [];
  try{
    const resp = await getRoomSketches(roomId);
    if(resp.sketches?.length > 0 ){
      sketches.push(...resp?.sketches);
    }
  }catch(e : any){
    console.error("Cant fetch existing sketches:: ", e?.message);
  }

  //Default config
  enableDrawing(canvas);
  selectBrush(canvas, brush);
  selectColor(canvas, color, brush);
  canvas.requestRenderAll();

  await createSketches(canvas, sketches);

  //Event listeners
  canvas.on("path:created", (e) => {
    const path = e.path;
    const data = path.toObject();
    if(socket.readyState === WebSocket.OPEN){
      emitEventToSocket(socket, roomId, data);
    }
  });

  if (!socket) {
    console.error("No connection to the server. Offline mode");
    return;
  }

  socket.onmessage = (e) => {
    recieveEventFromSocket(canvas, e);
  };
}
function selectBrush(canvas: Canvas, brush?: Tool) {
  if (!brush) {
    canvas.freeDrawingBrush = new SprayBrush(canvas);
  }


  switch (brush) {
    case "brush":
      canvas.freeDrawingBrush = createPaintBrush(canvas, 10);
      break;
    case "spray":
      const width = 10;
      const density = width * 2;
      canvas.freeDrawingBrush = createSprayBrush(canvas, width, density);
      break;

    case "eraser":
      canvas.freeDrawingBrush = createEraserBrush(canvas, 20);
      break;

    default:
      canvas.freeDrawingBrush = createPencilBrush(canvas, 0.5);
      break;
  }
}

function createPaintBrush(canvas: Canvas, width:number){
  const paintBrush = new PencilBrush(canvas);
  paintBrush.color = "#000000";
  paintBrush.width = width;
  paintBrush.strokeLineCap = "round";
  paintBrush.strokeLineJoin = "round";
  return paintBrush;
}

function createSprayBrush(canvas: Canvas, width:number, density:number, randomOpacity?:boolean){
  const sprayBrush = new SprayBrush(canvas);
  sprayBrush.width = width;
  sprayBrush.density = density;
  if(randomOpacity){
    sprayBrush.randomOpacity = true;
  }

  return sprayBrush;
}

function createPencilBrush(canvas: Canvas, width:number){
  const pencilBrush = new PencilBrush(canvas);
  pencilBrush.width = width;
  return pencilBrush;
}


//Just a workaround for eraser
function createEraserBrush(canvas: Canvas, width:number){
  const eraserBrush = new PencilBrush(canvas,);
  eraserBrush.width = width;
  eraserBrush.color = "#ffffff";
  return eraserBrush;
}

function selectColor(canvas: Canvas, color: string, tool:Tool) {
  if(canvas.freeDrawingBrush && tool !== "eraser") {
    canvas.freeDrawingBrush.color = color;
  }
}

function enableDrawing(canvas: Canvas) {
  canvas.isDrawingMode = true;
}

function disableDrawing(canvas: Canvas) {
  canvas.isDrawingMode = false;
}


//Socket communication
function emitEventToSocket(socket: WebSocket, roomId: string, data: any) {
  socket.send(
    JSON.stringify({
      type: "draw",
      roomId,
      data,
    }),
  );
}

async function recieveEventFromSocket(
  canvas: Canvas,
  e: MessageEvent
) {
  const message = JSON.parse(e.data) as {
    type: string;
    data: SerializedObjectProps;
  };

  if (message.type !== "draw") return;

  createSketch(canvas, message.data, true);

}

async function createSketch(canvas: Canvas, data: any, render: boolean){
  const objects: FabricObject[] = await util.enlivenObjects([data]);

    for (const obj of objects) {
      obj.selectable = false;
      obj.evented = false;
      canvas.add(obj);
    }

    if(render){
        canvas.requestRenderAll();
    }
}

async function createSketches(canvas: Canvas, data: Array<any>){
  await Promise.all(data.map(async (data) => {
    await createSketch(canvas, JSON.parse(data), false);
  }));

  canvas.requestRenderAll();
}

export default DrawingPadInit;

export { enableDrawing, disableDrawing, selectBrush, selectColor };
