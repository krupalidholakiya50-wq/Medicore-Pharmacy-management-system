const Doctor = require('../models/doctor.model');

exports.getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
};

exports.addDoctor = async (req, res) => {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json(newDoctor);
};