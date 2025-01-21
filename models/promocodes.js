const mongoose = require("mongoose");

module.exports = mongoose.model(
    "promocodes",
    new mongoose.Schema({
        code: { type: String, required: true },
        unlimited: { type: Boolean, required: true, default: false },
        discount: { type: Number, required: true, default: 0 },
        active: { type: Boolean, required: true, default: true },
        limit: { type: Number, required: true, default: 0 },
        endDate: { type: Number, required: true, default: 24*60*60*1000 },
        startDate: { type: Number, required: true, default: Date.now() },
    })
);
