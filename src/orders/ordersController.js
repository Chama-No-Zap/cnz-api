const { Router } = require('express');
const orderService = require('./orderService');

const ordersRoute = Router();

const createOrder = async (req, res, _next) => {
  try {
    const response = await orderService.createOrder(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const response = await orderService.getOrders(req.body);
    if(response.err) return next(response);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const response = await orderService.updateOrder(req.body);
    if(response.err) return next(response);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: `Wrong data format` });
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const response = await orderService.cancelOrder(req.body);
    if(response.err) return next(response);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

ordersRoute.route('/')
  .post(createOrder)
  .get(getOrders)
  .put(updateOrder)
  .delete(cancelOrder);

module.exports = ordersRoute;