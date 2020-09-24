const { Router } = require('express');
const rescue = require('express-rescue');
const usersService = require('./usersService');

const usersRouter = Router();

const createUser = rescue(async (req, res, next) => {
  const user = await usersService.createUser(req.body);
  return res.status(201).send({ user });
});

usersRouter.post('/', createUser);

module.exports = usersRouter;
