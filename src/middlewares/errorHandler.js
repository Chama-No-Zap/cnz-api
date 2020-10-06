export default (error, _req, res, _next) => {
  const { stack, message } = error;
  res.status(500).json({ stack, message });
};
