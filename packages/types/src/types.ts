import {WebSocket} from "ws"

interface Room {[roomId: string] : Array<WebSocket>}


export type {
    Room
}

//Drawing pad types
export type Tool = "pencil" | "brush" | "spray" | "eraser";