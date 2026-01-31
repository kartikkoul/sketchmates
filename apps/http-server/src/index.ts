import express, {type Application} from "express";
import v1Router from "./routes/v1/v1Router.js";
import cors from "cors";
import { HTTP_PORT } from "./env-vars.js";
import { config } from "dotenv";

const app : Application = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
config();

app.use("/api/v1", v1Router);

const PORT = HTTP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

export default app;