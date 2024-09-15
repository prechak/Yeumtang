const validateUserId = (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const numericUserId = Number(userId);

  if (isNaN(numericUserId) || numericUserId > 2) {
    return res.status(404).json({ message: "User not found" });
  }

  next();
};

export default validateUserId;
