const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');

const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Item = require('../../models/Item');


// @route   Get api/cart/
// @desc    Gets current user cart
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
      const cart = await Cart.find({ user: req.user.id }).sort({ date: -1 });
      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route   POST api/cart/
// @desc    Create or update user profile
// @access  Private
router.post('/', [auth, [
    check('product', 'Product is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    
    const {
        product,
        seller,
        price
    } = req.body;

    //Build profile object
    const cartFields = {};
    if (product) cartFields.product = product;
    if (seller) cartFields.seller = seller;
    if (price) cartFields.price = price;


    try {
        let cart = await Cart.findOne({
            user: req.user.id
        });

        if (cart) {
            cart = await Cart.findOneAndUpdate({
                user: req.user.id
            }, {
                    $push: cartFields
                }, {
                    new: true
                });

            return res.json(cart);
        }

        //Create
        cart = new Cart(cartFields);

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   Get api/cart/item/:item_id
// @desc    Get profile by user ID
// @access  Public
router.delete('/item/:item_id', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.id
        }).populate('user', ['name']);
        res.json(profile);

        if (!profile) return res.status(400).json({
            msg: 'Profile not found'
        });
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile Invalid'
            });
        };
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/cart/
// @desc    Delete profile, user, and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        await Post.deleteMany({ user: req.user.id });
        //Removes profile
        await Profile.findOneAndRemove({
            user: req.user.id
        });
        //Removes user
        await User.findOneAndRemove({
            _id: req.user.id
        });

        res.json({
            msg: 'User Deleted'
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;