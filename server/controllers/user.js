const User = require('../models/user');
const CustomError = require('../utils/customError');
const CookieToken = require('../utils/cookieToken');
const { imageHandler } = require('../utils/imageHandler');

const checkExistingEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser !== null;
};

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // validation for required fields
        if (!name || !email || !password) {
            new CustomError('Please provide name, email and password', 400).logError();
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        // check if email already exists
        if (await checkExistingEmail(email)) {
            new CustomError('Email already exists', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Email already exists'
            });
        }

        // validation for photo
        if (!req.file) {
            new CustomError('Product provide photo', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Please provide photo'
            });
        }

        // upload photo to cloudinary
        const photo = await imageHandler(req.file, 'user', next);

        // validation for cloudinary photo
        if (!photo) {
            new CustomError('Product provide photo', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Please provide photo'
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            photo
        });

        // validation for user
        if (!user) {
            new CustomError('User not created', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'User not created'
            });
        }

        return CookieToken(user, res, 201);

    } catch (error) {
        new CustomError(error, 401).logError();
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validation for required fields
        if (!email || !password) {
            new CustomError('Please provide email and password.', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Please provide email and password.'
            });
        }

        // get user by email
        const user = await User.findOne({ email }).select('+password');

        // validation for user
        if (!user || !(await user.comparePassword(password))) {
            new CustomError('Invalid email or password.', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // remove password from user object
        user.password = undefined;

        return CookieToken(user, res);

    } catch (error) {
        new CustomError(error, 401).logError()
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.user;

        //check whether user is logged in
        if (!id) {
            new CustomError('Please login to access this route', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'Please login to access this route'
            });
        }

        // get user by id
        const user = await User.findById(id);

        // validation for user
        if (!user) {
            new CustomError('User not found', 401).logError();
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        new CustomError(error, 401).logError();
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('Shopscape');
    
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }catch (error) {
        new CustomError(error, 401).logError()
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.addProductToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;

    if(!productId || !quantity) {
        new CustomError('Please provide product id and quantity', 400).logError();
        return res.status(400).json({
            success: false,
            message: 'Please provide product id and quantity'
        });
    }

    const cart = await User.findByIdAndUpdate(
        req.user.id,
        {
            $push: {
                cart: {
                    productId,
                    quantity
                }
            }
        },
        { new: true }
    ).populate('cart.productId');

    if (!cart) {
        new CustomError('User not found', 404).logError();
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    return res.status(200).json({
        success: true,
        cart
    });
};

exports.removeProductFromCart = async (req, res, next) => {
    const { productId } = req.body;

    if(!productId) {
        new CustomError('Please provide product id', 400).logError();
        return res.status(400).json({
            success: false,
            message: 'Please provide product id'
        });
    }

    const cart = await User.findByIdAndUpdate(
        req.user.id,
        {
            $pull: {
                cart: {
                    productId
                }
            }
        },
        { new: true }
    );

    if (!cart) {
        new CustomError('User not found', 404).logError();
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    return res.status(200).json({
        success: true,
        cart
    });
};