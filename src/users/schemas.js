const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true},
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
});

module.exports = mongoose.model("Users", userSchema);
