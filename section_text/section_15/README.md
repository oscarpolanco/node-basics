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
