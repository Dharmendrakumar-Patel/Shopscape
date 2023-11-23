const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});