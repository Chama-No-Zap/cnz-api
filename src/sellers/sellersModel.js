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
  products: [{
    name: {
      type: String,
      required: true,
    },
    informations: {
      brand: { type: String, default: 'onwer' },
      group: String,
      subgroup: String,
    },
    measurement: [{
      measure: String,
      quantity: String,
      price: String,
      stock: {
        type: Boolean,
        default: true,
      }
    }],
  }],
  desatived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Sellers', sellersSchema);
