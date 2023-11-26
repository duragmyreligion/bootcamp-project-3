const models = require('../models'); // Importing models
const db = require('../config/connection'); // Importing database connection

// Exporting an asynchronous function for cleaning a specific collection in the database
module.exports = async (modelName, collectionName) => {
  try {
    // Checking if the specified collection exists in the database for a particular model
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray();

    // If the collection exists, drop/delete it from the database
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err; // Throw any errors encountered during the process
  }
};
