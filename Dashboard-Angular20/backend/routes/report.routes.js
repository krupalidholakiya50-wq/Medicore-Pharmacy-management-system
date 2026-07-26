const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Monthly Sales Report
router.get('/sales', async (req, res) => {
    const report = await Order.aggregate([
        {
            $group: {
                _id: { $month: "$date" },
                totalSales: { $sum: "$total" }
            }
        }
    ]);
    res.json(report);
});

module.exports = router;