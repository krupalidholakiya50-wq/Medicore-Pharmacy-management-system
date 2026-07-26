const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    contact: String,
    drugs: String
});
module.exports = mongoose.model('Supplier', supplierSchema);