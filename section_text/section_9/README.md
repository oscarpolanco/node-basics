# Section 9: MongoDB and Promises(Task app)

In this section, we will begin another app that is the `task` app where we are going to see how to connect our `node.js` application with a database so you can store user data. This application will have a lot of features that we can use on real-world apps like `user authentication with an email and password`, `database data storage` for user data, `file upload support` for user images, and `email notifications`. In this specific section we will address the basics; set our database in our machines then we are going to connect with the database from `node.js` and from there we are going to see how we can do the `CRUD`(create, read, update and delete) 4 basic operations.

## MongoDB and NoSQL database

On the new app, we will use `MongoDB` because we will have an `authentication` system and we are going to need a more robust solution than the one we use in our previous example on the `notes` application(we store our data on a `JSON`).

[MongoDB](https://www.mongodb.com/) is an open-source database that is available for all operating systems so we will install it on our machine then use the `MongoDB native driver` to connect our database to `node.js` and begin the process of reading and writing data. Is important to say that `MongoDB` is not exclusive of `node.js` you can use other programming languages with that database and you can use another database with `node.js`.

`MongoDB` falls in a different category of database that is called `NoSQL` database. `SQL` stands for `structure query language` and `NoSQL` is `not only structure query language`. To begin to get used to `MongoDB` we will present a simple visualization of the differences between `SQL` and `NoSQL` and in a couple of next sections we will have another in deep view about this; so let's get into it.

Since the concept of a `database` is the same on both we will enter the structure of the data when we store it in the database

- `SQL`
    - In here we store the data into `tables`

        ```
        -----------------------------------------
        id  name    email               password
        -----------------------------------------
        21  Test    test@example.com    pass123
        -----------------------------------------
        ```

        Your database can have as many `tables` that it need for the application

    - In terms of describing the actual data that we have this will be known as a `row` or `record`

        ```
        -----------------------------------------
        21  Test    test@example.com    pass123
        -----------------------------------------
        ```

    - The individual things stored on our database will be known as a `column`

        ```
        --------
        password
        --------
        pass123
        --------
        ```

        On the example, we will have 4 `columns` that will be `id`, `name`, `email`, and `password`

- `NoSQL`
    - In here we store our data into a `collection`

        ```json
        [
            {
                "id": "21",
                "name": "Test",
                "email": "test@example.com",
                "password": "pass123"
            },
            {
                ...
            }
        ]
        ```

        Your database can have as many `collections` as it needs

    - In terms of describing the actual data that we have this will be known as a `document`

        ```json
        {
            "id": "21",
            "name": "Test",
            "email": "test@example.com",
            "password": "pass123"
        }
        ```

    - The individual things stored on our database will be known as `fields`

        ```
        "password": "pass123"
        ```

        On the example, we will have 4 `fields` that will be `id`, `name`, `email`, and `password`

## Installing MongoDB on macOS

Now we are going to install `mongoDB` on the machine that will allow us to start a `mongoDB` server and connect to it with `node.js`. This will be a section that we assume that you are on `macOS` so for another operating system you will need to search the steps that work for you. We will be using the `community server` that is the free version of `mongoDB`.

- On your browser go to; the [mongodb installation page](https://docs.mongodb.com/manual/administration/install-community/)
- Choose your operating system(In this case `macOS`)

You will need to follow the instruction on this page but here you will have a brief resume of the steps

- We will need `brew` to install the packages that we need so on your browser go to the [brew installation page](https://brew.sh/#install) if you don't have it yet
- After installing `brew` we will need to `tap mongoDB` so it will download all tools that we need for `mongoDB`
- Now install the actual `community server` that you need(at the moment of the creation of the example the latest was 5.0 so make sure to pick the latest one): `brew install mongodb-community@5.0`
- Then check if `mongoDB` is running using: `brew services list`

    If you got an error this [article](https://stackoverflow.com/a/68559057) may help

- Now we will create a new directory that our database can live; we will put it on the `Users` directory. So go to the `/User/your-user-name` and create a new directory. We will put it `mongodb-data`
- Get to your terminal again and run the following command:

    `sudo mongod --dbpath /Users/your-user-name/mongodb-data`

- You should see a lot of output and the server will run without issues
- Go to the `mongodb-data` folder that you created before and you should see that a lot of files populate the folder

## Installing database GUI viewer

Now that we install `mongoDB` on our machine we will install an admin tool that is going to make it a lot easier to see everything related to our database.

This tool will be a `GUI`(Graphic user interface) for managing your `mongoDB` database and the data that it contains and its name will be `Robot 3T`(This will be an installation guide for macOS).

- On your browser go to https://robomongo.org/
- Click on the `Download Robo 3T` button
- Fill the required form fields
- Then click on the `Download for Mac` button
- Get to the download directory
- Click on the `dmg` file that you just downloaded
- A popup should appear
- Grand the `Robo 3T` and move it to the `application` icon
- Open the `applications` folder
- Search for the `Robo 3T` icon
- Click `open` on the popup that will appear
- `Robo 3T` should appear
- A popup should be open with `Robo 3T` with the license
- Agree and continue
- Click `finish` on the form that will appear
- Now another popup should appear but is that not the case click on the `computer` icon at the top left
- Click on the `Create` link at the top left of the popup
- On the `Connection` tap set the `Name` of the `connection`; for the example, I use `Local MongoDB Database`(Could be whatever make same to you)
- Now go to your terminal
- Run your local `mongo` server using: `sudo mongod --dbpath /Users/your-user-name/mongodb-data`
- On the logs check the default `mongo` port
- Get back to `Robo 3T`
- You should see the same port on the popup that the one you saw before on the terminal
- Click the `Test` button
- You should see a popup with 2 green checks that mean that the connection is working
- Close the popup with the checks
- Click the `finish` button
- Choose the connection that you just created
- You should see the connection at the sidebar
- Right-click on the connection name
- Choose `Open Shell`(This will allow us to run a command directly against `MongoDB`)
- On the black input that appears write the following: `db.version()`

    This command will return to us the current `version` of the `db` object. This looks like a lot to `js` and is because is `js`; when you are working with `MongoDB` and interact with it via the `MongoDB shell` we are using `js` to manipulate the database at this case we ask for the `MongoDB version`

- Click on the green play button at the top
- You should see the `version` of `MongoDB` that you installed. This will prove that everything is ok with the connection

## Connecting and inserting documents

In this section, we will connect to our `MongoDB` database with our `node.js` application and insert new `documents`. We will be using the `MongoDB native drive` that is an `npm` module that will allow us to interact with our database from `node`.

[Here](https://docs.mongodb.com/drivers/node/current/) is the official `MongoDB` documentation. On this page get to the [API](https://docs.mongodb.com/drivers/node/current/#api) title and click the link; this will guide you to a complete overview of the `MongoDB native driver`. For our project, we will be using the official [mongoDB package npm package](https://www.npmjs.com/package/mongodb) so we can work with `MongoDB` from our `node.js` project.

- Get to your terminal
- Run your `mongoDB` local server using: `sudo mongod --dbpath /Users/your-user-name/mongodb-data`
- Now get to your editor
- On the root directory create a new folder called `task-manager`
- Open another tab of your terminal(The `mongo` local server should be running so we will do the others command on another tab)
- Get to the `task-manager` directory
- We need to `initialize` our project using the `init` command: `npm init -y`
- A `package.json` file should be created on the `task-manager` directory
- Now we will install the `MongoDB` package using: `npm i mongodb`
- A `node_modules` directory should be created; the `package.json` file should change and a `package-lock.json` should be created
- Get to your editor
- Create a new file called `mongodb.js`(This will change in the future just need it for an introduction)
- At the top of the newly created file `require` the `mongodb` package:

    `const mongodb = require('mongodb');`

- Now we will need the `MongoClient` property from the `mongodb` object to initialize the connection with the database so create a constant call `MongoClient`(Needs to be uppercase) that will have the value of the property that we mentioned before

    `const MongoClient = mongodb.MongoClient;`

    This will give us functions that will help us to do the basic operations in `MongoDB`(Connect, create, read, update and delete)

- Now we will need to store a `string` that will represent the connection URL of our database so bellow `MongoClient`; create a new constant call `connectionURL` with the following value:

    ```js
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;

    const connectionURL = 'mongodb://127.0.0.1:27017';
    ```

    On the `connectionURL` we will put the `localhost` that our `MongoDB` server is currently running. As you see at the beginning of the `string` we specify their protocol(`mongodb://`) then we put our `localhost` address with the `port` that our `MongoDB` database is running. We use `127.0.0.1` instead of `localhost` because `localhost` will give you some issues later and with `127.0.0.1` those issues don't happen

- Then we will need the `name` of the database that we will connect to create a new constant call `databaseName` that its value will be a `string` in the case of the example we will put `task-manager`

    ```js
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;

    const connectionURL = 'mongodb://127.0.0.1:27017';
    const databaseName = 'task-manager';
    ```

- Now we can `connect` to the database so bellow of the `databaseName` call the `connect` method of `MongoClient`

    `MongoClient.connect();`

- The first thing the connect method receive is the `connection string` that is stored on the `connectionURL` constant

    `MongoClient.connect(connectionURL);`

- The second argument is a configuration object with the following property

    `MongoClient.connect(connectionURL, { useNewUrlParser: true });`

    Since the `parser` that use `MongoDB` is deprecated so we will need to send the `useNewUrlParser` property in order to `parse` our connection URL correctly

- The third argument will be a `callback` function

    `MongoClient.connect(connectionURL, { useNewUrlParser: true }, () => {});`

    This `callback` function will be called when we actually connected to the database. The database connection is an `asynchronous` operation and will take some time to connection setup and the `callback` will run when the `connect` operation is completed

- Depending on what happens the `callback` will receive one of the following arguments:

    `MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {});`

    In case that something fails we will receive the `error` argument otherwise the `client` that will mean that the connection is established without issues

- Now add a condition to check if the `error` exists and if exits the console a message that represents the error

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            return console.log('Unable to connect to database!');
        }
    });
    ```

    Make sure that you `return` the console to prevent the `callback` function continue with its execution

- Then below the console that will tell you that you connect successfully

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            return console.log('Unable to connect to database!');
        }

        console.log('Connected correctly!');
    });
    ```

- Get to the tab of the terminal that you use to install the `mongodb` package
- Run the `mongodb.js` script using: `node mongodb.js`
- You will see the successful message print on the console
- Now get to the tab that is your `mongo` server running
- You will see on the log one that said `connection accepted`; that means that you are connected to the `MongoDB` server.

    At the time you have only one connection but you will see a message saying that you have five or six open connections that's because when we connect with `MongoDB`; it uses a connection pool so there actually more connections that are opened behind the scenes, even though we've only called `connect` once. That is to make sure that our `node` application can still communicate quickly even if we are trying to perform a lot of operations at the same time

- Get to the other tab that you run the `mongodb.js` file

    You will see that the process is still hanging and that is because when you open a connection your `node` process will be staying up and running as long as you let it or as long as your connection remains active

Now let's insert our first `document`!!!

- Get back to the `mongodb.js` file
- Remove the successful message of the `callback` function
- The first thing that we need to do is to have a reference of the database so below the `error` condition create a new constant call `db` and its value will be the return value of the `db` method of the `client` argument

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db();
    });
    ```

- Now the `db` method receives the `name` of the database and as you remember we have the `name` on the `databaseName` constant

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db(databaseName);
    });
    ```

    On `mongoDB` you actually don't need to create the database first because it will be created automatically when we access it

- Now we need to tell which `collection` we are trying to insert the `document` and for this, we will use the `collection` method of the `db` object

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db(databaseName);

        db.collection();
    });
    ```

- The `collection` method receive a `string` that will be the `name` of the `collection` that we will insert in this case we will use a `user collection` to insert some `user` data

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db(databaseName);

        db.collection('users');
    });
    ```

    As the `db` method the `collection` don't need to exist first; `MongoDB` will create it automatically

- Then we will call the `insertOne` method

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db(databaseName);

        db.collection('users').insertOne();
    });
    ```

- The `insertOne` method will receive an object will all the data that you will insert like this:

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {...}

        const db = client.db(databaseName);

        db.collection('users').insertOne({
            name: 'Test',
            age: 27
        });
    });
    ```

- Save the file
- Go to the tab that you run the `mongodb.js` file
- Stop the current process
- Run the `mongodb.js` file again: `node mongodb.js`
- Now get to the `Robo 3T` app
- Right-click on the name of the database
- You should see that new items appear on the sidebar
- Click on the `task-manager` name
- You should see some folders
- Click on the `Collections` folder
- You will see the `users` collection
- Double click on the `users` collection
- Data should appear on the main screen
- Open the data and you should see the data that you just add to the `mongodb.js` file

    You will notice that is a `field` call `_id` and that store a `unique` identifier for a `document` and `mongoDB` this will be done automatically

## Inserting documents

Here we will continue inserting documents on `MongoDB` but not only one as we saw before; we will insert more than one document at a time.

As you may notice `insertOne` is not a `synchronous` operation so if we want to handle `errors` we will need to register a `callback`.

- Get to your terminal
- Run your local `MongoDB` server using: `sudo mongod --dbpath /Users/your-user-name/mongodb-data`
- Get to your editor
- Go to the `mongodb.js` file on the `task-manager` directory
- At the `insertOne` function add a `callback` function as a second argument

    ```js
    db.collection('users').insertOne({
        name: 'Test',
        age: 27
    }, () => {});
    ```

- The `callback` function will receive 2 arguments; the `error` if we can't insert the value for some reason and a `result` with some information of the data that we insert

    ```js
    db.collection('users').insertOne({
        name: 'Test',
        age: 27
    }, (error, result) => {});
    ```

- Add a condition that checks if we got an `error` and if we have it console a message that wasn't able to insert the `user`

    ```js
    db.collection('users').insertOne({
        name: 'Test',
        age: 27
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }
    });
    ```

- Now if everything goes as expected console the `insertedIds` property of `result`

    ```js
    db.collection('users').insertOne({
        name: 'Test',
        age: 27
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }

        console.log(result.insertedId);
    });
    ```

- Save the file
- Go to your terminal and open another tab
- On this new tab; get to the `task-manager` directory
- Run the `mongodb.js` file using: `node mongodb.js`
- Get to `Robo 3T`
- If you have `Robo 3T` already open; right click on the database connection and click refresh
- Click on the `task-manager` database
- Click on the `collection` folder
- Two-Click on `user`
- You should see that a new `user` is inserted with the correct data
- Go to the terminal tab that you run the `mongodb.js` file
- You should see the `object id` of the `user` that you just inserted

Now we will insert more than one document at a time.

- On your editor; get to the `mongodb.js` file
- Remove everything on the `insertOne` method include it

    `db.collection('users')`

- Now you will need to use a new method called `insertMany`

    `db.collection('users').insertMany();`

    The `insertMany` method receive an `array` of documents and a `callback`

- Provide an `array` with 2 new `users`


    ```js
    db.collection('users').insertMany([{
        name: 'Jen',
        age: 28
    }, {
        name: 'Gunter',
        age: 27
    }]);
    ```

- Then set the `callback` function as a second parameter receiving the `error` and `result` parameter

    ```js
    db.collection('users').insertMany([{
        name: 'Jen',
        age: 28
    }, {
        name: 'Gunter',
        age: 27
    }], (error, result) => {});
    ```

- Add a condition that checks if we got an `error` and if we have it console a message that wasn't able to insert the `user`

    ```js
    db.collection('users').insertMany([{
        name: 'Jen',
        age: 28
    }, {
        name: 'Gunter',
        age: 27
    }], (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }
    });
    ```

- Finally; console the `ids` of the `result` object

    ```js
    db.collection('users').insertMany([{
        name: 'Jen',
        age: 28
    }, {
        name: 'Gunter',
        age: 27
    }], (error, result) => {
        if(error) {
            return console.log('Unable to insert user');
        }

        console.log(result.insertedIds);
    });
    ```

- Get to the tab of your terminal that you use to run the `mongodb.js` file
- Stop the process
- Run the `mongodb.js` file again
- You will see an object with all the `ids` that you just inserted
- Get to `Robo 3T`
- Refresh the connection and check the `users` collection
- You should see the `users` that you just inserted

To finish with the insert example we will insert data on a new collection

- On your editor; get to the `mongodb.js` file on the `task-manager` directory
- Remove the `users` collection function
- Now in the same line that we have the `users` collection function; use the collection method for a new one called `tasks`

    `db.collection('tasks');`

We will insert documents with the following structure:

```js
{
    description: '',
    completed: true
}
```

The `description` property will have a brief `description` of the `task` and the `completed` property will have a `boolean` value that represents if the `task` is `completed` or not

- Use the `insertMany` function sending 3 `task` and at least one of the `tasks` should have a `false` value

    ```js
    db.collection('tasks').insertMany([{
        description: 'write code',
        completed: true
    }, {
        description: 'continue with the example',
        completed: true
    }, {
        description: 'finish the example',
        completed: false
    }]);
    ```

- Now add a `callback` function that receives `error` and `result`

    ```js
    db.collection('tasks').insertMany([{
        description: 'write code',
        completed: true
    }, {
        description: 'continue with the example',
        completed: true
    }, {
        description: 'finish the example',
        completed: false
    }], (error, result) => {});
    ```

- Add a condition to check the `error` and console a message if is the case on the `callback` function

    ```js
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

    });
    ```

- Finally; console the `ids` if is not an `error`

    ```js
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
    ```

- On your terminal; get to the tab that you run the `mongodb.js` file
- Stop the process
- Run the `mongodb.js` file again
- You should see the `ids` of the documents that you insert
- Get to `Robo 3T`
- Refresh the connection and check that you have a new `tasks` collection
- On the `tasks` collection you should have all the data that you just inserted

## The object ID

As you see; each time that we insert data to the database an `objectId` is created and that is a unique identifier for each document that you insert. If you work with a more traditional `SQL` database this `id` will be much different and this is by design. On those `SQL` databases the `id` is set by an autoincrement value but on `mongo` the `id` is known as `GUID`(Globally Unique Identifiers) and these `ids` are designed to be unique using an algorithm without the server to determine what is the next `id` value is that help `mongo` to achieve one of its goals that are the ability of scale well in a distributed system so we have multiple database servers running instead of just one allowing us to handle heavy traffic because there is no change of an `id` collision.

As we mentioned our server doesn't need to determine the `id` but we actually can generate it on `node.js` using the `mongo native driver` and we will do exactly that to get a deeper view on this.

- On your terminal; run your `mongo` local server using: `sudo mongod --dbpath /Users/your-user-name/mongodb-data`
- Then on your editor; go to the `mongodb.js` file on the `task-manager` directory
- Remove the `collection insert`
- Noe at the top of the file get the `ObjectId` from `MongoDB` since we are requiring 2 things from `MongoDB` we can use destructuring

    `const { MongoClient, ObjectId } = require('mongodb');`

- Remove the `MongoClient` line bellow of the `MongoDB` require
- Now create a new constant call `id` bellow the `databaseName` with the following value:

    `const id = new ObjectId();`

    This is a `constructor` function that will generate a new `id` for us. Technically the `new` keyword is not necessary because the `MongoDB` library has a little defensive built to add  it if you don't but in general is a good idea to add it ourself

- Console the value of the `id`
- Save the file
- Open a new tab of your terminal
- Get to the `task-manager` directory
- Run the `mongodb.js` file using: `node mongodb.js`
- You will see an `id` output on the terminal

You may think that is a random sequence of characters but actually, there are some pieces of information in there. The `ObjectId` is a `12 bytes` value that consists of:

- The first `4 bytes` represent the number of seconds since the `unix epoch`(This is a point on time that is midnight, January first of 1970). So inside of the `id` value is actually a `timestamp` which know when the particular `id` was created
- The following `5 bytes` are a randomly generated value
- And the last `3 bytes` a `counter` starting with a random value

Now let's check some of the information that we can extract from the `ObjectId`

- Get to the `mongodb.js` file
- Below of the console of the `id` add another console that prints the following

    `console.log(id.getTimestamp());`

    The `getTimestamp` method will get the `timestamp` stored inside of the first `4 bytes` of the `ObjectId`

- Get to the tab of the terminal that we run the `mongodb.js` file and stop the process
- Run the `mongodb.js` file again
- You should see the `id` and the correct `timestamp` of the `id` creation

Now we will use the `id` that we are generating to insert a value on the `users` collection

- Go to the `mongodb.js` file
- Bellow the `db` constant; add the following:

    ```js
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
    ```

    As you see we are adding the `_id` property to the object that we are inserting and use the `id` value that we are generated as its value

- Save the file
- Get to the tab that you run the `mongodb.js` file and stop the process
- Run the `mongodb.js` file again
- You should see the `id` created and the `id` of the new `user` are equal

On the terminal when we see an `ObjectId` we only see a series of characters actually we see a call to an `ObjectId` function and as an argument, we see a `string` with all the characters that we mentioned before. This is a visualization to make it easier to see the `id` value because those values are `binary` data. The reason that they are using `binary` data instead of a traditional `string` has to do with the size of each. By using `binary` instead of a `string` it will be able to cut the size of an `ObjectId` in half.

Let's check this.

- On your editor; get to the `mongodb.js` file
- Comment the `collection insert` methods
- On the first console of the `id` call the `id` property of that object

    `console.log(id.id);`

- Save the file
- Get to the tab that you run the `mongodb.js` file and stop the process
- Run the `mongodb.js` file again
- You should see the `buffer` with the `binary` data
- Now get to the `mongodb.js` file
- On the `id` of the first console; call the `length` property

    `console.log(id.id.length);`

- Save the file
- Get to the tab that you run the `mongodb.js` file and stop the process
- Run the `mongodb.js` file again
- You should see the `length` of the `id` and is `12`
- Now get back to the `mongodb.js` file
- Bellow of the first `id` console add the following

    `console.log(id.toHexString().length);`

    The `toHexString` method will return the `string` representation of the `id` and we will check its `length`

- Get to the tab that you run the `mongodb.js` file and stop the process
- Run the `mongodb.js` file again
- You should see both `length` and the second one will be `24`

## Querying documents

Now we are going to check how to `read` documents from our `MongoDB` database. Before to start we will need to remove the code of the previews section of the `id`.

- Get to your editor and go to the `mongodb.js` file on the `task-manager` directory
- Remove the following lines:

    ```js
    console.log(id.id.length);
    console.log(id.toHexString().length);
    console.log(id.getTimestamp());
    ```

- Then remove the `collection insert` of `users` inside of the `connect` method

When we are `reading` documents on `MongoDB` we will have 2 main methods:
- `find`: Will allow us to `fetch` multiple documents out of the database; depending on criteria of searching like the age on a `user`
- `findOne`: `Fetch` an individual document

You will see other functions that begin with `find` but these are related to other things like `update` and `delete` with `find` but those topics will be addressed later. Now we will go to check to find an individual element first.

- Go to `Robo 3T`
- On the `users` collection; right click on one of the `users`
- Choose `Edit document`
- Copy the name of the `user` and click the `close` button
- On your editor; go to the `mongodb.js`
- In the `connect` method use the `db` object to call the `users collection`

    `db.collection('users')`

- Call the `findOne` method on the `users collection`

    `db.collection('users').findOne();`

    The `findOne` method receives 2 arguments; a configuration object with the property and value that we need to search and a `callback` function

- Add an object as a first argument of the `findOne` method with the property `name` and its value will be the `name` that you copy before on `Robo 3T`

    `db.collection('users').findOne({ name: 'NameThatYouCopy' });`

    The property `name` will be the acceptance criteria for the `search` and you can use more fields specifying the values on the object

- Now as a second parameter add a `callback` function that receives an `error` and a `user`

    `db.collection('users').findOne({ name: 'NameThatYouCopy' }, (error, user) => {});`

    The `user` argument can be named as you like but since we are working with the `users` collection and we are `searching` for a `user` will have a lot of sense that we call it like this

- On the `callback` function add a condition to handle the `error` and console a message

    ```js
    db.collection('users').findOne({ name: 'NameThatYouCopy' }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }
    });
    ```

- Then console the `user` if there is not an `error`

    ```js
    db.collection('users').findOne({ name: 'NameThatYouCopy' }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(user);
    });
    ```

- Get to your terminal and run your local `mongoDB` server using: `sudo mongod --dbpath /Users/your-user-name/mongodb-data`
- On another tab of your terminal run the `mongodb.js` file using: `node mongodb.js`
- You should see the `user` information that you use it `name` for the `search`

Now what happens if we `search` for a value that doesn't exist on our database like with an `age` that doesn't match with any `user`

- On the `findOne` first argument; add the `age` property with a value that doesn't exist on the database

    ```js
    db.collection('users').findOne({ name: 'NameThatYouCopy', age: 1 }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(user);
    });
    ```

- Save the file
- Get to your terminal; and stop the process where you run the `mongodb.js` file
- Run the `mongodb.js` file again
- You should see a `null` value is output to the terminal and this is ok because you are doing a `search` on the database but any `user` doesn't match the `search` criteria

Now if you `search` a `user` that has more than one `match` on the database with `findOne` you only will get the first match. To `search` the information of a specific `user`(in this case) is better for use `search` by the `unique id`.

- Get to `Robo 3T`
- Copy from the `user` collection an `id` of a `user`
- Go to the `mongodb.js` file on your editor
- On the `findOne` first argument; remove the `name` and `age` property
- Then add on the `search` object the following:

    ```js
    db.collection('users').findOne({ _id: new ObjectId('theIdThatYouCopied') }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(user);
    });
    ```

    Remember that the `_id` receive `binary` data, not a `string` so if you put the `string` directly on the `_id` property you will don't have a match

- Save the file
- Go to your terminal and stop the `mongodb.js` process
- Run the `mongodb.js` file again
- You should see the data of the `user` that you copy the `id` before

Now if you want to have more than the first match of your data you will need to use the `find` method.

- Get to the `Robo 3T` app
- On the `users` collection; edit some of the `users` and put the same `age` on more than one(In this example we will use `27`)
- Go to the `mongodb.js` file on your editor
- Bellow of the `findOne` method; use the `db` object to call the `users` collection again

    `db.collection('users');`

- Now call the `find` method

    `db.collection('users').find();`

- The `find` method receives as its first argument an `object` with the property that will represent the `search` criteria; in this case the `age`

    `db.collection('users').find({ age: 27 });`

The `find` method works a little bit different than the `findOne` method because it actually doesn't receive a `callback` function as its second argument because the return value of the `find` method is actually a `cursor` and a `cursor` is not actually the data is actually a pointer to the data in the database. The reason that this happens is that `MongoDB` is not going to assume that every time you use `find` you always want to get back an `array` of all of those documents there are other things that you might want to do like get back just the first five documents or return the number of the matching documents and with the `cursor` we will have all these options. In this case, we will use the `toArray` method to return an `array` of documents.

- After the `find` method; call the `toArray` function that will receive a `callback`

    `db.collection('users').find({ age: 27 }).toArray(() => {});`

- The `callback` of the `toArray` method will receive 2 arguments: an `error` and the `users`(Can be named as you need)

    `db.collection('users').find({ age: 27 }).toArray((error, users) => {});`

- Like the previous `callback` methods we can use a condition to handle the `error` and print the `users`

    ```js
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(users);
    });
    ```

- Save the file
- Get to the tab of the terminal that the `mongodb.js` file is running and stop the process
- Run the `mongodb.js` file again
- You should see all `users` that have the `age` that you put on the `find` function

Now imagine that we need to know the amount of `users` that we have with that `age` instead of all the information

- Get to the `mongodb.js` file
- Change the `toArray` method to `count`
- Update the `users` argument of the `callback` to `count` and on the `console`

    ```js
        db.collection('users').find({ age: 27 }).count((error, count) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(count);
    });
    ```

- Save the file
- Get to the tab of the terminal that the `mongodb.js` file is running and stop the process
- Run the `mongodb.js` file again
- You should see the amount of `users` with the `age` of the `search`

Know we will `search` the last document of the `task` collection

- Go to `Robo 3T`
- On the `task` collection copy the `id` of the last collection of the list
- Get to the `mongodb.js` file
- Bellow the `find` method; use the `db` object to call the `task` collection

    `db.collection('tasks')`

- Now use the `findOne` method to `search` for an `id` and set the `callback` function to handle `errors` and print the `task`

    ```js
    db.collection('tasks').findOne( { _id: ObjectId('idThatYouCopied') }, (error, task) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(task);
    });
    ```

- Save the file
- Get to the tab of the terminal that the `mongodb.js` file is running and stop the process
- Run the `mongodb.js` file again
- You should see the information of the last `task`

Finally, we will output all `tasks` that is not `completed` yet(Make sure that at least one is not `completed`)

- Get to the `mongodb.js` file
- Bellow of the last `findOne` method; use the `db` object to call the `tasks` collection

    `db.collection('tasks');`

- Now use the `find` method to `search tasks` that are not `completed` yet

    `db.collection('tasks').find({ completed: false });`

- Then call the `toArray` method and set the `callback` to handle `errors` and print the `tasks`

    ```js
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to fetch');
        }

        console.log(tasks);
    })
    ```

- Save the file
- Get to the tab of the terminal that the `mongodb.js` file is running and stop the process
- Run the `mongodb.js` file again
- You should see all the `tasks` that are not `completed` yet

## Promises

Here we will stop a little bit the `mongoDB` features exploration to give some insides on `promises`. The `promises` make easy to work with `async` code and are desingned to resolve many of the problems that we run into when we use `callback` functions. For ilustrate `promises` we will make an example with the `callback` pattern and compare then with `promises`.

- On your editor; go to the `playground` directory and create a file call `8-promises.js`
- On the `8-promises.js` file; create the following function call `doWorkCallback` that will simulate a delay

    `const doWorkCallback = () => {}`

- Call the `doWorkCallback` bellow the function definition

    `doWorkCallback();`

- Provide the following function to the `doWorkCallback` call

    ```js
    doWorkCallback((error, result) => {
        if(error) {
            return console.log(error);
        }

        console.log(result);
    });
    ```

    This is the same pattern that we use before

- Now we will simulate the `async` process with a `setTimeout` inside of the `doWorkCallback` function

    ```js
    const doWorkCallback = (callback) => {
        setTimeout(() => {
            callback('This is my error');
        }, 2000)
    }
    ```

    Here we recive a function as a parameter and call it inside of the `setTimeout` after 2 seconds sending the `error` parameter at this time. Since we don't send the second parameter it will be `undefined`

- Get to your terminal
- Go to the `8-promises.js` file
- Run the `8-promises.js` script using: `node 8-promises.js`
- You will see that the `error` is printed after 2 seconds
- Now get to the `8-promises.js` commend the `callback` call on the `setTimeout`
- Bellow the comment call the `callback` function again but at this time providing the `result` parameter like this

    ```js
    const doWorkCallback = (callback) => {
        setTimeout(() => {
            // callback('This is my error');
            callback(undefined, [1, 4, 7])
        }, 2000)
    }
    ```

- Get back to your terminal and run the script again
- You should see the `result` printed after 2 seconds
- Bellow of the `doWorkCallback` call; add a constant call `doWorkPromise` that will have an instance of the `Promise` object 

    `const doWorkPromise = new Promise();`

    Not always we will create the actual `promises` instead the library we use will create the `promises` for us for example with `MongoDB` those `promises` will be created behind the scenes but we will need to create this example to get started to understand it

- Send a function to the `Promise` object with the following parameters

    `const doWorkPromise = new Promise((resolve, reject) => {});`

    The `resolve` and `reject` parameters are sent by default to our function and will be used later

- We will simulate again the delay with a `setTimeout`

    ```js
    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {}, 2000);
    });
    ```

- In the past, we used the `callback` function with the correct parameters in case of failure and success but at this time we will have 2 different functions; `resolve` and `reject`. Call the `result` sending a value that signifies the actual success

    ```js
    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([1, 4, 7]);
        }, 2000);
    });
    ```

    The advantage that we have is that we have a clear view of the failure and success process because the semantics of the functions clearly specify that instead of just sending parameters that may be confusing without seeing the actual `callback` function. This function will have the same `result` as the `callback` pattern function

- The `promise` is just an object with some methods and the first one that we will use is the `then` method. Bellow the `doWorkPromise` add the following

    `doWorkPromise.then();`

    The `then` method allows us to register a function when things go well in other words when `resolve` is called

- Send a function that will receive a `result` param on the `then` method

    `doWorkPromise.then((result) => {));`

    The `result` param will have the value that we send when we call `resolve` on the `doWorkPromise` definition

- Log the success message using the `result` parameter

    ```js
    doWorkPromise.then((result) => {
        console.log('Success!', result);
    ));
    ```

- Get back to your terminal and run the script again
- You will see that now you will have a success message of the `promise` after 2 second
- Not always do things go as expected and we have a successful process so in that case, we will don't call `resolve` on the `promise` we will call `reject` in our case sending a failure message. Go to your editor and in the `doWorkPromise` comment the `resolve` line and add the `reject` function sending a failure message

    ```js
    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve([1, 4, 7]);
            reject('This is my error');
        }, 2000);
    });
    ```

- When we call `reject` the `then` method will not run so we will need to call another method called `catch` and we can chain it to the previous code that we have like this

    ```js
    doWorkPromise.then((result) => {
        console.log('Success!', result);
    )).catch();
    ```

- The `catch` method will receive a function with an `error` parameter that will have the message that we send when we use the `reject` method and we will print that message

    ```js
    doWorkPromise.then((result) => {
        console.log('Success!', result);
    )).catch((error) => {
        console.log('Error!', error);
    });
    ```

- Go to your terminal and run the script
- You will see that now you have a failure message after 2 seconds

Some new terms that we will use for `promises`

```
                            fulfilled
                        /
Promise -- pending -->
                        \
                            rejected
```

When we create a `promise` it will be created as a `pending` in our case will be `pending` in the 2seconds before we call `resolve` or `rejected`. If `resolve` is called; your `promise` will be considered `fulfilled` and if `reject` is called will be considered `rejected`.

## Updating documents

Now we can get back to the `MongoDB` basics; at this time with `updating documents` and using what we saw about `promises`.

- On your editor go to the `mongodb.js` file in the `task-manager` directory
- Inside of the `MongoClient` function; remove all code related to the `find` examples

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            return console.log('Unable to connect to database!');
        }

        const db = client.db(databaseName);
    });
    ```

Now we will begin to update our documents in this case we will update the `name` of the `users` that we have on our database

- On your terminal; start `MongoDB` using `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Then open `Robo 3T`
- Connect to your `localhost`
- You should see the `task-manager` database
- Click on the `task-manager` name
- Double click on `users`
- You should see all `users`
- Click in one of them and grab it `_id`

We will use `updateOne` which will help us to update a specific document. Notice that there is an `update` method but this will be `deprecated` at some point in the near future.

- Go to the `mongodb.js` file
- Bellow of the `db` constant; use the `collection` method to call the `users` collection

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            return console.log('Unable to connect to database!');
        }

        const db = client.db(databaseName);
        db.collection('users');
    });
    ```

- Now use the `updateOne` function on the `users` collection

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateOne();
    });
    ```

- The first parameter that the `updateOne` receive is an object that represents the `search` criteria. In this case will be the `_id` of the document

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateOne({
            _id: new ObjectId('id_that_you_copied_before_on_robo_3t')
        });
    });
    ```

At this moment we will need to pass the thing that we need to apply to the document but we actually can't directly change what we want; we need to use an [update operator](https://www.mongodb.com/docs/manual/reference/operator/update/#update-operators) that will have the behavior that we want. At this time we will use the `$set` operator that will allow us to `set` a value on a determined property

- Add a second object on the `updateOne` method with the `$set` operator as its property and update the `name` with a value that you want

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateOne({
            _id: new ObjectId('id_that_you_copied_before_on_robo_3t')
        }, {
            $set: {
                name: 'Testing'
            }
        });
    });
    ```

- Since we are not using the `callback` pattern; we don't need to send a third parameter in fact the `updateOne` method return to you a `promise` so we will need to grab that `promise` in a variable. Add a new constant call `updatePromise` that grabs the `promise` of the `updateOne` method

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        const updatePromise = db.collection('users').updateOne({
            _id: new ObjectId('id_that_you_copied_before_on_robo_3t')
        }, {
            $set: {
                name: 'Testing'
            }
        });
    });
    ```

- Call the `then` method on the `updatePromise` and console the `result`
    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        const updatePromise = db.collection('users').updateOne({...});

        updatePromise.then((result) => {
            console.log(result);
        });
    });
    ```

- Then chain the `catch` method to `then` and console the `error`

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        const updatePromise = db.collection('users').updateOne({...});

        updatePromise.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    });
    ```

- Now get to your terminal and open another tab
- Get to the `task-manager` directory
- Run the `mongodb.js` script using `node mongodb.js`
- You will see an object print on the console with some properties. What we are interested is in the `matchedCount` property that will tell us that a document matches and was updated
- Get to `robo 3t` and refresh the database
- Go to the document that you grab the `_id` and you should see that the `name` has changed

Actually, we don't need to create a variable to grab the `promise`; we can change all methods when we call `updateOne`

- Get to the `mongodb.js` file
- Remove `updatePromise` and chain the `then` and `catch` method to `updateOne`

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateOne({
            ...
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    });
    ```

Now we are going to test another [update operator](https://www.mongodb.com/docs/manual/reference/operator/update/#update-operators) at this case will be `$inc` to increment the `age` of a `user`. As you will see on the `$inc` documentation you only need to add the `field` with a value; if the value is positive will increment the `field` that you put and will decrement if you use a negative number

- On the `updateOne` method remove the `$set` operator and use `$inc` to increment the `age` value on one

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateOne({
            _id: new ObjectId('id_that_you_copied_before_on_robo_3t')
        }, {
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    });
    ```

- Get to the terminal that is on the `task-manager` directory
- Run the `mongodb.js` script
- You will see the `update` object print
- Go to the `Robo 3t` and refresh the database
- Check the document that you grab the `_id` and you will see that the `age` increment one

Now we will use the `updateMany` method on the `tasks` collection to update the value of the `completed` value and put it `true`(If you don't have at least one on `false` update the value manually on `Robo 3t`).

- On the `mongodb.js` file remove all the `updateOne` example(or comment it)
- Call the `tasks` collection and use the `updateMany` method

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateMany();
    });
    ```

- Add the `search` criteria that will be all the `tasks` that have a `false` value

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateMany({
            completed: false
        });
    });
    ```

- Then add the `$set` operator to set the `completed` value to `true`

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateMany({
            completed: false
        }, {
            $set: {
                completed: true
            }
        });
    });
    ```

- Finally, chain the `then` and `catch` methods to `updateMany` and print the `result` and `error`

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users').updateMany({
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
    ```

- Go to the terminal that is on the `task-manager` directory
- Run the `mongodb.js` script
- You should see the `update` object on the terminal
- Go to `Robo 3t` and refresh the database
- You will see that all `tasks` are `completed`

## Deleting documents

Now we will be working `deleting` documents and like the `update` methods we can `delete` one or many using a filter.

- Open `Robo 3t` and connect to your `localhost`
- On your terminal; run your database using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On your editor; go to the `mongodb.js` file
- Remove all the `update` method example
- Now bellow of the `db` constant call the `users` collection

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            return console.log('Unable to connect to database!');
        }

        const db = client.db(databaseName);

        db.collection('users')
    });
    ```

- Now we are going to delete more than one `user` so we will use the `deleteMany` method on all `users` that have 27 years old(make sure that you have at least one `user` with 27 years old)

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users')).deleteMany({
            age: 27
        });
    });
    ```

- Add the `then` and `catch` methods to log the results of the deletion

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('users')).deleteMany({
            age: 27
        });
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    ```

- Now get to another tab of your terminal and get to the `task-manager` directory
- Run the `mongodb.js` script using: `node mongodb.js`
- You should see an object with the `deleteCount` property that represents the amount of `users` deleted
- Go to `Robo 3t` and refresh the database and you should see all the `users` with `27` years old are deleted

Now we will `delete` one `task` of your choosing

- Get back to the `mongodb.js` file
- Remove the `deleteMany` example
- Call the `tasks` collection

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('collection'));
    });
    ```

- Go to `Robo 3t` and copy one of the `description` of a `task`
- Get back to the `mongodb.js` file and use the `deleteOne` method with the `description` as a filter

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('collection')).deleteOne({
            description: 'description that you copied'
        });
    });
    ```

- Add the `then` and `catch` methods to log the results of the deletion

    ```js
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        ...
        db.collection('collection')).deleteOne({
            description: 'description that you copied'
        }).then((result) => {
        console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    });
    ```

- Go to your terminal and run the `mongodb.js` script
- You should see an object with the `deleteCount` property that represents the amount of `users` deleted
- Go to `Robo 3t` and refresh the database and you should see that the `task` with the `description` that you choose is deleted

Now that we have an introduction to `mongodb` we can continue working on the steps of our next app(the `task app`)
