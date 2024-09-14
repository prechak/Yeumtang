const validateBorrowRequest = (req, res, next) => {
  const { lenderId, borrowerId, amount } = req.body;

  if (
    lenderId === undefined ||
    lenderId === null ||
    isNaN(lenderId) ||
    typeof lenderId !== "number"
  ) {
    return res.status(400).json({
      message:
        "Bad Request: Invalid or missing lenderId. lenderId must be a number.",
    });
  }

  if (
    borrowerId === undefined ||
    borrowerId === null ||
    isNaN(borrowerId) ||
    typeof borrowerId !== "number"
  ) {
    return res.status(400).json({
      message:
        "Bad Request: Invalid or missing borrowerId. borrowerId must be a number.",
    });
  }

  if (
    amount === undefined ||
    amount === null ||
    isNaN(amount) ||
    typeof amount !== "number"
  ) {
    return res.status(400).json({
      message:
        "Bad Request: Invalid or missing amount. Amount must be a number.",
    });
  }

  next();
};

export default validateBorrowRequest;
