import { Router } from "express";
import iplRouter from "./cricket.routes";

const baseRouter = Router();

baseRouter.use("/ipl", iplRouter);

export default baseRouter;
