const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  unit: Joi.string().required(),
  sizes: [
    Joi.number().required(),
  ],
});

module.exports = { productSchema };
