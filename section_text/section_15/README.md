# Section 15: Testing Node.js(Task App)

When we talk about the testing we are not talking about manually testing them in other words we are not talking about when we test ourselves with our own eyes each feature that we make; we actually talk about an automated `test suite`; that is when we write some code that performs an operation on our app then we add some more code that `assert` the result that we are expecting. This will help us because when our application grows will take a lot of time to `test` it manually and with a `test suite` we write our `test` a single time and we can run it as many times as we need it. This also will help us to gain confidence in the delivery phase because we are making sure that we don't upload broken code to production.

## Jest testing framework

We will begin the `testing` process by writing our first `test` so we will see what tools we will need in order to get this done and we also are going to check the reason why `testing` is so important for all applications.

Now we will set the tool that we are going to use to make our first `test`; in our case, we will use [jest](https://jestjs.io/); this is the `testing` framework that we are going to use on this section; later we will use another `testing` framework called [mocha](https://mochajs.org/).

To begin our `testing` journey we will use `jest` that have some nice to have features that make it a little easy to write and manage your `test` cases. Let's begin with the process.

- On your terminal; go to the `task-manager` directory
- Install as `dev dependency` the `jest` module using: `npm install jest --save-dev`
- You should see the `jest` dependency on the `package.json` on the `task-manager` directory

Now that we install the `jest` dependency we just need to add a single `script` that is going to start `jest` and this is because `jest` is a `0` configuration `testing` framework in other words by default it has everything in place for us to get started but there still are some options that we can configure later.

- On your editor; get to the `task-manager/package.json`
- On the `script` section; add a new `script` called `test` and its value will be a string with the word `jest`

    ```json
    "scripts": {
        "start": "node src/index.js",
        "dev": "env-cmd -f ./config/dev.env nodemon src/index.js",
        "test": "jest"
    }
    ```

    This is the only thing that we need in order to run `jest`. When we install `jest` dependency it gives us a new command that we can use with the same name as the module

- Get to your terminal and run the `test` script: `npm test`
- You should some logs made by `jest` and it will tell you that `No tests found` also that it checks the `task-manager` directory and the number of files checked

Now we will create our first `test` file to house our very first `test`. In this case, we will create a directory to store all our `test` files but later we will separate multiple files.

- On the `task-manager` directory; create a new folder called `tests`
- On this newly created directory; create a new file called `math.test.js`(We use the `math` name  imagining that is a `test` for a `math` app but you can use any name that you want just to use the same extensions)

    `Jest` will take this file because it has the `jest` extension so by default `jest` will know that this file will contain a `test` suit that we want to run and also have the `js` extension means that our `tests` are going to be `js` code

- Get to your terminal and run the `test` script
- You should see the logs and it tells that the `test fail` because the `test` file should have at least one `test`
- Get back to the `math.test.js` file
- On this file; call the `test` function

    `test();`

    As you see we didn't load the `test` function without a `require` on the `test` file; this is because `jest` provide this function as a global function on our `tests suit` files(With other globals that we are going to check later)

- Provide to arguments to the `test` function; the first is a string and the second will be a function

    `test('', () => {});`

    The string is the name of your `test` and the function will be the code that you want to run to verify that a given feature work as expected

- Add a name for your `test` like this

    `test('Hello world', () => {});`

- Get to your terminal and run the `test` script
- You should see that `jest` is looking at the `math.test.js`; then the name of your `test` and that the `test` pass

    Even if the `test` is not doing nothing is considered as a past `test` this is because when you provide the function of a given `test` the `jest` module just runs that function and checks if the function throws an error if it does it will be considered as a `fail test`

- Get to the `math.test.js` file
- Below the first `test`; add a new `test` and on the function `throw` an error with a message

    ```js
    test('This should fail', () => {
        throw new Error('Failure!');
    });
    ```

- Go to your terminal and run the `test` script
- You should see that `jest` run all `test` of the `math.test.js` file with one `failed test` and another that `passed` also your `error` message

When we are writing `test`; we actually are writing functions expecting that something throws an `error` in the case that some code doesn't match the specification that we added on the `tests`; for example, we can `test` a simple function that adds 2 numbers or try to login with invalid credentials to our `express` application making sure that we don't have an `auth` token back.

### Why we want to write test cases for our projects

- Save time: Even if you have to write more code but this code will be written once to `test` a given feature and we can run it as many times as we want so when I create a new feature we create it `test` case and over the time we can keep running the same `test`. This will help you save time because the applications grow over time and will be difficult to manually `test` it so you will rely on the `test suit` that you created that will only take the time that the command takes to finish.

- Create reliable software: When we `test` our code we create reliable software because you will be able to spot and fix code before they get to production.

- Given the flexibility to developers: You give the opportunity to `refactor` the code in a faster way because we will have a `test` that will make sure that everything works as expected also when we `collaborate` with others because when a new member get to your team maybe he doesn't have the complete vision of all features and how they fit together and could mess with a feature but the `test` will help the new teammate to check if something wrong with the update that he proposed. Finally, you can do some `profiling` because you can check the speed that your `test` run goes up or down as you make changes so you can make your application faster and faster over time.

- Piece of mind: You will know that you have a `test suit` that you can run to check your entire application in seconds instead that you go and check manually every aspect of the application that will introduce human error to the equation.

## Writing tests and assertions

Now we are going to create `test` cases for a given function to determine that is working as expected. For the moment we are going to create new simple functions then we are going to move to the `task-manager` app.

- On your editor; get to the `task-manager/src` directory
- Create a new file called; `math.js`(This will be a file that has some `math` related functions that we will use for examples)
- On this newly created file; create a new function called `calculateTip`

    `const calculateTip = () => {}`

    This function will calculate the total amount that you need to pay including the tip that we want to give

- Pass the `total` amount of what the client consumes and the `tip` percent as arguments of the function

    `const calculateTip = (total, tipPercent) => {}`

- On the `calculateTip` function; create a new constant called `tip` that its value will be the `total` multiplied by the `tipPercent`

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent;
    }
    ```

    So if we have `10` dollars `total` and a `30% tip percent` we will have a `3` dollar `tip` after the calculation

- Finally; we will return the `total` plus the `tip` that we are going to give

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent;
        return total + tip
    }
    ```

- Export the function

    ```js
    module.exports = {
        calculateTip
    }
    ```

- Get to the `tests/math.test.js` file
- Remove the current `tests` on the file
- At the top of the file; import the `calculateTip` function

    `const { calculateTip } = require('../src/math');`

- Then use the `test` function passing a string name and a function

    `test('Should calculate total with tip', () => {}):`

    The string name can be anything you want and is best to add a name that describes what you are `testing`

Now we will call the `calculateTip` function and `assert` the value that it comes back

- On the `test` function; create a new constant call `total` that its value will be the result of the `calculateTip` function

    ```js
    test('Should calculate total with tip', () => {
        const total = calculateTip(10, .3);
    }):
    ```

    In this same argument in order to follow exactly the example. Here we would expect that the function returns `13`

- Now create a condition to `test` if `total` is not equal to `13` and if is not throw an `error` with a message that contains what is expected to return and what the function returns

    ```js
    test('Should calculate total with tip', () => {
        const total = calculateTip(10, .3);

        if (total !== 13) {
            throw new Error(`Total tip should ne 13. Got ${total}`);
        }
    }):
    ```

- Save the file
- On your terminal; go to the `task-manager` directory
- Run the `test` script using: `npm test`
- You should see that the `test` passed

Let's try to make the `test` fail

- Get to the `math.js` file
- On the `tip` value; sum `total` after the multiplication(Let's say that by mistake we added `total`)

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent + total;
        return total + tip
    }
    ```

- Save the file
- Get to your terminal and run the `test` script again
- You should see that your `test` is falling; also the name of the `test` that is falling and the message of the `error` is shown

These logs will give us information that we can use to spot the `error` that we have in the code that we are working with. Let's fix our `error`.

- Go to the `math.js` file
- Remove the extra `total` on the `tip` constant value

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent;
        return total + tip
    }
    ```

At this moment we are manually comparing values and throwing an `error` when those values don't match; later we will have more complex `assertions` like `testing` that a given object has certain properties with specific values so really quickly we will end up writing a ton of code in order to `test` our application but `jest` can help us with this because it comes with an `assertion` library that have a set of methods and tools that we can use to `assert` things about values.

- Get to the `math.test.js`
- Remove the condition
- Below the `total` constant; call the `expect` method(Similar to `test`; `jest` provide this function to use on all our `test` files) sending the `total`

    ```js
    test('Should calculate total with tip', () => {
        const total = calculateTip(10, .3);
        expect(total);
    }):
    ```

    In this case, we are telling that we are `expecting` something with the value of `total`

- Now call the `toBe` method of `expect` sending the value `13` as an argument

    ```js
    test('Should calculate total with tip', () => {
        const total = calculateTip(10, .3);
        expect(total).toBe(13);
    }):
    ```

    The `toBe` method check for equality with the value that we send so when the value of `total` is equal to `13` this function won't throw an `error` and your `test` will pass otherwise if the value of `total` is not equal to `13` this function will throw an `error` to represent that the `test` failed

- Go to your terminal and run the `test` script
- You should see that your `test` passed
- Now get back to the `math.js` file
- Add an extra `tip` to the return value of the function

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent;
        return total + tip + tip;
    }
    ```

- Save the file
- Go to your terminal and run the `test` script
- You should see that the `test` failed and some more logs that tell you the name of the `test` that failed and the `assert` that failed explaning what was received and what was expected
- Get to the `math.js` file and remove the extra `tip`

    ```js
    const calculateTip = (total, tipPercent) => {
        const tip = total * tipPercent;
        return total + tip;
    }
    ```

Now that the `test` case is in place we can refactor the `calculateTip` function without affecting the result that we expect for the function.

- On the `math.js` file; take advantage of the `es6` return syntax to change the function to return in one line

    `const calculateTip = (total, tipPercent) => total + (total * tipPercent);`

- Save the file
- Go to your terminal and run the `test` script
- You should see that the `test` still passing

We will create a new `test` case adding a new feature to the `calculateTip` function. In this case, we will add a `25%` of `tip` as a default when a `tip percent` is not provided it.

- Go to the `math.js` file
- Add a default value to the `tipPercent` argument

    `const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent);`

- Get to the `math.test.js` file
- Below the first `test`; call the `test` function with a string name and a function

    `test('Should calculate total with default tip', () => {});`

- On the function; create a new constant call `total` that it value will be the result of calling the `calculateTip` sending just the `total`

    ```js
    test('Should calculate total with default tip', () => {
        const total = calculateTip(10);
    });
    ```

- Then call the `expect` method sending the `total` value and the `toBe` method sending `12.5`

    ```js
    test('Should calculate total with default tip', () => {
        const total = calculateTip(10);
        expect(total).toBe(12.5);
    });
    ```

- Save both files
- Get to your terminal and run the `test` script
- You should see that both `tests` pass

## Testing asynchronous code

We will continue checking how to `test asynchronous` code using `jest`. This is going to be a lot like the previous `tests` but a little different.

Before we get into `asynchronous testing` we will change the `test` script in order to have a script always checks for the `test` that we are chaining like `dev` script that always expects code changes.

- On your editor; go to the `package.json` file
- In the `script` section; add the `--watch` option to the `jest` command

    ```json
     "scripts": {
        "start": "node src/index.js",
        "dev": "env-cmd -f ./config/dev.env nodemon src/index.js",
        "test": "jest --watch"
    }
    ```

- On your terminal; go to the `task-manager` directory
- Run the `test` script
- You should see that all `tests` run but you don't get back to the command line

At this moment you should see that you have a couple of options that just typing a letter you can run like the `a` option that will run all `test`

- Press the `a` keyword
- You should see that all `test` run again
- Now click `w` to see the `watch` options again

Now we can focus on the `asynchronous testing` using `jest`. First; we will add a simple example using an incorrect `test`.

- On your editor; go to the `math.test.js` file
- At the bottom; call the `test` function sending the `test` name and function

    `test('Async test demo', () => {});`

- Now create an `assertion` for a number that is equal to another that produces an `error`

    ```js
    test('Async test demo', () => {
        expect(1).toBe(2);
    });
    ```

- Save the file
- Go to your terminal
- You should see that the `test` re-run and the `async` test are falling as expected
- Get back to the `math.test.js` file

Now we will add some `async` code using `setTimeout` with the current `assertion`.

- On the `async test`; move the `assertion` into the `callback` function of a `setTimeout` that has a `2` seconds duration

    ```js
    test('Async test demo', () => {
        setTimeout(() => {
            expect(1).toBe(2);
        }, 2000);
    });
    ```

- Save the file
- Go to your terminal
- You should see that all `test` pass then an `error` shutdown the `watch` command

The `test` pass at first because `jest` doesn't know that you are running `async` code it just runs the function so by the time `jest` run the function you don't have any `errors` so `test` is considered a success. Now, all we need to do this is to add a little thing.

- Get to the `math.test.js` file
- On the `async test`; send a new argument called `done`(Can be named whatever you want but by convention, this will is call `done`)

    ```js
    test('Async test demo', (done) => {
        setTimeout(() => {
            expect(1).toBe(2);
        }, 2000);
    });
    ```

    You will need to call `done` after all the `assertion` are completed in the `asynchronous` code so `jest` is going to see that `done` is present and won't consider the `test` as a failure or success until `done` is called

- Below the `assertion`; call `done`

    ```js
    test('Async test demo', (done) => {
        setTimeout(() => {
            expect(1).toBe(2);
            done();
        }, 2000);
    });
    ```

- Save the file
- Get to your terminal and run the `test` script
- You should see the `test` take a little more time than show the logs and one `test` is falling as expected

There are other ways to do this; let's get into it. We will add a new function to create new `test` cases on the `math.js` file; in this case, a function that adds two numbers using a `setTimeout` to make it `asynchronous`.

- Get to the `src/math.js` file
- After the `calculateTip` function; add the following

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

- Export the `add` function

    ```js
    module.exports = {
        calculateTip,
        add
    }
    ```

- Get to the `math.test.js`
- Add the new function to the required call at the top of the file

    `const { calculateTip, add } = require('../src/math');`

- At the bottom of the file; add a new `test` case with a function that receives `done`

    `test('Should add two numbers', (done) => {});`

- Now call the `add` function with `2` numbers

    ```js
    test('Should add two numbers', (done) => {
        add(2, 3);
    });
    ```

- Use the `then` method on `add` to get the result of the function

    ```js
    test('Should add two numbers', (done) => {
        add(2, 3).then((sum) => {});
    });
    ```

- Make an `assertion` that compares `sum` with the number `5`; then call `done`

    ```js
    test('Should add two numbers', (done) => {
        add(2, 3).then((sum) => {
            expect(sum).toBe(5);
            done();
        });
    });
    ```

- Comment on the first `async test`
- Save the file
- Get to your terminal
- You should see that take a couple of seconds then all `test` pass
- Get back to the `math.test.js` file
- At the bottom use the `test` function and the `test` name and an `async` function

    `test('Should add two numbers async/await', async () => {});`

As you may remember a function mark as `async` return a `promise` and when `jest` see that it will wait until the `promise` is a success or is rejected before it figures out if the `test` pass or not.

- On the new `test`; create a new constant call `sum` that receives the value of the `add` function(Remember to use `await`)

    ```js
    test('Should add two numbers async/await', async () => {
        const sum = await add(10, 22);
    });
    ```

- Now add an `assertion` where the `sum` value is equal to `32`

    ```js
    test('Should add two numbers async/await', async () => {
        const sum = await add(10, 22);
        expect(sum).toBe(32);
    });
    ```

- Save the file
- You should see that take a couple of seconds then all `test` pass

## Testing an express application

Now we are going to write `test` cases that interact with our `express` API on where we are going to make requests to the endpoints and write `assertions` in order to check that everything works as expected but before that, we can get to that you'll need to remember that when you run the `test` on our app it will run the files on our `src` directory and at this moment those files depend on `environment variables` and they will not exists because they only are added as part of the `dev` script on the `package.json` so we need to add those `environment variables to the `test` script but in a separate `config` file(You'll see why in a bit).

- On your editor; go to the `task-manager/config` directory
- Create a new file called `test.env`
- Open the `dev.env` file
- Copy it content
- Get to the `test.env` file and paste the content of the `dev.env` file

We create a new config file because we don't want to use the same database that we use for the `dev` environment. The `test` will be populating the database with `seed` dummy data that the `test` can use and we don't want this on our work database because we make it difficult when you work with data.

- On the `test.env`; update the `MONGODB_URL` connection string to get a different database for the `tests`

    `MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test`

- Get to the `package.json` file
- On the `scripts` section; add to the `test` script the `test.env` file using `env-cmd`

    ```json
    "scripts": {
        "start": "node src/index.js",
        "dev": "env-cmd -f ./config/dev.env nodemon src/index.js",
        "test": "env-cmd -f ./config/test.env jest --watch"
    }
    ```

Now we will need another `jest` configuration on the `package.json`.

- Below the `scripts` section; add a new section called `jest`

    `"jest": {},`

- On the `jest` section; add a property call `testEnvironment` with a `node` value

    ```json
    "jest": {
        "testEnvironment": "node"
    },
    ```

By default, the `testEnvironment` will be set to a `jsdom` that is a `js` variable similar to what you see on the browser so by default `jest` assume that you are `testing` browser base `js` but as you see it also supports `node`.

Now we are going to use `jest` to `test` one of the `task-manager` endpoints. You can do it 2 ways; one is to start the `express` server on the port `3000` then use an `HTTP` library like the one that we use on the `weather` application and send a request from our code then we can make `assertions` if the response is correct or not; the other way is to use a module that the `express` team that make this easy to do called [supertest](https://www.npmjs.com/package/supertest). This last approach is what we are going to use.

- On your terminal go to the `task-manager` directory
- Install the `supertest` module using: `npm install supertest --save-dev`

The `supertest` module will take an existing `express` app and make requests to their endpoints but something important is that we don't need to `listen` to a `port` in order to make a functional `test` so `supertest` don't need that your server is up and running; it just need the `express` app that you define.

- On your editor; go to the `tests` directory
- Create a new file called `user.test.js`
- In this newly created file; require `supertest`

    `const request = require('supertest');`

    As a library convention, we use the `request` name for the `supertest` variable but can be whatever you want

Now we will need to get access to our `express` application but we want the app before `listen` is called and for the moment we can't do this because the app definition is in the same place as the `listen` call so we will need to do a little refactoring of the `index.js` file so we can get the `express` application without calling the `listen` method.

- Get to the `src` directory
- Create a new file called `app.js`
- Get to the `index.js` file
- Copy all the content of the file
- Paste the content of the `index.js` file on the `app.js` file
- Remove the `listen` method call and the `port` constant
- Now export `app` at the bottom of the file

    `module.exports = app;`

- Get to the `index.js` file
- Remove all require
- Require `app` at the top of the file

    `const app = require('./app');`

- Remove all the content except the `port` variable and the `listen` call
- Save the files

Now when we are on `development` we still call the `index.js` file as we always do but now if we want to get our `express` app without running the server for `testing` purposes we can do it by calling the `app.js` file.

- Get back to the `user.test.js` file
- Below the `supertest` require; call `app`

    `const app = require('../src/app');`

- At the bottom of the file; call the `test` function with a name for the `test` with an `async` function(We are going to `test` the `sign up` endpoint)

    `test('Should signup a new user', async () => {});`

- Now using `await`; call the `request` function and send the `app`

    ```js
    test('Should signup a new user', async () => {
        await request(app)
    });
    ```

Now we will need to pass what exactly we try to request and we do that using a function that helps us to specify what type of `HTTP` request we want and send to it the endpoint.

- Call the `post` method of `request` and send as an argument the `sign up` path

    ```js
    test('Should signup a new user', async () => {
        await request(app).post('/users')
    });
    ```

    The `supertest` module provides a function that represents each type of `HTTP` request


- Noe call the `send` method providing an object as an argument with all the `user` data that we need in order to create it

    ```js
    test('Should signup a new user', async () => {
        await request(app).post('/users').send({
            name: 'test',
            email: 'test@example.com',
            password: 'MyPass7771'
        })
    });
    ```

    The `send` method allows us to provide an object with the data that we need to send with the request

- Finally, we make an `assertion` using the `expect` method and in this case, we will check that we get a `201` status

    ```js
    test('Should signup a new user', async () => {
        await request(app).post('/users').send({
            name: 'test',
            email: 'test@example.com',
            password: 'MyPass7771'
        }).expect(201);
    });
    ```

- Save the files
- Go to your terminal and run the `MongoDB` instance using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On another tab of your terminal and run the `test` script
- You should see all the `tests` passed
- Go to `Mongo Compass`
- Connect to the `localhost`
- You should see that you have 2 databases
- Get to the `user` collection on the `test` database
- You should see the data that you use on the `test`

We achieve all that we want but there is a problem that we need to address now. Let's check it

- On your terminal; use the `w` option
- Press `a` to run all `test`
- You should see that now your new `test` is failing

This is because we already save a `user` with that `email` on the database so we will need to make sure that we begin with a clean database each time that we run the `test` for the app. To fix this we will need to use the `jest lifecycle methods` that will allow us to clean our database so our `test` cases run consistently and execute as expected.

- Get to the `user.test.js` file
- Below the `sign up test`; use the `beforeEach` function to send a function

    `beforeEach(() => {});`

    `Jest` provide us with this function so it will be available for all our `test` files like the `test` function that we use before. This function will run for each `test` case on the file at this moment we will run just once because we have just one `test`

- Log a message on the newly created function

    ```js
    beforeEach(() => {
        console.log('beforeEach');
    });`
    ```

- Below the `beforeEach` function; call the `afterEach` function send a function and log a message like we did before

    ```js
    afterEach(() => {
        console.log('afterEach');
    });
    ```

    This will run after each `test` case that we have on the file

- Save the file
- On your terminal; you should see that the `test` still falling and you'll see that we have the logs that we just added

As you see these functions will help us to set or unset things that our `tests` cases need but for this example we will only need the `beforeEach` function so let's get to add what we need to this function.

- Get to the `user.test.js` file
- Remove the `afterEach` function
- Remove the log of the `beforeEach` function
- Require the `User` model after the `app` require

    `const User = require('../src/models/user');`

- Mask as `async` the function that we send on the `beforeEach` function

    `beforeEach(async () => {});`

- Use the `deleteMany` method of `User`(Remember to use `await`)

    ```js
    beforeEach(async () => {
        await User.deleteMany();
    });
    ```

    Since we don't specify anything as a search criteria it will `delete` all `users` on the database

With this, we solve the issue that we have before because we always begin our `test` cases with an empty database so from now on we will need to have consistent data for our `test`.

- Save the file
- On your terminal; you should see that all the `test` passed

Now cleaning our database is a nice approach but there are other `test` like when we `test` the `logged in user` that we will nice to have some specific data that we can use for `testing` so we are going to `delete` all `users` and we will add a new `user` that we are going to use for all `test` that need an existing `user`.

- Get to the `user.test.js`
- After the `User` model require; create a new constant called `userOne` that its value will be an object with all the properties and values that a new `user` needs to be created(Need to be different than the data use on the `sign up test`)

    ```js
    const userOne = {
        name: 'Testing',
        email: 'testing@example.com',
        password: 'TestingPass!!'
    }
    ```

- On the `beforeEach` function; after the `deleteMany` call; save the `User` using the `userOne` data

    ```js
    beforeEach(async () => {
        await User.deleteMany();
        await new User(userOne).save();
    });
    ```

- Below the `sign up test`; call the `test` function with the following arguments(We are going to `test` the `login`)

    `test('Should signup a new user', async () => {}):`

- Inside of the function; call `request` sending the `app`

    ```js
    test('Should signup a new user', async () => {
        await request(app)
    }):
    ```

- Now call the `post` method of `request` sending the path of the `login`

    ```js
    test('Should signup a new user', async () => {
        await request(app)
            .post('/users/login')
    }):
    ```

- Then call the `send` method sending an object with an `email` and `password` using the `userOne` data

    ```js
    test('Should signup a new user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            })
    }):
    ```

- Finally; `expect` that we receive a `200` status

    ```js
    test('Should signup a new user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            }).expect(200);
    }):
    ```

- Save the file
- Get to your terminal
- You should see that all your `tests` are passing

Now we can continue `testing` the `login` endpoint when a `user` send bad credentials.

- Get to the `user.test.js` file
- At the bottom of the file; call the `test` function like this

    `test('Should not login nonexistent user', async () => {});`

- Call the `request` method sending the `app`; then call the `send` method with the `login` path

    ```js
    test('Should not login nonexistent user', async () => {
        await request(app)
            .post('/users/login')
    });
    ```

- Now call the `send` method; sending bad credentials(`user` that don't exist)

    ```js
    test('Should not login nonexistent user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: 'test@testing.com',
                password: 'testingPass'
            })
    });
    ```

- Expect a `400` status

    ```js
    test('Should not login nonexistent user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: 'test@testing.com',
                password: 'testingPass'
            }).expect(400);
    });
    ```

- Save the file
- Get to your terminal
- You should see that all `tests` are passing

## Testing with authentication

At this moment we `test` the `create user` endpoint that doesn't need previous data in order to work and the `login endpoint` that needs `user` data before it works; now we will `test` some of the endpoints that need an extra piece that is `authentication` like the `read profile` endpoint so we will need a `token` that `supertest` can access in order to work with these type of requests.

In order to achieve the goal of this section, we will update the `userOne` data by adding a `token` before we save it into the database this will allow having a valid `token` that we can use on the `tests` cases.

- On your editor; go to the `task-manager/tests/user.test.js` file

Now for the first step, we will need to create an `object id` for the `userOne` because we will need to know the `id` of the `user` ahead of time so we can create the `token`.

- Below the `supertes` require statement; require `jsonwebtoken` and `mongoose`

    ```js
    const jwt = require('jsonwebtoken');
    const mongoose = require('mongoose');
    ```

- Before the `userOne` contant; create a new constant call `userOneId` that it value will be a new instance of the `mogoose.Types.ObjectId` method

    `const userOneId = new mongoose.Types.ObjectId();`

    We create this new variable because we will need to use it in multiple places

- Now on the `userOne` object; add the `_id` property using the `userOneId` value as it value

    ```js
    const userOne = {
        _id: userOneId,
        name: 'Testing',
        email: 'testing@example.com',
        password: 'TestingPass!!'
    }
    ```

- Then add a new property called `tokens` that will have an `array` with a single object

    ```js
    const userOne = {
        _id: userOneId,
        name: 'Testing',
        email: 'testing@example.com',
        password: 'TestingPass!!',
        tokens: [{}]
    }
    ```

- Inside of the object that is on the `tokens` array; add a property call `token` that will have the value of the `jwt.sign` method and send an object with the `_id` of the `user` and the `JWT_SECRET` environment variable

    ```js
    const userOne = {
        _id: userOneId,
        name: 'Testing',
        email: 'testing@example.com',
        password: 'TestingPass!!',
        tokens: [{
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }]
    }
    ```

With this, we have a `token` associated with the `test user` that we can use on our `tests` cases. Let's begin with the first `test` case which will be the `read profile` endpoint.

- At the bottom of the file; call the `test` function with the following `test` name and an `async` function

    `test('Should get profile for user', async () => {});`

- Now call the `request` method sending the `app`

    ```js
    test('Should get profile for user', async () => {
        await request(app)
    });
    ```

- Then `send` the `/users/me` request and `expect` a `200` response

    ```js
    test('Should get profile for user', async () => {
        await request(app)
            .get('/users/me')
            .send()
            .expect(200)
    });
    ```

- Go to your terminal and run the `mongoDB` database using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On another tab of your terminal run the `test` script using `npm test`
- You should see that the new `test` failed

This is because we are not `authenticated` yet so we don't receive a `200` status on the response.

- Get back to the `user.test.js` file
- On the new `test` at the bottom of the file; before calling the `send` method; call the `set` method providing the following

    ```js
    test('Should get profile for user', async () => {
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
    });
    ```

    The `set` method receives 2 parameters that are the `header` that you want to set in this case `Authorization` and the value that will be sent for that `header` in this case the `Bearer token` associate with the `user`. We use `template string` to add the `token` value

- Save the file and get to the terminal
- You should see that all `test` is passing
- Get back to the `user.test.js`
- At the bottom of the file called the `test` function with the following `test` name with an `async` function

    `test('Should not get profile for unauthenticated user', async () => {});`

- On the new `test` function; call the `request` method sending the `app`

    ```js
    test('Should not get profile for unauthenticated user', async () => {
        await request(app)
    });
    ```

- Now `send` the request and `expect` a `401` status

    ```js
    test('Should not get profile for unauthenticated user', async () => {
        await request(app)
            .get('/users/me')
            .send()
            .expect(401)
    });
    ```

    Since we are not `authenticated` for this `test` case we will receive a `401` status on the response provided by the `auth` middleware

- Save the file
- Get to the terminal
- You should see that all `tests` are passing

Now we are going to work with the `delete user` endpoint `testing` the case that we successfully `delete` a `user` and one `unauthenticated user` that is trying to `delete` a `user`.

- Go to the `user.test.js` file
- At the bottom of the file called the `test` function with the following `test` name and with an `async` function

    `test('Should delete account for user', async () => {});`

- Call the `request` method send the `app`

    ```js
    test('Should delete account for user', async () => {
        await request(app)
    });
    ```

- Send a `delete` request to `/users/me` with the `Authorization` header and `expect` a `200` response

    ```js
    test('Should delete account for user', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
    });
    ```

- Save the file and get to the terminal
- You should see that all `test` is passing
- Get back to the `user.test.js` file
- At the bottom of the file create a new `test` for `unauthenticated users` that need want to use the `delete` endpoint

    ```js
    test('Should not delete account for unauthenticated user', async () => {
        await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
    });
    ```

- Save the file and get to the terminal
- You should see that all `tests` are passing
