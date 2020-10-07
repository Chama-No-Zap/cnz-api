const { Router } = require('express');
const rescue = require('express-rescue');
const usersService = require('./usersService');
const removeSpecialsCharacters = require('../middlewares/removeSpecialsCharacters');

const usersRouter = Router();

const createUser = async (req, res, _next) => {
  try {
    const response = await usersService.createUser(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUserByPhone = async (req, res, _next) => {
  try {
    const response = await usersService.updateUserByPhone(req.body);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const desativeUserByPhone = async (req, res, _next) => {
  const { phone } = req.body;
  try {
    const response = await usersService.desativeUserByPhone(phone);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserByPhone = rescue(async (req, res, next) => {
  const { phone } = req.body;
    const response = await usersService.getUserByPhone(phone);
    if (response.err) return next({ message: response.message, code: 404 });
    return res.status(200).json(response);
});

usersRouter.route('/').get(getUserByPhone).post(removeSpecialsCharacters, createUser).put(updateUserByPhone);

usersRouter.route('/desactive').put(desativeUserByPhone);

// usersRouter
//   .put('/deactivate', desativeUserByPhone);

module.exports = usersRouter;
