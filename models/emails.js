const mongoose = require('mongoose');

module.exports = mongoose.model('emails', new mongoose.Schema({
    email: { type: String, required: true }
}));