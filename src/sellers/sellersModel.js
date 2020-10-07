const mongoose = require('mongoose');
const validateCnpj = require('../utils/validateCnpj');

const Schema = mongoose.Schema;

const sellersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    minlength: 14,
    maxlength: 18,
    validate: [validateCnpj, 'Invalid CNPJ'],
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    cep: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: String,
  },
  ordersHistory: {
    type: Array,
  },
  products: {
    type: Array,
  },
  desatived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Sellers', sellersSchema);
