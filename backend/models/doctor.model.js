const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    contact: String,
    doctorId: String,
    email: String
});

module.exports = mongoose.model('Doctor', doctorSchema);