const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    description: {
        type: String,
        required: [true, 'Please provide description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    photos: {
        type: Array,
        required: [true, 'Please provide photo']
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        required: [true, 'Please provide status'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);