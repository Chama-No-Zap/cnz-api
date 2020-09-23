const Joi = require('joi');

const sellerSchema = Joi.object({
  name: Joi.string().required(),
  // cpf validado
  cnpj: Joi.string().pattern().required(),
  phone: Joi.string().required(),
  address: Joi.object({
    // validação do cep
    cep: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().required(),
  }).required(),
  sellsHistory: [
    // ids
  ],
  products: [
    // ids
  ],
});

module.exports = { sellerSchema };
