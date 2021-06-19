const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    product: {
        type: String,
        required: true,
        index: { unique: true }
    },
    seller: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    stock: {
        type: String,
        required: true
    }
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;