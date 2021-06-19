const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    cart: [{
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
        }
    }]

})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;