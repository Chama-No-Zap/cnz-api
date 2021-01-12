const verifyParams = (req, res, next) => {
  const { data } = req.body;
  if (!data.title || !data.content) {
    return res.status(400).json({
      message: 'A requisição deve ter o formato { data: { title, content } }'
    });
  }
  next();
};

module.exports = verifyParams;
