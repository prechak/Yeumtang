import { Router } from "express";
import validateUserId from "../middlewares/validateUserId.mjs";
import { moneySummary } from "../controllers/summaryController.mjs";

const summaryRouter = Router();

summaryRouter.get("/", [validateUserId], moneySummary);

export default summaryRouter;
