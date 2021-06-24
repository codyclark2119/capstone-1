const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

// @route   GET api/products
// @desc    Get all items
// @access  Public
router.get("/", function (req, res) {
    Item.find({}, function (error, response) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.json(response);
        }
    })
});

// @route   GET api/products/:id
// @desc    Get a specifc product
// @access  Public
router.get("/:id", function (req, res) {
    Item.findOne({ serial_number: req.params.id }, function (err, response) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(response)
    })
});

// @route   GET api/products/all/:query
// @desc    Search for a product
// @access  Public
router.get("/category/:query", function (req, res) {
    Item.find({ category: req.params.query }, function (err, response) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(response)
    })
});

module.exports = router;