const User = require('../models/user');
const CustomError = require('../utils/customError');

const isAdmin = async (req, res, next) => {
    try {
        const { id } = req.user;

        //validation for id
        if (!id) {
            new CustomError('Please login to access this route', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Please login to access this route'
            });
        }

        const user = await User.findById(id);

        // validation for user
        if (!user) {
            new CustomError('User not found', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // check whether user is admin
        if (user.role !== 'admin') {
            new CustomError('You are not authorized to access this route', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to access this route'
            });
        } else {
            next();
        }
    }catch (error) {
        new CustomError(error, 401).logError()
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = isAdmin;