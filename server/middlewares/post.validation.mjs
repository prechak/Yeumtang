const validatePostRequest = (req, res, next) => {
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
        "Bad Request: Invalid or missing lenderId. lenderId must be a number.",
    });
  }

  if (lenderId === borrowerId) {
    return res.status(400).json({
      message: "Bad Request: borrowerId and lenderId must be different.",
    });
  }

  if (
    amount === undefined ||
    amount === null ||
    isNaN(amount) ||
    typeof amount !== "number" ||
    amount <= 0
  ) {
    return res.status(400).json({
      message:
        "Bad Request: Invalid or missing amount. Amount must be a positive number.",
    });
  }

  next();
};

export default validatePostRequest;
