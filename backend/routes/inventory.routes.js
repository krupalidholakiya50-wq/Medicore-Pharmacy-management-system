const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory.model');
const auth = require('../middleware/auth');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inventory data.', error: error.message });
  }
});

// Add new inventory item
router.post('/', async (req, res) => {
  try {
    const newItem = new Inventory({
      medicineName: req.body.medicineName,
      batchNumber: req.body.batchNumber,
      expiryDate: req.body.expiryDate,
      quantity: req.body.quantity,
      price: req.body.price
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating inventory record.', error: error.message });
  }
});

// Update an existing inventory item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        medicineName: req.body.medicineName,
        batchNumber: req.body.batchNumber,
        expiryDate: req.body.expiryDate,
        quantity: req.body.quantity,
        price: req.body.price
      },
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found.' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating inventory record.', error: error.message });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found.' });
    res.status(200).json({ message: 'Item successfully deleted from inventory.' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminating inventory record.', error: error.message });
  }
});

module.exports = router;