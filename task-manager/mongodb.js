// CRUD create read update delete
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('users').findOne({
        _id: new ObjectId('61cba0eb81ed7bddc0c24a3d')
    }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(user);
    });

    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(users);
    });

    db.collection('users').find({ age: 27 }).count((error, count) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(count);
    });

    // Goal: Use find and findOne with task
    //
    // 1. Use findOne to fetch the last task by its id (print doc to console)
    // 2. Use findOne to fetch all tasks that are not completed (print doc to console)
    // 3. Test your work!

    db.collection('tasks').findOne( { _id: ObjectId('61ca5da847a0e25c2ec2cbce') }, (error, task) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(tasks);
    });
});


