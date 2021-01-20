const { Router } = require('express');
const sellersService = require('./sellersService');
const verifyParams = require('../middlewares/verifyParams');

const sellersRouter = Router();

const createSeller = async (req, res, _next) => {
  const { data } = req.body;
  try {
    const response = await sellersService.createSeller(data);
    return res.status(201).json(response);
  } catch ({ code, ...error }) {
    if (!code || code == 11000) {
      code = 400;
    }
    res.status(code).json(error);
  }
};

const getSellerByPhone = (async (req, res, _next) => {
  const { data } = req.body;
  try {
    const response = await sellersService.getSellerByPhone(data);
    return res.status(200).json(response);
  } catch ({ code = 400, ...error }) {
    if (code == 11000) {
      code = 400;
    }
    res.status(code).json(error);
  }
});

sellersRouter
  .route('/')
  .post(verifyParams, createSeller)
  .get(verifyParams, getSellerByPhone);

module.exports = sellersRouter;
