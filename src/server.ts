import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import baseRouter from "./routes/routes";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", baseRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
