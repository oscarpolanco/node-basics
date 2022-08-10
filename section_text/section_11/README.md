# Section 11: API Authentication and Security (Task App)

In this section, we are going to lock all the data for the `task-manager app`. At this moment all the app endpoints are publicly accessible this means that anyone can access any of that endpoints and do something like `delete` every single piece of data in the database and to prevent this we will work with `authentication` means that every `user` will need to `sign up` and `login` before that they can do something. By forcing the `users` to `log in` we can create a relationship between the `user` and a `task` that they create so we will have that `user 1` can't `see` or `delete` a `task` from `user 2`.

## Securely storing password

At this moment we take the `password` from the `user` exactly as was typed so you can check it out on the database using `Robo 3T`; this is called storing the `password` in `plain text` and for it is a terrible idea because if our database is hacked the hackers will have direct access to the `passwords` of every `user` so the solution is to store a `hash password`. When we have a `hash password` an algorithm will be used to convert the `password` typed and that algorithm will not reversible so if someone has the access they can't do anything with that data. We will use a `bcrypt` algorithm and as you may think there is a [npm package](https://www.npmjs.com/package/bcryptjs) that will help us to implement this. Let's go ahead and install `bcrypt` and use it.

- Get to your terminal and go to the `task-manager` directory
- Install `bcrypt` using: `npm install bcryptjs`
- On your editor; get to the `index.js` file
- At the bottom require `bcrypt`(We will use the require at the bottom of the file just to do an example)
- Create a new function called `myFunction` that will be `async` and call it before its definition

    ```js
    const myFunction = async () => {}
    myFunction();
    ```

    We use `async` because the function of `bcrypt` is `asynchronous`

- Now create a constant call `password` inside of `myFunction` with a test `plain text password`

    ```js
    const myFunction = async () => {
        const password = 'test12345';
    }
    ```

- Create another constant call `hashedPassword` that its value will be the `hash` function of `bcrypt`; since this function return a `promise` you should use `await` before calling it

    ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash();
    }
    ```

- Send the `password` to the `hash` function and the number `8`

    ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash(password, 8);
    }
    ```

    The second argument determining the number of rounds that the `hashing` algorithm is executed and is recommended by the original creators of the algorithm to use `8` rounds because too few rounds will be easy to crack and too many will take a lot of time and our app became useless

- Now log the `password` and `hashedPassword`

    ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(password);
        console.log(hashedPassword);
    }
    ```

- On your terminal; run the `index.js` file using: `npm run dev`
- You should see the `password` and its `hash` version

The `hash` version will be the one that we end up storing in our database but before continuing we need to make a distinction between the `hashing` algorithm and the `encryption` algorithm. With `encryption` we can get the original value back for example:

`test -> jioejojoejojd -> test`

The `hash` algorithm is one way so we can't revert the process so there is no way to have the first version back and this is by design.

`test -> jioejojoejojd`

You may ask how we will know that the `password` is correct after we store it in the database; all we need to do is take the `plain text password` that the `user` send us to `log in` and use the algorithm on it and compare it to the one that we have on our database that should be the same.

- Get back to the `index.js` file
- Create a new constant call `isMatch` and its value will be the `compare` method of `bcrypt`; since the function return a `promise` you will need to use `await`

     ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(password);
        console.log(hashedPassword);

        const isMatch = await bcrypt.compare();
    }
    ```

- Send the `password` as its first argument(The same that you use on the `password` constant) and the `hashedPassword` as the second(This will represent the `password` that we store on our database)

     ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(password);
        console.log(hashedPassword);

        const isMatch = await bcrypt.compare('test12345', hashedPassword);
    }
    ```

- Now log `isMatch`

     ```js
    const myFunction = async () => {
        const password = 'test12345';
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log(password);
        console.log(hashedPassword);

        const isMatch = await bcrypt.compare('test12345', hashedPassword);
        console.log(isMatch);
    }
    ```

- Save the file
- Go to the terminal and you should see `true` at the end of the logs that represent that the `password` is correct

Now that we see an example of `bcrypt` we can implement it into the `task-manager` app. There are some places that we will use the `password hash` that is on the `routes` on the `post` and `patch` endpoint. To use `bcrypt` on a specific place of our app we will need what is called [middleware](https://mongoosejs.com/docs/middleware.html) which is a code that will run in a specific time after o before an operation like saving a document.

Before implementing a `middleware` we will need to do a little of restructure on our `models` because as is at the moment we don't have access to some features of `mongoose`. When we use the `model` method; as you can see on the `task-manager/models/user.js` we send an object with all `fields` and its `validations` as a second argument and behind the scenes `mongoose` turn this object into a [schema](https://mongoosejs.com/docs/guide.html) so in order to take advantage of the `middleware`, we will need to define the `schema` first then send it to the `model` method.

- On your editor; go to the `task-manager/models/user.js` file
- Below the `validator` require; create a new constant call `userSchema` that will have a new instance of `Schema` that came from the `mongoose` object

    `const userSchema = new mongoose.Schema();`

- Now cut the complete object that we send as a second argument of the `model` method
- Paste is as an argument on `Schema`

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...}
    });
    ```

- Then send as a second argument of the `model` method the `userSchema`

    `const User = mongoose.model('User', userSchema);`

Now we have access to the methods that are part of the `mongoose middleware`; there are 2 methods that we can use this moment:

- `pre`: To do something before an `event`
- `post`: To do something after an `event`

In our case, we will need to run a function before the `save` process so we will need to use the `pre` method.

- Below the `userSchema`; call the `pre` method sending to arguments: `save` string and a standart function

    ```js
    userSchema.pre('save', function() {}):
    ```

    The first argument of `pre` is the `event` that we want the function to run; in this case before the event takes place, and we will need to use a standard function because the `this` binding play an important role and the `arrow` functions don't bind `this`

-  Since the `bcrypt` are `asynchronous` you will need to use `async` on the function

    ```js
    userSchema.pre('save', async function() {}):
    ```

- The function will receive an `argument` call `next`(We will talk about it in a moment)

    ```js
    userSchema.pre('save', async function(next) {}):
    ```

- Inside of the function; we have access to the `this` binding and it contains the `document` that we are `saving` so we are going to store it in a new constant call `user`

    ```js
    userSchema.pre('save', async function(next) {
        const user = this;
    }):
    ```

- Now log a message to test the function

    ```js
    userSchema.pre('save', async function(next) {
        const user = this;
        console.log('just before saving!');
    }):
    ```

Before continuing we will talk a little bit about the `next` argument. The purpose of this `middleware` is to run before we `save` a document but how it will know that we finish running our code? You could say that it will know when the function is over but this doesn't take into consideration the `asynchronous` process so why `next` is provided. To finish the execution we will need to call `next` at the end of the function.

- At the end of the function call `next`

    ```js
    userSchema.pre('save', async function(next) {
        const user = this;
        console.log('just before saving!');
        next();
    }):
    ```

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of your terminal; go to the `task-manager` directory and run the local server using: `npm run dev`
- Go to `postman`
- Get to the `create user` request tab
- Create a new valid `user`
- You should have the response with the `user` data
- Get to the local server tab on your terminal and you should see the log message send from the `middleware`

At this moment things are not going to work when we `update` a `user`. Let's try it

- Go to `postman` and grab the `id` of the `user` that you just created
- Get to the `update user` request tab
- Update something of that `user` and send the request
- Go to the local server tab on your terminal
- You should not see the log message send from the `middleware`

On the `routers/user.js`; in the `patch` request you will see that we use `findByIdAndUpdate` and this method bypass `mongoose` and perform a direct operation on the database that is why we need to set a special option to run the `validators` so we will need to do a little refactoring of this code.

- Get to the `user.js` file on the `routers` directory
- In the `patch` endpoint; remove the `user` constant definition
- Then create a new constant call `user` that has as its value the `findById` method sending the `id` that we receive on the request

    ```js
    router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const user = await User.findById(req.params.id);

            if (!user) {...}

            res.send(user);
        } catch (e) {...}
    });
    ```

We will need to `update` the `user` files with the ones that came on the `body` of the request and the `user` can send any combination of `updates fields` every time so we will need to use the `updates` constant for this

- Below the `user` constant; call the `forEach` method from `updates`

    ```js
    router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => {});
            if (!user) {...}

            res.send(user);
        } catch (e) {...}
    });
    ```

- Now use bracket notation to add and call the correct property for the `user` and the `res.body` then return the value

    ```js
    router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => user[update] = req.body[update]);
            if (!user) {...}

            res.send(user);
        } catch (e) {...}
    });
    ```

- Finally; `save` the `user`

    ```js
    router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();

            if (!user) {...}

            res.send(user);
        } catch (e) {...}
    });
    ```

- Save the file
- Get to `postman` and send the `update user` request; updating a value
- Go to the local server tab on the terminal and you should see the `middleware` message

At this moment we can begin to work with `bcrypt` but first, we need to mention that we will need to `hash` the `password` if it is not already `hashed` before and `mongoose` will help us with a method called `isModified` that will be `true` when the `user` first create the `password` or the `user` modify its data and the `password` was one of the modifications

- Go to the `models/user.js`
- Below the `user` constant on the `middleware`; add a condition that uses the `isModified` method of `user` to know if the `password` change and remove the log

    ```js
    userSchema.pre('save', async function(next) {
        const user = this;

        if (user.isModified('password')) {}

        next();
    }):
    ```

- Inside of the new condition call the `hash` function of `bcrypt` sending the `user.password` and 8 rounds then store the hash version on the same `password` property

    ```js
    userSchema.pre('save', async function(next) {
        const user = this;

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }

        next();
    }):
    ```

- Save the file
- Go to `postman`
- Get to the `create user` request and create a new `user`
- You will see on the response the `hash password`
- Get to the `update user` request and `update` the `password` of a `user`
- You will get the `user` data with the new `hash password`

For the moment we are sending the `password` on the response but in the future, we will remove it. Before we continue; we need to change the `patch` request on the `task` routes.

- Go to the `router/task.js` file
- Get to the `patch` request
- remove the value of the `task` constant
- Add the `findById` method as we did with the `user` before

    ```js
    router.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const task = await Task.findById(req.params.id);

            if (!task) {...}

            res.send(task);
        } catch (e) {...}
    });
    ```

- Use the `updates` constant to add the new data to `user` and `save` it

    ```js
    router.patch('/tasks/:id', async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {...}

        try {
            const task = await Task.findById(req.params.id);

            updates.forEach((update) => task[update] = req.body[update]);
            await task.save();

            if (!task) {...}

            res.send(task);
        } catch (e) {...}
    });
    ```

- Get to `postman` and test the `update task` request
- Should work normally

## Logging in Users

Here we will provide the `user` with a new endpoint that will allow to `login`. This endpoint will receive the credential(`email` and `password`) and will verify that a `user` exits with those credentials. On this endpoint we won't do all the code that we will need; we will add a reusable function on the `user model` in order to help us with this.

- On your editor; go to the `task-manager/routers` directory
- In the `user.js` file; below the `users post` request; create a new `post` endpoint with a `/users/login` path and a `async` function

    ```js
    router.post('/users/login', async (req, res) => {});
    ```

Now we will need to define a new function that finds a `user` by the `email` and compare the `password` and that function will live on the `user model` file. To do this `mongoose` provide us a way to add function to the `model` instance so we can call it whenever we have an instance of the `user model`.

- Go to the `models/user.js` file
- Below the `userSchema` definition; call the `statics` property of the `userSchema` and call the function that you will create (In other words call the new method name) and its value will be an `async` function

    `userSchema.statics.findByCredentials = async () => {}`

- The function will receive an `email` and `password`

    `userSchema.statics.findByCredentials = async (email, password) => {}`

Now we will need to search the `user` by its `email` not the `email` and `password` just it `email` because we have the `plain text password` and we just `save` the `hash` version.

- Create a new constant call `user` that its value will be the result of `findOne` of `User` and as search criteria send the `email`

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        const user =  await User.findOne({ email });
    }
    ```

- Now if we don't have a `user` we will throw an `error` with a condition

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        const user =  await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login');
        }
    }
    ```

- Then we can compare if the `password` that we get is the same as the one that we store on the database using the `compare` function of `bcrypt` so create a new constant that will be called `isMatch` and the `compare` function will give it value 

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        const user =  await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
    }
    ```

- If there is no match with the `password`; we will throw another `error` with a condition

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        const user =  await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Unable to login');
        }
    }
    ```

- Finally; if everything goes as expected return the `user` data

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        const user =  await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Unable to login');
        }

        return user;
    }
    ```

    We need that the `error` messages don't give too much information to the end `user` that is why we use the same message for both errors

- Get back to the `routers/user.js` file
- In the `login` route; add a `try/catch` block

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        try {
        } catch (e) {

        }
    }
    ```
- On the `try` block; add a new constant call `user` that its value will be the new `findByCredentials` from the `User` model and send the `email` and `password` of the request as its credentials

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
        } catch (e) {

        }
    }
    ```

- For the moment if everything is ok with `findByCredentials` we send the `user` data

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            res.send(user);
        } catch (e) {

        }
    }
    ```

- In case there is an `error` with `findByCredentials` send a `400` status

    ```js
    userSchema.statics.findByCredentials = async (email, password) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            res.send(user);
        } catch (e) {
            res.status(400).send();
        }
    }
    ```

At this moment we will have an issue because more than one `user` can have the same `email` as another so we will need to restrict the `email`. Let's fix that.

- On the `models/user.js` file
- On the `email` field of the `userSchema`; add the `unique` property with a `true` value

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {...}
        },
        password: {...},
        age: {...}
    });
    ```

The `unique` property will create an `index` in the database to guarantee uniqueness but in other this to work we will need to drop our database so from that moment every `email` of the `user` will have it unique `index`.

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Get to `Robo 3T`
- Right-click on the `task-manager` database
- Click on `drop database`
- In another tab of your terminal and run your local server using: `npm run dev`(Need to re-run the server in other to create the database again)
- Go to `postman`
- Get to the `create user` request
- Create a new valid `user`
- Now right-click on the `task collection`
- Click on `add request`
- Add a name for the request like `login user`
- Change the `HTTP` method to `POST`
- Add the `URL`: `http://localhost:3000/users/login`
- Click on the `body` tab
- Then choose the `raw` check and choose `JSON` on the dropdown at the end
- On the `body` section; add the `email` and `password` using the same that use on the new `user` that you just created
- Send the request
- You should receive a response with the `user` data
- Mess with the `email` or `password`
- Send the request
- You should see an error on the response

## JSON web token

At this moment we begin with the process of actually `login` process that will allow the `user` to do certain actions. At this moment all routes of the application will be in one of 2 categories:

- Public; accessible to anyone
- Private; accessible for `logged-in users`

The only 2 routes that will be public will be the `sign up` and `login` routes; everything else will require you to be authenticated. To do this last part we will need that the `login` endpoint sends an `authentication token` and this is something that the `user` will use to make requests that require that you be `authenticated`. To work with `authentication` we will use a `JSON web token`(JWT) that will help us to work with all features that we need to work with `authentication`. To work with `JWT` we will use the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) library. Like we did with `bcrypt` let's do an example.

- On your terminal; go to the `task-manage` directory
- Install `jsonwebtoken` using: `npm install jsonwebtoken`
- Go to the `task-manage/index.js` file
- Remove the `bcrypt` require
- At the line that was the `bcrypt` require; add a `jsonwebtoken` require

    `const jwt = require('jsonwebtoken');`

- Remove all content of `myFunction`
- Inside of `myFunction`; create a new constant call `token` that its value will be the `sing` method of `jwt`

    ```js
    const myFunction = async () => {
        const token = jwt.sign();
    }
    ```

- Send the following as the first argument of the `sign` method

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' });
    }
    ```

    The first argument of the `sign` method is the data that will be embedded on the `token` here we will put a unique identifier that will identify each `user` like the `_id` in this case we will use a fake `id` and later we will use the `user id` from our database

- Now add a `string` with a random set of characters as a second argument

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret');
    }
    ```

    This will be a `secret` that will be used to `sign` the `token` to make sure that the `token` is not altered in any way. You can provide any series of characters

- Log the `token` value

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret');
        console.log(token);
    }
    ```

- On your terminal; run your local server using: `npm run dev`
- You will see a long set of characters and that is the `jwt`

The `jwt` is made of 3 parts separated by dots; the first part is a `base64` encoded `string` that represents the `header` that contains some meta-information about what type of `token` it is like this `token` is `jwt` and the algorithm used to generate. The second piece represents the `payload` or `body` that is another `base64 string` that contains the data that we provide in this case the `_id`. The last part is the `signature` that is used to verify the `token`.

The purpose of the `jwt` is not to hide data actually anyone with access to the `token` will have the data; the goal is to create data that we can verify via `signature`.

- Copy the middle value of the `toke`(The one that is between the 2 dots)
- On your browser go to https://www.base64decode.org/
- Paste the value that you just grab in the first input
- Click on the `decode` button
- You should see the value of your `_id` with another value like this

    `{"_id":"test","iat":1656980915}`

    `iat` stands for `issue at` and have as its value a `timestand` when the `token` is created

Now we are going to `verify` the `token` using other of the `jwt` and the `token` that we just created

- Get back to the `index.js` file
- Below the log; create a new constant call `data` that it value will be the `verify` method result of `jwt`

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret');
        console.log(token);

        const data = jwt.verify();
    }
    ```

- Send the `token` and the `secret` that you use on the `sign` method as the first and second argument of the `verify` method

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret');
        console.log(token);

        const data = jwt.verify(token, 'thisismysecret');
    }
    ```

- Log data

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret');
        console.log(token);

        const data = jwt.verify(token, 'thisismysecret');
        console.log(data);
    }
    ```

    Later we will put the `secret` on environment variables so it will not be saved on your code

- Save the file
- You will see the `token` then the data that you added on the `token` creation
- Change the `secret` on the `verify` method
- Save the file
- On your terminal, you'll see an error
- Go and fix the `verify secret` again
- Save the file

Now we can work with the `token` expiration

- On the `sign` method; send a third argument that will be an object with the `expiresIn` and the following value

    ```js
    const myFunction = async () => {
        const token = jwt.sign({ _id: 'test' }, 'thisismysecret', { expiresIn: '0 seconds' });
        console.log(token);

        const data = jwt.verify(token, 'thisismysecret');
        console.log(data);
    }
    ```

    We can provide as a `string` the amount of time time to expire the `token` like `2 weeks`; `7 days` or in our case `0 seconds` to expire the `token` immediately

- Save the file
- On your terminal, you should see an `error` because the `token` is already expired
- Change the `expiresIn` to a more reasonable time like `7 days`
- Save the file
- On your terminal, you should see the `token`

## Generating authentication tokens

At this moment we can begin to work with the `login` and `sign in` endpoints where we will create the `token` and send it back to the `user`. Since we will work on more than one endpoint we don't actually want to write the code on the endpoints so we will create a function that we can re-use on another file.

- On your editor; go to the `task-manager/src/models` directory
- In the `user.js` file; below the `userSchema` definition; call the `methods` property of the `userSchema`

    `userSchema.methods`

- Then call the method that you will be creating on the `methods` property in our case will be called `generateAuthToken` and will be an `async standard` function

    `userSchema.methods.generateAuthToken = async function() {}`

    The difference between the `methods` and `static` property is that `methods` the function that you set will be available on the `model instances` and `static` will be accessible on the `model`

- Inside of the new function; create a constant call `user` that it value will be the `this` binding

    ```js
    userSchema.methods.generateAuthToken = async function() {
        const user = this;
    }
    ```

    Like we did before on the `pre` method we use a standard function because of the `this` binding and as you see we will have the `user` available there

- Now require `jsonwebtoken` at the top

    `const jwt = require('jsonwebtoken');`

- Get back to the `generateAuthToken` and create a new constant call `token` that its value will be the result of the `sign` method of `jwt` sending the `user id` and the `secret` as a parameter

    ```js
    userSchema.methods.generateAuthToken = async function() {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, 'thisisthesecret');
    }
    ```

    Since the `_id` of the `user` is an `objectID` we will need to convert it to a `string` because `sign` receives `string` values

- Return the token

    ```js
    userSchema.methods.generateAuthToken = async function() {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, 'thisisthesecret');

        return token;
    }
    ```

- Go to the `routers/user.js` file
- On the `login` endpoint; create a new constant call `token` that its value will be the result of calling the `generateAuthToken` of the `user` instance

    ```js
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();

            res.send(user);
        } catch (e) {
            res.status(400).send();
        }
    });
    ```

- Then we will send on the response the `token` with the `user` data in an object

    ```js
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();

            res.send({ user, token });
        } catch (e) {
            res.status(400).send();
        }
    });
    ```

- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of the terminal; go to the `task-manager` directory and run your local server using: `npm run dev`
- Now go to `postman`
- Get to the `login` request tab
- Send the request to `log in` a `user`
- You should receive the `user` data and `token` as a response

One thing you can notice is that we are not keeping track of the `token` on the app and this is important because the `users` have the ability to `logout` and as long the `token` exist they are `logged in` on the app so if the `token` fall in the wrong hands the `user` will not able to invalidate the `token`. For this will be tracking the `token` and will allow the `user` to `log in` from multiple devices and be able to `log out` in one and still `login` to the other.

- Get to the `models/user.js`
- On the `userSchema` definition; add a new `field` called `token` and it will be an `array` of `objects`

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{}]
    });
    ```

- Each `token` object will have a property called `token` that will be a `string` and is `required`

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    });
    ```

- Go to the `generateAuthToken` method

Now we will need to add the `token` that we generate to the `user` instance each time they `log in` and as part of the `sign in` process

- Concat the new `token` to the current `tokens` array of the `user`

    ```js
    userSchema.methods.generateAuthToken = async function() {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, 'thisisthesecret');

        user.tokens = user.tokens.concat({ token });

        return token;
    }
    ```

- Save the `user`

    ```js
    userSchema.methods.generateAuthToken = async function() {
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, 'thisisthesecret');

        user.tokens = user.tokens.concat({ token });
        await user.save();

        return token;
    }
    ```

- Save the file
- Go to `postman`
- Send the `login` request
- You should see that the `token` is part of the `user` data

Later we will hide the `password` and the `token` properties from the `user` data in every response.

- Go to `Robo 3t`
- Get to the `users` collection
- Check the `user` data that you just `log in`

You should see the `tokens` property and inside of it; you will see that exists an `_id` and this is because is a `sub document` and for this type, it will add a `_id` automatically.

Now we can do the same with the `sign in`(create `user`) endpoint.

- Get to the `routers/user.js` file
- In the `users post` endpoint; create a new constant call `token` that its value will be the result of the `generateAuthToken` method

    ```js
    router.post('/users', async (req, res) => {
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();

            res.status(201).send(user);
        } catch (e) {...}
    });
    ```
- Send the `token` with the `user` data

    ```js
    router.post('/users', async (req, res) => {
        const user = new User(req.body);

        try {
            await user.save();
            const token = await user.generateAuthToken();

            res.status(201).send({ user, token });
        } catch (e) {...}
    });
    ```

- Save the file
- Go to `postman`
- Go to the `create user` request tab
- Create a `user`
- You should get the `user` data and the `token`

## Express middleware

Now that we send the `token` we can see how we are going to use it for the `authentication` process. Remember that almost all the endpoints of the application will need to be `authenticated` to perform an action except the `login` and `sign up` endpoints and for this, we will use `express middleware`.

Without `middleware`: `new request -> run route handler`

When a request gets into the server the first thing that runs is the `route handler`.

With `middleware`: `new request -> do something -> run route handler`

We add a step between the `new request` and `route handler` and this step is a function that we are going to make that will do something for us. Let's make an example.

- On your editor; go to the `task-manager/src/index.js` file
- Before the first `use` method call; register a new `middleware` calling the `use` method of `app` and sending a function as an argument

    `app.use(() => {});`

- This function will receive `req`, `res`, and `next`

    `app.use((req, res, next) => {});`

    The `req` and `res` arguments contain the same data that we have when we use them in our `route handlers`. The `next` argument is the only `middleware` specific

- Now log the `method` used on the incoming request and the `path`(both available on `req`) in the function

    ```js
    app.use((req, res, next) => {
        console.log(req.method, req.path);
    });
    ```

- Save the file
- On your terminal; begin the `mongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of the terminal; go to the `task-manager` directory and run your local server using: `npm run dev`
- Go to `postman`
- On the `read user` request tab; send a request

    It will be `loading` without any result because we need to explicitly need to set that we want to continue with other operations outside of the `middleware`

- Cancel the request
- Get to the `index.js` file
- On the callback function of the `middleware`; use the `next` method

    ```js
    app.use((req, res, next) => {
        console.log(req.method, req.path);
        next();
    });
    ```

- Save the file
- Get to `postman`
- On the `read user` request tab; send a request
- You should see that you get the correct `response` back

Sometimes you don't want to call the `next` method because you will need to prevent the `handler` to run for example if a `user` is not `authenticated` and target an endpoint that needs to be `authenticated`. Let's do an example where we won't allow the `user` to do a `GET` request but the others can be made.

- On the `index.js` file
- In the callback function of the `middleware`; remove all content
- On that function; add a condition that checks if the `HTTP` method is `GET` and is it not using the `next` method

    ```js
    app.use((req, res, next) => {
        if (req.method === 'GET') {
        } else {
            next();
        }
    });
    ```

- Log a message to say that the `GET` method is disabled

    ```js
    app.use((req, res, next) => {
        if (req.method === 'GET') {
            res.send('GET request are disabled');
        } else {
            next();
        }
    });
    ```

- Save the file
- Get to `postman`
- On the `read user` request tab; send a request
- You should see the message of the disabled `GET`
- Get to the `create user` request tab; make a `user`
- You should see that the `user` was created without any issues

Now we will do a `middleware` to prevent the `user` from do any request to emulate when the site is under maintenance

- Get to the `idex.html` file
- Remove all content of the callback function of the `middleware`
- On that function; send a `503` status with a maintenance message

    ```js
    app.use((req, res, next) => {
        res.status(503).send('The site is under maintenance');
    });
    ```

- Save the file and get to `postman`
- Test with all the requests and you should see the same response for all of then

## Accepting authentication tokens

Now we are going to do a function that will serve as a `middleware` on our application and that function will check if the `user` s `authenticated` or not when we use it on some of the endpoints of the application.

- On your editor; go to the `task-manager/src` directory
- Create a new folder called `middleware`
- Inside of this newly created directory; create a new file called `auth.js`
- In the newly created file; define a function call `auth` that will be `async` and will receive `req`, `res`, and `next`

    `const auth = async (req, res, next) => {}`

- Inside of the `auth` function; log a message and call the `next` method

    ```js
    const auth = async (req, res, next) => {
        console.log('auth middleware');
        next();
    }
    ```

- At the bottom of the file; export the `auth` function

    `module.exports = auth;`

- Now get to the `src/index.js` file
- Remove the `middleware` that we created in the section before

Since we don't want that the `middleware` run for each endpoint we will remove it from the `index` file and will specify where we want to call it.

- Get to the `routers/user.js` file
- Require the `auth` function; before the `router` constant definition

    `const auth = require('../middleware/auth');`

- Get to the `get users` handler

To add a `middleware` to an endpoint we just need to send the function that we want to work as `middleware` on the second parameter before the handler function.

- Add the `auth` function as a second parameter on the `get users` handler

    `router.get('/users', auth, async (req, res) => {...}`

Now when a `user` target this endpoint it will run the `auth` function first then the handler function

- Save the files
- On your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- In another tab of your terminal; get to the `task-manager` directory and run your local server using: `npm run dev`
- Go to `postman`
- Get to the `read users` request tab
- Send the request
- You should see the correct response
- Get to your terminal tab where you run your local server and you should see the `middleware` message

Now let's work with the `auth` function but first let's define the process that the `user` will follow. The first step will be that the `user` will get an `authentication token` from the `login` or `sign in` endpoints then provide it on the request that we are going to perform.

-  Now get to the `login` request tab and send a request
- Grad the `token` that is on the property of the same name
- Go to the `read users` request tab

Now we will provide the `token` when we send the `read users` request and we can add it to the `headers` of the request. The `headers` on a request are `key/value` pairs that we can provide as part of the request and we can have some `headers` back as part of the response.

- Get to the `headers` tab; below the URL of the `read users` request
- On the `key` input add: `Authorization`
- In the `value` input next to the `Authorization key`; add the `Bearer` then the `token` that you copied before(Without quotes)

    `Bearer my_token`

- Now get to the `auth.js` file
- Remove all the content of the function
- At the top of the file; require the `jsonwebtoken` library and the `User` model

    ```js
    const jwt = require('jsonwebtoken');
    const User = require('../models/user');
    ```

- Now on the `auth` function; add a `try/catch` block

    ```js
    const auth = async (req, res, next) => {
        try {
        } catch (e) {}
    }
    ```

- If the request doesn't have a `token` we will set an `error` to trigger the `catch` block sending a `401` status with a message

    ```js
    const auth = async (req, res, next) => {
        try {
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

- Then we will need to get the value of the `token` that we receive with the request to create a `token` constant that its value will be the result of calling the `headers` property of `req` like the following

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization');
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

    We will need to add the `Authorization key` so we get the correct `header` that we need.

- Since we just want the `token` value and it will have `Bearer` at the beginning we will need to eliminate that value using the `replace` method

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

    The `replace` method will change the `Bearer` part of the string for nothing at this case(Make sure that you also add a space after the `Bearer` word) and if the `token` doesn't exist will try to call the `replace` method of `undefined` and that will trigger an `error` that will call the `catch` block

- Now we will need to get the value from the `token` so we will need to use the `jsonwebtoken` library. Create a constant call `decoded` that its value will be the result of calling the `verify` method of `jwt` providing the `token` and the `secret` that we use to create the `token`

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

- Then we can find the `user` on the database since we add the `_id` as the value that we send on the `token`. Create a constant call `user` that its value will be the result of the `findOne` method

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne();
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

- On the search criteria of the `findOne` method we will search for the `_id` and we will make sure that the `token` is part of the `tokens` array

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

    We will make sure that we are on the `tokens` array because at some moment the `user` will have the ability to `logout` and when this happens we will eliminate it from that `array` but the `user` can have multiple sessions and we need to close all of then.

- Then if there is no `user` value; we will `throw an error` because the `token` is not valid

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if(!user) {
                throw new Error();
            }
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

- Now if the code past the condition we will pass to the `route` the `user` and for this, we will add a `user` property on the `req` object

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if(!user) {
                throw new Error();
            }

            req.user = user;
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

    This is because we have the `user` so there is no need that the `route` handler to search for the `user` data again

- Finally; call the `next` method

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if(!user) {
                throw new Error();
            }

            req.user = user;
            next();
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' });
        }
    }
    ```

- Save the file and go to `postman`
- Go to the `read users` request and send the request
- You should see the response with the correct data

Before we move on with other `routes` we will need to address the `read users route handler` that we are using to test the `token` because this `route` is just for testing so we will need to change it in order to continue with the app because it exposes data from other `users`. To change this `route` we will just send the current `user` data as the response to that `route handler`.

- Get to the `routers/user.js` file
- On the `users get` handler; change the `/users` path to `/users/me`

    `router.get('/users/me', auth, async (req, res) => {...}`

- Remove all content of the function of the `users/me` handler
- Send the `user` data(Remember that we add the `user` data on the `middleware`)

    ```js
    router.get('/users/me', auth, async (req, res) => {
        res.send(req.user);
    });
    ```

- Save the file and go to `postman`
- Get to the `read users` request and change its name to `read profile`
- Change the URL to `http://localhost:3000/users/me`
- Send the request
- You should see the information of the current `user`

## Advance Postman

Before continuing with the app we will see some settings in `Postman` that will help us to test our app easily.

The first thing that we are going to see is the `environment variable` on `Postman` that will help us to set a value just one time instead of copying and pasting the actual value where is needed. One example of this is the `localhost` part of the `URL` on each endpoint because we in the near future will deploy our app to `Heroku` and we don't longer need `localhost` so we will need to have `dev` and `prod` requests and that is where the `environment variables` came into action.

- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- Then on another tab and start your local server using `npm run dev`
- Go to `postman`
- Get to the `create users` request tab
- On the right side; click on an `eye` button next to the `No Environment` dropdown
- A popup should show up
- Click on the `add` button on the `Environment` section
- Add the `name` of the new `environment` like `Task Manager API (dev)`(Make sure that you specify that is the `dev` version of the `environment variables`)
- On the `variable` input add `URL`
- In the `initial value` input add `localhost:3000`
- Then click on the `save` button
- Now get to the `create users` request tab
- In the `No Environment` dropdown; choose your `environment` name(In the case of the example `Task Manager API (dev)`)
- Now on the `URL` of the `create users` request; remove `localhost:3000`(If you use `http://`; eliminate it)
- Then add the `URL` variable like this

    `{{url}}/users`

    To use an `environment variable` on `postman` you will need to add the name on double `curly brackets`(Choosing the correct `environment` before)

- Hover the `URL` variable
- You should see the value of `URL`
- Send the request
- You should see that the request works as expected
- Go to every request and use the `URL` variable and test

Now we will work with the `authentication`. At this moment we obtain the `token` from a request; copy its value and paste it on the request that we need to be `authenticated` but there are some other ways to do this like the following:

- Get to the `read profile` request tab
- Grab the `token` that you use before on the `Headers` tab(Just the `token` value without `Beaber`)
- Remove the `authorization` key and value from the `Headers`
- Get to the `Authorization` tab that is below the `read profile` URL
- Click the `Type` dropdown and choose `Bearer Token`
- On the `token` input that appears on the right; paste the `token` value
- Send the request
- You should see that the request work as expected

This way works but only works with this specific request but we actually need that the `token` we get to work for every request that needs `authentication`.

- On the `Authorization` tab on the `read profile` request
- Click on the `type` dropdown again and choose `inherit auth from parent`

This option will allow us to set the `authentication` once and use it for every request with this option(which is the default option)

- On the left side; click on the 3 dots of the `task app` collection
- A menu should popup
- Click on `edit`
- Choose the `Authorization` tab; below the name of the collection(`task app`)
- Click on the `type` dropdown and choose `Bearer Token`
- On the `token` input; paste the `token` value that you use before
- Click on save

Now every request that has the `inherit auth from parent` on the `Authorization` section will use the `token` that you just set.

- Go to the `read profile` request tab
- Send the request
- The request should work as expected

We need to remember that there is 2 request that will not need `authentication` so we will need to change the `authorization` type.

- Get to the `create user` and `login user` request tabs
- Get to the `Authorization` tab below the `URL`
- On the `type` dropdown; choose `No Auth`

Finally, we will need to set some automation in order to take the `token` every time that we `create` or `login` a `user` instead of copying the value on the `token` input of the collection's `authorization` section because the `token` will be deprecated after some time.

- Click on the 3 dots on the `task app` collection on the left
- Choose edit
- Click on the `Authorization` tab
- Remove the `token` value
- On the `token` input; add an `environment variable call `authToken`(Which doesn't exist yet but we will add it in a moment)
- Click on save
- Get to the `login user` request tab
- Below the `URL` click on the `test` tab

    The `test` tab will let you add some `js` script that runs after the response is received (The `pre-request Script` will run a `js` script before the request is sent). There we will set a script that set an `environment variable` with the `token` value

- On the `test` work area; add a condition

    `if () {}`


We will need to make sure that the request has a `200` status and for this `postman` to give us access to an object called `pm` that has a property called `response` that contains the `response` data and it `code`

- On the condition that you just created; use the `pm` object to make sure that the `status code is `200`

    `if (pm.response.code === 200) {}`

Now we will need to set the `authToken` variable that you just created and the `pm` object has access to an `environment` property that has a `set` method for this purpose

- Inside of the condition use `pm` to set the `authToken` variable

    ```js
    if (pm.response.code === 200) {
        pm.environment.set();
    }
    ```

The `set` method receives 2 arguments; the name of the `environment variable` and the value. To get the actual value of the `token` like we did before we will need to get the data of the `response` but we need to convert it into an object because is a `JSON` and then get the correct property.

- Send the `authToken` name as the first argument of the `set` method and the `token` value as the second argument like this

    ```js
    if (pm.response.code === 200) {
        pm.environment.set('authToken', pm.response.json().token);
    }
    ```

- Click on save
- Copy the condition
- Get to the `create user` request tab
- Click on the `test` tab below the `URL` of `create user`
- Paste the condition
- On the condition change the `200` status  to `201`

    ```js
    if (pm.response.code === 201) {
        pm.environment.set('authToken', pm.response.json().token);
    }
    ```

- Click on save
- Get to the `read profile` request tab
- Send the request
- It will send you the `authentication error`
- Get to the `login user` request tab
- Send the request
- The request should work as expected
- Get to the `read profile` request tab
- Send the request
- The request should work without any issues

## Logging out

Now we are going to complete the `authentication` cycle making a `log out` route so the `user` remove the `token` when he wants.

- On your editor; go to the `task-manager/src/routers` directory
- In the `user.js` file; below of the `login` route and before the `/users/me` route; add a new `post` route with a `path /users/logout`; the `authentication` is `required` and a `async` function

    `router.post('/users/logout', auth, async (req, res) => {});`

- Inside of the `logout` handler function add a `try/catch` block

    ```js
    router.post('/users/logout', auth, async (req, res) => {
        try {
        } catch (e) {}
    });
    ```

On this endpoint we will need to eliminate the `token` that the `user` use when it makes the `login` or `create` process; as you may recall; the `user` has an `array` of `tokens` so we will need to search the correct one in other to eliminate it from the `array` when the `user` try to `logout`. For this, we will need to add one line on the `auth middleware`.

- Get to the `middleware/auth.js` file
- Below the `error` condition; add a new property to the `req` object called `token` and its value will be the actual value of the `token`

    ```js
    const auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, 'thisisthesecret');
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

            if(!user) {
                throw new Error();
            }

            req.token = token;
            req.user = user;
            next();
        } catch (e) {...}
    }
    ```

- Get back to the `router/user.js` file
- On the `logout` handler; send a `500` status in case of an `error`

    ```js
    router.post('/users/logout', auth, async (req, res) => {
        try {
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

Now we can concentrate on removing the `token` from the `user`. Since we are `authenticated` we have access to the `user` data and we just need to look for a way to remove the correct one.

- On the `try` block change the value of the `user.tokens` array using the `filter` method on each element of the `array` of `token` and remove the one that `match` with the one on the `token` property of `req`

    ```js
    router.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Now we just need to `save` the `user` with the `save` method

    ```js
    router.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Finally; send a `response`

    ```js
    router.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();

            res.send();
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On another tab of your terminal; go to the `task-manager` directory and run your local server using: `npm run dev`
- Go to `postman`
- Right-click to the `task manager` collection
- Click on `Add request`
- Add the name for the new request like `logout user`
- Change to `POST` the `HTTP` method
- Add the `URL` using `environment variables`

    `{{url}}/users/logout`

- Save the request
- Make sure that you `log in` or `create` a `user` so you have a valid `token`
- Get to the `read profile` request tab
- Send the request
- You should receive the `user` profile
- Get to the `logout user` request tab
- Send the request
- You should receive a `200` status
- Get to the `read profile` request tab
- You should get the `unauthenticated` response

We can continue with another `logout` handler; this time we will work `logging out` the `user` from all active sessions in other words remove all the `tokens` of a `user`.

- On your editor; go to the `routers/user.js` file
- Below the `logout` handler; create a new handler that uses the `POST HTTP` method; with a `/users/logoutAll` path; also the `authentication` is required and the handler function will be `async`

    `router.post('/users/logoutAll', auth, async (req, res) => {});`

- On the `logoutAll` handler; add a `try/catch` block

    ```js
    router.post('/users/logoutAll', auth, async (req, res) => {
        try {
        } catch (e) {}
    });
    ```

- On the `catch` block; send a `500` status in case of an `error`

    ```js
    router.post('/users/logoutAll', auth, async (req, res) => {
        try {
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Now on the `try` block; change the value of the `tokens` array of `req.user` to an `empty` array

    ```js
    router.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [];
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the `user` data and respond to the request

    ```js
    router.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();

            res.send();
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the file
- Get to `postman`
- Right-click on the `logout user` request
- Click on duplicate
- Change the `logout user copy` name to `logout all`
- Change the `URL` from `/users/logout` to `/users/logoutAll`
- Make sure that the current `logged in user` have more than one `token` on its array
- Send the `logout all` request
- You should receive a `200` status response
- Get to `Robo 3T`
- On the `user` collection; check the `user` that you just `logout` from all sessions
- You should see that don't have any `tokens` on its array of `tokens`

## Hiding private data

We now can make more secure the response that we send with the `user` data because at this moment we send back its `password` and the `tokens` that represent all his active sections. In this section, we will explore 2 possible solutions for this.

- Get to the `task-manager/src/routers/user.js` file on your editor
- Go to the `login` handler
- On the response; change the `user` shorthand syntax to the normal property call and its value will be the result of the following `user` method

    ```js
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();

            res.send({ user: user.getPublicProfile(), token });
        } catch (e) {...}
    });
    ```

    The `getPublicProfile` doesn't exist yet but we will make that function shortly and it will return to us just the public data of the `user`

- Go to the `models/user.js` file
- Before the `getPublicProfile` method definition; call the `methods` property of the `userSchema` then add as a property of `methods` the name of the function that you use on the `login` handler

    `userSchema.methods.getPublicProfile;`

    As you remember the `statics` property of the `schema` will allow us to make a method for the `model` and `methods` will allow us to make a method for the actual instance

- The value of `getPublicProfile` will be a standard `async` function

    `userSchema.methods.getPublicProfile = async function() {};`

    We will need to use a standard function because we will receive the `user` on the `this` instance

- On the newly created function; create a constant call `user` that its value will be `this`

    ```js
    userSchema.methods.getPublicProfile = async function() {
        const user = this;
    };
    ```

Now we will need the `raw` object will all the `user` data in other words all the `user` data without all the things that `mongoose` add to the `user`

- Below the `user` constant; create another one called `userObject` it value will be the result of calling the `toObject` method of `user`

    ```js
    userSchema.methods.getPublicProfile = async function() {
        const user = this;
        const userObject = user.toObject();
    };
    ```

    The `toObject` method is provided by `mongoose` and returns the `raw` data of the document

- Now return `userObject`

    ```js
    userSchema.methods.getPublicProfile = async function () {
        const user = this;
        const userObject = user.toObject();

        return userObject;
    };
    ```

- Save both files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Get to `postman`
- On the `login user` request tab; send the request
- You will see that the request-response with the `user` data like we have it before

Now that we have the `getPublicProfile` we can manipulate the `user` data in other to just show the public data

- Get to the `models/user.js` file
- On the `getPublicProfile`; below the `userObject`; use `delete` to remove the `password` and the `tokens` properties from `userObject`

    ```js
    userSchema.methods.getPublicProfile = async function () {
        const user = this;
        const userObject = user.toObject();

        delete userObject.password;
        delete userObject.tokens;

        return userObject;
    };
    ```

- Save the file and get to `postman`
- On the `login user` request tab; send the request
- You should see that the `user` data without the `password` and the `tokens` array

This approach is a little bit manual because we still need to call the `getPublicProfile` method in our `login` handler every single time we send the `user` back but there is another way that will allow us not to make any changes like this in our handlers.

- Get to `routers/user.js` file
- Go to the `login` handler
- On the `send` method; get back to the shorthand syntax on `user`

    ```js
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();

            res.send({ user, token });
        } catch (e) {...}
    });
    ```

- Get to the `models/user.js` file
- Change `getPublicProfile` to `toJSON`(Need to match exactly like this)

    `userSchema.methods.toJSON = function() {...}`

- Save both files and get to `postman`
- On the `login` request tab; send the request
- You should see that work as expected and don't show the `password` and `tokens` data
- Get to the `read profile` request tab and send the request
- You should see that work as expected and don't show the `password` and `tokens` data

With this update, we target both handlers without changing it the actual code of the handlers. Now we will make an example to see why this approach works.

- Go to the `src/index.js` file
- Remove all the comment code and the example at the bottom
- At the bottom of the file; create an object with a `string` property

    ```js
    const pet = {
        name: 'test'
    }
    ```

- Now we will convert the object to a `JSON` and log in to the terminal; so below the `pet` object add the following:

    `console.log(JSON.stringify(pet));`

- Save the file and go to the local server terminal
- You should see the object data as a `JSON`

When you pass an object to `res.send` it actually calls `JSON.stringify` behind the scene so let's add `toJSON` to the mix to see the effect.

- Get back to the `index.js` file
- Below the `pet` object definition; add a property to `pet` call `toJSON`(need to match exactly like this) and its value will be a function

    `pet.toJSON = function() {}`

- Inside of this function; log `this` and return it

    ```js
    pet.toJSON = function() {
        console.log(this);

        return this;
    }
    ```

- Save the file and get to the local server terminal tab
- You should see the same result as before

Now we can manipulate what we get back when we `stringify` the `pet` object using the `toJSON` method.

- Get to the `index.js` file
- Remove all content of the `toJSON` method
- Return an empty object on the `toJSON` method
- Save the file and get to the local server terminal tab
- You should see an empty object

Now you see why the approach that we use for the handler works as we expected.

## Authenticating user endpoints

Now we can finish with the `user authentication` for all the endpoints that need it to pass to the `task` routes.

- On your editor; go to the `routers/user.js` file
- Get to the `/users/:id get` handler

This handler will return the data of any `user` if you send it `id` but each `user` should only have access to its own data and for this, we already have an endpoint call `/users/me` so we no longer need the `/users/:id` handler.

- Remove the `/users/:id get` handler
- Now get to the `/users/:id delete` handler
- Add the `auth` middleware

    `router.delete('/users/:id', auth, async (req, res) => {...}`

- Now update the path from `/users/:id` to `/users/me`

    `router.delete('/users/me', auth, async (req, res) => {...}`

    This is because we can't permit a `user` delete any other `user` but itself so from now on the `delete user` endpoint will `delete` the current `user`

We will need to change a little the handler code because we don't longer receive the `id` and we actually have the `user` data on the request because we added the `auth` middleware.

- On the `delete` handler; remove the `user` constant and the `check user` condition

    ```js
    router.delete('/users/me', auth, async (req, res) => {
        try {
            res.send(user);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Now use the `remove` method of `user` before the response

    ```js
    router.delete('/users/me', auth, async (req, res) => {
        try {
            await req.user.remove();

            res.send(user);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

    `Mongoose` provide us with a `remove` method that will `delete` the data of the instance that call that method

- Since we no longer have a `user` constant; we will need to update the response to use the `user` property of `req`

    ```js
    router.delete('/users/me', auth, async (req, res) => {
        try {
            await req.user.remove();

            res.send(req.user);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `login user` request tab
- Send the request
- You should have the response as expected
- Go to the `delete user` request tab
- Change the `URL` to `{{url}}/users/me`
- Save the request
- Send the request
- You should see the `user` deleted data as a response

Now we can continue working with the `update user` endpoint.

- Get to the `router/user.js`
- Get to the `/users/:id patch` handler
- Add the `auth` middleware

    `router.patch('/users/:id', auth, async (req, res) => {...}`

- Change the `path` of the handler to `/users/me`

    `router.patch('/users/:id', auth, async (req, res) => {...}`

    A `user` should not have the ability to change any other `user` just itself

- Get to the `try` block and change the value of the `user` constant to this

    ```js
    router.patch('/users/me', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const user = req.user;
            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();

            res.send(user);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    ```

- Save the file
- Go to `postman`
- Get to the `create user` request tab(update the values of the `body` as you wish)
- Send the request
- Get to the `update user` request tab
- Update the `body` of the request; adding some valid properties that you want to update
- Send the request
- Go to `read profile` request tab
- Send the request
- You should see that the data of the properties that you update have the correct value(If you update the `password` use the `login user` request to test)

## The User/Task relationship

Now that we add `authentication` to the `users` endpoints we can continue adding the `authentication` to the `tasks` endpoints but first, we will need to do something that is the `relationship` of the `users` and `tasks`. This is important because we need that the `user` can only see their `task` and perform operations with it and don't mess with the `tasks` of other `users`. Let's begin with the process of the `task model`.

- On your editor; go to the `task-manager/src/models/task.js`

There are 2 ways that we can set up the `task/user relationship`:

1. The `user` can store all of the `ids` of the `tasks` they created
2. The individual `task` can store the `id` of the `user` that created it

We will be up for the second approach.

- On the `Task` model; add a new `field` in this case we will call it `owner`

    ```js
    const Task = mongoose.model('Task', {
        description: {...},
        completed: {...},
        owner: {}
    });
    ```

    We can call the new `field` whatever we want but is better to choose something that represents the data that we are going to receive on that `field` in this case the `id` of the `user` that is the `owner` of this `task`

- Now we will need to add the `type` that will be an `ObjectID` and we can add it like this

    ```js
    const Task = mongoose.model('Task', {
        description: {...},
        completed: {...},
        owner: {
            type: mongoose.Schema.Types.ObjectId
        }
    });
    ```

- The `owner` should be `required` so nobody can create anonymous `tasks`

    ```js
    const Task = mongoose.model('Task', {
        description: {...},
        completed: {...},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        }
    });
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Open `Robo 3T`
- Drop the current `task-manager-api` database

    We will eliminate our current database because we have some `task` created that doesn't have any `user` related but we quickly restore the database when our app runs the `index.js` file again

- Get to the `routers/task.js` file

Now we will begin to change the `task` endpoints to get the necessary data to create the `user/task relationship`

- Require the `auth` middleware below the `Task` model at the top of the file

    `const auth = require('../middleware/auth');`

- On the `/tasks post` endpoint; use the `auth` middleware

    `router.post('/tasks', auth, async (req, res) => {...}`

- On the `/tasks post` handler; remove the `req.body` from the `Task` model constructor in the `task` constant definition

    ```js
    router.post('/tasks', auth, async (req, res) => {
        const task = new Task();

        try {
            await task.save();
            res.status(201).send(task);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    ```

- In the `Task` constructor add an `object` that value will be the spread of the `req.body` and an `owner` property whose value will be the `req.user._id`

    ```js
    router.post('/tasks', auth, async (req, res) => {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });

        try {
            await task.save();
            res.status(201).send(task);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    ```

    With this we continue creating the `task` will all the necessary data that we receive from the `user` request and add the `user id` that we receive from the `auth` middleware

- Save the file
- Get to `postman`
- Go to the `create user` request tab
- Fill the `body` with the correct values
- Send the request
- You should see that a `user` is created
- Get to the `create task` request tab
- Fill the `body` with the necessary data that a `task` needs
- Send the request
- You should receive the `task` data and should have the `ObjectId` of the `owner`

Before we continue with the other endpoints; we will make a little example of some things that we will need to do with the `user/task relationship`.

- Get to the `src/index.js` file
- At the bottom of the file `require` the `Task` model

    `const Task = require('./models/task');`

- Then create a `main` function that will be `async`

    `const main = async () => {}`

- Below the `main` definition; call it

    ```js
    const main = async () => {}

    main();
    ```

Now we will find a `task` by its `id` and log its value.

- Get to `postman`
- In the `create task` request tab; copy the `_id` value on the response
- Get to the `index.js` file
- On the `main` function; create a constant call `task` and use the `findById` method from `user` sending the `_id` value that you just copied from `postman` as a parameter

    ```js
    const main = async () => {
        const task = await Task.findById('my_task_id');
    }
    ```

- Log the `task` value

    ```js
    const main = async () => {
        const task = await Task.findById('my_task_id');
        console.log(task);
    }
    ```

- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- Get to the `index.js` file
- Log the `owner` property of the `task`

    ```js
    const main = async () => {
        const task = await Task.findById('my_task_id');
        console.log(task.owner);
    }
    ```

- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- You should see the `ObjectId` of the `user` that is `owner` of the `tasks`

Now, what if we want some more information about the `user` that creates the `task` not just its `id`. You may think that we just grab the `id` and use the `findById` method on the `User` model using the `id` that we just get but this is a manual process. For this situation `mongoose` there is a way of setting the `relationship` between the 2 models providing us with some helper functions that will make this possible with very minimal code.

- Get to the `models/task.js` file
- On the `owner` file; add a new property called `ref`

    ```js
    const Task = mongoose.model('Task', {
        description: {...},
        completed: {...},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:
        }
    });
    ```

    The `ref` property will allow us to create a `reference` to the `field`(in this case `owner`) to another model

- On the `ref` property; add the model name that we need to create the `reference` and that will be `User`(Need to be the exact match to the `name` that you set on the `mongoose.model` method)

    ```js
    const Task = mongoose.model('Task', {
        description: {...},
        completed: {...},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        }
    });
    ```

- Get to the `src/index.js` file
- Below the `task` constant definition; use `await` then call the `populate` method of `task`

    ```js
    const main = async () => {
        const task = await Task.findById('my_task_id');
        await task.populate();
        console.log(task.owner);
    }
    ```

    The `populate` method allows us to `populate` data from a `relationship`

- As a parameter of the `populate` method; send a string with the `name` of the `field` that you need to `populate` with data; in this case `owner`

    ```js
    const main = async () => {
        const task = await Task.findById('my_task_id');
        await task.populate('owner');
        console.log(task.owner);
    }
    ```

    Now the `populate` method will go and find the `user` that is associated with this `task` and then send the entire document to the `task.owner` property

- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- You should see the data of the `user` that create the `task`

Now we will have a `relationship` with the `task` and the `owner` and we can see the data of the `owner` that create that mentioned `task` but what if we want to find all the `task` of a `user` using the `user` data.

- Get to `postman`
- On the `create task` request tab; copy the `owner` value
- Get to the `index.js` file
- `Require` the `User` model; below the `Task` model `require`

    `const User = require('./models/user');`

- Remove all content of the `main` function
- In the `main` function; create a new constant call `user` that it value will be the result of the `findById` method of the `User` model

    ```js
    const main = async () => {
        const user = await User.findById();
    }
    ```

- Paste the `owner id` that you copied from `postman` as a parameter of the `findById` method

    ```js
    const main = async () => {
        const user = await User.findById('my_owner_id');
    }
    ```

- Log the `task` property of the `user`

    ```js
    const main = async () => {
        const user = await User.findById('my_owner_id');
        console.log(user.tasks);
    }
    ```

- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- You should see `undefined`

We get this result because the `tasks field` doesn't exist on that document so as you may think we will need to adjust that on the `User` model but we actually are not going to create a `tasks` array on the `User` model because the `tasks` live on a different `collection` so we will need to add what is know as a `virtual property that won't have any data store on the database instead will get all it data from a `relationship` with another model in this case the `Task` model.

- Get to the `models/task.js`
- Below the `userSchema` definition; call it `virtual` method

    `userSchema.virtual();`

    The `virtual` method will allow us to set the `virtual` attributes. Is `virtual` because we don't actually change what is stored on the `user` document because is way from `mongoose` to say that these 2 things are related

- As the first argument of the `virtual` method you need to send a string that represents the name of the `virtual field` in this case we will use `task`

    `userSchema.virtual('tasks');`

- As a second parameter we will send a `configuration object`

    `userSchema.virtual('tasks', {});`

- The first property we will set is the `ref` property and its value will be the `Task` model name


    ```js
    userSchema.virtual('tasks', {
        ref: 'Task'
    });
    ```

- Now the following properties to the `configuration object`

    ```js
    userSchema.virtual('tasks', {
        ref: 'Task',
        localField: '',
        foreignField: ''
    });
    ```

The name of the `foreignField` is the of the `field` on the other model; in this case on the `Task` model; that is going to create this `relationship` and that `field` will be the `owner`.

- Add `owner` to the `foreignField`

    ```js
    userSchema.virtual('tasks', {
        ref: 'Task',
        localField: '',
        foreignField: 'owner'
    });
    ```

The `localField` will be the `field` where the local data is stored so since the `owner` has the `ObjectId` of the `user` we will need the `field` that has the same value in this case the `_id`.

- Add `_id` as the `localField` value

    ```js
    userSchema.virtual('tasks', {
        ref: 'Task',
        localField: '_id',
        foreignField: 'owner'
    });
    ```

- Get to the `src/index.js` file
- Below the `user` constant definition; use `await` and call the `populate` method of `user` sending the `virtual field` name

    ```js
    const main = async () => {
        const user = await User.findById('my_owner_id');
        await user.populate('tasks');
        console.log(user.tasks);
    }
    ```

    At the moment we call `populate` will find all `tasks` related to the `user` and store them on an `array`

- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- You should see the data of the `task` associated with the `user`
- Get to `postman`
- Go to the `create task` request tab
- Fill the `body` with the data of another `task`
- Send the request
- Go to the `index.js` file
- Add a line before the `console.log` of the `main` function
- Save the file
- Check on the tab of the terminal of your local server and you should see the `task` value
- You should see both `task`

## Authentication task endpoints

Now we can finish adding the `authentication` on the remaining `task endpoints`.

- Get to the `task-manager/src/router/task.js`
- Go to the `/task/:id get` request(Get a `task` by its `id`)

For this endpoint, we still want to show the data of the `task` by its `id` but we need that the `user` to check `tasks` that are not related to the current `user`.

- Add the `auth` middleware to the `/task/:id get` request

    `router.get('/tasks/:id', auth, async (req, res) => {...}`

- Now remove the `findById` method call

    ```js
    router.get('/tasks/:id', auth, async (req, res) => {
        const _id = req.params.id;

        try {
            const task = await Task

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {...}
    });
    ```

As we made for the other endpoints we will need to take into account the `user id` to search a `task` so we will need to change the `findById` and use the `findOne` method.

- Call the `findOne` method of `Task` sending the `id` of the `task` and the `owner` property with the `user id` as its value

    ```js
    router.get('/tasks/:id', auth, async (req, res) => {
        const _id = req.params.id;

        try {
            const task = await Task.findOne({
                _id,
                owner: req.user._id
            });

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {...}
    });
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `create user` request tab
- Fill the `body` of the request with data different from the first `user` that you created
- Send the request
- Go to the `create task` request tab
- Fill the `body` with data and send the request(Do it at least twice; both different data)
- Copy the `_id` value from the response
- Get to the `read task` request tab
- Paste the `id` that you just copied on the `URL` of the request
- Send the request
- You should see the data of the `task` that you use the `id` on the `URL`
- Get to the `login user` request tab
- Change to the other `user` and send the request
-  Go to the `read task` request tab
- Send the request with the same `id` that you used before
- You should receive the `404` status

Now you can `read tasks` that belong to the current `user`. We will continue with the `get all task` endpoint.

- Go to the `router/task.js`
- Get to the `/tasks get` request
- Add the `auth` middleware

    `router.get('/tasks', auth, async  (req, res) => {...}`

- Remove the `task` constant
- Before the `response` of the handler in the `try` block; call the `populate` method of the `user` sending `task` as a parameter

    ```js
    router.get('/tasks', auth, async  (req, res) => {
        try {
            await req.user.populate('tasks');

            res.send(req.user.tasks);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the file
- Get to `postman`
- Go to the `read tasks` request tab
- Send the request
- You should see only the `tasks` of the first `user`

We will continue with the `update task` endpoint.

- Get to the `router/task.js` file
- Go to the `/tasks/:id patch` request
- Add the `auth` middleware

    `router.patch('/tasks/:id', auth, async (req, res) => {...}`

- Update the value of the `task` content using the `findOne` method sending the `_id` of the `task` and the `id` of the `owner`

    ```js
    router.patch('/tasks/:id', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findOne({
                _id: req.params.id,
                owner: req.user._id
            });

            updates.forEach((update) => task[update] = req.body[update]);
            await task.save();

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {...}
    });
    ```

- Now move the `updates.forEach` and `save` lines below the `!task` condition

    ```js
    router.patch('/tasks/:id', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValid = updates.every((update) => allowedUpdates.includes(update));

        if (!isValid) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findOne({
                _id: req.params.id,
                owner: req.user._id
            });

            if (!task) {
                return res.status(404).send();
            }

            updates.forEach((update) => task[update] = req.body[update]);
            await task.save();

            res.send(task);
        } catch (e) {...}
    });
    ```

    This makes sure that the `task` exits in order to `update`

- Save the file
- Go to `postman`
- Get to the `read task` request task
- Copy one of the `_id` values of one of the `tasks`
- Go to the `update task` request tab
- Paste the `id` that you just copied on the `URL`
- Change the `body` of the request with a valid `field` that you need to update
- Send the request
- You should see that the data of the `field` that you update have the correct value
- Go to the `login request` tab
- `Login` as the second `user`
- Get to the `update task` request tab
- Send the request
- You should get a `404` status

Finally, we will work with the `delete task` endpoint!!

- Go to the `router/task.js`
- Get to the `/tasks/:id delete` request
- Add the `auth` middleware

    `router.delete('/tasks/:id', auth, async (req, res) => {...}`

- Change the `task` value to use the `findOneAndDelete` method sending the `_id` and `owner id`

    ```js
    router.delete('/tasks/:id', auth, async (req, res) => {
        try {
            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                owner: req.user._id
            });

            if (!task) {
                return res.status(404).send();
            }

            res.send(task);
        } catch (e) {
            res.status(500).send();
        }
    });
    ```

- Save the file
- Get to `postman`
- Go to the `read tasks` request tab
- Send the request
- Copy the `_id` value of one of the `tasks`
- Go to the `delete task` request tab
- Paste the `id` on the `URL` of the request
- Send the request
- You should receive the data of the `task` deleted

Now we finish adding `authentication` to all `tasks` endpoints and create the `relation` between the `users` and `tasks`.

## Cascade delete tasks

We still need something to do that when a `user` delete itself; all the `task` related to him should be deleted at the same time because they will stay on the database without purpose and with a `relation` data that doesn't exist. We can address this by removing all `tasks` on the `delete user` handler but we are not going to take that approach; instead, we will create a `middleware` on the `user` model that helps us with this.

- Get to the `task-manage/src/models/user.js`
- Before the `export` line at the bottom of the file; call the `pre` method of the `userSchema`

    `userSchema.pre()`;

- As a first parameter; send a string with a `remove` value and a standard `async` function as a second parameter(The function will receive the `next` parameter)

    `userSchema.pre('remove', async function (next) {});`

- Below the `jwt` definition at the top of the file; `require` the `Task` model

    `const Task = require('./task');`

- Get to the `remove` middleware
- On the function; create a constant call `user` with a value of `this`

    ```js
    userSchema.pre('remove', async function (next) {
        const user = this;
    });
    ```

- Now call the `deleteMany` method of the `Task` model sending the `owner id` as a parameter

    ```js
    userSchema.pre('remove', async function (next) {
        const user = this;
        await Task.deleteMany({ owner: user._id });
    });
    ```

- Finally; call the `next` method

    ```js
    userSchema.pre('remove', async function (next) {
        const user = this;
        await Task.deleteMany({ owner: user._id });
        next();
    });
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Open `Robo 3T`
- Get to the `task` collection
- Check the number of `tasks` present on the database
- Go to `postman`
- Get to the `delete user` request tab
- Send the request
- You should see the data of the deleted `user`
- Get to `Robo 3T`
- You should see that you have fewer `tasks` than before
