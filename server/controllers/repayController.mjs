import connectionPool from "../utils/db.mjs";

export const repayMoney = async (req, res) => {
  const { lenderId, borrowerId, amount } = req.body;
  const query = `
  insert into transactions (lender_id, borrower_id, amount, transaction_type_id, timestamp) 
  values ($1, $2, $3, $4, now()) 
  returning *`;
  const values = [lenderId, borrowerId, amount, 2];
  try {
    const result = await connectionPool.query(query, values);
    return res.status(201).json({
      message: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
};
