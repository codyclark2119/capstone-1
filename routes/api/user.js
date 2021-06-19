const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    check,
    validationResult
} = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('first_name', 'First Name is required')
        .not()
        .isEmpty(),
    check('last_name', 'Last Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({
            min: 6
        })
],
    async (req, res) => {
        // Checking the validation
        const errors = validationResult(req);
        // Responding with the found error
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // Destructuring data sent
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        try {
            // Check if email exists in database already
            let user = await User.findOne({
                email
            })
            // If email is found return a fail for the register
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists'
                    }]
                });
            }
            // Otherwise create new user in the database
            user = new User({
                first_name,
                last_name,
                email,
                password
            });
            // Hashing user password data again on the backend
            const salt = await bcrypt.genSalt(13);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            // Create a payload of the user id to store on the front end
            const payload = {
                user: {
                    id: user.id
                }
            }
            // Tokenizing the payload with a hidden env value and setting the length its valid in seconds
            jwt.sign(
                payload,
                process.env.JWT_SECRET, {
                expiresIn: 360000
            },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
            // If any errors while running the process respond with server error
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route    POST api/users/login
// @desc     Authenticate user & get token
// @access   Public
router
    .route('/login')
    .post(
        [
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password is required').exists()
        ],
        async (req, res) => {
            // Checking the validation
            const errors = validationResult(req);
            // Responding with the found error
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            // Destructuring data sent
            const { email, password } = req.body;
            try {
                // Checking for the email to exist
                let user = await User.findOne({ email: email });
                // If one isnt found send a failure
                if (!user) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Invalid Credentials' }] });
                }
                // Check to see if the password matches the stored one
                const isMatch = await bcrypt.compare(password, user.password);
                // If the match fails return failure
                if (!isMatch) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Invalid Credentials' }] });
                }
                // Create a payload of the user id to store on the front end
                const payload = {
                    user: {
                        id: user._id
                    }
                };
                // Tokenizing the payload with a hidden env value and setting the length its valid in seconds
                jwt.sign(
                    payload,
                    process.env.jwtsecret,
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
                // If any errors while running the process respond with server error
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        }
    );
module.exports = router;