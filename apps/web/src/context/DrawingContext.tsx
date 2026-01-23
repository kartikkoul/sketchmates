"use client";

import { createContext, useContext, useState } from "react";
import { Tool } from "@repo/types";

export type DrawingContextType = {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  connectedToWs: boolean;
  setConnectedToWs: (connectedToWs: boolean) => void;
};

export const DrawingContext = createContext<DrawingContextType | null>(null);



export const DrawingProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState<string>("#000000");
  const [connectedToWs, setConnectedToWs] = useState<boolean>(false);

  return (
    <DrawingContext.Provider value={{
      tool,
      setTool,
      color,
      setColor,
      connectedToWs,
      setConnectedToWs
    }}>
      {children}
    </DrawingContext.Provider>
  )
};

export const useDrawingContext = () => {
  const ctx = useContext(DrawingContext);

  if (!ctx) {
    throw new Error(
      "useDrawingContext must be used inside <DrawingProvider>"
    );
  }

  return ctx;
};