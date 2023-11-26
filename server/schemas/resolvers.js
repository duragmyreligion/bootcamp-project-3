// Importing required models and utilities
const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_...'); // Stripe API key

// Resolvers for GraphQL queries and mutations
const resolvers = {
  Query: {
    // Resolver for fetching all categories
    categories: async () => {
      return await Category.find();
    },
    // Resolver for fetching products with optional filtering by category and name
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate('category').select('name description image price quantity sizes');
    },
    // Resolver for fetching a single product by its ID
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    // Resolver for fetching a user's information along with their orders
    user: async (parent, args, context) => {
      // If user is authenticated, fetch user details with populated orders and categories
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      // Throw an authentication error if user is not authenticated
      throw AuthenticationError;
    },
    // Resolver for fetching a specific order by its ID
    order: async (parent, { _id }, context) => {
      // If user is authenticated, fetch user details with populated orders and categories
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        return user.orders.id(_id);
      }

      // Throw an authentication error if user is not authenticated
      throw AuthenticationError;
    },
    // Resolver for handling the checkout process
    checkout: async (parent, args, context) => {
      // Extracting the URL origin from request headers
      const url = new URL(context.headers.referer).origin;

      // Create an order from the list of products sent by the client
      await Order.create({ products: args.products.map(({ _id }) => _id) });

      // Constructing line items for Stripe checkout
      const line_items = [];
      for (const product of args.products) {
        line_items.push({
          // Constructing line item details for each product
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
          size: product.size,
        });
      }

      // Creating a session for Stripe checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      // Return the session ID for the Stripe checkout
      return { session: session.id };
    },
  },
  Mutation: {
    // Resolver for adding a new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Resolver for adding a new order for authenticated users
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        // Add the new order to the user's orders list
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      // Throw an authentication error if user is not authenticated
      throw AuthenticationError;
    },
    // Resolver for updating user information for authenticated users
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      // Throw an authentication error if user is not authenticated
      throw AuthenticationError;
    },
    // Resolver for updating product quantity
    updateProduct: async (parent, { _id, quantity }) => {
      // Adjust the product quantity based on the input
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    // Resolver for user login
    login: async (parent, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        // Throw an authentication error if user does not exist
        throw AuthenticationError;
      }

      // Validate user password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // Throw an authentication error if password is incorrect
        throw AuthenticationError;
      }

      // Generate token upon successful login
      const token = signToken(user);

      return { token, user };
    },
  },
};

// Exporting the resolvers
module.exports = resolvers;
