const mongoose = require('mongoose');
const CustomError = require('../utils/customError');

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI).then((res) => {
        console.log(`Connected to MongoDB ${res.connections[0].name} database on ${res.connections[0].host}:${res.connections[0].port}`);
    }).catch((err) => {
        new CustomError(err.message, 500).logError();
        process.exit(1);
    });
};

module.exports = connectDB;