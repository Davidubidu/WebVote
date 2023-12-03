// Set Database name and container
const databaseName = 'webvote';
const collectionName = 'Cards';

async function insertCard(context, card) {
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
    const cardToInsert = {
      name: card.name,
      lobbyId: card.lobbyId,
      upVotes: card.upVotes,
      downVotes: card.downVotes
    };
    await collection.insertOne(cardToInsert);
  } catch (error) {
    console.log(error);
  }
}

async function getCardsById(context, cardFilterQuery) {
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
    return await collection.find({ _id: { $in: cardFilterQuery } }).toArray();
    // return await collection.find({ name: usersFilterQuery }).toArray();
  } catch (error) {
    console.log(error);
  }
}

async function getAllCards(context) {
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

async function deleteCard(context, cardId) {
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
    await collection.findOneAndDelete({ _id: cardId });
  } catch (error) {
    console.log(error);
  }
}

async function updateCard(context, cardModification, cardId) {
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

    // filter to find the card to update, works only on Id. cardId should be an Id object
    const filter = { _id: cardId };
    // query with the changes to make in the card object. cardModification should be a JSON with the changes to be applied to each field. ex: {field1: "mod"}
    const updateQuery = {
      $set: cardModification
    };
    await collection.updateOne(filter, updateQuery);
  } catch (error) {
    console.log(error);
  }
}

async function voteCard(context, cardId, userId, vote) {
  // the process of voting will consist of accessing the upvotes/downvotes properties of the card and adding the id of the user to the corresponding list
  // depending on the user's choice of vote. values for vote variable will be: 0 for downvote and 1 for upvote
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
    const [card] = await collection.find({ _id: cardId }).toArray();
    if (vote === 0) {
      card.downVotes.push(userId);
    } else if (vote === 1) {
      card.upVotes.push(userId);
    }
    const filter = { _id: cardId };
    delete card._id;

    await collection.updateOne(filter, { $set: card });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  insertCard,
  getCardsById,
  getAllCards,
  deleteCard,
  updateCard,
  voteCard
};
