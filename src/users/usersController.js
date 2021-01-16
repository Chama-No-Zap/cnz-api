const { Router } = require('express');
// const rescue = require('express-rescue');
const usersService = require('./usersService');
// const removeSpecialsCharacters = require('../middlewares/removeSpecialsCharacters');
const verifyParams = require('../middlewares/verifyParams');

const usersRouter = Router();

const createUser = async (req, res, _next) => {
  const { data } = req.body;
  try {
    const response = await usersService.createUser(data);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    let code = null;
    if (!error.code || error.code == 11000) {
      code = 400;
    }
    res.status(code || error.code).json(error);
  }
};

const getUserByPhone = (async (req, res, _next) => {
  const { data } = req.body;
  try {
    const response = await usersService.getUserByPhone(data);
    return res.status(200).json(response);
  } catch ({ code = 400, ...error }) {
    if (code == 11000) {
      code = 400;
    }
    res.status(code).json(error);
  }
});

usersRouter
  .route('/')
  .post(verifyParams, createUser)
  .get(verifyParams, getUserByPhone);

module.exports = usersRouter;
