const mongoose = require('mongoose');
const validateCnpj = require('../utils/validateCnpj');

const Schema = mongoose.Schema;

const sellersSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  cnpj: {
    type: String,
    allowNull: true,
    minlength: 14,
    maxlength: 18,
    validate: [validateCnpj, 'Invalid CNPJ'],
    default: null,
  },
  phone: {
    type: String,
    default: '',
    unique: true,
  },
  address: {
    cep: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    },
    complement: {
      type: String,
      default: ''
    }
  },
  ordersHistory: {
    type: Array,
  },
  products: [{
    name: {
      type: String,
      default: ''
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
