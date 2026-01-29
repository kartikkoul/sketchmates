"use client";
import { useDrawingContext } from "@/context/DrawingContext";
import DrawingPadInit, { selectBrush, selectColor } from "@/drawingpad";
import { Canvas } from "fabric";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {ErrorToast, SketchLoader} from "@repo/ui/components";

const CanvasElement = () => {
  const { tool, color, setConnectedToWs } = useDrawingContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const webSocket = useRef<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCanvasLoaded, setHasCanvasLoaded] = useState(false);
  const [error, setError] = useState<string>("");
  const pendingErrorRef = useRef<string>(null);
  const { roomId } = useParams();
  const errorTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const screenRef = useRef<Screen>(null);

  const updateError = (message : string) => {
    setError("")
    if(errorTimer.current){
      clearTimeout(errorTimer.current);
    }
    setError(message);
    errorTimer.current = setTimeout(() => setError(""), 3000);
  }

  useEffect(() => {
    if (hasCanvasLoaded && pendingErrorRef.current) {
      updateError(pendingErrorRef.current);
      pendingErrorRef.current = null;
    }
  }, [hasCanvasLoaded]);

  useEffect(() => {
    screenRef.current = screen;
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "http://ws-sketchmates.kartikkoul.com/");
    webSocket.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          roomId,
        }),
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "error") {
        if(hasCanvasLoaded){
          updateError(message.message);
        }else{
          pendingErrorRef.current = message.message;
        }
        setIsLoading(false);
        if(message.errorType === "join"){
          ws.close();
        }
      }

      if(message.type === "ok"){
        updateError("");
        setIsLoading(false);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
      updateError("Failed to connect to server");
      setIsLoading(false);
    };


    return () => {
      if (errorTimer.current) {
        clearTimeout(errorTimer.current);
      }
      pendingErrorRef.current = null;

      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "leave",
            roomId,
          }),
        );

        ws.close();
      }

    };
  }, [roomId]);

  useEffect(() => {
    if (isLoading || !canvasRef.current || fabricCanvasRef.current || !webSocket.current) return;
    fabricCanvasRef.current = new Canvas(canvasRef.current);

    DrawingPadInit(
      fabricCanvasRef.current,
      webSocket.current,
      roomId as string,
      tool,
      color,
    ).then(() => {
      setHasCanvasLoaded(true);
    }).catch(e => console.error(e));

    if(webSocket.current.readyState == WebSocket.OPEN){
      setConnectedToWs(true);
    }

  }, [canvasRef, webSocket, isLoading]);

  useEffect(() => {
    if (!fabricCanvasRef.current || !webSocket) return;
    selectBrush(fabricCanvasRef.current, tool);
    selectColor(fabricCanvasRef.current, color, tool);
  }, [tool, color]);


  return (
    <>
    {error && <ErrorToast errorMessage={error} className="bg-red-50 rounded border z-20 border-red-700 text-red-800 p-2 bottom-24
      w-32 text-xs md:text-sm md:w-60
    "/>}
    {(!hasCanvasLoaded || isLoading) && <div className="absolute h-screen w-screen z-10 bg-white"><SketchLoader/></div>}
    
    <div className="drawingPad h-screen max-h-screen flex justify-center items-center">
      <canvas ref={canvasRef} id="drawing-canvas" height={screenRef.current?.height} width={screenRef.current?.width}></canvas>
    </div>
    </>
  );
};

export default CanvasElement;
