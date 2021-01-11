const mongoose = require('mongoose');
const validateCpf = require('../utils/validateCpf');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: '',
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
    unique: true,
    default: '',
  },
  address: {
    cep: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: '',
    },
    complement: {
      type: String,
      default: '',
    }
  },
  purchaseHistory: {
    type: Array,
    default: [],
  },
  desatived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Users', userSchema);
