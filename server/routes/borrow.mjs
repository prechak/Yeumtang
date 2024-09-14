import { Router } from "express";
import validatePostRequest from "../middlewares/post.validation.mjs";
import { borrowMoney } from "../controllers/borrowController.mjs";

const borrowRouter = Router();

borrowRouter.post("/", [validatePostRequest], borrowMoney);

export default borrowRouter;
