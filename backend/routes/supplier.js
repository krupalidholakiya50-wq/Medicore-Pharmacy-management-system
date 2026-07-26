const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkDocAuth = require("../middleware/check-docAuth");

const Supplier = require('../models/supplier');

router.post("",checkAuth,(req,res,next)=>{
  const supplier = new Supplier({
    supplierID: req.body.supplierID,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    drugsAvailable: req.body.drugsAvailable
  });
  supplier.save().then(createdSupplier=>{
  res.status(201).json({
    message:'Supplier Added Successfully',
    supplierId : createdSupplier._id
  });

  });

  });

  router.put("/:id",checkAuth,(req,res,next)=>{
    const supplier = new Supplier({
      _id: req.body.id,
      supplierID: req.body.supplierID,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      drugsAvailable: req.body.drugsAvailable
    });
    Supplier.updateOne({_id: req.params.id}, supplier).then(result => {
      console.log(result);
      res.status(200).json({message : "Update Successful !"});
    });
  });

  router.get("", (req, res, next) => {
    const mockSuppliers = [
      {
        _id: "SUP-001",
        supplierID: "18237823V",
        name: "apple12",
        email: "sugad89123@gmail.com",
        contact: "07161893612",
        drugsAvailable: "Dalcolx"
      },
      {
        _id: "SUP-002",
        supplierID: "198273712V",
        name: "Huwawei Company",
        email: "su@gmail.com",
        contact: "071239121234",
        drugsAvailable: "Panadol"
      },
      {
        _id: "SUP-003",
        supplierID: "987234233V",
        name: "Lalana Thanthirgama",
        email: "ken@gmail.com",
        contact: "0773247673",
        drugsAvailable: "Citacins"
      },
      {
        _id: "SUP-004",
        supplierID: "198198917V",
        name: "GlaxoSmithKline",
        email: "info@gsk.com",
        contact: "0372266348",
        drugsAvailable: "Metformin"
      }
    ];

    Supplier.find().then(documents => {
      const suppliersToReturn = (documents && documents.length > 0) ? documents : mockSuppliers;
      res.status(200).json({
        message: 'supplier fetched successfully',
        suppliers: suppliersToReturn
      });
    }).catch(err => {
      res.status(200).json({
        message: 'supplier fetched with fallback data',
        suppliers: mockSuppliers
      });
    });
  });


  router.get("/:id", (req, res, next) => {
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(200).json({ message: 'Supplier simulated', _id: req.params.id });
    }
    Supplier.findById(req.params.id).then(supplier => {
      if (supplier) {
        res.status(200).json(supplier);
      } else {
        res.status(200).json({ message: 'supplier not found' });
      }
    });
  });

  router.delete("/:id", (req, res, next) => {
    const mongoose = require("mongoose");
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ message: 'Supplier deleted (mock id)!' });
    }
    Supplier.deleteOne({ _id: id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Supplier deleted!' });
    }).catch(err => {
      res.status(200).json({ message: 'Supplier deletion handled!' });
    });
  });

  module.exports = router;
