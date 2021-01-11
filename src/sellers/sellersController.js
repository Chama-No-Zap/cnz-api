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

const addProductByPhone = async (req, res, _next) => {
  const { phone, products } = req.body;
  try {
    const response = await sellersService.addProductByPhone(phone, products);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: `seller with phone number \'${phone}\' was not found` });
  }
};

const getProductByName = async (req, res, _next) => {
  const { phone, name } = req.body;
  try {
    const response = await sellersService.getProductByName(phone, name);
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: `product with name \'${name}\' was not found` });
  }
};

const desactiveProductByName = async (req, res, _next) => {
  const { phone, name } = req.body;
  try {
    const response = await sellersService.desactiveProductByName(phone, name);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: `product with name \'${name}\' was not found` });
  }
};

// REFATORAR ERROS

const getAllProductsByPhone = async (req, res) => {
  const { phone } = req.body;
  try {
    const response = await sellersService.getAllProductsByPhone(phone);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: `seller with phone number \'${phone}\' was not found` });
  }
};

sellersRouter.route('/').post(removeSpecialsCharacters, createSeller).put(updateSellerByPhone);
sellersRouter.route('/desactive').put(desativeSellerByPhone);

sellersRouter.route('/products').get(getAllProductsByPhone);

sellersRouter.route('/product').get(getProductByName).post(addProductByPhone);
sellersRouter.route('/desactive/product').put(desactiveProductByName);

module.exports = sellersRouter;
