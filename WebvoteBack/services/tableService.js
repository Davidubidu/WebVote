const { MongoClient } = require('mongodb');
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

// Uniqueness for database and container
const timeStamp = + new Date();
// Set Database name and container name with unique timestamp
const databaseName = `webvote`;
const collectionName = `Users`;

async function insertUser(user) {

    try {
        const client = new MongoClient(mongoConnectionString);

        // connect to the server
        await client.connect();

        const options = client.options
        console.log(`Options:\n${Object.keys(options).map(key => `\t${key}: ${options[key]}\n`)}`);

        const db = client.db(databaseName);
        console.log(`db:\n${Object.keys(db).map(key => `\t${key}: ${db[key]}\n`)}`);

        const collection = db.collection(collectionName);
        console.log(`collection:\n${Object.keys(collection).map(key => `\t${key}: ${collection[key]}\n`)}`);

        //construct an object to inject in the database matching the parameters expected in the database with the ones present in the object passed as argument
        const userToInsert = {name: user.name, roles: user.roles, password: user.password}
        await collection.insertOne(userToInsert);

        client.close()

    } catch(error) {
        console.log(error);
    }  
}

async function getUser(userId) {
    try {
        const client = new MongoClient(mongoConnectionString);

        // connect to the server
        await client.connect();

        const options = client.options
        console.log(`Options:\n${Object.keys(options).map(key => `\t${key}: ${options[key]}\n`)}`);

        const db = client.db(databaseName);
        console.log(`db:\n${Object.keys(db).map(key => `\t${key}: ${db[key]}\n`)}`);

        const collection = db.collection(collectionName);
        console.log(`collection:\n${Object.keys(collection).map(key => `\t${key}: ${collection[key]}\n`)}`);

        //finds the user object corresponding with the filter object passed from the front
        await collection.findOne(userId);

        client.close()

    } catch(error) {
        console.log(error);
    }
}

async function deleteUser(userId){
    try {
        const client = new MongoClient(mongoConnectionString);

        // connect to the server
        await client.connect();

        const options = client.options
        console.log(`Options:\n${Object.keys(options).map(key => `\t${key}: ${options[key]}\n`)}`);

        const db = client.db(databaseName);
        console.log(`db:\n${Object.keys(db).map(key => `\t${key}: ${db[key]}\n`)}`);

        const collection = db.collection(collectionName);
        console.log(`collection:\n${Object.keys(collection).map(key => `\t${key}: ${collection[key]}\n`)}`);

        //deletes the user corresponding with the filter object passed from the front
        await collection.findOneAndDelete(userId);

        client.close()

    } catch(error) {
        console.log(error);
    }
}

async function updateUser(userModification, userId){
    try {
        const client = new MongoClient(mongoConnectionString);

        // connect to the server
        await client.connect();

        const options = client.options
        console.log(`Options:\n${Object.keys(options).map(key => `\t${key}: ${options[key]}\n`)}`);

        const db = client.db(databaseName);
        console.log(`db:\n${Object.keys(db).map(key => `\t${key}: ${db[key]}\n`)}`);

        const collection = db.collection(collectionName);
        console.log(`collection:\n${Object.keys(collection).map(key => `\t${key}: ${collection[key]}\n`)}`);

        //filter to finde the user to update, works only on Id
        const filter = {'_id': userId}
        //query with the changes to make in the user object
        const updateQuery = {
            $set: {userModification}
        }
        await collection.updateOne(updateQuery);

        client.close()

    } catch(error) {
        console.log(error);
    }
}





module.exports = {insertUser, getUser, deleteUser, updateUser};