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
    allowNull: true,
    minlength: 11,
    maxlength: 14,
    validate: [validateCpf, 'Invalid CPF'],
    default: null,
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11,
    unique: true,
    required: [true, 'Phone is required'],
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
