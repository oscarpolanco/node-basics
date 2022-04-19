# Playground

This is a folder with some mini examples outside of the applications that are built on this repository. Each file will have it unique way to run the example so make sure to read this information to get them up and running.

## Requirements

- [NodeJs](https://nodejs.org/en/)

## Examples:

### 1. Storing data with JSON and the fs module

- On your editor; get to the `playground` directory and create a new file call `2-json.js`(Make sure to use that name)
- Add the following content
    ```json
    {"name":"test","planet":"Earth","age":"30"}
    ```
- Now get to your terminal
- Use `node` to run the `1-json.js` script: `node 1-json.js`
- You will see the following outputs
    ```bash
    {"title":"Ego is the enemy","author":"Ryan Holiday"}
    Ryan Holiday
    ```
- Get back to your editor and you will see a new `1-json.json` created
- Enter to the `2-json.json` file and you will see that it content update to:
    `{"name":"testing","planet":"Earth","age":"33"}`
- Now check the code on the `1-json.js` file and have some fun with it

### 2. ES6 arrow functions

- On your terminal; get to the `playground` directory
- Use `node` to run the `2-arrow-function.js` file: `node 2-arrow-function.js`
- You will have the following output of some different examples of `arrow` and `standards` functions behavior on different cases
    ```bash
    ===== Arrow functions =====
    9
    9
    9
    ===== Arrow functions =====

    ===== Functions as methods =====
    Guest list for Birthday party
    Guest list for undefined
    Guest list for Birthday party
    ===== Functions as methods =====

    ===== Arrow function biding =====
    Guest list for Birthday party
    Andrew is attending undefined
    Jen is attending undefined
    Mike is attending undefined
    Guest list for Birthday party
    Andrew is attending Birthday party
    Jen is attending Birthday party
    Mike is attending Birthday party
    ===== Arrow function biding =====
    ```

### 3. Another arrow function example

- On your terminal; get to the `playground` directory
- Use `node` to run the `3-arrow-challenge.js` file
- You will get logs of a set of `tasks` that are not completed yet. The `tasks` are defined on a `task` object inside of the `3-arrow-challenge.js` file
    ```bash
    [
        { text: 'Clean yard', completed: false },
        { text: 'Film course', completed: false }
    ]
    ```

### 4. Callback functions

- On your terminal; get to the `playground` directory
- Run the `4-callback.js` script with the following command: `node 4-callback.js`
- You should see 4 different examples of the `callback` pattern with the following output

    ```bash
    Two seconds are up
    { latitude: 0, longitude: 0 }
    5
    ```

### 5. ES6 Aside: Object property shorthand and destructuring

- On your terminal; get to the `playground` directory
- Run the `5-es6-object.js` script with the following command: `node 5-es6-object.js`
- You should see the following outputs

    ```bash
    { name: 'test', age: 27, location: 'Philadelphia' }
    { name: 'test', age: 27, location: 'Philadelphia' }
    Red notebook
    201
    5
    order Red notebook 201
    ```

### 6. HTTP requests without a library

- On your editor; go to the `playground` directory
- On this directory; create a new file call `keys.dev.js`
- Inside of this newly created file add the following(If you don't have a `weatherstack API key`; [here](https://weatherstack.com/) you can get a free `key`):

    ```js
    module.exports = {
        weatherstackAPIKey: 'your_weatherstack_api_key',
    };
    ```
- Now on your terminal; go to the `playground` directory
- Run the `6-raw-http.js` file using: `node 6-raw-http.js`
- You should see an object print with the `weather` information of `Cinnaminson` in the `United States of America`. All done with `node core modules`

### 7. ES6 Aside: Default functions parameters

- On your terminal; go to the `playground` directory
- Run the `7-default-params.js` file using `node 7-default-params.js`
- On your terminal; you will see:

    ```bash
    Hello Test
    Hello user
    order undefined 0
    order 2 Red notebook 201
    ```

### 8. Promises

- On your terminal; go to the `playground` directory
- Run the `8-promises.js` script
- You will see 2 messages after 2 seconds representing a `callback` pattern function and a `promise`
