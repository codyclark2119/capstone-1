const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');

const Cart = require('../../models/Cart');
const User = require('../../models/User');

// @route   Get api/cart/
// @desc    Gets current user cart
// @access  Private

// By passing 'auth' we are forcing the middleware/auth.js function to 
// run and validate the token first so that it sets the req.user property if valid
router.get('/', auth, async (req, res) => {
    try {
        // Finding the cart with the associated user id and sorts by date added
        let cart = await Cart.findOne({ user: req.user.id }).populate({ path: 'cart.item', select: "-category -quantity -_id" }).sort({ 'cart.date_modified': -1 });
        console.log(cart)
        if (!cart){
            cart = new Cart({
                user: req.user.id,
                cart: []
            });
            await cart.save();
            console.log(cart)
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/cart/
// @desc    Create or update user profile
// @access  Private

// By passing 'auth' we are forcing the middleware/auth.js function to 
// run and validate the token first so that it sets the req.user property if valid
router.post('/', [auth, [
    check('id', 'Product id is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
]], async (req, res) => {
    // Checking the validation
    const errors = validationResult(req);
    // Responding with the found error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // Destructuring out product details
    const {
        id,
        quantity
    } = req.body;

    try {
        // Find the user's cart
        let cart = await Cart.findOne({
            user: req.user.id
        }).populate({ path: 'cart.item', select: "-category -_id" }).sort({ 'cart.date_modified': -1 });
        // If the cart exists add the new item to it
        if (cart) {
            // Checking if the item is already in the cart
            for (let i = 0; i < cart.cart.length; i++) {
                if (cart.cart[i].item._id == id ) {
                    if(cart.cart[i].item.quantity > (quantity + cart.cart[i].quantity)){
                        // If found only update the items quanitity
                        cart = await Cart.updateOne({
                            user: req.user.id, "cart.item": id
                        }, {
                            $set: { cart: { item: id, quantity: (quantity + cart.cart[i].quantity), date_modified: new Date} }
                        });
                        return res.status(200).json(cart);
                    } else {
                        res.status(400).send('Amount Unavailable');
                    }
                }
            }
            // If not update the cart with a new item
            cart = await Cart.findOneAndUpdate({
                user: req.user.id
            }, {
                $push: { cart: {item: id, quantity} }
            }, {
                new: true
            });
            // Return the cart
            return res.status(200).json(cart);
        }

        //Create cart if one doesnt exist
        cart = new Cart({
            user: req.user.id,
            cart: [{
                item: id,
                quantity
            }]
        });
        // Save the new cart and return to the front end
        await cart.save();
        res.json(cart);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   Delete api/cart/item/:item_id
// @desc    Delete item by Item ID
// @access  Private

// By passing 'auth' we are forcing the middleware/auth.js function to 
// run and validate the token first so that it sets the req.user property if valid
router.delete('/item/:item_id', auth, async (req, res) => {
    try {
        // Checking if item exists in user cart
        const item = await Cart.findOne({
            user: req.user.id, "cart.item": req.params.item_id
        });
        // If not return failure
        if (!item) {
            return res.status(400).json({
                msg: 'Item not found'
            });
        } else {
            // else delete found item
            await Cart.updateOne(
                { user: req.user.id },
                { $pull: { "cart.item": req.params.item_id } }
            );
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/cart/
// @desc    Delete user cart
// @access  Private

// By passing 'auth' we are forcing the middleware/auth.js function to 
// run and validate the token first so that it sets the req.user property if valid
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user cart
        await Cart.deleteOne({ user: req.user.id });

        res.status(200).json({
            msg: 'Cart Deleted'
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;