const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.get('/', async (req, res) => res.json(await Order.find()));
router.put('/:id', async (req, res) => {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});
module.exports = router;