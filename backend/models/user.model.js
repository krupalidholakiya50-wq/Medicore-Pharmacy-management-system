const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: String,
    role: String, // Pharmacist, Assistant, Cashier
    contact: String,
    nic: String,
    email: { type: String, unique: true },
    password: { type: String, required: true }
});
module.exports = mongoose.model('User', userSchema);