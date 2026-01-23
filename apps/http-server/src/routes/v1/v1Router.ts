import { type Request, type Response, Router } from "express";
import { roomExists } from "../../middlewares/v1Middlewares.js";
import { addSketch, closeRoom, createRoom, getRoomSketches } from "../../db/db_queries.js";

const v1Router : Router = Router();

//Controllers
const createRoomHandler = async(req:Request, res:Response) => {
    try{
        const roomId = await createRoom();
        return res.status(200).json({
            message:"Room created successfully",
            roomId
        })
    }catch(e: any){
        return res.status(500).json({
            "message": "Internal server error",
            "error": e?.message || e
        })
    }
}

const closeRoomHandler = async(req:Request, res:Response) => {
    try{
        const { roomId } = req.headers;
        await closeRoom(roomId as string);
        return res.status(200).json({
            message:"Room closed",
        })
    }catch(e: any){
        return res.status(500).json({
            "message": "Internal server error",
            "error": e?.message || e
        })
    }
}

const getSketchesHandler = async(req: Request, res: Response) => {
    const { roomId } = req.headers;
    try{
        const sketches = await getRoomSketches(roomId as string);
        return res.status(200).json({
            sketches
        })
    }catch(e: any){
        return res.status(500).json({
            "message": "Internal server error",
            "error": e?.message || e
        })
    }
}

const addSketchHandler = async(req: Request, res: Response) => {
    const { roomId } = req.headers;
    let { sketchData } = req.body;

    try{
        if(typeof sketchData !== "string"){
            sketchData = JSON.stringify(sketchData)
        };
        await addSketch(roomId as string, sketchData);
        return res.status(200).json({
            message:"Sketch added",
        })
    }catch(e: any){
        // console.log("Error from addSketchHandler:: ", e);
        return res.status(500).json({
            "message": "Internal server error",
            "error": e?.message || e
        })
    }
}

//Routes
v1Router.get("/createRoom", createRoomHandler);
v1Router.delete("/closeRoom", roomExists, closeRoomHandler);
v1Router.get("/getSketches", roomExists, getSketchesHandler);
v1Router.post("/addSketch", roomExists, addSketchHandler);


export default v1Router;