import connectionPool from "../utils/db.mjs";

export const repayMoney = async (req, res) => {
  const { lenderId, borrowerId, amount } = req.body;

  const transactionQuery = `
    INSERT INTO transactions (lender_id, borrower_id, amount, transaction_type_id, timestamp) 
    VALUES ($1, $2, $3, $4, now()) 
    RETURNING *`;
  const transactionValues = [lenderId, borrowerId, amount, 2];

  const updateBorrowerQuery = `
    UPDATE users 
    SET balance = balance - $1 
    WHERE user_id = $2`;

  const updateLenderQuery = `
    UPDATE users 
    SET balance = balance + $1 
    WHERE user_id = $2`;

  try {
    await connectionPool.query("BEGIN");

    const transactionResult = await connectionPool.query(
      transactionQuery,
      transactionValues
    );

    await connectionPool.query(updateBorrowerQuery, [amount, borrowerId]);

    await connectionPool.query(updateLenderQuery, [amount, lenderId]);

    await connectionPool.query("COMMIT");

    return res.status(201).json({
      message: transactionResult.rows[0],
    });
  } catch (error) {
    await connectionPool.query("ROLLBACK");
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
