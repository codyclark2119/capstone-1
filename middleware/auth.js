const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Get token from request header 'x-auth-token'
    const token = req.header('x-auth-token');

    //If no token was included in the request return a failure
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {
        // Decoding the existing token using JsonWebToken
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Setting the user values as part of the request so its accessable from the data
        req.user = decoded.user;
        next();
    } catch (err) {
        // Fail if the token isnt valid
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
};