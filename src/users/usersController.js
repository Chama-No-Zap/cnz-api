const { Router } = require('express');
const rescue = require('express-rescue');
const usersService = require('./usersService');
const removeSpecialsCharacters = require('../middlewares/removeSpecialsCharacters');
const verifyParams = require('../middlewares/verifyParams');

const usersRouter = Router();

// espera-se que `data` tenha duas propriedades:
// title: indica o que está sendo criado
// content: conteúdo que deve ser adicionado ao campo.
const createUser = async (req, res, _next) => {
  const { data } = req.body;
  try {
    const response = await usersService.createUser(data);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// const getUserByPhone = (async (req, res, _next) => {
//   const { data: { phone } } = req.body;
//   try {
//     const response = await usersService.getUserByPhone(phone);
//     return res.status(200).json(response);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

usersRouter
  .route('/')
  .post(verifyParams, createUser)
  // .get(getUserByPhone);

module.exports = usersRouter;
