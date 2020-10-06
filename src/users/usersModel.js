const mongoose = require('mongoose');
const cpfValidate = require('../utils/cpfValidate');

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
    validate: [cpfValidate, 'Invalid CPF'],
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
      required: true
    },
    number: {
      type: String,
      required: true
    },
    complement: String,
  },
  purchaseHistory: {
    type: Array,
  },
  desatived: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Users", userSchema);
