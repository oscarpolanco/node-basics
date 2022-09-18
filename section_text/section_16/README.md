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

## WebSockets

We are going to be checking the `WebSocket` protocol which is the one that will help us to do real-time applications with `node.js`. The `WebSocket` protocol is not specific to `node.js` so you can use other programming languages. Before we begin to work on the application we will talk a little about `WebSockets`.

Like the `HTTP` protocol the `WebSocket` protocol will help us to set communication. Let's do an example in order to catch the idea of the `WebSockets`. In this example we are going to have a server that will be a `node.js` application and from there, clients can connect to that server for this example, we will have 4 clients but first, let's check some things about `WebSockets`:

- `WebSockets` allow for a `full-duplex` communication(Bidirectional communication) this means that the client can initiate communication with the server and vice versa thing that we don't have with the `HTTP` protocol on which the client needs to initiate the request asking for data and the server responds with the data but at any point of time the server can't initiate the communication to send data to the client. With `WebSocket` we have a persisting connection which means that the client connects to the server and stays connected as long as it needs to
- `WebSocket` is a separate protocol from the `HTTP` protocol which is why we see a different behavior
- Persistent connection between client and server

Let's see all of this in the example. First, we are going to ignore 3 clients and just work with 1 client and the server

```
*----------*
| Client 1 |
*----------*

             *--------*
             | Server |
             *--------*
```

The client will communicate with the server

```
*----------*
| Client 1 | ===> |Client -> Server|
*----------*      |My new message  |
            \
             *--------*
             | Server |
             *--------*
```

Remember that the communication can be bidirectional but in this case, is going from client to server. Using the `chat app` on the example; a `user` will type a message on input and submit this message that will send it to the server. At the moment that the server receives the message it can do nothing or a task that we set it to do when a message is received in our case we will bring the other 3 clients into the mix.

```
    |Client -> Server|
    |My new message  |
    /\
*----------*            *----------*
| Client 1 |            | Client 3 |
*----------*            *----------*
            \
             *--------*
             | Server |
             *--------*

*----------*            *----------*
| Client 2 |            | Client 4 |
*----------*            *----------*
```

So client 1 sends the message and the server receives the message; the next thing is to make sure that everyone connected to that `chat` room receives the message. After receiving the message the server will send the message to each client.

```
    |Client 1 -> Server|
    |My new message    |
    /\
*----------*            *----------*
| Client 1 |            | Client 3 |
*----------*            *----------*
            \           /
             *--------* =====> |Server -> Client 3|
             | Server |        |Other user message|
             *--------*
            /           \ =============> |Server -> Client 4|
*----------*           *----------*      |Other user message|
| Client 2 |           | Client 4 |
*----------*           *----------*
            \\
             |Server -> Client 2|
             |Other user message|
```

So each client will receive the message and render it on the browser this means that the server initiates communication with clients 2, 3,4 so here we have an application that all clients are connected to the server and can communicate in a bidirectional way.

## Getting started with Socket.io

In this section, we will begin to set the `chat` app and for this, we will begin setting the [socket.io](https://socket.io/) library on our `express` server. This library provides everything that we need to set up our server in our `node.js` scripts and it also provides client site code that we can use on the browser to communicate with the server.

- On your terminal; get to the `chat-app` directory
- Install the `socket.io` library using: `npm install socket.io`
- Start your local server using: `npm run dev`
- On your editor; go to the `chat-app/src/index.js` file

Before we can begin to use the `socket.io` library we will need to do a little refactor with the code that we already have so we can get a server that works with `express` and `socket.io`. This refactor is not going to change the behavior of our server is just a different way to configure `express`.

- Below the `path` module; import the `HTTP` module(Remember that this is a core `node` module so is already installed)

    `const http = require('http');`

- Below the `app` constant; create a new constant call `server` that is value will be the result of calling the `createServer` method of `HTTP` and sending `app` as its argument

    `const server = http.createServer(app);`

    The `createServer` method will allow us to create a web server. If we don't do this `express` will do this behind the scenes so we don't change the behavior of our current `express` server

- Now change `app` for `server` on the line that is calling the `listen` method

    ```js
    server.listen(port, () => {
        console.log(`Server is up on port ${port}!`);
    });
    ```

\- Save the file and go to the browser
- Get to http://localhost:3000/
- You should see the `Chat App` message

We don't change the behavior of our `express` server but we make it a lot easier to work with `socket.io`.

- Get to the `index.js` file
- Below the `express` definition; require `socket.io`

    `const socketIO = require('socket.io');`

- Now below the `server` constant; create a new constant call `io` that its value will be the result of the `socketIO` function sending the `server` as a parameter

    `const io = socketIO(server);`

    This function will help us to configure `socket.io` to work with a given `server` so this is why we need to do the refactor first because it expects the raw `HTTP` server and if `express` create it behind the scene we don't have access to it

At this point, we can configure the server to work with the client and the first thing that we are going to do is print a message when a given client connects to the server.

- Below the `app.use` line; call the `on` function of `io`

    `io.on();`

    The `on` function will help us to subscribe to an event and run a function every time this event occurs. In our case, we will run a function every time a `connection` event happens

- Add a `string` with the word `connection` as the first parameter of the `on` function and a function that logs a message as the second parameter

    ```js
    io.on('connection', () => {
        console.log('New WebSocket connection');
    });
    ```

- Save the file and go to your browser
- Refresh the page
- Get to your terminal and you should not see anything

This is because we are not connected to the server and in order to connect to our server we will need to load the client side of the `socket.io` library.

When we set the `socket.io` server(On the `io` constant creation) it will serve up that your client can access so we will need to make it accessible on the `index.html` file

- Get to the `public/index.html` file
- Below the `Chat App` message on the `body`; add a new `script` tag with the following `src`

    `<script src="/socket.io/socket.io.js"></script>`

    This `script` that we are loading is not a `script` of our creation so it doesn't exist anywhere on our public directory this is something that is served up because we configure our server to work with `socket.io`

- Now below the `socket.io.js` script tag; add another script tag with the following `src`

    `<script src="/js/chat.js"></script>`

    This will be a file of our creation(Which doesn't exist yet) that we are going to use the function that `socket.io` make available to us in the client


- On the `public` directory; create a `js` folder
- In this newly created folder; create a new file called `chat.js`
- On the `chat.js` file; call the `io` function

    `io();`

- Save the file and go to your browser
- Refresh the page
- Go to your terminal and you will see the message that you added to the `on` function

## Socket.io events

Now we are going to use `socket.io` to transfer data between the client and server in real-time. Here we will do a little side project in order to learn how to use the `socket.io`; this example will be a counter that store a number on the server and send it to all connected client then the client renders the number into the browser also the client will have an increment button that will increment the number that we receive from the server then send it to the server that will proceed to send the updated number to all other connected clients.

- On your editor; go to the `chat-app/src/index.js` file
- Below the `connection` event listener; create a new constant call `count` with a value of `0`
- In the function of the `connection` listener; add a parameter called `socket`

    `io.on('connection', (socket) => {...});`

    The `socket` parameter is an object and contains information about the new connection so with `socket` we can use functions to communicate with that specific client. Remember this function will run for each client that establish a connection

- Now on the function; call the `emit` function of `socket`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit();
    });
    ```

    When we are working with `socket.io` and want to transfer data; we are sending and receiving events. An event is made at least of one thing that is the name in this case we will create our custom one for the counter

- Send to the `emit` function a string for the event name and the name will be `countUpdated`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated');
    });
    ```

    This will be enough to send the event to the client but the client needs to receive the event

- Go to the `js/chat.js` file
- Store the return value of the `io` function on a constant call `socket`

    `const socket = io();`

- Now at the bottom of the file; call the `on` method of socket

    `socket.on();`

As we see before; the `on` function receives arguments; the `name` of the event and the function that will run when we event is triggered.

- Send the name of the event that we set on `index.js` as a first argument of the on function and as a second argument send a function

    `socket.on('countUpdated', () => {});`

    In order to get the event that we will send from the server, we will need to add the same name of the event that we set on the server

- On the function; render a message

    ```js
    socket.on('countUpdated', () => {
        console.log('The count has been updated!');
    });
    ```

- Save all the files
- Get to your terminal
- Go to the `chat-app` directory
- Run the `dev` script using: `npm run dev`
- On your browser go to http://localhost:3000/
- You should see the `Chat App` message
- Open the inspector
- Go to the `console` tab
- You should see that the `count updated` message renders

Now that we have to listen the event on the client we can send data from the server using this event.

- Go to the `index.js` file
- On the `emit` function, add `count` as a second argument

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated', count);
    });
    ```

    Everything that we pass after the event name will be available on the callback function on the client

- Go to the `chat.js` file
- Add `count` to the `on` callback function and add `count` to the message

    ```js
    socket.on('countUpdated', (count) => {
        console.log('The count has been updated!', count);
    });
    ```

    You can name the parameter as you like the only thing that matter is the order of the arguments that you have in the case you send more than one value from the `emit` function

- Save the files
- Go to the browser and refresh the page
- You should see on the console that the message renders and have the `count` value

Now we will need to send data from the client to the server and for this, we will have a button that will increment the value of the `count`.

- Go to the `index.html` file
- Below the `Chat App` message; add a number with the following

    ```html
    <body>
        Chat App
        <button id="increment">+1</button>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Go to the `chat.js` file
- At the bottom of the file; use the `querySelector` function of `document` and grad the button

    `document.querySelector('#increment')`

- Now chain the `addEventListener`; sending the `click` name and a function also console a message on the function

    ```js
    document.querySelector('#increment').addEventListener('click', () => {
        console.log('click');
    });
    ```

- Save the files
- Go to your browser and refresh the page
- You should see a button
- Click the button
- You should see the `click` message on the console

Now we are going to send data back to the server each time that we click the button that we just created.

- Go to the `chat.js` file
- On the `click` function; call the `emit` function of `socket` and send a new name for an event in this case we will use `increment`

    ```js
    document.querySelector('#increment').addEventListener('click', () => {
        console.log('click');
        socket.emit('increment');
    });
    ```

    Since the server knows the current `count` we don't need to send the actual `count` value from the client we just let the server know that we are going to increment the value that it already has

- Go to the `index.js`
- On the `connection` function; call the `on` function of `socket` and send the `increment` name and a function

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated');

        socket.on('increment', () => {}
    });
    ```

- Now on the `increment` function; increment the value of `count` by one

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated');

        socket.on('increment', () => {
            count++;
        }
    });
    ```

Now we will need to make sure that the client has the updated `count`

- Below the `count++` line; call the `emit` function of `socket` sending the `countUpdated` name and the `count` value

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated');

        socket.on('increment', () => {
            count++;
            socket.emit('countUpdated', count);
        }
    });
    ```

- Save all the files
- Get to your browser and refresh the page
- Click on the `increment` button
- You should see that you receive a message with the incremented `count` value
- Now open another browser(not tab; another window)
- Go to http://localhost:3000/
- Open the inspector and go to the console tab
- You should see a message with the updated `count` value
- Click on the `increment` button of the first browser
- You should see that you receive the updated `count` value just on the first browser

This is because when we use `socket.emit` on `index.js` for the `countUpdated` event; we are emitting the event to a particular connection but in this case, we want to emit it to all the available connections.

- Go to the `index.js` file
- Replace `socket` with `io` on the `increment` function

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('countUpdated');

        socket.on('increment', () => {
            count++;
            io.emit('countUpdated', count);
        }
    });
    ```

- Save the file
- Go and refresh both browsers
- Click the `increment` button on one of your browsers
- You should see that both browsers receive a message with the incremented `count` value
