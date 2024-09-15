import connectionPool from "../utils/db.mjs";

export const getDebtSummary = async (req, res) => {
  const { userId } = req.query;

  const summaryQuery = `
      SELECT
      SUM(CASE WHEN transaction_type_id = 1 THEN amount ELSE 0 END) AS total_borrowed,
      SUM(CASE WHEN transaction_type_id = 2 THEN amount ELSE 0 END) AS total_repaid
      FROM transactions WHERE borrower_id = $1`;

  try {
    const summaryResult = await connectionPool.query(summaryQuery, [userId]);
    return res.status(200).json({ message: summaryResult.rows[0] });
  } catch (error) {
    logger.error("Transaction Error", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
