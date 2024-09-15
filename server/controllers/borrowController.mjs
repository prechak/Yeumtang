import connectionPool from "../utils/db.mjs";

export const borrowMoney = async (req, res) => {
  const { lenderId, borrowerId, amount } = req.body;

  const transactionQuery = `
      INSERT INTO transactions (lender_id, borrower_id, amount, transaction_type_id, timestamp)
      VALUES ($1, $2, $3, $4, now())
      RETURNING *`;

  const updateLenderQuery = `
      UPDATE users
      SET balance = balance - $1
      WHERE user_id = $2`;

  const updateBorrowerQuery = `
      UPDATE users
      SET balance = balance + $1
      WHERE user_id = $2`;

  const transactionValues = [lenderId, borrowerId, amount, 1];
  try {
    await connectionPool.query("BEGIN");

    const transactionResult = await connectionPool.query(
      transactionQuery,
      transactionValues
    );

    await connectionPool.query(updateLenderQuery, [amount, lenderId]);

    await connectionPool.query(updateBorrowerQuery, [amount, borrowerId]);

    await connectionPool.query("COMMIT");

    return res.status(201).json(transactionResult.rows[0]);
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    logger.error("Transaction Error", {
      error: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
