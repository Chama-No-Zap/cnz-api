const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  // cpf validado
  cpf: Joi.string().pattern().required(),
  phone: Joi.string().required(),
  address: Joi.object({
    // validação do cep
    cep: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().required(),
  }).required(),
  purchaseHistory: [
    // ids
  ]
});

module.exports = { userSchema };
