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

- Get to your terminal and run the `test` script: `npm run test`
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
