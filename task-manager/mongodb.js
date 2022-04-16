// CRUD create read update delete
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('users').updateOne({
        _id: new ObjectId('61ca57d35235dfcc153fdeec')
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) =>{
        console.log(error);
    });

    // Goal: Use updateMany to complete all tasks
    //
    // 1. Check the documentation for updateMany
    // 2. Setup the call with the query and the updates
    // 3. Use promise methods to setup the success/error handlers
    // 4. Test your work

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});


