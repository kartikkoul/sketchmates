import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SketchMates",
  description: "Draw what you imagine with your mates in real-time",
  icons:{
    icon:"/logo.svg"
  }
};


export default function RootLayout({children} : {children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
