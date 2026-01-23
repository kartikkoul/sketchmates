import { NextFunction, Request, Response } from "express";
import { getRoomOrNull } from "../db/db_queries.js";

export const roomExists = async(req: Request, res: Response, next: NextFunction) => {
    const roomId = req.headers["roomid"];

    //Check if room exists in DB
    const room = await getRoomOrNull(roomId as string);

    if(!room){
        return res.status(404).json({
            message:"Room doesn't exist"
        })
    }

    req.headers.roomId = room.roomId;
    next();
};