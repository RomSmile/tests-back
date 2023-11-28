import { Router } from "express";
import {DatabaseController} from "../controllers/database-controller";

const dbRouter = Router();

dbRouter.get(
  "/initApp",
  DatabaseController.initApplication
);

export default dbRouter;
