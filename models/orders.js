const mongoose = require("mongoose");

module.exports = mongoose.model(
  "orders",
  new mongoose.Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    governorate: { type: String, required: true },
    postal: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    products: {
      type: Array,
      default: [],
    },
    isPromo: { type: String, default: null },
  })
);
