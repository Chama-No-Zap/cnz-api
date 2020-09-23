const Joi = require('joi');

const orderHistorySchema = Joi.object({
  userId: Joi.string().required(),
  sellerId: Joi.string().required(),
  products: [
    Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ],
  date: Joi.date().required(),
});

module.exports = { orderHistorySchema };
