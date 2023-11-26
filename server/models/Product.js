const mongoose = require('mongoose'); // Importing Mongoose library

const { Schema } = mongoose; // Destructuring Schema class from mongoose

// Defining the schema for a Product
const productSchema = new Schema({
  name: {
    type: String,
    required: true, // Field is required
    trim: true // Trimming whitespace from the input
  },
  description: {
    type: String // Field for the description of the product
  },
  image: {
    type: String // Field for the image URL of the product
  },
  price: {
    type: Number,
    required: true, // Field is required
    min: 0.99 // Minimum price value allowed
  },
  quantity: {
    type: Number,
    min: 0, // Minimum quantity allowed is 0
    default: 0 // Default quantity is set to 0
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] // Array of sizes with specific options
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Referencing the 'Category' model using its ObjectId
    required: true // Field is required
  }
});

const Product = mongoose.model('Product', productSchema); // Creating the 'Product' model from the productSchema

module.exports = Product; // Exporting the Product model for use in other parts of the application
