const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Self Portrait',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description:
        'A slef portrait of Cam back in his metal days as his mates used to say he looked',
      image: 'dc12-dg.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 500
    },
    {
      name: 'Sliced Halves',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description:
        'If you want to look inside my mind then do so and then maybe leave me alone',
      image: 'd3-dg.png',
      category: categories[0]._id,
      price: 45.00,
      quantity: 500
    },
    {
      name: 'Surf Up',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[1]._id,
      description:
        'Surf the 120 like its 1999',
      image: 'dc2-dg.png',
      price: 45.00,
      quantity: 20
    },
    {
      name: 'Retro Robot',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[1]._id,
      description:
        'Our little friend here is trying to reboot the 80s back to a time when number 5 is alive',
      image: 'dc8-dg-v2.png',
      price: 45.00,
      quantity: 50
    },
    {
      name: 'CyberFly',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[1]._id,
      description:
        'Mechanically traversing the realms where everything and everyone is manufractured',
      image: 'd1-dg-v2.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'Snog the frog',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[2]._id,
      description:
        'Why not just offend everyone you can a give them a taste of the red and green frog',
      image: 'dc6-dg.png',
      price: 45.00,
      quantity: 30
    },
    {
      name: 'Twisting Out',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[2]._id,
      description:
        'Originally used a a physcadelic drug testing army mule of the CIA in the 1960s, out mate here still hasnt slept and is getting so twisted out hes not sure where he is anymore',
      image: 'dc14-dg.png',
      price: 45.00,
      quantity: 30
    },
    {
      name: 'Crazed Alien',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[3]._id,
      description:
        'After coming down to earth and meeting our leaders, crazed alien thinks it best if he just leaves.',
      image: 'dc15-dg.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'Gaslighting',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description: 'Send a special message to all those f$%wits you come across without mutting a single word, great for parties you didnt want to go to',
      image: 'dc4-dg.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Kung Fu Chilli Master',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'You must always follow the ways of the master, as such, you must get more chilli in you every day.',
      image: 'dc1-dg.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Maddog',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Maddog has had a tough year and hes ready to stare down and wanna be ganster try hards',
      image: 'dc11-dg.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'Fish Matrix',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Christina says Cam is a fish and it looks like hes still stuck in the matrix with agent swimth',
      image: 'd5-dg.png',
      price: 45.00,
      quantity: 600
    },
    {
      name: 'Pete S',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description: 'Pete is still reliving his days as a rock god of the 90s but his construction job KPIs are holding him firmly back',
      image: 'dc9-dg.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Flower Frame',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
      'This beuatifully crafted masterpeice is simple yet elegent and ready for any occasion',
      image: 'd4-dg-v2.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Weed Sponge',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
      'Young mate here is so rekt he cant see but he will still try and consume everything in sight.',
      image: 'dc4-dg-vr2.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'DMT Demon',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
      'Dont mix bad mushies with DMT or youll end up like the mushroom killer mum or be paid a visit by this demon.',
      image: 'dc10-dg.png',
      price: 45.00,
      quantity: 600
    },
    {
      name: 'Spliced',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description: 'just chilling wondering where the rest of my mind is',
      image: 'd2-dg.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Meet You',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'we are just sooooooo please to eat, i mean meet you',
      image: 'dc5-dg.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Snog Frog',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'When you want to be offensive but just not that offensive',
      image: 'dc6-dg-vg2.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'Hey',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Cocaine Claude is just really not coming back to us for a while it looks, might stay away for a bit',
      image: 'dc7-dg-vr2.png',
      price: 45.00,
      quantity: 600
    },
    {
      name: 'Weed Sponge Small',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description: 'When you want to inslult your weed stealing mates but in a more subtle way.',
      image: 'dc4-dg-r.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Twisting Out faded',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Old mate is starting to slip out of this deimsion and looks like hes fading away',
      image: 'dc14-dg-v2.png',
      price: 45.00,
      quantity: 1000
    },
    {
      name: 'Stealth Rabbit',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Rabbits here... just watching..... wondring whats wrong wity you',
      image: 'd6-dg.png',
      price: 45.00,
      quantity: 100
    },
    {
      name: 'Weed Sponge small red',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: categories[4]._id,
      description:
        'Look hes still here being a fwit but you know hes not sticking right out',
      image: 'dc4-dg-l.png',
      price: 45.00,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'Password12345!',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'Password12345!'
  });

  await User.create({
    firstName: 'Cameron',
    lastName: 'Swift',
    email: 'maddog@gmail.com',
    password: 'Password1!_'
  });

  await User.create({
    firstName: 'Sam',
    lastName: 'Kininmonth',
    email: 'samuelkininmonth@hotmail.com',
    password: 'Password1!_'
  });

  console.log('users seeded');

  process.exit();
});
