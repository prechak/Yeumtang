import connectionPool from "../utils/db.mjs";

export const borrowMoney = async (req, res) => {
  const { lenderId, borrowerId, amount } = req.body;
  const query = `
  insert into transactions (lender_id, borrower_id, amount, transaction_type_id, timestamp) 
  values ($1, $2, $3, $4, now()) 
  returning *`;
  const values = [lenderId, borrowerId, amount, 1];
  try {
    const result = await connectionPool.query(query, values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
