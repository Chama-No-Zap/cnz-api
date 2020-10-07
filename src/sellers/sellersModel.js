const mongoose = require('mongoose');
const validateCnpj = require('../utils/validateCnpj');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    minlength: 11,
    maxlength: 14,
    validate: [validateCnpj, 'Invalid CPF'],
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

module.exports = mongoose.model('Users', userSchema);
