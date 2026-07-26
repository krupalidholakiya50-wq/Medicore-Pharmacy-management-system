const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/add', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User Created Successfully" });
});

module.exports = router;