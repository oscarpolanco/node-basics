# Section 10: REST APIs and Mongoose(Task App)

In this section, we will start the process of creating our `express` base `REST API` using what we see in `data storage`. This will allow making operations such as signing for a new account; creating a `task` or fetching a list of all `tasks` that they still need to complete. We also are going to explore `mongoose` that will give off a very easy system for modeling our data like a `user` or a `task`; we will be able to create the `fields` and `data types` also `data validation` to make our application more secure.

## Setting up Mongoose

Now we will check a new tool that we will use for our `task manager` application. `Mongoose` is related to `mongodb` and is going to allow us to do some things that we do not know so far like set up `validation` for our documents; the `type` of data of the `fields` on the document or how we will say that a given `task` is created by a `user`. You can see all the specifications on [mongoosejs](https://mongoosejs.com/) page.

Here is the basic example of [mongoosejs](https://mongoosejs.com/) page at the moment the moment of writing this:

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

- Here you will see a basic example of which `mongoose` connect with the database
- Then it will create a `model` that allows us to `model` something in the real world that we wanna be able to store on our database like a `user` or `task` in other words we create `models` for every `collection` that we want and we use the `model` to describe the data. In this case, we set a `cat` moment that has a `name` and the `name` should be a `string`
- Bellow they create a new instance of a `cat` on the `kitten` variable with its custom `name`
- Finally, it manipulates the data with some methods, in this case, is the `save` method that allows us to `save` data on the database and that method return a `promise` that is why we can use the `then` method and print the message

`Mongoose` fell into a category of tools known as `ODM`(Object Document Mapper) that allow us to map the object on our code over to documents on `mongoDB` database. Let's start coding!!

- On your terminal; go to the `task-manager` directory
- Install `mongoose` using: `npm install mongoose`
- In your editor go to the `task-manager` directory
- Now let's begin to create our folder structure for the `task-manager` app. Create a new directory call `src` inside of the `task-manager` directory
- Inside of this newly created directory; create another folder called `db`
- On the `db` directory create a new file called `mongoose.js`
- In the `mongoose.js` file require the `mongoose` library

    `const mongoose = require('mongoose');`

- Now use the `connect` method on the `mongoose` constant

    ```js
    const mongoose = require('mongoose');

    mongoose.connect();
    ```

- Similar to the `mongoClient.connect` that we use before we will provide the `connection url` but with a little difference like you will see bellow

    `mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');`

    Here you see that we use our `localhost ip` with the port `27017` and finally, we specify the database name. We pick another name for the database different than the one that we use before

Now let's define our first `model` in this case `user`

- Bellow of the `connect` method creates a constant call `User`(uppercase) that will be equal to the result of the `model` method of `mongoose`

    `const User = mongoose.model();`

- The `model` method receive to arguments the name of the `model` in this case `User`(uppercase) and an object with all `fields` that we are going to define

    `const User = mongoose.model('User', {});`

- Inside of the `fields` object add a `name` and `age` properties that both values will be an object

    ```js
    const User = mongoose.model('User', {
        name: {},
        age: {}
    });
    ```

- Inside of both properties objects we defined the `type` of the `fields` in this case `string` and `number`

    ```js
    const User = mongoose.model('User', {
        name: {
            type: String
        },
        age: {
            type: Number
        }
    });
    ```

    This `types` values are the `constructor` function from `javascript`

- Now we need to create an instance of `Users` so bellow of `Users` create a new constant call `me` that its value will be an instance of `Users` and specify a `name` and `age`

    ```js
    const User = mongoose.model('User', {...});

    const me = new User({
        name: 'Test',
        age: 27
    });
    ```

- Now we will use the `save` method to store the new instance that we just created and use the `then` and `catch` methods to see the results

    ```js
    const User = mongoose.model('User', {...});

    const me = new User({...});

    me.save().then(() => {
    console.log(me);
    }).catch((error) => {
        console.log('Error!', error);
    });
    ```

    Since the `then` method will send us the same information as the `me` constant we will just use the instance that we already have

- Go to your terminal and start `mongoDB` database using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On another tab of the terminal get to the `task-manager/src/db` directory
- Run the `mongoose.js` script using: `node mongoose.js`
- You will see the instance of a `User` that you created. You also will see a new property called `__v` added by `mongoDB` that stores the version of the document
- Open `Robo 3t` and connect to your localhost
- You will see the `task-manage-api` database
- Click on the `collection` folder
- Click on the `Users` collection
- You will see the `user` that just created
- You can drop the database that we use for the other examples
- Now get to your editor and in the `mongoose.js` file remove the `age` value of `me` and add a `string`
- Get back to your terminal and run the `mongoose.js` script
- You will see a large `error` object and this object is a `validation` object that describes to us what happen so when we use `mongoose` we have some basic `validation` from the start
- Check on `Robo 3t` and you will see that the second time doesn't create a new document
- On the `mongoose.js` file; fix the `age` property

## Creating a Mongoose model

Now we will create a new  `model` for the `tasks`

- On your editor; go to the `mongoose.js` file
- Comment the `me` constant definition and value
- Also comment on the call of the `save` method that we use on the `me` constant
- Now below all the comments; create a new constant call `Task`(uppercase) and call the `model` method as its value

    `const Task = mongoose.model();`

- The `Task` model will have two properties called `description`(string) and `completed`(boolean). So send those properties to the `model` method

    ```js
    const Task = mongoose.model('Task', {
        description: {
            type: String
        },
        completed: {
            type: Boolean
        }
    });
    ```

- Now below of the `Task` model definition creates a new `Task` instance with some example data

    ```js
    const task = new Task({
        description: 'Clean office',
        completed: true
    });
    ```

- Then call the `save` method on the new instance in order to add the new `task` data(Remember to call `catch` for the errors)


    ```js
    task.save().then(() => {
        console.log(task);
    }).catch((error) => {
        console.log('Error', error);
    });
    ```

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Open `Robo 3T`
- In another tab of your terminal; go to the `task-manager/src/db` directory
- Run the `mongoose.js` script using: `node mongoose.js`
- On your terminal; you should see a log with the data that you just added
- Go to `Robo 3T`
- Refresh the database
- Go to `Collections`
- You should see the `tasks` collection with one item that has the data that you just added

If you notice we have a `tasks` and `users` collections at this moment in lowercase but we don't define them like this on any part of our code. This is because `mongo` takes the first parameter that you send on the `mongoose.model` method and converts it to lowercase and pluralizes it and that is what it uses as the collection name.

## Data Validation and Sanitization

We will continue to construct our models but first, we need to check 2 very important topics:

- Data validation: Here we enforce that the data follow some rules. As an example, we can add a rule that said that only `users` that have legal adult `age` can be added.
- Data Sanitization: Allow us to alter the data before saving it. For example; remove empty spaces around a `user` name.

We can begin with the `validation` that is offered to us by [mongoose](https://mongoosejs.com/docs/validation.html)(Open the docs on your browser). At this moment all the properties that we have on the `models` can be empty so we can prevent that with one of the `validators` that `mongoose` make available to us called `require`(As you see on the docs this `validator` can be used in any property). Let's add it.

- On your editor; go to the `mongoose.js` file on the `task-manager/src/db` directory
- In this file; comment on the `tasks` constant and its calls to the `save` method
- Uncomment the `me` constant and its calls to the `save` method
- On the `User` model definition add the `require` property with a `true` value below the `name` property

    ```js
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        }
    });
    ```

- On the `me` constant definition; remove all properties

    `const me = new User({});`

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of your terminal; go to the `task-manager/src/db` directory
- Run the `mongoose.js` script using: `node mongoose.js`
- You should see an error message
- Scroll in the log and you should see the `validation` message that said `name is required`
- Kill the process
- Go to the `mongoose file`
- On the `me` constant definition add an example `name`

    ```js
    const me = new User({
        name: 'Test'
    });
    ```

- Go back to your terminal a run the `mongoose` script again
- You should see that the `user` is added without issues

As you see here we made the `name` property `required` and the `age` is optional so we create rules for our data. Now if you see on the [mongoose validation page](https://mongoosejs.com/docs/validation.html); we don't have a lot of `validation` for our data so you are very limited if you are using only those `validation`; for example, if you need to validate a field is a phone number; a valid email or a valid credit number. If you need to do a `validation` like the examples `mongoose` give you the way to add a `custom validation` for your fields. Let's take an example where the `age` can't be a negative number

- On your editor; go to the `mongoose.js` file
- In the `age` property of the `user`; add a function that is called `validate` that receives a value parameter below the `type` property

    ```js
    const User = mongoose.model('User', {
        name: {...},
        age: {
            type: Number,
            validate(value) {}
        }
    });
    ```

- On the `validate` function create a condition that checks if `value`(This parameter will have the `value` that will be saved) is a negative number and throw an error if this is the case

    ```js
    const User = mongoose.model('User', {
        name: {...},
        age: {
            type: Number,
            validate(value) {
                if(value < 0) {
                    throw new Error('Age must be a positive number');
                }
            }
        }
    });
    ```

- On the `me` constant add a negative number for the `age` property

    ```js
    const me = new User({
        name: 'Test',
        age: -1
    });
    ```
- Go to your terminal and run the `mongoose.js` script
- You will see an error and if you scroll on the log you'll see the message of the error that you just made

Now we can do our `custom validation` but every time we need one we will need to create the code to handle each type of data that we will need including each edge case and some of them can be complex. I can recommend that instead of doing that we use a tested package that has all these `validations` already done like [validator.js](https://www.npmjs.com/package/validator) but on special cases, you still will do it yourself but this will help with a lot of the `validations` that we normally use. Let's do an example using this package on an `email` field on the user model.

- On your terminal; go to the `task-manager` directory
- Install the `validator.js` package using: `npm install validator`
- Go to the `mongoose.js` file on your editor
- Require the `validator` package

    `const validator = require('validator');`

- On the `User` model definition; add a new property called `email`

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {},
        age: {...}
    });
    ```

- The `email` will be a `string`, it will be `required` and will have a custom `validation` function

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {
            type: String,
            required: true,
            validate(value){}
        },
        age: {...}
    });
    ```

- Now inside of the `validate` function create a condition that throws an error when an `email` is not `valid` using the `isEmail` function of the `validator` package


    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        age: {...}
    });
    ```

    Since `isEmail` will send `true` to use when the `email` is `valid` we will need to convert the output to the opposite in order to have the correct output that is why we use `!` on the condition

- Go to the `me` constant and remove the `age` property and add an invalid `email`

    ```js
    const me = new User({
        name: 'Test',
        email: 'test@'
    });
    ```

- On your terminal; run the `mongoose.js` script
- You will see an error for the `invalid email`

Now we can have `custom validation` written by us or use a library if we need it.

### Schema Types

Each `type` of data that we use have some properties that we can use provided by `mongoose` like `require` and `validate` that we already use. [Here](https://mongoosejs.com/docs/schematypes.html) you will see all of those `schema types` that we can use in general and depending on the `type` of data that we will use. Let us a couple of them.

First; we will use `trim` for the `name` property of the `user`. When `trim` is set to `true` will eliminate all the extra space at the beginning and at the end of the string

- On your editor; go to the `mongoose.js` file
- Below the `type` property of the `name` in the `User` model add `trim` with a `true` value

    ```js
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {...},
        age: {...}
    });
    ```

- Now add the `trim` and `lowercase` property and set those to `true` on the `email`

    ```js
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        age: {...}
    });
    ```

    When you set `lowercase` to `true` all the letters on a `string` will be converted to `lowercase` if they are `uppercase`

-  On the `age` we will add the `default` property with a `0` value

    ```js
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if(value < 0) {
                    throw new Error('Age must be a positive number');
                }
            }
        }
    });
    ```

    The `default` property will add the value that you set on this property if the `age` in this case doesn't exist when you save data to the database

- Go to the `me` constant and update the value like this

    ```js
    const me = new User({
        name: '    Test    ',
        email: 'TEST@ME.IO '
    });
    ```
- Now go to `Robo 3T` and remove all data from the `users` collection
- Get to the terminal and run the `mongoose.js` script
- You will see that the data is added without issue. The data will don't have spaces and the `age` will have a value of `0`

Now we will add some more `validation` and `sanitization` to our `user` model and begin to add them to the `task` model. First; we will add a new field to `user` in this case the field is `password`; for the moment we will store the `password` as it sends this is call store a `plain text password` that is a bad practice but in the future, we will correctly store and `hash` it. The `password` field will be a `string`; will `trim` the extra spaces; need to be greater than 6 characters and can't have the word `password` in it.

- On your editor; go to the `mongoose.js` file
- Below the `email` field on the `User` definition add a `password` property

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {},
        age: {...}
    });
    ```

- Add a `type` property set to `String`; a `trim` and `required` properties set to `true` on `password`

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {
            type: String,
            required: true,
            trim: true,
        },
        age: {...}
    });
    ```

- Now we will need to add a minimum of 6 characters for the `password` so we will use the `minLength` property set to `7`

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 7
        },
        age: {...}
    });
    ```

- Then add a custom `validation` function to `password`

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 7,
            validate(value) {}
        },
        age: {...}
    });
    ```

- Now create a condition that tests the `value` string to see if it has the `password` word in it

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 7,
            validate(value) {
                if(value.toLowerCase().includes('password')) {}
            }
        },
        age: {...}
    });
    ```

    We use the `toLowerCase` js method to ensure that we always test for `password` without any uppercase(This will be for the moment; later we will change all this code) then we use the `includes` method that will check if `password` exits on the string that you are saving into the database

- Throw an error is the condition match

    ```js
    const User = mongoose.model('User', {
        name: {...},
        email: {...},
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 7,
            validate(value) {
                if(value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        },
        age: {...}
    });
    ```

- Now go to your terminal and run the `mongoose.js` script(We assume that you didn't change the `me` constant value that doesn't have a `password`)
- You should see a `required password` error
- Kill the process and get back to the `mongoose.js` file
- Add the `password` property with less than 6 characters
- Get back to your terminal and run the `mongoose.js` script
- You should see the `minLength` error
- Get back to the `mongoose.js` file
- Change the `password` value to a string that has the `password` word in it like `testpassword`
- Get back to your terminal and run the `mongoose.js` script
- You should see the custom `validation` error
- Get back to the `mongoose.js` file
- Add `password` that doesn't match any of the `validation` errors like:`testing8888`
- Get back to your terminal and run the `mongoose.js` script
- You should see that the `user` is created with the `password`
- Get back to the `mongoose.js` file
- Comment the `me` constant definition and it calls to the `save` method
- Uncomment the `task` constant and its call to the `save` method

Now we will work with the `Task` model. On the `description` field we will `trim` the spaces and will be `required`. The `completed` field will be optional and will have a default value of `false`.

- Add the `required` and `trim` properties on the `description` field in the `Task` definition

    ```js
    const Task = mongoose.model('Task', {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean
        }
    });
    ```

- Now add a `default` value of `false` on the `completed` field

    ```js
    const Task = mongoose.model('Task', {
        description: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    });
    ```

- On the `task` constant; remove all values

    `const task = new Task({});`

- Get back to your terminal and run the `mongoose.js` script
- You should see a `required description` error
- Kill the process and get back to the `mongoose.js` file
- Add a `description` with some extra spaces on the `task` constant

    ```js
    const task = new Task({
        description: '     Clean office     ',
    });
    ```

- Get back to your terminal and run the `mongoose.js` script
- You should see that the `task` is saved into the database; the `description` doesn't have extra space and the `completed` have a `false` value

## Structuring a REST API

Now we will take a brief look at how we will structure our `HTTP` endpoints that we will need for our application and a little look at how an `HTTP` request is structured.

First; we will need to take a look at what the `REST API` means. So `REST` stand for `Representational State Transfer` and `API` is `Application Programming Interface`(Also known as a `RESTful API`).

The `Application Programming Interface` or `API` is a set of tools that allow you to build software applications like `npm` modules such as `express` provide us with a set of tools to build software applications.

The `Representational State Transfer` allows clients such as web applications to access and manipulate resources using a set of predefined operations; so what is a `resource`? Is something like a `user` or a `task`. A `predefined` operation for `user` and `task` could be something to create a `user`; update a `task` when is completed or upload a profile picture for your `user` account, so this `predefined` operation is going to allow the client like a web app to go to the process of creating a frontend for a `task manager`.

Let's look at `Representational State Transfer` parts:

- `Representational`: With a `REST API` we are working with a representation of our data in other words the data is stored in the database but using a `REST API` I can still `fetch` data or perform any `CRUD` operations
- `State Transfer`: The `REST API`(The server) is `stateless` this means that the `state` is `transfer` to the client so each request to the client has everything that the server needs to process an operation; this includes the operation that they are trying to perform; all of the data that the operation needs in order to work and also include things like authentication making sure that the `user` that is trying to perform the operation is actually allowed to do it.

Here is a little example:

```bash
-------------------------
| Need task data to show |
-------------------------
            ||
        *--------*                       *--------*
        | client |                       | server |
        *--------*                       *--------*
```

Here we have a `client` and a `server` and the `client` is going to have a `requirement` like `need to have a task data to show on this page`. Then it will do an `HTTP` request to the `server`

```bash
-------------------------
| Need task data to show |
-------------------------
            ||
        *--------*      GET /tasks/:id   *--------*
        | client |       ===========>    | server |
        *--------*                       *--------*
```

Here the `client` is using the `GET HTTP` method to make a request to `/task/:id`(the `:id` means an `id` of a `task`). At this moment the `server` will enter the process of fulfilling it

```bash
-------------------------               ---------------------------
| Need task data to show |              | Found it in the database |
-------------------------               ---------------------------
            ||                                      ||
        *--------*      GET /tasks/:id          *--------*
        | client |       ===========>           | server |
        *--------*                              *--------*
```

The `server` found the data in the database using the `id` that the `client` send and will send it back using an `HTTP` response

```bash
-------------------------               ---------------------------
| Need task data to show |              | Found it in the database |
-------------------------               ---------------------------
            ||                                      ||
        *--------*      GET /tasks/:id          *--------*
        |        |       ===========>           |        |
        | client |       <===========           | server |
        |        |    200 - JSON Response       |        |
        *--------*                              *--------*
```

On the response, we see a `status code`(200) in this case indicates that everything when well and has the `JSON` with the data that was requested. They are more `status codes` but we will see them at the moment that we build the application endpoints. At this point, the `client` will receive the data and will be time to `render` things

```bash
-------------------------               ---------------------------
| Time to render data   |              | Found it in the database |
-------------------------               ---------------------------
            ||                                      ||
        *--------*      GET /tasks/:id          *--------*
        |        |       ===========>           |        |
        | client |       <===========           | server |
        |        |    200 - JSON Response       |        |
        *--------*                              *--------*
```

With the `Rest API` we will use more than the `GET` request; we will be `creating`; `update` and `deleting` data. For example:

```bash
------------------------------------------
| I am a user and I need to create a todo |
------------------------------------------
            ||
        *--------*                              *--------*
        |        |                              |        |
        | client |                              | server |
        |        |                              |        |
        *--------*                              *--------*
```

Here the user is authenticated and tries to perform a `predefined` operation so it will fire a request

```bash
------------------------------------------
| I am a user and I need to create a todo |
------------------------------------------
            ||
        *--------*                                  *--------*
        |        |    POST /tasks - JSON request    |        |
        | client |          ============>           | server |
        |        |                                  |        |
        *--------*                                  *--------*
```

At this time we are not using the `GET HTTP` method we are using `POST` that is used to `create` data. The `client` is making a request to `/tasks` sending along with a `JSON` with the request in the case of a `task` will need the `description` in order to be created. When the `server` get the request is going to authenticate that the user has an account and then is going to create the `task` associated with the `user`

```bash
                                                    -----------------------------------
                                                    | Identify confirmed; Task created |
                                                    -----------------------------------
                                                                ||
        *--------*                                          *--------*
        |        |       POST /tasks - JSON request         |        |
        | client |             ============>                | server |
        |        |                                          |        |
        *--------*                                          *--------*
```

Now that the `task` is created will send the `response` back

```bash
                                                    -----------------------------------
                                                    | Identify confirmed; Task created |
                                                    -----------------------------------
                                                                ||
        *--------*           POST /tasks - JSON request     *--------*
        |        |             ============>                |        |
        | client |             <============                | server |
        |        |          201 - JSON response             |        |
        *--------*                                          *--------*
```

Here we have seen a different `status code` in this case `201` that means `resource created` with a `JSON` response with the information of the `task` created. The user will receive the data that everything when well and render the data that it needs

```bash
    --------------------------
    | Time to render the data |
    --------------------------
            ||
        *--------*           POST /tasks - JSON request     *--------*
        |        |             ============>                |        |
        | client |             <============                | server |
        |        |          201 - JSON response             |        |
        *--------*                                          *--------*
```

In order to anyone do something meaningful with the application we will need to expose some `predefined` operations. Every single `API` operation is defined with 2 pieces of data; the `HTTP` method and the `path`. Now we will see some `predefined` operation for the `task resource`:

- `Create` => `POST /tasks`: Will help us to create a new `task`(When you are creating a `create` endpoint you'll use the pluralize version of the resource in this case `tasks`)
- `Read` => `GET /tasks`: Get all `tasks`(If you notice we still using the `tasks` path)
- `Read` => `GET /tasks/:id`: Get a single specify `task`(using it `id`)
- `Update` => `PATCH /tasks/:id`: Update a existing `task`(using it `id`)
- `Delete` => `DELETE /tasks/:id`: Delete a `task` by it `id`

Every `HTTP` request just has some text that is sent between the `client` and `server`. Here is an example:

```bash
Post /tasks HTTP/1.1
Accept: application/json
Connection: Keep-Alive
Authorization: Bearer 29209ue2ue9djsidsnj....

{"description": "Order new books"}
```

- `Post /tasks HTTP/1.1`: This is known as a `request` line that contains the `HTTP` method; in this case `POST`; the `path` and the `HTTP` protocol

After this line we will have as many `headers` we need(The 3 next lines are `headers`). The `headers` are `key value` pairs that allow you to attach meta information to the request

- `Accept: application/json`: Said that we are expecting `JSON` data back
- `Connection: Keep-Alive`: We are telling you that we are likely to do a request shortly so keep this connection open so we keep things fast
- `Authorization: Bearer 29209ue2ue9djsidsnj....`: We setting `authorization` to get `authentication` in this case we put an example `token`
- `{"description": "Order new books"}`: This represent the request `body`. We will need to send data in order to create a `task` so we will send it as a `JSON` to the `server`

Then the server will send back a response like this:

```bash
HTTP/1.1 201 Created
Date: Sun, 28 Jul 2022 15:37:40 GTM
Server: Express
Content-type: application/json

{"_id":"82ue28e9h29e8h2e92h", "description": "Order new books", "completed": "false"}
```

- `HTTP/1.1 201 Created`: First; we have the `HTTP` protocols; the `status` of the request(201) and a text representation of the status code(Created)

Next are the `headers`:
- `Date: Sun, 28 Jul 2022 15:37:40 GTM`: Time that the operation happens
- `Server: Express`: Server type
- `Content-type: application/json`: Is metadata of the data that is on the `body`

Next is the `body`:
- `{"_id":"82ue28e9h29e8h2e92h", "description": "Order new books", "completed": "false"}`: Data of the resource created in this case a `task`

## Installing Postman

We will make a lot of `HTTP` requests when we work on the application so we will need a tool that gives us the opportunity to test and verify our work easily. For this, we will use a tool called [Postman](https://www.postman.com/)(We don't need a `postman` account to work so skip every time that tells you to make an account). This tool will help us to test our `API` without having a `client`. So let's test a little bit with `postman`.

- On your browser go to the [postman page](https://www.postman.com/)
- On the `Download the desktop app` section; click on your operating system
- Download the installer
- Use the installer
- You should successfully install `postman`
- Open the `postman` app
- It will ask to create an account but we don't need it so click on the `skip` link at the bottom
- A modal should popup
- We are going, to begin with, a basic request so click on the `Request` option
- We will test with the weather app that you created before so on the `Request name` input add a name that specifies that like `Get weather`(`Get` request of the `weather`)
- The `description` is optional but you will need to specify a `collection`(Folder where you store multiple requests). Click on the `Create Collection` link below
- On the `Collection name` input that appears add a name like `Weather App`
- Click on the `check` button
- Now click on the `Save` button
- You will be forward to the main `postman` window
- At the left sidebar; you should see the `Weather App` folder and inside of it the `Get weather` request

On the main screen(The middle) you will see that we have 2 pieces of information:

- The `HTTP` method that we are going to use(In this case `GET`)
- The `URL` that we are making the request

Now we will make the first `Postman` request

- Get your `heroku` app URL
- Paste your `heroku` app URL on the `Enter request URL` input
- Type the `/weather` endpoint(Remember that we set this endpoint to get the `weather` data)
- Now we need to provide the address so add the `address` query param and put a valid location like

    `/weather?address=boston`

- Click the `Send` button
- You will see the `response` below with the `weather` data in a `JSON` format

## Resources Creation Endpoint

Now we will set our first endpoint on our app!!! In this case, we will do the `user` and `task` creation endpoints. Let's get into it!!!

- On your terminal; go to the `task-manager` directory
- Install `nodemon` as a `dev` dependency using: `npm install nodemon`
- Install `express` using: `npm install express`
- Now get to the `task-manager` directory on your editor
- Delete the `mongoDB.js` file(We are not using this file for the app; it was for illustration)
- Inside of the `src` directory; create a new file called `index.js`

    The `index.js` file will be the starting point of the application so we will set our `express` server on this file
- On this newly created file; require `express`

    `const express = require('express');`

- Below the `express` constant; create a new constant call `app` with the `express` method as its value

    `const app = express();`

- Below the `app` constant; create a new one called `port`. We will deploy the app to `heroku` in the future so the value of the `port` constant will be `process.env.PORT` or `3000` locally

    `const port = process.env.PORT || 3000;`

- Now below the `port` constant; use the `listen` method of `app` sending the `port` and a `callback` function that console a message that the server is running

    ```js
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
    ```

- Go to the `package.json` file
- On the `script` object; remove the `test` property
- Add a `start` and `dev` scripts

    ```json
    "scripts": {
        "stat": "",
        "dev": ""
    },
    ```

- On the `start` script we will add how `heroku` will run the app(As we mentioned before `index.js` will be our starting point)

    ```json
    "scripts": {
        "stat": "node src/index.js",
        "dev": ""
    },
    ```

- Then on the `dev` script we will use `nodemon` to run the app locally

    ```json
    "scripts": {
        "stat": "node src/index.js",
        "dev": "nodemon src/index.js"
    },
    ```

- Go to your terminal and run the app on the `dev` version using: `npm run dev`
- You should see the log of the server
- On another tab of your terminal begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`

Now we have the basic `express` set up for our app; we can continue creating our first endpoint. As we mentioned before we will work with the `creation` resource so we will create the create `user` route.

- Get to the `index.js` file
- Below the `port` constant and before the `app.listen` call; call the `post` method of `app`

    `app.post();`

- Like the `get` method that we saw before `post` receives 2 arguments; the `path` and a `callback` function

    `app.post('', () => {});`

- Since we are working with the `creation` resource of a `user`; the `path` will be `users`(pluralize)

    `app.post('/users', () => {});`

- As we saw before the `callback` function has 2 arguments: `res`(respond) and `req`(request)

    `app.post('/users', (req, res) => {});`

- For testing; add a test respond inside of the `callback` function

    ```js
    app.post('/users', (req, res) => {
        res.send('testing!');
    });
    ```

- Go to `postman`
- At the left sidebar; click on the `plus` button at the top
- Add the `collection` name; in this case `Task App`
- On the sidebar; right click on the `Task App` collection
- Click on `Add Request`
- Add the new `request` name
- Since we are doing a `POST` request we will need to change the `GET` option so click on the `GET` dropdown and choose `POST`
- On the URL input; add the server URL: `http://localhost:3000/users`
- Click on the `Send` button
- You should see the testing message below

As you may recall for the `creation` of a `user` or `task` we need to send some information so from `postman` we will need to set the `JSON` data that we are going to send in the request

- Click on the `Body` tab below the `URL` input
- Then click on the `raw` radio button
- Since we are sending `JSON` we will need to choose it in the dropdown that has `text` pre-defined
- Now below you will need to add the `JSON` with the data necessary to create a `user`(like we set before on the `mongoose` file; `name`, `email` and `password`. The `age` is optional)

    ```json
    {
        "name": "Test",
        "email": "test@testing.com",
        "password": "testing123"
    }
    ```

- Click the `Send` button
- You should see the testing message again

We will need to get the data on the `express` server. This is a 2 step process: We will need to configure `express` to automatically parse the incoming `JSON` for us so we have it as an object that we actually can use then on the `request` handler get the `body` as an object

- Below the `port` constant call the `use` method of `app`

    `app.use();`

- `Express` provide use a function to `parse` the `JSON` that we can send as a parameter of the `use` method

    `app.use(express.json());`

When we add this line `express` will `parse` the incoming `JSON` to an object and we can access it on our `request handler`

- On the `users` handler logs the `request body`

    ```js
    app.post('/users', (req, res) => {
        console.log(req.body);
        res.send('testing!');
    });
    ```

- Save the file
- Get back to `postman`
- Send the request
- Get to your terminal and you will see the `request body` that you just send from `postman`

Now we will integrate the code that we already have on the `mongoose.js` file for creating a `user`. Since we already connect to the database and have the necessary code to create a model and save data we will just reorganize the code on this file.

- First; create a new folder called `models` inside of the `src` directory
- Inside of this newly created folder; create a file called `user.js`
- Get to the `mongoose.js` file
- Cut all the `User` model code(From the `User` constant declaration to the end of the attribute definition)
- Paste it into the `user.js` file
- At the top of the `user.js` file; require `mongoose` and `validator`

    ```js
    const mongoose = require('mongoose');
    const validator = require('validator');
    ```

- Now we will need to export the `user` model in order for other files can create new `users` so at the bottom of the file export `User`

    `module.exports = User;`

- Get to the `mongoose.js` file and remove the `validator` require at the top
- Remove the `me` definition and call the `save` method
- Also remove the `task` constant definition(Not the `Task` definition) and its calls to the save method
- Now get back to the `index.js` file
- Below the `express` definition at the top; require the `mongoose.js` file like this

    `require('./db/mongoose');`

    We don't need to grab anything from that file so we will only need that the code run and that will ensure that `mongoose` connect to the database

- Next; load the `User` model; below the `mongoose` require

    `const User = require('./models/user');`

- Get to the `user` handler and create a new constant call `user` that creates an instance of a `User`(Since we need some things to create a `user` instance we will need to send the `request body`) and remove the log

    ```js
    app.post('/users', (req, res) => {
        const user = new User(req.body);
        res.send('testing!');
    });
    ```

- Remove the `testing` message
- Then call the `save` method using the `user` constant with the `then` and `catch` method like we defined before on the `mongoose.js` file

    ```js
    app.post('/users', (req, res) => {
        const user = new User(req.body);

        user.save().then(() => {})
            .catch((e) => {});
    });
    ```

- Now on the `then` callback we will need to send the response back with the `user` data(Since we already have the data on the `user` constant we just send it)

    ```js
    app.post('/users', (req, res) => {
        const user = new User(req.body);

        user.save().then(() => {
            res.send(user);
        })
        .catch((e) => {});
    });
    ```

- Get to `postman` and send the request
- At the bottom, you should see the response with all the data that was provided when you send the request
- Get back to the `index.js` file
- We will need to send the error if something is wrong so sends the `e` parameter

    ```js
    app.post('/users', (req, res) => {
        const user = new User(req.body);

        user.save().then(() => {
            res.send(user);
        })
        .catch((e) => {
            res.send(e);
        });
    });
    ```

- Go to `postman` and change the `password` to an incorrect one like `test` in the `request body`
- Send the request
- You should see the error below but on the `status` you still see the `200 ok`(Top right of the response section)
- Get to the `index.js` file
- Call the `status` method of `res` and send `400` as parameters (We will use chaining for `status` and `send`). Is important to use `status` before `send` in order to get the correct status

    ```js
    app.post('/users', (req, res) => {
        const user = new User(req.body);

        user.save().then(() => {
            res.send(user);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
    });
    ```

    [Here](https://www.httpstatuses.org/) is a useful page with all the status information. We will use the `2xx` statuses when things go well; `4xx` when things go wrong with things that the `client` did and `5xx` when something goes wrong with something on the `server`

- Go to `postman` and send the request
- You should see the error with a `400` status

At this moment we can begin to do the same process with the `task` model

- On your editor go to the `models` directory and create a new file called `task.js`
- Get to the `mongoose.js` file and cut the `Task` definition
- In the newly created `task.js` file paste the `Task` definition
-  At the top of the `task.js` file; require `mongoose`

    `const mongoose = require('mongoose');`

- At the bottom of the file; export `Task`

    `module.exports = Task;`

- Now get to the `index.js` and import the `Task` model below the `User` model import

    `const Task = require('./models/task');`

- Below the `user` handle; add a handler for a `tasks` endpoint

    ```js
    app.post('/tasks', (req, res) => {});
    ```

- On the `tasks` callback; create a new constant call `task` that will contain a new instance of `Task`(Remember to send the `body` of the request)

    ```js
    app.post('/tasks', (req, res) => {
        const task = new Task(req.body);
    });
    ```

- Then call the `save` method using the `task` constant also call the `then` and `catch` methods

    ```js
    app.post('/tasks', (req, res) => {
        const task = new Task(req.body);

        task.save().then(() => {})
            .catch((e) => {});
    });
    ```

- On the `save` method send the `task` if everything goes as expected and on the `catch` method send the `error` with a `400` status

    ```js
    app.post('/tasks', (req, res) => {
        const task = new Task(req.body);

        task.save().then(() => {
            res.send(task);
        }).catch((e) => {
            res.status(400).send(e);
        });
    });
    ```

- Save the file
- Go to `postman`
- Right-click on the `Task App` collection
- Choose to create `Add Request`
- Add the name of the request like `create task`
- Choose the `POST` option
- Add the `URL` of the request: http://localhost:3000/tasks
- Choose the `Body` option below the `URL`
- Below the `Body` tab; choose `raw` and on the dropdown at the end choose `JSON`
- On the `request body` put an empty `JSON`({})
- Click `Send`
- You should see an error below with the correct status(400)
- Now change the `request body` and add a `description` like this

    ```json
    {
        "description": "fire a request from postman"
    }
    ```

- Click `send`
- You should see the data of a created `task` in the response section

One last thing; when we create a `user` or `task` we respond with a `status 200`(`express` do this by default) which is ok but we actually can provide more information for this case if we use `201` that means that a resource is created so get to both `users` and `tasks` endpoint

```js
app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
```

## Resources reading Endpoints

Now we can continue creating our endpoints in this case the `reading` endpoints that will get the data of all or one `user/task`.

- On your editor; go to the `index.js` file
- Below the `users` endpoint; create a new endpoint called `users` but in this case using the `get` method

    ```js
    app.get('/users', (req, res) => {});
    ```

`Mongoose` provide us with a series of methods like the `MongoDB` native driver that will help us to perform the `read` operation. [Here](https://mongoosejs.com/docs/queries.html) you can see the methods that `mongoose` gives to you for different operations. In order to `fetch` multiple items, we will use the [find](https://mongoosejs.com/docs/api.html#model_Model.find) method that searches for items that match the criteria that received.

- Now inside of the callback function of the `users` handler that you just created; use the `find` method on the `User` model sending an empty object

    ```js
    app.get('/users', (req, res) => {
        User.find({});
    });
    ```

    The object that we send as a parameter of the `find` method will have the acceptance criteria that will use to `find` the items that we want. Since we need all items; we will send an empty object so every item matches the criteria

-  Next; we can use the `then` and `catch` methods

    ```js
    app.get('/users', (req, res) => {
        User.find({}).then((users) => {})
        .catch((e) => {});
    });
    ```

- In a success case we will need to send the list of the items that match the creation

    ```js
    app.get('/users', (req, res) => {
        User.find({}).then((users) => {
            res.send(users);
        }).catch((e) => {});
    });
    ```

- On your terminal; go to the `task-manager` directory
- Run the `express` server using: `npm run dev`
- On another tab of the terminal run the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Go to `postman`
- Right-click on the `task app` collection
- Click on `Add Request`
- A new request tab should popup
- Add the request name like `Read user`
- Leave `Get` as a type of request
- On the `URL` section add this: `http://localhost:3000/users`
- Click on `Send`
- You should see all `users` that you have on the database
- Get back to the `index.js` file
- On the `get users` endpoint's catch method send a `500` to say that we have some issues connecting to the database

    ```js
    app.get('/users', (req, res) => {
        User.find({}).then((users) => {
            res.send(users);
        }).catch((e) => {
            res.status(500).send();
        });
    });
    ```

    We just send the status we don't actually need to send the error back because the status will provide the information needed

Now we will need to add another `read` endpoint for the `user` that has the ability to get the information of a single `user`

- Below the `get users` endpoint; create a new `get` handler

    `app.get('', (req, res) => {});`

- Now we will need to set the path for the handler that will be the same `users` path but we will need a part that will be changed depending on the `id` of the element so we will add `/:id` at the end of the path

    `app.get('/users/:id', (req, res) => {});`

    The `:id` is called `route parameters` and `express` give us to be part of the `URL` that is used to capture dynamic values

- To access the dynamic value of the `URL` we will have the `params` property as a part of `req` so create a constant call `_id` and store the value of the `id` on the `URL` and log the value


    ```js
    app.get('/users/:id', (req, res) => {
        const _id = req.params.id;

        console.log(_id);
    });
    ```

- Go to `postman`
- Right-click on the `Task app` collection
- Click on the `Add Request`
- A new request tab should popup
- Add the request name like `read user`
- Add the `URL` like this: http://localhost:3000/users/087123409823 (Make sure that the `id` have this length, and should not exists on the database for the moment)
- Click `Send`
- Go to the terminal tab that the server is running
- You should see the value of the `id` that you just put on the request `URL` that you send
- Get back to your editor
- Remove the log of the `read user` handler that you just added

Now we will use another `mongoose` method and if you see it on the [mongoose docs](https://mongoosejs.com/docs/api.html) we can choose from 2 options; `findOne` and `findOneById`. The difference between these 2 methods is that we use `findOne` when we want to get an item without using the `id` and as its name suggests `findOneById` use the `id` of an item to retrieve its data. In our case, we will use `findOneById` since we get the `id` from a `param` of the `URL`.

- On the `get a user` handler call the `findOneById` method using the `User` model and call the `then`(receive a `user` as a parameter) and `catch` methods

    ```js
    app.get('/users/:id', (req, res) => {
        const _id = req.params.id;

        User.findById(_id).then((user) => {})
        .catch((e) => {});
    });
    ```

At this moment is worth mentioning; that when we don't have any `user` to retrieve is not considered an error is just that the `id` provided doesn't match with any user so we will respond with the appropriate status that represents that a `user` with that `id` wasn't found.

- On the `then` method adds a condition that asks if we receive a `user` and if we don't receive it send a `404` status

    ```js
    app.get('/users/:id', (req, res) => {
        const _id = req.params.id;

        User.findById(_id).then((user) => {
            if (!user) {
                return res.status(404).send();
            }
        }).catch((e) => {});
    });
    ```

- Now if we are able to find a `user` we respond with it

    ```js
    app.get('/users/:id', (req, res) => {
        const _id = req.params.id;

        User.findById(_id).then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        }).catch((e) => {});
    });
    ```

- Finally; send a `500` if we got an error like we did before

    ```js
    app.get('/users/:id', (req, res) => {
        const _id = req.params.id;

        User.findById(_id).then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        }).catch((e) => {
            res.status(500).send();
        });
    });
    ```

- Go to `postman`
- Click `Send` on the `get user` request
- You should receive a `404` error
- Now get to the `get all users` request tab and grab one of the valid `ids`
- Get back to the `get user` request tab and paste the valid `id` at the end of the `URL`(deleting the previews `id` that you put)
- Click `Send`
- You should get the data of the `user` with the `id` that you put on the `URL`

As you see we didn't convert the `id` that we receive as a `param` on the `URL` in the `get user` handler to an `ObjectID` as we do on the `MongoDB native driver` before. `Mongoose` take care of this for us converting `string ids` into `ObjectIDs`.

Now we can continue with the next part of the `read resource` that is the same process that we did before but with `tasks`.

- On your editor; get to the `index.js` file
- Below the `get user` handler; add a new endpoint that gets all `tasks`

    `app.get('/tasks', (req, res) => {});`

- Call the `find` method of the `Task` model in the callback function with an `empty` object as a parameter(Remember to call the `then` and `catch` methods) 

    ```js
    app.get('/tasks', (req, res) => {
        Task.find({}).then((tasks) => {})
        .catch((e) => {});
    });
    ```

- Send the `tasks` as a response to the `then` method

    ```js
    app.get('/tasks', (req, res) => {
        Task.find({}).then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {});
    });
    ```

- Send a `500` status when there is an error

    ```js
    app.get('/tasks', (req, res) => {
        Task.find({}).then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {
            res.send(500).send();
        });
    });
    ```

- Get to `postman`
- Right-click on the `task app` collection
- Click on `Add request`
- Add the name of the new request like `read tasks`
- Add the `tasks` endpoint: http://localhost:3000/tasks
- Click `Send`
- You should receive the data of all `tasks` that you have on your database
- Get back to the `index.js` file
- Below the `get tasks` handler; create a new endpoint to retrieve one `task` by its `id`

    `app.get('/tasks/:id', (req, res) => {});`

- Inside of the callback function; create a new constant call `_id` and its value will be the `params.id` property of `req`

    ```js
    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id;
    });
    ```

- Use the `findById` method of the `Task` method sending the `_id` as a parameter(Remember to call the `then` and `catch` method)

    ```js
    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id;

        Task.findById(_id).then((task) => {})
        .catch((e) => {});
    });
    ```

- Create a condition that checks if `task` has a value and if it doesn't have it send a `404` status as a response

    ```js
    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id;

        Task.findById(_id).then((task) => {
             if (!task) {
                return res.status(404).send();
            }
        })
        .catch((e) => {});
    });
    ```

- Then if we have a value on `task` send it as a response

    ```js
    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id;

        Task.findById(_id).then((task) => {
             if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        })
        .catch((e) => {});
    });
    ```

- Finally; send a `500` status if we got an error

    ```js
    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id;

        Task.findById(_id).then((task) => {
             if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        })
        .catch((e) => {
            res.status(500).send();
        });
    });
    ```

- Get to `postman`
- Right-click on the `task app` collection
- Click on `Add request`
- Add the name of the new request like `read task`
- Add the `tasks` endpoint: http://localhost:3000/tasks/:id (Change the `:id` with a valid `id`; you can use the `read tasks` request tab to get one)
- Click `Send`
- You should receive the data of the `task` that you send the `id` as a param
- Change one number to another in the `id` in the `URL`
- Click `Send`
- You should see a `404` response

## Promise chaining

At this moment we will stop the `task app` development in order to see a `promise` feature that we will need to understand.

Each time that we work with `promises` we do one `asynchronous` thing at a time but sometimes we want to do more than one thing in order to achieve something and that is when the `promise chaining` go into action. Let's create some examples of it.

- On your editor; go to the `playground` directory
- Create a new file called `9-promises.js`

We will create a `promise` that has some delay in other to make an example. We will create a function that adds return the sum of 2 numbers.

- Inside of this file create a new function called `add` that receives 2 numbers

    `const add = (a, b) => {}`

- On the `add` function; return a `promise`

    ```js
    const add = (a, b) => {
        return new Promise((resolve, reject) => {}
    }
    ```

- Add a `setTimeout` on the `promise` of `2` seconds that return the sum of the 2 numbers

    ```js
    const add = (a, b) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(a + b);
            }, 2000);
        }
    }
    ```

- Now below the `add` definition; call it with 2 numbers(Remember to use the `then` and `catch` methods printing the result or error)

    ```js
    add(1, 1).then((sum) => {
        console.log(sum);
    }).catch((e) => {
        console.log(e);
    });
    ```

- On your terminal; go to the `playground` directory
- Run the `9-promises.js` file using: `node 9-promises.js`
- You should see the `sum` of the 2 numbers after 2 seconds

Now imagine that you will need to add another number to the first result that we have when we call the `add` function. For this case, we will need to call the `add` function on the `then` method.

- Call the `add` function sending the first result a `4` as the second parameter

    ```js
    add(1, 1).then((sum) => {
        console.log(sum);
        add(sum, 4).then((sum2) => {
            console.log(sum2);
        }).catch((e) => {
            console.log(e);
        });
    }).catch((e) => {
        console.log(e);
    });
    ```

- Get back to your terminal and run the `9-promises.js` script again
- You should see after 2 seconds 2 then after 2 more seconds 6 on the terminal

This resolve what we need but this creates a more nested and complex call; imaging that we need to do another `asynchronous` call; this will get more complex to actually know what is happening also we have duplicate `catch` calls. Now let's update this to use `promise chaining`.

- Remove the second `add` call on the first `then` method
- Now in the `then` method; return an `add` promise with the `sum` and `4` as a parameter

    ```js
    add(1, 1).then((sum) => {
        console.log(sum);
        return add(sum, 4);
    }).catch((e) => {
        console.log(e);
    });
    ```

- Now we will need to call the `then` method again and this time it will receive the result of the second `add` call

    ```js
    add(1, 1).then((sum) => {
        console.log(sum);
        return add(sum, 4);
    }).then((sum2) => {
        console.log(sum2);
    }).catch((e) => {
        console.log(e);
    });
    ```

So this is `promise chaining` on effect; we call multiple `promises` and add a `then` method call for each of them after we return a `promise` and that method will receive the result of that return `promise` and we can call a single `catch` call.

- Get back to your terminal and run the `9-promises.js` script again
- You should see after 2 seconds 2 then after 2 more seconds 6 on the terminal

Now we can test with our `task app` database(We don't have an actual use case yet but we will do an example for this).

- On your editor; go to the `task-manager` directory
- Create a new folder called `playground`
- Create a new file called `promise-chaining.js`

Now we will create an example where we change the `age` of a `user` and then `fetch` all the `users` with that `age`.

- On this newly created file `require` the `mongoose.js` file on the `src/db` directory

    `require('../src/db/mongoose');`

- Then `require` the `User` model

    `const User = require('../src/models/user');`

- Go to your terminal and start the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Now open `Robo 3T`
- Click on the `task-manager` database
- Click on the `collections`
- Click on the `user` collection
- Right-click on one of the `user`
- Choose `edit`
- Copy one of the `id` of that `user`

At this moment we need functions that help us to achieve our goal so as you notice `mongoose` will help us with this. On the [docs][https://mongoosejs.com/docs/api/query.html] you will see that we have some `updates` functions like `updateMany` or `updateOne` and those functions can be used to achieve our goal but those functions don't retrieve the document that we `update`. There are other variations that will return the document; `findByIdAndUpdate` and `findOneAndUpdate`; those functions will help us to achieve what we need and for this case, we will use `findByIdAndUpdate`.

- Go to the `promise-chaining.js`
- Below the `User` require; call the `findByIdAndUpdate` using the `User` model

    `User.findByIdAndUpdate();`

- Paste the `id` of the `user` that you copied before as the first parameter of the `findByIdAndUpdate` method

    `User.findByIdAndUpdate(':id');`

- As the second parameter we will send an object with the property that we want to update and the new value

    `User.findByIdAndUpdate(':id', { age: 1 });`

    As you notice; we didn't use the `$` as we did before when we use the `mongoDB native driver` because `mongoose` take care of this for us

- Now add the `then` method that will receive the `user` and log the `user`

    ```js
    User.findByIdAndUpdate(':id', { age: 1 }).then((user) => {
        console.log(user);
    });
    ```

At this moment we have the first part of the task that is to `update` the `user`; now we need to `find` all `users` that have the same `age` as the one that we just `updated` and checking the [docs][https://mongoosejs.com/docs/api/query.html] you will see a method called `countDocuments` that will retrieve the number of documents depending on criteria.

- On the `then` method returns the `countDocuments` of the `User` model

    ```js
    User.findByIdAndUpdate(':id', { age: 1 }).then((user) => {
        console.log(user);
        return User.countDocuments();
    });
    ```

- Add the `age` of `1` as a parameter on the `countDocuments` method

    ```js
    User.findByIdAndUpdate(':id', { age: 1 }).then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1});
    });
    ```

- Now add another `then` call that receives `result` and log it

    ```js
    User.findByIdAndUpdate(':id', { age: 1 }).then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1});
    }).then((result) => {
        console.log(result);
    });
    ```

- Finally, add the `catch` call at the end

    ```js
    User.findByIdAndUpdate(':id', { age: 1 }).then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1});
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    });
    ```

- Now open a new tab of your terminal and get to the `task-manager/playground` directory
- Run the `promise-chaining.js` script using: `node promise-chaining.js`
- You should see the document that you just updated and a number that represents the amount of `users` that have the `age` that you use

We can do something similar for the `tasks` but instead of updating a `task` we are going to `delete` a `task` and `count` the `task` that a not `completed`.

- On the `task-manager/playground` directory; create a new file called `promise-chaining-2.js`
- In this newly created file; `require` the `mongoose` file and the `Task` model

    ```js
    require('../src/db/mongoose');
    const Task = require('../src/models/task');
    ```

- Go to `Robo 3T` and get the `id` of a `task`
- Get back to the `promise-chaining-2.js`
- Below the `Task` model `require`; call the `findByIdAndDelete` of the `Task.model`

    `Task.findByIdAndDelete();`

- Now send as a parameter the `id` that you just grab of a `task`

    `Task.findByIdAndDelete(':id');`

- Call the `then` method receiving a `task` as a parameter and log that value

    ```js
    Task.findByIdAndDelete(':id').then((task) => {
        console.log(task);
    });
    ```

- Then return the `countDocuments` method of the `Task` model; sending the `completed` property with a `false` value

    ```js
    Task.findByIdAndDelete(':id').then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    });
    ```

- Add another `then` method that gets the result of the `countDocuments` method and logs it

    ```js
    Task.findByIdAndDelete(':id').then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    }).then((result) => {
        console.log(result);
    });
    ```

- Finally, add a `catch` method

    ```js
    Task.findByIdAndDelete(':id').then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    });
    ```

- Get to your terminal and go to the `task-manager/playground` directory
- Run the `promise-chaining-2.js` script using: `node promise-chaining-2.js`
- You should see the data of the `task` that you just delete it and the amount of `tasks` that are not `completed`

## Async/Await

There is another `asynchronous` feature that we need to check before getting back to the building process of the application which is `async/await`. The `async/await` keywords will help us to make code more readable and will look more `synchronous` than `asynchronous` also it will not represent a lot of change in the actual code so we won't need to do a lot of changes like the time we pass from `callback` pattern to `promises`. Let's make an example.

- On your editor; go to the `playground` directory
- Create a new file called `10-async-await.js`
- Inside of this newly created file; create a function called `doWork` and will be an arrow function empty

    `const doWork = () => {}`

- Now below the `doWork` function; log the result of calling that function

    `console.log(doWork());`

- Go to your terminal and get to the `playground` directory
- Run the `10-async-await.js` using `node 10-async-await.js`
- You should see that `undefined` is log on the terminal

As you may know, if we don't return a value in a function `undefined` is implicitly returned. Now we will add the `async` keyword and check the difference.

- Add `async` to the `doWork` function definition

    `const doWork = async () => {}`

    The `async` keyword allows us to create an `asynchronous` function and in that function, we can use the `await` feature

- Get to your terminal and run the `10-async-await.js`
- You should see: `Promise { undefined }`

That log means that `doWork` is returning a `promise` and that `promise` is fulfilled with `undefined` so `async` function always returns a `promise` and that `promise` is fulfilled with the value that you choose to return. Let's return a value and see the change.

- On the `doWork` function return a `string`

    ```js
    const doWork = async () => {
        return 'Test';
    }
    ```

- Get to your terminal and run the `10-async-await.js`
- You should see: `Promise { 'Test' }`

As you see the `doWork` function still returns a `promise` but in this case is fulfilled with a `string` called `Test`. Now we can use the `then/catch` methods can be useful because `doWork` is a `promise`. Let's use it.

- Remove the `console` line
- Then call the `doWork` function and use the `then` method(Will receive `result` as a param and log that `result`) and the `catch` method(log the error)

    ```js
    doWork().then((result) => {
        console.log('result', result);
    }).catch((e) => {
        console.log('e', e);
    });
    ```

- Get to your terminal and run the `10-async-await.js`
- You should see: `result Test`

Since the `promise` is fulfilled the `then` block runs. If we `throw` an `error` we can run the `catch` block in other words to `resolve` the `promise` we just need to return a value and `reject` it; we will need to `throw` an `error`. Let's try to `reject` it

- On the `doWork` function; before the `return` value

    ```js
    const doWork = async () => {
        throw new Error('Something went wrong');
        return 'Test';
    }
    ```

- Get to your terminal and run the `10-async-await.js`
- You should see an error and the message that you put should be on the logs

Now we can check the other half of the feature that allows us to manage our `asynchronous` tasks and that is the `await` keyword. The `await` operator can only be used in `async` functions. Let's begin with the example.

- Go to the `9-promises.js` file; and copy the `add` function(Function that receives 2 numbers and returns the sum of the numbers after 2 seconds)
- Paste the `add` function at the top of the `10-async-await.js` file

We will use the `add` function intentionally because when you are working with `async/await` you don't have to change how your `promises` function internally the only thing that change is how you work with them.

- Remove the `error` and `return` of the `doWork` function
- Use the `await` operator calling the `add` function the following 2 parameters

    ```js
    const doWork = async () => {
        await add(1, 99);
    }
    ```

When we use `promises` we have access to the data using the `then` method but `await` the `add` function looks like a standard `synchronous` function so we actually can store the value that the `promise` is fulfilled with on a constant so in this case, we still wait the 2 seconds in order to get the value; the only advantage is syntactical.

- Create a constant call `sum` that stores the `add` value

    ```js
    const doWork = async () => {
        const sum = await add(1, 99);
    }
    ```

- Now return the `sum` value

    ```js
    const doWork = async () => {
        const sum = await add(1, 99);
        return sum;
    }
    ```

- Get to your terminal and run the `10-async-await.js`
- You will see `result 100` after 2 seconds

Now we have `asynchronous` code that looks like `synchronous`. Let's add some more calls to `add` in other to see the advantage

- Go to the `doWork` function and add the following


    ```js
    const doWork = async () => {
        const sum = await add(1, 99);
        const sum2 = await add(sum, 50);
        const sum3 = await add(sum2, 3);

        return sum3;
    }
    ```

- Get to your terminal and run the `10-async-await.js`
- You will see `result 153` after 6 seconds

As you see we have a more simple code using `async/await` instead of `promise chaining` also we have all values that the `promise` return in the same `scope` in case we need it. Now we will check when we have a `reject promise` with multiple calls.

- On the `add` function; inside of the `setTimeout` callback; add a condition that `reject` the `promise` when you try to sum a negative number(Add a message)

    ```js
    const add = (a, b) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(a < 0 || b < 0) {
                    return reject('Numbers must be non-negative');
                }
                resolve(a + b);
            }, 2000);
        });
    }
    ```

- On the `doWork` function change the second parameter of the `add` function on the `sum3` constant to a negative number

    ```js
    const doWork = async () => {
        const sum = await add(1, 99);
        const sum2 = await add(sum, 50);
        const sum3 = await add(sum2, -3);

        return sum3;
    }
    ```

- Get to your terminal and run the `10-async-await.js`
- You should see an error message after 6 seconds

As you notice we wait the same amount of time that the time that we don't any `rejections` because the first 2 `promises` return the value as expected; if we have the `rejection` early we will get the message sooner.

Now we can apply the same thing to the `promise-chaining` files on the `task-manager/playground` directory

- On your editor go to the `promise-chaining.js` file
- Remove all the code except the requires
- Create a new function call `updateAgeAndCount` that will be `async` and receive an `id` and `age`

    `const updateAgeAndCount = async (id, age) => {}`

- Inside of the newly created function; create a constant call `user` that its value will be the result of the `findByIdAndUpdate` method of the `User` model sending the `id` as a parameter and the `age`(This value that will update the user). Remember that the `findByIdAndUpdate` is a `promise` so you will need to use the `await` operator before you call it

    ```js
    const updateAgeAndCount = async (id, age) => {
        const user = await User.findByIdAndUpdate(id, { age });
    }
    ```

    Since we have the variable `age` with the same name as the property `age` of the `user` we can use the shorthand syntax

- Now create a new constant call `count` that its value will be the `countDocuments` of the `User` model and will have the `age` as a parameter

    ```js
    const updateAgeAndCount = async (id, age) => {
        const user = await User.findByIdAndUpdate(id, { age });
        const count = await User.countDocuments({ age });
    }
    ```

- Return the `count`

    ```js
    const updateAgeAndCount = async (id, age) => {
        const user = await User.findByIdAndUpdate(id, { age });
        const count = await User.countDocuments({ age });
        return count;
    }
    ```

- Then; get to your terminal and start the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Now go to `Robo 3T`
- Grab a `user id`
- Get back to the `promise-chaining.js` file
- Call the `updateAgeAndCount` function sending the `id` that you just grab from `Robo 3T` and an `age` that you want to update; we are going to use `2` but you can use another value

    `updateAgeAndCount(':id', 2);`

- Call the `then`(will receive `count` as a parameter and will log that value) and `catch`(log the error) methods

    ```js
    updateAgeAndCount(':id', 2).then((count) => {
    console.log(count);
    }).catch((e) => {
        console.log(e);
    });
    ```

- Get to another tab of your terminal and go to the `task-manager/playground` directory
- Run the `promise-chaining.js` script using: `node promise-chaining.js`
- You should see the `count` of `user` with the `age` that you update(Confirm with `Robo 3T`)

Next; we can continue with the other `promise-chaining` file.

- Go to the `promise-chaining-2.js` file
- Remove all the code except the requires
- Create a new function called `deleteTaskAndCount` that will be `async` and will receive an `id`

    `const deleteTaskAndCount = async (id) => {}`

- Inside of the newly created function; create a new constant call `task` and it value will be the result of the `findByIdAndDelete` method of the `Task` model sending the `id` as a parameter

    ```js
    const deleteTaskAndCount = async (id) => {
        const task = await Task.findByIdAndDelete(id);
    }
    ```

- Then; create a new constant call `count` that it value will be the `countDocuments` method of the `Task` model and it will `count` the `task` that is not `completed`

    ```js
    const deleteTaskAndCount = async (id) => {
        const task = await Task.findByIdAndDelete(id);
        const count = await Task.countDocuments({ completed: false });
    }
    ```

- Return `count`

    ```js
    const deleteTaskAndCount = async (id) => {
        const task = await Task.findByIdAndDelete(id);
        const count = await Task.countDocuments({ completed: false });
        return count;
    }
    ```

- Now go to `Robo 3T` and grab one of the `task id`
- Get back to the `promise-chaining-2.js` file
- Call the `deleteTaskAndCount` function sending the `id` that you just grab also call the `then`(will receive `count` as a parameter and will log that value) and `catch`(log the error) methods

    ```js
    deleteTaskAndCount('62b33c459de37af45b3f03bf').then((count) => {
        console.log(count);
    }).catch((e) => {
        console.log(e);
    });
    ```

- Go to your terminal and run the `promise-chaining-2.js` file
- You will see the `count` of the `task` that is not `completed`

You'll notice that on both files we have the `user` update and the `task` deleted but don't use those values so you can instead of creating the constant just call the function(with the `await` operator) like this:

`await Task.findByIdAndDelete(id);`

Will have the same result as we have before but we store the value in case we need it.

## Integrating Async/Await

Now we know about `async/await`; we can implement it into the routes on the `task app`.

- On your editor; go to the `index.js` file on the `task-manager/src` directory
- On the `users post` handler; mark as `async` the function of the handler

    `app.post('/users', async (req, res) => {...});`

    As you recall `async` will change the behavior of the function in which the function pass to return a `promise` and `express` at no point use the return value of the function so adding the `async` operator won't affect the behavior that we have before

- Remove the `save` method call and all code related
- Now use `await` to call the `save` method of `user`

    ```js
    app.post('/users', async (req, res) => {
    const user = new User(req.body);

    await user.save();
    });
    ```

At this point, anything that we added after the `save` function will only run if the `promise` is fulfilled but when there is a `rejection` the execution will stop. To handle the `rejection` case we will use a `try/catch` block so we can send a response on that case.

- Add a `try/catch` block and put the `save` method call inside of the `try` block

    ```js
    app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
    } catch (e) {}
    });
    ```

- Now we can send a response after the `save` method call so send a `201` status response with the `user`

    ```js
    app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {}
    });
    ```

- Then send a `500` status in case of an error

    ```js
    app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
    });
    ```

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On another tab of your terminal; go to the `task-manager` directory
- Run your local server using: `npm run dev`
- Go to `postman`
- On the `Task App` collection; click on the `Create User`
- Add valid data on the `body`
- Send the request
- A `user` should be created
- Get back to the `index.js` file
- Now on the `users` get handler to remove all code inside of the function
- Mark as `async` the handler function

    `app.get('/users', async (req, res) => {});`

- Inside of the function; add a `try/catch` block

    ```js
    app.get('/users', async (req, res) => {
        try {
        } catch (e) {}
    });
    ```

- On the `try` block; create a `user` constant that it value will be the result of the `find` method of the `User` model with an empty object parameter

    ```js
    app.get('/users', async (req, res) => {
        try {
            const user = await User.find({});
        } catch (e) {}
    });
    ```

- Send the `user` after the `find` method call

    ```js
    app.get('/users', async (req, res) => {
        try {
            const user = await User.find({});
            res.send(user);
        } catch (e) {}
    });
    ```

- Now send a `500` status in case of an error

    ```js
    app.get('/users', async (req, res) => {
        try {
            const user = await User.find({});
            res.send(user);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Go to `postman`
- Click on the `read users` request on the `task app` collection
- Send the request
- You should see the response with all `users`

The other routes follow the same process that we just did:

```js
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async  (req, res) => {
    try {
        const task = await Task.find({});
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});
```

Test on `postman` each route that you update here.

## Resource Updating Endpoints

We can continue with the creation of the endpoint at this time we are going to work with the `update` endpoints for `users` and `tasks`.

- On your editor; go to the `task-manager/src` directory
- In the `index.js` file; below the last `user` endpoint; add a new handler that has the `/user/:id` path to receive an `id` and an `async` function. Use `patch` as the `HTTP` method

    `app.patch('/users/:id', async (req, res) => {});`

    The `patch` method is used to `update` existing resources

- Add a `try/catch` block

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
        } catch (e) {}
    });
    ```

Now we will use the `findByIdAndUpdate` to `update` an existing `user` and get back the document that we change

- Inside of the `try` block; create a constant call `user` that it value will be the result of the `findByIdAndUpdate` method of the `User` modal

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate();
        } catch (e) {}
    });
    ```

- Now we will need to send an `id` as the same parameter and the `id` is present on the `params` that we send on the request

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id);
        } catch (e) {}
    });
    ```

- As a second parameter of the `findByIdAndUpdate` method we will need the things that we are going to `update` on the `user` and we will have those things on the `body` of the request

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
        } catch (e) {}
    });
    ```

- We going to send a 3rd parameter to the `findByIdAndUpdate` that will be an `option object`. Check the following:

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        } catch (e) {}
    });
    ```

    - `new: true`: This is going to return the new `user` instead of the original one before the `update`
    - `runValidators: true`: This is going to make sure that we run `validations` for the object that we send. This `validation` is set in the model

At this point we can have 3 scenarios:

- The `update` going well
- The `update` going poorly
- There was no `user` with that `id`

We need to make sure that we handle all 3 of these scenarios and the first one will be the no `user` found.

- Below the `user` constant definition; add a condition that returns a `404` status if the `user` constant doesn't have any values

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!user) {
                return res.status(404).send();
            }
        } catch (e) {}
    });
    ```

- Then return the `user` if we successfully `update` the `user`

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        } catch (e) {}
    });
    ```

- Now in case of any errors returns a `400` error sending the `error` in case there are a `validation` errors

    ```js
    app.patch('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    ```

    Could be another type of error like the `500` errors where we weren't able to connect with the database but we will handle it later

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of your terminal; go to the `task-manager` directory and run your local server using: `npm run dev`
- Go to `postman`
- Right-click on the `task app` collection
- Click on `Add request`
- Add a name to the request like `update user`
- Change the `HTTP` method to `PATCH`
- Get to the `read users` request tab and send a request
- You should have a response with all `users`
- Grab one of the `id`
- Get back to the `update user` tab
- Add the `URL`: http://localhost:3000/users/:id
- Substitute `:id` with the `id` that you just grab from the `read users` tab
- Now click on the `body` tab
- Check the `raw` options
- Switch from `TEXT` to `JSON`
- On the `body` section add a valid `JSON` with a property of the `user` that you want to `update` like this:

    ```json
    {
        "name": "Test testing"
    }
    ```

- Click send
- You should receive a response with the `user` with the `updated` data
- Now change one of the numbers of the `id` to another
- Click send
- You should receive a `404` status
- Get back to the same `id` as before
- Send an empty object on the `body`
- Click send
- You should receive a `400` status with the `validation` error
- Now on the `JSON body` send a new property that doesn't exist on the `user` model like

    ```json
    {
        "height": 72
    }
    ```

- Click send
- You will receive the `user` data without any change and a `200` status

This last thing happens because all the properties that don't exist are completely ignored by `mongoose`. We also have a `200` status error and this will be confusing because we actually don't `update` anything so we will need to set a new response and a message that represents that error.

- Get to the `index.js` file
- On the `user patch` handler; create a new constant call `allowedUpdates` at the top that its value will be an `array` of the `allow` properties that the `user` can `update`

    ```js
    app.patch('/users/:id', async (req, res) => {
        const allowedUpdates = ['name', 'email', 'password', 'age'];

        try {...}
        catch (e) {...}
    });
    ```

Now we will need to know what the `user` is trying to `update` and we already have that information on the `req.body` but we only need the `key` so we will use the `Object.key` method in other of obtaining each `key` that the `user` send.

- At the top of the handler; create a new constant call `updates` and its value will be the `Object.keys` result sending the `req.body` as a parameter


    ```js
    app.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];

        try {...}
        catch (e) {...}
    });
    ```

- Then we will need to test every `key` on the `update` constant against the `allowedUpdates` so we will need that every `string` on the `updates` constant is on the `allowedUpdates`. For this, we will use the `every` method that receives a callback function(Create a constant call `isValid` to store the value of the `every` method)

    ```js
    app.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => {});

        try {...}
        catch (e) {...}
    });
    ```

    The `every` method run the `callback` function for `every` item on the `updates` array

- Now use `include` in the `allowedUpdates` array to see that every update is on that array

    ```js
    app.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        try {...}
        catch (e) {...}
    });
    ```

- Below the `isValid` definition; add a condition that checks if `isValid` is `false` and if this is the case send a `400` error with a message that represents that they are trying to do an invalid update

    ```js
    app.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: "Invalid updates!" })
        }

        try {...}
        catch (e) {...}
    });
    ```

- Go to `postman` and send the invalid `JSON`
- You should see a `400` status and the error message that you just set

Now we can follow the process with the `tasks`!!

- Below the last `task` endpoint; add a new endpoint that uses the `patch HTTP method that receives the `/user/:id` path and an `async` function

    `app.patch('/tasks/:id', async (req, res) => {});`

- Add the same process to `validate` that we are receiving a valid property to update

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }
    });
    ```

- Now add a `try/catch` block

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
        } catch (e) {}
    });
    ```

- On the `try` block; create a new constant call `task` and its value will be the result of the `findByIdAndUpdate` method of the `Task` model receiving the `id`, `body`, and the `options object` as parameters

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        } catch (e) {}
    });
    ```

- Add a condition that sends a `404` status if `task` is empty

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!task) {
                return res.status(404).send();
            }
        } catch (e) {}
    });
    ```

- Then send the `task` if we have a successful `update`

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {}
    });
    ```

- Finally, send a `400` status with a message in case of an error

    ```js
    app.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!task) {
               return res.status(404).send();
            }

            res.send(task);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    ```

- Test on `postman` the different cases for this new endpoint

## Resource deleting endpoints

At this moment we can work with another `resource` in this case the `delete` endpoints for the `users` and `tasks`. Let's get into it!!

- On your editor; go to the `index.js` file in the `task-manager/src` directory
- Below the last `users` endpoint; add a new handler for a `delete` endpoint that has a `/user/:id` path and an `async` function

    `app.delete('/users/:id', async (req, res) => {});`

- Inside of the `delete` function; add a `try/catch` block

    ```js
    app.delete('/users/:id', async (req, res) => {
        try {
        } catch (e) {}
    });
    ```

- On the `try` block; create a new constant call `user` that it value will be the result of the `findByIdAndDelete` of the `User` model sending the `id` that came from the request as a parameter

    ```js
    app.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
        } catch (e) {}
    });
    ```

- Now add a condition that check if the `user` don't have any value and if it don't have a value send a `404` status

    ```js
    app.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if(!user) {
                res.status(404).send();
            }
        } catch (e) {}
    });
    ```

- If there is a `deleted` user; send the `user` data as a response

    ```js
    app.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if(!user) {
                res.status(404).send();
            }

            res.send(user);
        } catch (e) {}
    });
    ```

- Finally; send a `500` status in case of an error

    ```js
    app.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if(!user) {
                res.status(404).send();
            }

            res.send(user);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of the terminal; run your local server using: `npm run dev`
- Go to `postman`
- Right-click on the `task app` collection
- Click on `Add request`
- Put a name to the request like `delete user`
- Change the `HTTP` method to `DELETE`
- Get to the `get users` request and send a request
- Grab one of the `id` of the `users`
- Get back to the `delete user` tab
- Add the `URL` of the request: http://localhost:3000/users/:id
- Change `:id` to the `id` that you just grab it
- Send the request
- You should see the response with the data of the `user` that you just `deleted` it
- Send the request again
- You should see a `404` status on the response
- Now get back to the `index.js` file
- Follow the same process to add a new `task delete` endpoint

    ```js
    app.delete('/tasks/:id', async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Go to `postman` and test the endpoint

## Separate Route files

As you can see the `index.js` file has all `routes` of the app and in the future, we will add some more to this file so it will continue growing and will be a little bit difficult to track the code of this file; for this reason, we will separate the `routes` in it own file that represent each context in other words files that represent `users` and `tasks` for the app. Before we begin the process of separating the file we will need to see some basic `express route` syntax that will help us with this code separation.

- On your editor; go to the `index.js` file on the `task-manager/src` directory
- Below the `app.use(express.json());` line; create a new constant call `router`

    `const router;`

- Add the value of the `router` constant using a new instance of `express.Router()`

    `const router = new express.Router();`

    Now the `router` constant will have access to the same `HTTP` methods like `get` or `post` that we used before with `app`

-  Use `router` to create a new endpoint for `/test` that uses the `get HTTP` method and sends a message to response(Below the `router` definition)

    ```js
    router.get('/test', (req, res) => {
        res.send('This is from my other router');
    });
    ```

By default; this `router` is not used at all because we still need to register it to work with the `express` application.

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of your terminal; get to the `task-manager` directory and run your local server using: `npm run dev`
- Go to your browser
- Get to http://localhost:3000/test
- You will seed an `error`
- Get back to the `index.js` file
- Below the `/test` handler; register the `router` handler sending it as a parameter to the `use` method of `app`

    `app.use(router);`

- Save the file
- Get to the browser and refresh the page
- You should see the message of the `test` handler

This is the structure that we are going to follow when we separate the `routes`.

- Get to your editor and create a new folder called `routers` on the `task-manager/src` directory
- Inside the newly created folder add a new file called `user.js`
- Require `express`

    `const express = require('express');`

- Create a new `router` instance like the one we did before

    `const router = new express.Router();`

- Add a new `/test` endpoint that uses the `get http` method and responds with a message

    ```js
    router.get('/test', (req, res) => {
        res.send('From a new file');
    });
    ```

- Exports the `router` at the end of the file

    `module.exports = router;`

- Go to the `index.js` file
- Remove the `router` example complete
- Require the `router` from the `routers/user.js` file

    `const userRouter = require('./routers/user');`

    Since we will have more than one `router` we change the name of the constant to one that represents its purpose

- Below the `app.use(express.json());` line; register the `userRouter`

    `app.use(userRouter);`

- Save the files
- Go to your browser and refresh the page
- You should see the message that you send from the `user.js` file

Now that we register a `route` from another file we can move all the code related to the `users routes` to the new file.

- Get to the `index.js` file
- Cut all the `routes` related to the `users`
- Get to the `routers/user.js` file
- Before the export; paste all `users routes` that you cut before
- Then change `app` to `router` in each endpoint like this

    `router.post('/users', async (req, res) => {...});`

- Finally; below the `express` require to call the `User` model

    `const User = require('../models/user');`

- Remove the `test` endpoint
- Save the files
- Go to `postman` and test every `user endpoint`
- You should have the same results as before

Now we will do the same process with the `task routes`

- Go to the `index.js` file and cut all `task routes`
- On the `routers` directory; create a new file called `task.js`
- Require `express` and the `Task` model

    ```js
    const express = require('express');
    const Task = require('../models/task');
    ```

- Create a new `router` instance

    `const router = new express.Router();`

- Below `router`; paste all `task routes`
- Change `app` to `router` on all `routes` like

    `router.post('/tasks', async (req, res) => {...});`
- At the end of the file; export `router`

    `module.exports = router;`

- Go to the `index.js` file
- Remove both models require
- Below of the `userRouter`; require the `task routes`

    `const taskRouter = require('./routers/task');`
- Register the `taskRouter` below the `userRouter`

    `app.use(taskRouter);`

- Save the files
- Go to `postman` and test all the `task endpoints`
- You should have the same result as before

Now we are finally finished with the basics of a `REST API` so we can continue with more advanced stuff that will help us to build our app.
