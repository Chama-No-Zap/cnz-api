const { Router } = require('express');
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

///Consertar função
const desativeUserByPhone = async (req, res, _next) => {
  const { phone } = req.body;
  console.log(phone);
  try {
    const response = await usersService.desativeUserByPhone(phone);
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

usersRouter
  .route('/')
  .post(removeSpecialsCharacters, createUser)
  .put( updateUserByPhone);

  usersRouter
  .route('/desactive')
  .put(desativeUserByPhone);

// usersRouter
//   .put('/deactivate', desativeUserByPhone);



module.exports = usersRouter;
