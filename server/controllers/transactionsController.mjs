import connectionPool from "../utils/db.mjs";

export const getTransactions = async (req, res) => {
  const { userId } = req.query;

  let transactionQuery = `
      SELECT * FROM transactions
      ORDER BY timestamp DESC`;

  const queryParams = [];

  if (userId) {
    transactionQuery = `
      SELECT * FROM transactions
      WHERE borrower_id = $1 OR lender_id = $1
      ORDER BY timestamp DESC`;
    queryParams.push(userId);
  }

  try {
    const transactionResult = await connectionPool.query(
      transactionQuery,
      queryParams.length ? queryParams : undefined
    );

    if (transactionResult.rows.length === 0) {
      return res.status(404).json({ message: "No transactions found." });
    }

    return res.status(200).json(transactionResult.rows);
  } catch (error) {
    logger.error("Transaction Error", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
