const { Router } = require('express');
const rescue = require('express-rescue');
const usersService = require('./usersService');
const removeSpecialsCharacters = require('../middlewares/removeSpecialsCharacters');

const usersRouter = Router();

// const createUser = rescue(async (req, res, next) => {
//   const response = await usersService.createUser(req.body);
//   if (response.err) return next({ message: response.message, code: 401 });
//   return res.status(201).json(response);
// });

const createUser = async (req, res, _next) => {
  try {
    const response = await usersService.createUser(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUserByPhone = rescue(async (req, res, _next) => {
  const response = await usersService.updateUserByPhone(req.body);
  return res.status(200).json(response);
});

// const desativeUserByPhone = rescue(async (req, res, _next) => {
//   const { phone } = req.body;
//   const response = await usersService.desativeUserByPhone(phone);
//   return res.status(200).json(response);
// });

const desativeUserByPhone = async (req, res, _next) => {
  const { phone } = req.body;
  try {
    const response = await usersService.desativeUserByPhone(phone);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

// const getUserByPhone = rescue(async (req, res, next) => {
//   const { phone } = req.body;
//   const response = await usersService.getUserByPhone(phone);
//   if (response.err) return next({ message: response.message, code: 404 });
//   return res.status(200).json(response);
// });

const getUserByPhone = (async (req, res, next) => {
  const { phone } = req.body;
  try {
    const response = await usersService.getUserByPhone(phone);
    return res.status(200).json(response);;
  } catch (err) {
    res.status(400).json(err);
  }
});

usersRouter.route('/').get(getUserByPhone).post(removeSpecialsCharacters, createUser).put(updateUserByPhone);

usersRouter.route('/desactive').put(desativeUserByPhone);

// usersRouter
//   .put('/deactivate', desativeUserByPhone);

module.exports = usersRouter;
