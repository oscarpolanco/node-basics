// CRUD create read update delete
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // Goal: Insert 3 tasks into a new task collection
    //
    // 1. Use insertMany to insert the documents
    //      - description (string), completed (boolean)
    // 2. Setup the callback to handle error and print the ids
    // 3. Run the script
    // 4. Refresh the database in Robo 3t and view the data in tasks collections
    db.collection('tasks').insertMany([{
        description: 'write code',
        completed: true
    }, {
        description: 'continue with the example',
        completed: true
    }, {
        description: 'finish the example',
        completed: false
    }], (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }

        console.log(result.insertedIds);
    });
});


