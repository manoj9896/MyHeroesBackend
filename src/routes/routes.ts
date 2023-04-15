import { Router } from "express";
import iplRouter from "./cricket.routes";
import matchRouter from "../routes/matchRoute"

const baseRouter = Router();

baseRouter.use("/ipl", iplRouter);
baseRouter.use("/match", matchRouter)
export default baseRouter;
