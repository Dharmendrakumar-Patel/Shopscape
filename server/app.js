const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes from routes folder
const user = require('./routes/user');
const product = require('./routes/product');

const app = express();

// Middlewares
app.use(morgan('dev'));  // for logging
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
})); // allow cors

// Routes
app.get('/', (req, res) => {
    res.send('Shopscape Backend API');
});
app.use('/api/v1/user', user);
app.use('/api/v1/product', product);
app.get('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `${req.originalUrl} route does not exist.`
    });
});

module.exports = app;