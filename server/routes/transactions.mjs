import { Router } from "express";
import validateTransactionUserId from "../middlewares/validateTransactionUserId.mjs";
import { getTransactions } from "../controllers/transactionsController.mjs";

const transactionRouter = Router();

transactionRouter.get("/", [validateTransactionUserId], getTransactions);

export default transactionRouter;
