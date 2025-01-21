const mongoose = require("mongoose");

module.exports = mongoose.model(
  "products",
  new mongoose.Schema({
    id: { type: String, required: true },
    images: {
      type: Array,
      default: [],
    },
    name: { type: String, default: "Unknown" },
    description: { type: String, default: "Unknown" },
    price: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    sizes: {
      type: Object,
      default: {
        xs: { type: Number, default: 0 },
        small: { type: Number, default: 0 },
        md: { type: Number, default: 0 },
        lg: { type: Number, default: 0 },
        xl: { type: Number, default: 0 },
      },
    },
    active: { type: Boolean, default: true },
  })
);
