"use client";
import {
  BrushIcon,
  DownloadIcon,
  EraserIcon,
  LeaveIcon,
  PencilIcon,
  ShareIcon,
  SprayIcon,
  WifiStatusIcon,
} from "@repo/ui/icons";
import { HexColorPicker } from "@repo/ui/components";
import { useDrawingContext } from "@/context/DrawingContext";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


const SketchMatesBrand = () => {
  return (
    <svg
      width="320"
      height="80"
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="48"
        font-size="36"
        font-weight="700"
        font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fill="#111"
      >
        Sketch
      </text>

      <text
        x="150"
        y="48"
        font-size="36"
        font-weight="700"
        font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fill="#111"
      >
        Mates
      </text>

      <path
        d="M14 58 C60 70, 120 45, 190 60 C230 68, 270 55, 300 60"
        stroke="#111"
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
      />

      <circle cx="308" cy="60" r="3" fill="#111" />
    </svg>
  );
};

const DrawingPadToolbar = () => {
  const { tool, color, setColor, setTool, connectedToWs } = useDrawingContext();
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const {roomId} = useParams();

  const ulStyles = `
    border shadow p-1 md:p-2 rounded md:rounded-xl flex bg-white
    flex justify-between gap-2 md:gap-4 items-center w-full list-none
    [&>li]:cursor-pointer [&>li]:p-1 [&>li]:md:p-2 [&>li]:rounded [&>li]:md:rounded [&>li]:hover:ring [&>li]:hover:ring-gray-300 
    [&>li.active]:ring [&>li.active]:ring-black
  `;

  const defaultIconSize = 16;
  const mdIconSize = 20;

  const shareLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowLinkCopied(true);
    setTimeout(() => setShowLinkCopied(false), 2000);
  };

  const downloadDrawing = () => {
    const canvas = document.getElementById(
      "drawing-canvas",
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;

    const ctx = exportCanvas.getContext("2d")!;

    // Fill background white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw existing canvas on top
    ctx.drawImage(canvas, 0, 0);

    // Download
    const link = document.createElement("a");
    link.download = roomId + "-sketchmates.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      {/* Device width < md */}
      <nav className="md:hidden drawingPadToolbar">
        <div className="topNavbar flex fixed top-2 left-0 w-full z-10 justify-between  p-2 items-center">
          <div className={`brand border-none shadow-none flex items-center justify-between w-36`}>
            <h1 className="font-bold text-xl pointer-events-none font-[Inter]">
              SketchMates
            </h1>
            <WifiStatusIcon online={connectedToWs} size={defaultIconSize -2 } />
          </div>
          <div className={`generalactions`}>
            <ul className={ulStyles}>
              <li className="downloadBoard">
                <DownloadIcon size={defaultIconSize as any} />
              </li>
              <li className="shareLink relative" onClick={shareLink}>
                <div className="linkCopiedMessage">
                  {showLinkCopied && (
                    <span className={`absolute top-8 -left-10 max-w-25 text-center border rounded-xl text-xs p-2 ${connectedToWs ? "bg-gray-100 text-black border-black" : "bg-red-50 border-red-700 text-red-800"}`}>
                      {connectedToWs ? "Link Copied!" : "You are offline! This is not sharable."}
                    </span>
                  )}
                </div>
                <ShareIcon size={defaultIconSize as any} />
              </li>
              <li className="exitRoom">
                <Link href={"/"}>
                  <LeaveIcon size={defaultIconSize as any} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bottomNavbar topNavbar flex fixed bottom-2 left-0 w-full z-10 justify-center  p-2 items-center">

        <div className={`toolbar flex gap-2`}>
          <ul className={`${ulStyles}`}>
            <li
              className={"tool pencil" + (tool === "pencil" ? " active" : "")}
              onClick={() => setTool("pencil")}
            >
              <PencilIcon size={defaultIconSize as any} />
            </li>
            <li
              className={"tool brush" + (tool === "brush" ? " active" : "")}
              onClick={() => setTool("brush")}
            >
              <BrushIcon size={defaultIconSize as any} />
            </li>
            <li
              className={"tool spray" + (tool === "spray" ? " active" : "")}
              onClick={() => setTool("spray")}
            >
              <SprayIcon size={defaultIconSize as any} />
            </li>
            <li
              className={"tool eraser" + (tool === "eraser" ? " active" : "")}
              onClick={() => setTool("eraser")}
            >
              <EraserIcon size={defaultIconSize as any} />
            </li>
          </ul>
          <ul className={ulStyles}>
            <li className={"tool colorPicker"}>
              <HexColorPicker
                value={color}
                onChange={(color) => setColor(color)}
              />
            </li>
          </ul>
        </div>
        </div>
      </nav>
      {/* Device width > md */}
      <nav className="hidden md:flex drawingPadToolbar fixed top-2 left-0 w-full z-10 justify-between  p-2 items-center">
        <div className={`brand border-none shadow-none flex items-center justify-between w-44`}>
          <h1 className="font-bold text-2xl pointer-events-none font-[Inter]">
            SketchMates
          </h1>
          <WifiStatusIcon online={connectedToWs} size={mdIconSize - 2} />
        </div>

        <div className={`toolbar flex gap-2`}>
          <ul className={`${ulStyles}`}>
            <li
              className={"tool pencil" + (tool === "pencil" ? " active" : "")}
              onClick={() => setTool("pencil")}
            >
              <PencilIcon size={mdIconSize as any} />
            </li>
            <li
              className={"tool brush" + (tool === "brush" ? " active" : "")}
              onClick={() => setTool("brush")}
            >
              <BrushIcon size={mdIconSize as any} />
            </li>
            <li
              className={"tool spray" + (tool === "spray" ? " active" : "")}
              onClick={() => setTool("spray")}
            >
              <SprayIcon size={mdIconSize as any} />
            </li>
            <li
              className={"tool eraser" + (tool === "eraser" ? " active" : "")}
              onClick={() => setTool("eraser")}
            >
              <EraserIcon size={mdIconSize as any} />
            </li>
          </ul>
          <ul className={ulStyles}>
            <li className={"tool colorPicker"}>
              <HexColorPicker
                value={color}
                onChange={(color) => setColor(color)}
              />
            </li>
          </ul>
        </div>

        <div className={`generalactions`}>
          <ul className={ulStyles}>
            <li className="downloadBoard" onClick={downloadDrawing}>
              <DownloadIcon size={mdIconSize as any} />
            </li>
            <li className="shareLink relative" onClick={shareLink}>
              <div className="linkCopiedMessage">
                {showLinkCopied && (
                  <span className={`absolute top-12 -left-15 text-center bg-gray-100 text-black max-w-40 border border-black rounded-xl text-sm p-2`}>
                    {connectedToWs ? "Link Copied!" : "You are offline! This is not sharable."}
                  </span>
                )}
              </div>
              <ShareIcon size={mdIconSize as any} />
            </li>
            <li className="exitRoom">
              <Link href={"/"}>
                <LeaveIcon size={mdIconSize as any} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default DrawingPadToolbar;
