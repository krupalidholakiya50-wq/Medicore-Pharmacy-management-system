const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    batchId: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);