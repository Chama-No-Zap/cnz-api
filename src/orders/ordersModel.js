const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sellerId: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
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
  products: [{
    name: {
      type: String,
      required: true,
    },
    informations: {
      brand: String,
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
});

module.exports = mongoose.model('Orders', orderSchema);
