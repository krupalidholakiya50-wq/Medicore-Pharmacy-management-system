const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier.model');

router.get('/', async (req, res) => res.json(await Supplier.find()));
router.post('/', async (req, res) => res.json(await new Supplier(req.body).save()));
module.exports = router;