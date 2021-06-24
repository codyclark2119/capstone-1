const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    cart: [{
        item:{
            type: Schema.Types.ObjectId,
            ref: 'item'
        }, 
        quantity: {
            type: Number,
            required: true
        },
        date_modified: {
            type: Date,
            default: Date.now
        }
    }]
})

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;