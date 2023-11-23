const Product = require('../models/product');
const CustomError = require('../utils/customError');
const { removeImage, imageHandler } = require('../utils/imageHandler');

const checkExistingProduct = async (uniqueId) => {
    const product = await Product.find({ uniqueId });
    return product.length > 0;
};

exports.addProduct = async (req, res, next) => {
    try {
        const { name, description, price, status } = req.body;

        // validation for required fields
        if (!name || !description || !price || !status) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, description, price and status'
            });
        }

        // check if product already exists
        if (await checkExistingProduct(name)) {
            return res.status(401).json({
                success: false,
                message: 'Product already exists'
            });
        }

        // validation for photo
        if (!req.files) {
            return res.status(401).json({
                success: false,
                message: 'Please provide photo'
            });
        }

        // upload photo to cloudinary
        const photos = await imageHandler(req.files, 'product', next);

        // validation for cloudinary photo
        if (!photos) {
            return res.status(401).json({
                success: false,
                message: 'Please provide photo'
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            photos: [...photos],
            status
        });

        // validation for product
        if (!product) {
            return res.status(401).json({
                success: false,
                message: 'Product not created'
            });
        }

        return res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        next(new CustomError('Product not created', 401).logError());
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, description, price, status } = req.body;

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            status
        }, { new: true });

        // validation for product
        if (!product) {
            return res.status(401).json({
                success: false,
                message: 'Product not updated'
            });
        }

        return res.status(200).json({
            success: true,
            product
        });
    }catch (error) {
        next(new CustomError('Product not updated', 401).logError());
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

exports.removeProduct = async (req, res, next) => {
    try {
        const { id } = req.query;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide id'
            });
        }

        //check if product exists
        const product = await  Product.findById(id);

        if (product.length <= 0) {
            return res.status(401).json({
                success: false,
                message: 'Product not found'
            });
        }

        // delete photo from cloudinary
        await removeImage(product.photos);

        await Product.deleteOne({ _id: id });

        return res.status(200).json({
            success: true,
            message: 'Product removed successfully.'
        });

    }catch (error) {
        next(new CustomError('Product not removed', 401).logError());
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        // Define the order of statuses based on your criteria
        const statusOrder = ['available', 'unavailable']; // Add more statuses as needed

        // Sort products based on the order of statuses
        const sortedProducts = products.sort((a, b) => {
            const statusAIndex = statusOrder.indexOf(a.status);
            const statusBIndex = statusOrder.indexOf(b.status);

            return statusAIndex - statusBIndex;
        });

        const filteredProducts = products.filter(product => product.status === 'available');

        return res.status(200).json({
            success: true,
            sortedProducts
        });

    }catch (error) {
        next(new CustomError('Products not found', 401).logError());
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};