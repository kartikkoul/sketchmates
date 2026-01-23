import express, {type Application} from "express";
import v1Router from "./routes/v1/v1Router.js";
import cors from "cors";
import { HTTP_PORT } from "./env-vars.js";

const app : Application = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/api/v1", v1Router);

const PORT = HTTP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

export default app;