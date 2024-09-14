import { Router } from "express";
import validateBorrowRequest from "../middlewares/post.validation.mjs";
import { borrowMoney } from "../controllers/borrowController.mjs";

const borrowRouter = Router();

borrowRouter.post("/", [validateBorrowRequest], borrowMoney);

export default borrowRouter;
