const mongoose = require("mongoose");

module.exports = mongoose.model(
  "settings",
  new mongoose.Schema({
    id: { type: String, default: "refuerzo" },
    successMsg: { type: String, default: "Thank you for your purchase" },
    shipping: { type: Number, default: 50 },
  })
);
