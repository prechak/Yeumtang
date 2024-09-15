import { Router } from "express";
import validateUserId from "../middlewares/validateUserId.mjs";
import { getDebtSummary } from "../controllers/summaryController.mjs";

const summaryRouter = Router();

summaryRouter.get("/", [validateUserId], getDebtSummary);

export default summaryRouter;
