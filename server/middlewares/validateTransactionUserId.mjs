const validateTransactionUserId = (req, res, next) => {
  const { userId } = req.query;

  if (userId && ![1, 2].includes(Number(userId))) {
    return res.status(404).json({ message: "User not found." });
  }

  next();
};

export default validateTransactionUserId;
