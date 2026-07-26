const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor.model');

router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

router.post('/', async (req, res) => {
    const newDoc = new Doctor(req.body);
    await newDoc.save();
    res.json(newDoc);
});

module.exports = router;