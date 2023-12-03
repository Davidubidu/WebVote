// Set Database name and container name with unique timestamp
const databaseName = 'webvote';
const collectionName = 'Users';

async function insertUser(context, user) {
  try {
    const client = context.db.client;

    const options = client.options;
    console.log(
      `Options:\n${Object.keys(options).map(
        (key) => `\t${key}: ${options[key]}\n`
      )}`
    );

    const db = client.db(databaseName);
    console.log(
      `db:\n${Object.keys(db).map((key) => `\t${key}: ${db[key]}\n`)}`
    );

    const collection = db.collection(collectionName);
    console.log(
      `collection:\n${Object.keys(collection).map(
        (key) => `\t${key}: ${collection[key]}\n`
      )}`
    );

    // construct an object to inject in the database matching the parameters expected in the database with the ones present in the object passed as argument
    const userToInsert = {
      name: user.name,
      roles: user.roles,
      password: user.password
    };
    await collection.insertOne(userToInsert);
  } catch (error) {
    console.log(error);
  }
}

async function getUsersById(context, usersFilterQuery) {
  try {
    const client = context.db.client;

    const options = client.options;
    console.log(
      `Options:\n${Object.keys(options).map(
        (key) => `\t${key}: ${options[key]}\n`
      )}`
    );

    const db = client.db(databaseName);
    console.log(
      `db:\n${Object.keys(db).map((key) => `\t${key}: ${db[key]}\n`)}`
    );

    const collection = db.collection(collectionName);
    console.log(
      `collection:\n${Object.keys(collection).map(
        (key) => `\t${key}: ${collection[key]}\n`
      )}`
    );

    // finds the user object corresponding with the filter object passed from the front
    // _id is the name of the id field in the database, usersFilterQuery must be an array of ids
    return await collection.find({ _id: { $in: usersFilterQuery } }).toArray();
    // return await collection.find({ name: usersFilterQuery }).toArray();
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers(context) {
  try {
    const client = context.db.client;

    const options = client.options;
    console.log(
      `Options:\n${Object.keys(options).map(
        (key) => `\t${key}: ${options[key]}\n`
      )}`
    );

    const db = client.db(databaseName);
    console.log(
      `db:\n${Object.keys(db).map((key) => `\t${key}: ${db[key]}\n`)}`
    );

    const collection = db.collection(collectionName);
    console.log(
      `collection:\n${Object.keys(collection).map(
        (key) => `\t${key}: ${collection[key]}\n`
      )}`
    );

    return await collection.find({}).toArray();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(context, userId) {
  try {
    const client = context.db.client;

    const options = client.options;
    console.log(
      `Options:\n${Object.keys(options).map(
        (key) => `\t${key}: ${options[key]}\n`
      )}`
    );

    const db = client.db(databaseName);
    console.log(
      `db:\n${Object.keys(db).map((key) => `\t${key}: ${db[key]}\n`)}`
    );

    const collection = db.collection(collectionName);
    console.log(
      `collection:\n${Object.keys(collection).map(
        (key) => `\t${key}: ${collection[key]}\n`
      )}`
    );

    // deletes the user corresponding with the filter object passed from the front
    await collection.findOneAndDelete({ _id: userId });
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(context, userModification, userId) {
  try {
    const client = context.db.client;

    const options = client.options;
    console.log(
      `Options:\n${Object.keys(options).map(
        (key) => `\t${key}: ${options[key]}\n`
      )}`
    );

    const db = client.db(databaseName);
    console.log(
      `db:\n${Object.keys(db).map((key) => `\t${key}: ${db[key]}\n`)}`
    );

    const collection = db.collection(collectionName);
    console.log(
      `collection:\n${Object.keys(collection).map(
        (key) => `\t${key}: ${collection[key]}\n`
      )}`
    );

    // filter to finde the user to update, works only on Id. userId should be an Id object
    const filter = { _id: userId };
    // query with the changes to make in the user object. userModification should be a JSON with the changes to be applied to each field. ex: {field1: "mod"}
    const updateQuery = {
      $set: userModification
    };
    await collection.updateOne(filter, updateQuery);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  insertUser,
  getUsersById,
  getAllUsers,
  deleteUser,
  updateUser
};
