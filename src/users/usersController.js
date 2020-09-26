const { Router } = require('express');
const usersService = require('./usersService');

const usersRouter = Router();

const createUser = async (req, res, next) => {
  try {
    const response = await usersService.createUser(req.body);
    return res.status(201).json(response);
  } catch (err) {
    res.status(401).json(err);
  }
};

const updateUser = async (req, res, next) => {
  // try {
  //   const response = await usersService.createUser(req.body);
  //   return res.status(201).json(response);
  // } catch (err) {
  //   res.status(401).json(err);
  // }
};

usersRouter
  .route('/')
  .post(createUser)
  .put(updateUser);


module.exports = usersRouter;
