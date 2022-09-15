# Section 16: Real-Time web application with socket.io(Chat App)

In this section, we will make another application that will be called the `chat` application. With this `chat` application and other apps like it, we will need `real-time data transfer` so as soon the `user 1` send a message `user 2` will be able to see it with the little delay as possible so to get that done we will build a `real-time node.js` app using `web sockets` and we explore the `socket.io` library that is going to give us all we need to create a `real-time node.js` app.

## Creating the chat app project

We are going to begin to set the `chat app` on the basic level for now. We will create an `express` server and serve a `static` file that will live in its own directory. Let's get into it!!!

- Create a new directory called `chat-app`(Need to be outside of the other apps)
- Inside of this newly created directory; create a new folder called `src` and another called `public`
- Get to your terminal and go to the `chat-app` directory
- Init the `node` project using: `npm init`(Press enter for all options)
- You should see that a `package.json` is created on the `chat-app` directory
- Now install `express` using: `npm install express`
- Go to your editor and you should see that a `package-lock.json` is created and on the `package.json` the `express` module is added to the `dependency` section
- Now on the `src` directory; create a new file called `index.js`
- At the top of this newly created file; require `express`: `const express = require('express');`
- At the bottom of the file; create a constant call `app` that will have an `express` instance as its value

    `const app = express();`

- Below the `app` constant; create a new constant call `port` that its value will be the `process.env.PORT` value or `3000`

    `const port = process.env.PORT || 3000;`

As we mentioned before we will serve `static` content so we will need to configure `express` to serve these mentioned files that will live on the `public` directory.

- At the top of the file; require `path`: `const path = require('path');`

    Remember that `path` comes with `node` by default

- Below the `port` constant; create a new constant call `publicDirectoryPath` that its value will be the result of calling the `join` method of `path`

    `const publicDirectoryPath = path.join();`

- Now send the `__dirname`(which will give you the path of the current directory) and the path of the `public` directory as the second parameter

    `const publicDirectoryPath = path.join(__dirname, '../public');`

- Then use the `express static` middleware that will tell `express` that serve the `static` files on the `public` directory(We will create the file in a moment)

    `app.use(express.static(publicDirectoryPath));`

- At the bottom of the file; call the `listen` method of `app` sending the `port` value as the first argument and a `callback` function as the second argument logging a message that the server is running on a `port`

    ```js
    app.listen(port, () => {
        console.log(`Server is up on port ${port}!`);
    });
    ```

- Save the file
- On the `public` directory; create a new file called `index.html`
- In the newly created file add the following content:

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head></head>
        <body>
            Chat App
        </body>
    </html>
    ```

- Get to your terminal
- Run the `index.js` script using: `node src/index.js`
- You should see the log that you add on the `listen` method
- Go to your browser and get to http://localhost:3000/
- You should see the `Chat App` message

Now we are going to create the `scripts` that we are going to use to run our app on the terminal

- Get to your terminal and stop the server
- Install `nodemon` as a development dependency using: `npm install nodemon --save-dev`
- Go to the `package.json` file
- Get to the `scripts` section
- Remove the `test` script
- Add a new script call `start` that uses `node` to run the `src/index.js` file

    ```json
      "scripts": {
        "start": "node src/index.js"
    },
    ```

- Then add a `dev` script that uses `nodemon` to run the `src/index.js` file

    ```json
      "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js"
    },
    ```

- Save the file
- Get to the terminal and run the `start` script using: `npm start`
- Go to the browser and refresh the page
- You should see the `Chat App` message
- Go to your terminal
- Stop the server
- Now use the `dev` script using: `npm run dev`
- Go to your browser and refresh the page
- You should see the `Chat App` message
