const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    docName: String,
    status: { type: String, enum: ['new', 'verified', 'picked'], default: 'new' },
    drugs: Array,
    total: Number,
    date: Date
});
module.exports = mongoose.model('Order', orderSchema);