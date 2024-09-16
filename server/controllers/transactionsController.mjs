import connectionPool from "../utils/db.mjs";

export const getTransactions = async (req, res) => {
  const { userId } = req.query;

  let transactionQuery = `
      SELECT 
    t.transaction_id,
    u.user_id,
    u.name AS user_name,
    CASE 
        WHEN t.lender_id = u.user_id THEN 'lender'
        WHEN t.borrower_id = u.user_id THEN 'borrower'
        ELSE 'none'
    END AS user_role,
    l.name AS lender_name,
    b.name AS borrower_name,
    t.amount,
    t.timestamp AS timestampz,
    t.transaction_type_id,
    tt.name AS transaction_type_name,
    t.lender_id,
    t.borrower_id AS borrow_id
FROM transactions t
JOIN users l ON t.lender_id = l.user_id
JOIN users b ON t.borrower_id = b.user_id
JOIN users u ON (u.user_id = t.lender_id OR u.user_id = t.borrower_id)
JOIN transaction_types tt ON t.transaction_type_id = tt.transaction_type_id
WHERE t.lender_id = u.user_id OR t.borrower_id = u.user_id
ORDER BY t.timestamp DESC;`;

  const queryParams = [];

  if (userId) {
    transactionQuery = `SELECT 
    t.transaction_id,
    u.user_id,
    u.name AS user_name,
    CASE
        WHEN t.lender_id = u.user_id THEN 'lender'
        WHEN t.borrower_id = u.user_id THEN 'borrower'
        ELSE 'none'
    END AS user_role,
    l.name AS lender_name,
    b.name AS borrower_name,
    t.amount,
    t.timestamp AS timestampz,
    t.transaction_type_id,
    tt.name AS transaction_type_name,
    t.lender_id,
    t.borrower_id AS borrow_id
FROM transactions t
JOIN users l ON t.lender_id = l.user_id
JOIN users b ON t.borrower_id = b.user_id
JOIN users u ON u.user_id = $1
JOIN transaction_types tt ON t.transaction_type_id = tt.transaction_type_id
WHERE t.lender_id = $1 OR t.borrower_id = $1
ORDER BY t.timestamp DESC;
`;
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
