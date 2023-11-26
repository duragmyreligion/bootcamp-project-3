const mongoose = require('mongoose'); // Importing Mongoose library

// Connecting to MongoDB using the provided URI or a default local URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping');

module.exports = mongoose.connection; // Exporting the database connection
