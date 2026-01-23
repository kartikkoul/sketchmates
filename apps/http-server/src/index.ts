import express from "express";
import v1Router from "./routes/v1/v1Router.js";
import cors from "cors";
import { HTTP_PORT } from "./env-vars.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());


app.use("/api/v1", v1Router);


app.listen(HTTP_PORT, async()=>{
    console.log("HTTP SERVER STARTED");
});