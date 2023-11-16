const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

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
    unique: true
  },
  password: {
  type: String,
  required: true,
  minlength: 8,
  validate: {
    validator: function (value) {
      // Check for at least one lowercase letter
      const hasLowerCase = /[a-z]/.test(value);
      // Check for at least one uppercase letter
      const hasUpperCase = /[A-Z]/.test(value);
      // Check for at least one digit
      const hasDigit = /\d/.test(value);
      // Check for at least one special character or underscore
      const hasSpecialChar = /[@$!%*?&_]/.test(value);
  
      // Combine all checks
      return hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar;
    },
    message: "Password must be 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character or underscore."
  }
},
  orders: [Order.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
