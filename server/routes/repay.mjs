import { Router } from "express";
import validatePostRequest from "../middlewares/post.validation.mjs";
import { repayMoney } from "../controllers/repayController.mjs";

const repayRouter = Router();

repayRouter.post("/", [validatePostRequest], repayMoney);

export default repayRouter;
