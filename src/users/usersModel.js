const mongoose = require('mongoose');
const validateCpf = require('../utils/validateCpf');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    minlength: 11,
    maxlength: 14,
    validate: [validateCpf, 'Invalid CPF'],
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
  purchaseHistory: {
    type: Array,
  },
  desatived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Users', userSchema);
