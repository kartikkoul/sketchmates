import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SketchMates",
  description: "Draw what you imagine with your mates in real-time",
  icons:{
    icon:"/logo.svg"
  },

  openGraph: {
    title: "SketchMates",
    description: "Draw what you imagine with your mates in real-time",
    url: "https://sketchmates.kartikkoul.com",
    siteName: "SketchMates",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SketchMates – collaborative drawing in real-time",
      },
    ],
    type: "website",
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
