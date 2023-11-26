const mongoose = require('mongoose'); // Importing Mongoose library

const { Schema } = mongoose; // Destructuring Schema class from mongoose

// Defining the schema for a Category
const categorySchema = new Schema({
  // Field for the name of the category
  name: {
    type: String,
    required: true, // Field is required
    trim: true // Trimming whitespace from the input
  }
});

const Category = mongoose.model('Category', categorySchema); // Creating the 'Category' model from the categorySchema

module.exports = Category; // Exporting the Category model for use in other parts of the application
