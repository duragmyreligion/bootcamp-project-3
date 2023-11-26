// Importing necessary models
const User = require('./User'); // Importing User model
const Product = require('./Product'); // Importing Product model
const Category = require('./Category'); // Importing Category model
const Order = require('./Order'); // Importing Order model

// Exporting all models
module.exports = {
  User, // Exporting User model
  Product, // Exporting Product model
  Category, // Exporting Category model
  Order // Exporting Order model
};
