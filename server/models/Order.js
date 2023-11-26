const mongoose = require('mongoose'); // Importing Mongoose library

const { Schema } = mongoose; // Destructuring Schema class from mongoose

// Defining the schema for an Order
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now // Default value for purchaseDate set to current date/time
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product' // Referencing the 'Product' model using its ObjectId
    }
  ]
});

const Order = mongoose.model('Order', orderSchema); // Creating the 'Order' model from the orderSchema

module.exports = Order; // Exporting the Order model for use in other parts of the application
