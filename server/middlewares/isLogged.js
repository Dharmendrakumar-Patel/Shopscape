const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

const isLogged = (req, res, next) => {
    const token = req.query.Shopscape

    // validation for token
    if (!token) {
        new CustomError('Please login to access this route', 401).logError();
        return res.status(401).json({
            success: false,
            message: 'Please login to access this route'
        });
    }

    try {
        // decoded token using jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //set req.user to decoded
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            new CustomError('Token has expired', 401).logError();
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = isLogged;