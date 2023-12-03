// Set Database name and container name with unique timestamp
const databaseName = 'webvote';
const collectionName = 'Lobbies';

async function createLobby(context, lobby) {
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
    const lobbyParams = {
      lobbyName: lobby.name,
      creatorId: lobby.creatorId,
      participants: lobby.participants
    };
    const hasPasswordProperty = Object.prototype.hasOwnProperty.call(
      lobby,
      'password'
    );
    if (hasPasswordProperty) {
      lobbyParams.password = lobby.password;
    }
    await collection.insertOne(lobbyParams);
  } catch (error) {
    console.log(error);
  }
}

async function getLobbiesById(context, lobbiesFilterQuery) {
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
    // _id is the name of the id field in the database, lobbiesFilterQuery must be an array of ids
    return await collection
      .find({ _id: { $in: lobbiesFilterQuery } })
      .toArray();
  } catch (error) {
    console.log(error);
  }
}

async function getLobbiesByUser(context, userId) {
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
    return await collection.find({ participants: userId }).toArray();
  } catch (error) {
    console.log(error);
  }
}

async function getAllLobbies(context) {
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

async function deleteLobby(context, lobbyId) {
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
    await collection.findOneAndDelete({ _id: lobbyId });
  } catch (error) {
    console.log(error);
  }
}

async function updateLobby(context, lobbyModification, lobbyId) {
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
    const filter = { _id: lobbyId };
    // query with the changes to make in the user object. userModification should be a JSON with the changes to be applied to each field. ex: {field1: "mod"}
    const updateQuery = {
      $set: lobbyModification
    };
    await collection.updateOne(filter, updateQuery);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createLobby,
  getLobbiesById,
  getLobbiesByUser,
  getAllLobbies,
  deleteLobby,
  updateLobby
};
