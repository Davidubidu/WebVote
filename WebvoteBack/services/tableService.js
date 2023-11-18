const { MongoClient } = require('mongodb');
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;


const testConection = async () => {
    // Uniqueness for database and container
    const timeStamp = + new Date();
    // Set Database name and container name with unique timestamp
    const databaseName = `webvote`;
    const collectionName = `Users`;

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

        await collection.insertOne({name: "test", roles: "test", lobbies: "test"});

        client.close()

    } catch(error) {
        console.log(error);
    }  
}


exports.testConection = testConection;