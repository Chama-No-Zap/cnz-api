const { Router } = require('express');
const sellersService = require('./sellersService');
const removeSpecialsCharacters = require('../middlewares/removeSpecialsCharacters');

const sellersRouter = Router();

const createSeller = async (req, res, _next) => {
  try {
    const response = await sellersService.createSeller(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateSellerByPhone = async (req, res, _next) => {
  try {
    const response = await sellersService.updateSellerByPhone(req.body);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const desativeSellerByPhone = async (req, res, _next) => {
  const { phone } = req.body;
  try {
    const response = await sellersService.desativeSellerByPhone(phone);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

sellersRouter.route('/').post(removeSpecialsCharacters, createSeller).put(updateSellerByPhone);

sellersRouter.route('/desactive').put(desativeSellerByPhone);

module.exports = sellersRouter;
