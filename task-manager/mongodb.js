// CRUD create read update delete
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log(id.id.length);
console.log(id.toHexString().length);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        _id: id,
        name: 'Testing',
        age: 27
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }

        console.log(result.insertedId);
    });
});


