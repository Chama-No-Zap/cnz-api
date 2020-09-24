const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  cpf: {
    type: String,
    minlength: 11,
    require: true,
    maxlength: 14,
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: Object,
    require: true
  },
  complement: {
    type: String,
    require: true
  },
});

// // cpf validado
// cpf: String,
// phone: String,
// address: object({
//   // validação do cep
//   cep: String,
//   number: number().required(),
//   complement: String,
// }).required(),
// purchaseHistory: [
//   // ids
// ]

module.exports = mongoose.model("Users", userSchema);
