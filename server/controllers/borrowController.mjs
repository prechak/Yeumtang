import connectionPool from "../utils/db.mjs";

export const borrowMoney = async (req, res) => {
  const { lenderId, borrowerId, amount } = req.body;
  try {
    const result = await connectionPool.query(
      "insert into transactions (lender_id, borrower_id, amount, transaction_type_id, timestamp) values ($1, $2, $3, $4, now()) returning *",
      [lenderId, borrowerId, amount, 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
};
