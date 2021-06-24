const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    serial_number: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model("item", itemSchema);

module.exports = Item;