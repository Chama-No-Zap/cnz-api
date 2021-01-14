const { BAD_REQUEST_FORMAT } = require('../errors');

const verifyParams = (req, res, next) => {
  const { data = {} } = req.body;
  console.log(req.body)
  // return res.status(200).json({ recebido: req.body} );
  if (!data.title || !data.content) {
    return res.status(BAD_REQUEST_FORMAT.code).json(BAD_REQUEST_FORMAT);
  }
  next();
};

module.exports = verifyParams;
