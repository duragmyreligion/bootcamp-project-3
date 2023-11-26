const mongoose = require('mongoose'); // Importing Mongoose library

const { Schema } = mongoose; // Destructuring Schema from mongoose
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const Order = require('./Order'); // Importing the Order schema

// Defining the User schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensuring email uniqueness
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum length for the password
    validate: {
      validator: function (value) {
        // Password validation criteria using regular expressions
        const hasLowerCase = /[a-z]/.test(value); // Check for at least one lowercase letter
        const hasUpperCase = /[A-Z]/.test(value); // Check for at least one uppercase letter
        const hasDigit = /\d/.test(value); // Check for at least one digit
        const hasSpecialChar = /[@$!%*?&_]/.test(value); // Check for at least one special character or underscore
  
        // Combine all checks for password validation
        return hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar;
      },
      message: "Password must be 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character or underscore."
    }
  },
  orders: [Order.schema] // Array of orders associated with the user
});

// Setting up pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds); // Hashing the password with bcrypt
  }
  next();
});

// Method to compare the incoming password with the hashed password for user authentication
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password); // Comparing hashed password with incoming password
};

const User = mongoose.model('User', userSchema); // Creating User model from the schema

module.exports = User; // Exporting the User model for use in other parts of the application
