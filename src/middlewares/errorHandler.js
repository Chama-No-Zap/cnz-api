const errorHandler = (error, _req, res, _next) => {
  const { stack, message, code } = error;
  if (code) return res.status(code).json({ message });
  res.status(500).json({ stack, message });
};

module.exports = errorHandler;
