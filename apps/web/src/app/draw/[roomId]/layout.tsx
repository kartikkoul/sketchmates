import DrawingPadToolbar from "@/components/DrawingPadToolbar";
import { DrawingProvider } from "@/context/DrawingContext";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Drawing Room",
  description: "Draw what you imagine with your mates in real-time",
};

export default function DrawLayout({children} : {children: ReactNode}) {
  return (
    <>
      <DrawingProvider>
        <header className="drawingRoomHeader">
          <DrawingPadToolbar />
        </header>
        {children}
        <footer className="fixed bottom-0 right-2 pointer-events-none">
          <h1 className="font-bold text-gray-500 text-sm lg:text-xl font-[Caveat]">Created by KK</h1>
        </footer>
      </DrawingProvider>
    </>
  );
}
