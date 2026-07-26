const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Checkout: Naya order save karna
router.post('/checkout', async (req, res) => {
    const newOrder = new Order({
        ...req.body,
        status: 'picked', // Billing done means order is picked
        date: new Date()
    });
    await newOrder.save();
    res.json(newOrder);
});

module.exports = router;