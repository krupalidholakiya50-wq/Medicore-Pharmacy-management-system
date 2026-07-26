const mongoose = require('mongoose');
const expiredSchema = new mongoose.Schema({
    supplierEmail: String,
    drugName: String,
    quantity: Number,
    batchId: String,
    expireDate: Date,
    price: Number
});
module.exports = mongoose.model('Expired', expiredSchema);