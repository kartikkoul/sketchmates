import axios from "axios";

const BASE_DOMAIN_OR_IP = "https://api-sketchmates.kartikkoul.com";
const BASE_URL = BASE_DOMAIN_OR_IP + "/api/v1/"

const baseRouter = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})


const createRoom = async() => {
    try{
        const resp = await baseRouter.get("/createRoom");
        if(resp.status !== 200){
            throw Error(resp.data.message);
        }

        return {
            roomId: resp.data.roomId
        };
    }catch(e : any){
        return {
            error: e?.message || typeof e === "string" ? e : JSON.stringify(e)
        }
    }
};

const closeRoom = async(roomId: string) => {
    try{
        const resp = await baseRouter.delete("/closeRoom", {
            headers:{
                "roomid":roomId
            }
        })

         if(resp.status !== 200){
            throw Error(resp.data.message);
        }

        return null
    }catch(e : any){
        return {
            error: e?.message || typeof e === "string" ? e : JSON.stringify(e)
        }
    }
}

const getRoomSketches = async(roomId: string) => {

    try{
        const resp = await baseRouter.get("/getSketches", {
            headers:{
                "roomid": roomId
            }
        });

        if(resp.status !== 200){
            throw Error(resp.data.message);
        }

        return {
            sketches: resp.data.sketches
        }
    }catch(e : any){
        return {
            error: e?.message || typeof e === "string" ? e : JSON.stringify(e)
        }
    }
};

const addRoomSketch = async(roomId: string, sketchData: any) => {
    console.log("ADD ROOM SKETCH");
    try{
        const resp = await baseRouter.post("/addSketch", {
            sketchData
        }, {
            headers: {
                "roomid": roomId
            }
        })

        if(resp.status !== 200){
            throw Error(resp.data.message);
        }

        return null;
    }catch(e : any){
        return {
            error: e?.message || typeof e === "string" ? e : JSON.stringify(e)
        }
    }
}

export {
    createRoom,
    closeRoom,
    getRoomSketches,
    addRoomSketch
}