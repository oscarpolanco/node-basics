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

After we practice a little bit of `socket.io` we can begin to work with the `chat app`.

- Get to the `public/js/chat.js`
- Remove all the code; except the `socket` constant definition at the top of the file
- On your editor get to the `index.js` file
- Remove all de code related to the `count app` example inside of the `connection` callback

At this moment we will send a `welcome` message to a new `user` so we will set an event that is triggered when a new `connection` appear. For the moment we just print the message on the browser console.

- Inside of the `connection` callback; call the `emit` function of `socket` sending the event name; in this case, will be called `message`, and the message that we want to send as a welcome message

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
    });
    ```

- Now get to the `chat.js` file
- Below the `socket` constant definition; call the `on` method of `socket` listening to the `message` event and printing the `message` that you receive

    ```js
    socket.on('message', (message) => {
        console.log(message);
    });
    ```

- Save both files
- Get to your browser and refresh the page
- Open dev tools
- You should see the `welcome` message

Now that we have a `welcome` message for all new connections we will set a `user` interface that will allow us to send a message to all the active `users` so we will need to set a `form` that the `user` can use to submit a message then create an event that the server can use to forward that message to all the current `users`.

- Get to the `index.html` file
- Remove the `count` button
- Now below the `Chat App` text; add a `form` tag with the following `id`

    ```html
    <body>
        Chat App
        <form id="message-form"></form>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Then inside of the `form`; add a `text input` with the `name` property set as a `name` and a `placeholder` with a message

    ```html
    <body>
        Chat App
        <form id="message-form">
            <input name="message" placeholder="Message" type="text" />
        </form>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Below the `input`; add a button

    ```html
    <body>
        Chat App
        <form id="message-form">
            <input name="message" placeholder="Message" type="text" />
            <button>Send</button>
        </form>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Get to the `chat.js` file
- Below the `message` event call; select the `form`

    `document.querySelector('#message-form');`

- Then add an `event listener` for the `submit` event of the `form` and add a callback function that receives the actual `event`

    `document.querySelector('#message-form').addEventListener('submit', (e) => {}):`

- Inside of the callback function calls the `preventDefault` function of the event in order to prevent the refresh of the page when you submit the `form`

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });
    ```

- Now we will `emit` an event called `sendMessage` that will grab the message on the `input`

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value);
    });
    ```

- Go to the `index.js` file
- Below the `message emit`; call the `on` function sending the `sendMessage` name and a callback that receives the actual message

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.on('sendMessage', (message) => {});
    });
    ```

- On the callback function; use `io` to `emit` the `message` event to all the other `users` sending the `message` that we receive

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
    });
    ```

- Save all files
- Go to your browser and refresh the page
- Now open another browser(Not tab; another window)
- Open the dev tools on both
- Type a message on one of the browsers
- Submit the `form`
- You should see that the `message` that you send using the `form` is on the console of the other browser

## Broadcasting events

We are going to check how to `broadcast` the events that will lead us to 2 practical features of our application will be a `message` sent to all `users` telling them that a new `user` connect to the application and a `message` to all active `user` that another `user` close its connection.

- Go to the `chat-app/src/index.js`

When we `emit` an event we can do it 2 ways until this moment is called the `emit` function of the `socket` that we receive on the `connection` callback that will `emit` the event to the current `socket` and the other is using the `io` object that we define that will send the event to all active connections. Now we will have a new way that is `broadcast` that will send the event to all active connection except the current `socket` so in our case when a `user` connect to the application we will send a message to all other `users` that a new `user` connect and the `user` that connect at that moment that triggers the event will not receive the message.

- On the `connection` callback; call the `broadcast.emit` function of `socket`; before the `sendMessage` event

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit();
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
    });
    ```

- Now send to the `emit` function the `massage` name and a `message` that will represent that the application has a new connection

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
    });
    ```

- Get to your terminal
- Go to the `chat-app` directory and run the server using: `npm run dev`
- Open 2 browser windows
- Open the dev tools on both browsers
- Get to http://localhost:3000/ in one of the browsers
- You should see the welcome message
- Go to http://localhost:3000/ on the second browser
- You should see the `new user` message on the console of the first browser

Now we will send a message when a `user` disconnects. To do this we will use another of the `socket.io` build events called `disconnect` this means that we don't need to `emit` this event because `socket.io` will take care of that for us.

- Go to `index.js`
- At the bottom of the `connection` callback; call the `on` function of `socket`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
        socket.on();
    });
    ```

- Send the `disconnect` event name(Need to match exactly with this string) and the callback function

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
        socket.on('disconnect', () => {});
    });
    ```

- Now use the `message` event to send a `user` disconnect message

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');
        socket.on('sendMessage', (message) => {
            io.emit('message', message);
        });
        socket.on('disconnect', () => {
            io.emit('message', 'A user has left!');
        });
    });
    ```

- Save the file
- Go to one of the browsers and open a new tab
- On that browser close the tab with the app
- Get to the other browser and refresh the page
- You should see the welcome message
- Go to the new tab of the other browser and go to http://localhost:3000/
- You should see the `user connect` message on the other browser
- Close the browser tab that you just opened
- You should see the `user left` message on the other browser

## Sharing your location

Now we will add a new feature to the `chat app` which is going to allow us to share our `location` with other `users`. To do this we will use a `client-side` script that will get the `location` using the browser's [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) which gives us a way to fetch the `location` assuming that the `user` they consent to share their `location`, so `Geolocation` will give us the `latitude` and `longitude` that we can send to the server then sharing with the other connected `users`.

- On your editor; get to the `chat-app/public/index.html` file

We will add another button that the `user` can click in order to share the `location`

- Below the `form`; add a `button` with the following `id`

    ```html
    <body>
        Chat App
        <form id="message-form">
            <input name="message" placeholder="Message" type="text" />
            <button>Send</button>
        </form>
        <button id="send-location">Send location</button>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Now get to the `js/chat.js` file
- Below the `#message-form` logic; select the newly created button and add a listener of the `click` event

    `document.querySelector('#send-location').addEventListener('click', () => {});`

The first thing we will need to do is to check if the current browser support `Geolocation` in order to avoid errors with old version browsers.

- On the `send-location` callback; add a condition that check if the `geolocation` object of `navigator` exists

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {}
    });
    ```

- Use `alert` with a message when `geolocation` is not supported(Remember to `return` in order to prevent the function continue it execution)

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }
    });
    ```

- Now below the condition; call the `getCurrentPosition` function of `navigator.geolocation`

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition();
    });
    ```

    The `getCurrentPosition` function will give us our current `location`. This function is `asynchronous` and takes some time to return the `location` and sadly it doesn't support the `promises` API so we can't use `async/await` so we will need to send a callback function that will have an object called `position` as is an argument

- Send a function that receive a `position` argument as parameter of the `getCurrentPosition` function

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition((position) => {});
    });
    ```

- Log the `position` object

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
        });
    });
    ```

- Save both files
- Get to your terminal
- Run your local server using: `npm run dev`
- Go to http://localhost:3000/ on your browser
- You should see the `send location` button
- Open dev tools
- Click on the `send location` button
- The browser will ask you that http://localhost:3000/ wants to know your location
- Click on allow(In some operating systems like macOS you will need to give some extras permissions)
- On the browser console; you will see the `position` after a couple of seconds

You will see that the `position` object has a `coords` property that has an object with a `latitude` and `longitude` properties that we will use.

- Get back to the `chat.js` file
- On the `getCurrentPosition` callback; remove the log
- Now `emit` an event called `sendLocation` sending an object with the `longitude` and `latitude`

    ```js
    document.querySelector('#send-location').addEventListener('click', () => {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    });
    ```

- Get to the `src/index.js` file
- Below the `sendMessage` event; call the `on` function of `socket` for the `sendLocation` event(Remember that the callback function will receive an object with the `latitude` and `longitude`)

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message) => {...});

        socket.on('sendLocation', ({latitude, longitude}) => {});

        socket.on('disconnect', () => {...});
    });
    ```

- Now use the `emit` function of `io` in order to `emit` the `message` event to all `users` sending the `longitude` and `latitude`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message) => {...});

        socket.on('sendLocation', ({latitude, longitude}) => {
            io.emit('message', `Location: ${latitude},${longitude}`);
        });

        socket.on('disconnect', () => {...});
    });
    ```

- Save all the files
- Open a new browser window and refresh the one that you already have open
- Click on the `send location` button on one of the browsers
- You should see on both consoles that you receive the `latitude` and `longitude`

Now we will change the `message` that we send when the `send location` button is clicked; we instead will send a `google map` URL with the `location`.

- Get to the `index.js` file
- On the `sendLocation` callback; update the `message` event string to the following

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message) => {...});

        socket.on('sendLocation', ({latitude, longitude}) => {
            io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`);
        });

        socket.on('disconnect', () => {...});
    });
    ```

    This `https://google.com/maps?q=` is the URL that will allow us to use `google map` and we just need to send the coordinates as query params

- Save the file
- Refresh both browsers
- Click the `send location` button on one of the browsers
- You should see a URL on both consoles
- Click on the URL
- Google maps should open with your location mark

## Event acknowledgment

We are going to check `event acknowledgment` on `socket.io`. As its name suggests an `event acknowledgment` allow the receiver of the event that it receives and process that event; an example in the application will be when we send a `message`; the client sends the `message` to the server but the client is not sure that the server receives the event but with the `event acknowledgment` the client will be notified that the `message` was delivered successfully. Here is a little resume of what is mentioned:

```
server (emit) -> client (receive) --acknowledgement--> server
client (emit) -> server (receive) --acknowledgement--> client
```

First; we will work with the `sendMessage` event emitted from the client. To set an `event acknowledgment` we will need to send a function as the last parameter of the `emit` function(Remember that you could have multiple arguments as data).

- On your editor; get to the `chat-app/public/js/chat.js`
- On the `sendMessage` emit; add a function as the last parameter of the `emit` function and on this function log a message

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value, () => {
            console.log('The message was delivered!');
        });
    });
    ```

- Go to the `src/index.js` file
- On the `sendMessage` callback; add a new argument called `callback`(Which can be named as you want)

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message, callback) => {...});

        socket.on('sendLocation', ({latitude, longitude}) => {...});

        socket.on('disconnect', () => {...});
    });
    ```

    The `callback` parameter will be called to `acknowledged` the event

- Use `callback` after the `message` event is emitted

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message, callback) => {
            io.emit('message', message);
            callback();
        });

        socket.on('sendLocation', ({latitude, longitude}) => {...});

        socket.on('disconnect', () => {...});
    });
    ```

- Save both files
- Get to your terminal and go to the `chat-app` directory
- Run your local server using `npm run dev`
- Open 2 browser windows and on both open the dev tools console
- Get to http://localhost:3000/ on both browsers
- Type a message on the input on one of the browsers
- Submit the message
- You should see that the other browser receives the message and the one that sends it to have the `delivered` message to `acknowledge` that the `message` event was received

When the server sends an `acknowledgment` to the client it can also choose to send some data and you can provide as many arguments as you like.

- Get to the `index.js` file
- On the `callback` call; send a message to the client

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Welcome!');
        socket.broadcast.emit('message', 'A new user has joined!');

        socket.on('sendMessage', (message, callback) => {
            io.emit('message', message);
            callback('Delivered');
        });

        socket.on('sendLocation', ({latitude, longitude}) => {...});

        socket.on('disconnect', () => {...});
    });
    ```

- Go to the `chat.js` file
- On the `callback` function send on the `sendMessage emit` function; add the new parameter in this case we will call `message`(Can be named as you want) and log that `message`

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value, (message) => {
            console.log('The message was delivered!', message);
        });
    });
    ```

- Save both files
- Refresh both browsers
- On one of the browsers; type a message and submit
- You should see on the browser that you send the message; the `acknowledge` message from the server

Another great example that we can use `event acknowledgment` is to `validate` something like the `message` that we are sending; in our case, we will avoid `messages` that contain some `profane language`. To do this we will use an `npm` module that will `filter` our `messages` called [bad-words](https://www.npmjs.com/package/bad-words).

- Get to your terminal and stop your local server
- Now install the `bad-words` module using: `npm install bad-words`
- Run your local server again
- Get to the `index.js` file
- Require the `bad-words` module below `socketIO`

    `const Filter = require('bad-words');`

    On the documentation, we see that `Filter` is the that we use on the required

- On the `sendMessage` callback; create a new constant called `filter` that will be a new instance of `Filter`

    ```js
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        io.emit('message', message);
        callback('Delivered');
    });
    ```

In order to check for profane language `bad-words` give us a method called `isProfane` and that function will return `true` or `false` depending if what you send is on a pre-build list of the module(You can add your own bad word).

- Below the `filter` constant; add a condition that checks if `message` is a `bad word`

    ```js
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {}

        io.emit('message', message);
        callback('Delivered');
    });
    ```

- Now if `message` is a `bad word` return the `callback` function sending an `error` message

    ```js
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', message);
        callback('Delivered');
    });
    ```

- Then remove the `string` on the second `callback` call

    ```js
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', message);
        callback();
    });
    ```

- Get the `chat.js` file
- Change the name of the argument on the function send on the `sendMessage emit` to `error` and remove the console

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value, (error) => {});
    });
    ```

- Then make a condition that checks if `error` exists and if it does return a console that prints `error`

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value, (error) => {
            if (error) {
                return console.log(error);
            }
        });
    });
    ```

- If there is no `error`; console a `delivered` message

    ```js
    document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
        socket.emit('sendMessage', e.target.elements.message.value, (error) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message delivered!');
        });
    });
    ```

- Save both files
- Refresh both browsers
- On one of the browsers; type a message and submit
- You should see the `message` on both console and `message delivered` on the one that submits the `message`
- Now type `hell` on the input and submit
- You should see on the console of the browser that you submit the `message` that `profanity is not allowed` message

Now we can `acknowledge` the `send location` event.

- Get to the `chat.js` file
- On the `sendLocation` emit function; send a new function that logs that the `location` is received

    ```js
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!');
        });
    });
    ```

- Get to `index.js`
- On the `sendLocation` callback; add a new parameter called `callback` and call it below the `emit`

    ```js
    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`);
        callback();
    });
    ```

- Save both files
- Refresh all browsers
- Click the `send location` button on one of the browsers
- You should see the `location` link on both consoles and the `location shared` message on the browser that you clicked the button

## Form and button states

Now we are going to work a little bit on the `form` to be more helpful to the `user`. Here we will remove the `message` from the `input` when the `form` is submitted also we are going to disable the `send` and `send location` buttons until we receive the `acknowledgment` of the events and we will `focus` the `input` when the `form` is submitted.

- On your editor; go to the `chat-app/public/js/chat.js` file

First; we will create variables that contain the elements that we need to select from the `DOM`.

- Below the `socket` definition; add a new constant called `$messageForm`(We use `$` as a convention that means that this is an element of the `DOM`) that its value will be the `form` element

    `const $messageForm = document.querySelector('#message-form');`

- Now create new constants called `$messageFormInput` and `$messageFormButton` that it values will be the `input` and `button` of the `form`

    ```js
    const $messageFormInput = $messageForm.querySelector('input');
    const $messageFormButton = $messageForm.querySelector('button');
    ```

Now we will `disable` the `button` of the `form` when is submitted.

- Change the `#message-form` selection on the line that we add the `event listener` and use the `$messageForm` variable

    `$messageForm.addEventListener('submit', (e) => {...});`

- Now on the callback function; below the `preventDefault` call; use the `setAttribute` method of `messageFormButton`

    ```js
    $messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute();

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {...});
    });
    ```

    The `setAttribute` method will allow you to add an `attribute` to an element sending the name on the `attribute` and its value; in this case `disabled`

- Send `disabled` as the `attribute` that we are going to add and the same string as its value

    ```js
    $messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {...});
    });
    ```

At this moment the `button` is `disable` when we submit the `form` but still in this state until you refresh the page so we will need to `re-enable` the `button` and the perfect moment to do that is when the `sendMessage` event is `acknowledge`.

- On the top of the `sendMessage` callback; use the `removeAttribute` method of `$messageFormButton` sending `disabled` as parameter

    ```js
    $messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {
            $messageFormButton.removeAttribute('disabled');

            if (error) {...}

            console.log('Message delivered!');
        });
    });
    ```

    The `removeAttribute` method will remove the `attribute` that you specify on the parameter that you send

- Save the file
- Get to your terminal and go to the `chat-app` directory
- Run your local server using: `npm run dev`
- On your browser; go to http://localhost:3000/
- Open dev tools
- Type a `message`
- Click the `send` button
- You should see a quick `disable` effect and it will be `enable` when you get the event `acknowledge` on the browser

Now we will need to clean the `input` when the `message` is sent.

- Below the `removeAttribute` line; use the `value` property of `$messageFormInput` and add a empty string value

    ```js
    $messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.value = '';

            if (error) {...}

            console.log('Message delivered!');
        });
    });
    ```

Then we will `focus` the `input` when we submit the `form`

- Below the `$messageFormInput.value` line; call the `focus` method of `$messageFormInput`

    ```js
    $messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.value = '';
            $messageFormInput.focus();

            if (error) {...}

            console.log('Message delivered!');
        });
    });
    ```

- Save the file
- Go to your browser and refresh the page
- Type a message and submit
- You should see that the input is clean
- Now type another message
- Click on another part of the page
- Then click the `send` button
- You should see that the `focus` get to the input

Finally, we will `disable/enable` the `send location` button as we did with the `send` button

- Create a constant called `$sendLocationButton` with the other variables that select the `send location` button

    `const $sendLocationButton = document.querySelector('#send-location');`

- Now get to the `#send-location` listener and use the variable instead of selecting the button with `document`

    `$sendLocationButton.addEventListener('click', () => {...});`

- Below the `navigation` condition; call the `setAttribute` method of `$sendLocationButton` and `disable` the button

    ```js
    $sendLocationButton.addEventListener('click', () => {
        if (!navigator.geolocation) {...}

        $sendLocationButton.setAttribute('disabled', 'disabled');

        navigator.geolocation.getCurrentPosition((position) => {...});
    });
    ```

- Now `enable` the button on the `sendLocation` callback

    ```js
    $sendLocationButton.addEventListener('click', () => {
        if (!navigator.geolocation) {...}

        $sendLocationButton.setAttribute('disabled', 'disabled');

        navigator.geolocation.getCurrentPosition((position) => {
                socket.emit('sendLocation', {...}, () => {
                $sendLocationButton.removeAttribute('disabled');
                console.log('Location shared!');
            });
        });
    });
    ```

- Save the file and get to the browser
- Refresh the page
- Click on the `send location` button
- You should see that the button `disable` then `enable` when you get the `location`

## Rendering messages

At this moment we can render the `messages` on the browser's page instead of the console of dev tools. For this, we will use [mustache](https://github.com/janl/mustache.js) which allows us to define `HTML` templates and render them with our data using `js`.

- On your editor; go to the `chat-app/public/index.html`
- In the `body` tag; add the following `script` tag

    ```html
        <body>
        Chat App
        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

    This is a `cdn` for `mustache` but you can download the script and put it in the `public` directory instead of this

When you define a `template` you can render it as many times as you need to. Now let's create our first `template`.

- Below the `send location` button; add a `script` tag with the following `id` and `type`

    ```html
        <body>
        Chat App
        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Inside of the `script` tag add a `div` that has a `p` tag with a message inside of it

     ```html
        <body>
        Chat App
        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html">
            <div>
                <p>This is a message</p>
            </div>
        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

With this `script` tag we can use `mustache` to render the `HTML` on the page but we still don't have a place to put the data so we will create an element that will store all the `messages` that we are going to render

- Now below the `Chat App` title on the `body`; add a `div` with the following `id`

     ```html
        <body>
        Chat App

        <div id="messages"></div>

        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html">
            <div>
                <p>This is a message</p>
            </div>
        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

We still don't have any visible change on the page but we can begin to change this on `chat.js` so we can add the `template` dynamically. The place on `chat.js` makes sense for us to work with the `template` logic on the `message` event callback because every time a `message` get to the `user` we will add it to the `messages` div.

- Get to the `js/chat.js` file

In order to render the `template`, we will need 2 things; the `template` itself and the place where I will put the `template`

- Create a new variable call `$messages` and select the `messages` div; below the `$sendLocationButton` constant

    `const $messages = document.querySelector('#messages');`

- Below of the `$messages` variable; create a new constant call `$messageTemplate` that select the `script` tag

    `const $messageTemplate = document.querySelector('#message-template')`

We actually need the `HTML` inside of the `script` tag so we will need to use the `innerHTML` property on the `$messageTemplate` constant

- Use the `innerHTML` when you select the `script` on the `$messageTemplate` constant

    `const $messageTemplate = document.querySelector('#message-template').innerHTML;`

- On the `message` callback; create a new constant call `html` that its value will be the result of the `render` function of the `Mustache` instance

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render();
    });
    ```

    Since we added a `mustache` cdn we have available an instance of `mustache` on our script file and when we use the `render` function we actually compile the `HTML` that we send to it

- Send `$messageTemplate` as argument of the `render` function

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate);
    });
    ```

Now we will need to add the `html` on the `messages` div and we can use the `insertAdjacentHTML` function

- Below of the `html` constant; use the `insertAdjacentHTML` function on the `$messages` variable

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate);
        $messages.insertAdjacentHTML();
    });
    ```

    The `insertAdjacentHTML` function receives two arguments; the position that the data will be added and can be one of these options:

    - afterbegin: Will add the new element at the top of the current element. In our case just after the open `div` tag
    - afterend: Will add the new element after the current element closes it. In our case will be after the close `</div>` tag
    - beforebegin: Will add the element before the open tag of the current element. In our case before the open `div` tag 
    - beforeend: Will add the element before the closing tag of the current element. In our case before the closing `</div>` tag

    The other argument is the actual `HTML` that you will add

- Send `beforeend` as first argument of the `insertAdjacentHTML` function and the `html` value as the second

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate);
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

    This will add the `message` to the `messages` div and each time that a `message` is added will be at the bottom of the div

- Save the file
- On your terminal; go to the `chat-app` directory
- Run your local server using: `npm run dev`
- On your browser go to http://localhost:3000/
- You should see the `template` message on the page
- Type a `message` on the input and submit
- You should see the `template` message twice(Each time you submit a `message` will add again)

Now we will change the `message` on the `template` on which we will add the data that we receive on the `message` event callback. On `mustache` there is a way of placing dynamic data on the `template` and that is adding a variable(That you will send the value from your `js`) and adding it on double curly braces.

- Get to the `index.html`
- On the `script` template; remove the content of the `p` tag
- Add the following as content of the `p` tag

    ```html
    <script id="message-template" type="text/html">
        <div>
            <p>{{message}}</p>
        </div>
    </script>
    ```

- Now get to the `chat.js` file
- Get to the `message` event callback; and add an object as the second parameter of the `render` function

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {});
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

    On this object, we can set all the `key/value` pairs that we want and the `key` is the thing that we are going to be accessing from the template in this case `message`

- On the `render` object; add the `message` that we receive as an argument of the `message` event callback

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {
            message
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Save both files
- Get to the browser and refresh the page
- You will see the `welcome` message
- Type a `message` and submit
- You should see that the `message` will appear before the input

## Rendering location messages

Now we will render the `location` of the `user` on the page like the `message` when we submit the `form` but we will need to actually render an `a` tag element with a `message` and dynamically add the `URL` that we receive. Instead of using the same `message` event, we will create a separate event exclusive to the `location`.

- On your editor; go to the `chat-app/src/index.js`
- Get to the `sendLocation` callback and replace the `message` event that is emitted for a new event called `locationMessage`
- Go to the `public/js/chat.js` file
- Below the `message` event; receive the `locationMessage` event that receives a `url` and log that `url`

    ```js
    socket.on('locationMessage', (url) => {
        console.log(url);
    });
    ```

- Save both files
- On your terminal; get to the `chat-app` directory and run your local server using: `npm run dev`
- In your browser go to http://localhost:3000/
- Open dev tools
- Click the `send location` button
- You should see after a little time the `location` URL

Now that we have a separate event for the `location` we can render a different `template` for the `location` so we will create a new `template` with the `a` tag and add it as the last element of the `messages` div each time you click the button.

- Go to the `index.html` file
- Below the `message-template` template; add the following `template` that uses the `url` variable on an `a` tag

    ```html
    <script id="location-message-template" type="text/html">
        <div>
            <p>
                <a href="{{url}}" target="_blank">My current location</a>
            </p>
        </div>
    </script>
    ```

    We use the `target` property to open a new tab when you click the link

- Get to the `chat.js` file
- Below `$messageTemplate`; add a new constant call `$locationMessageTemplate` that select the `html` of the `location-message-template`

    `const $locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;`

- On the `locationMessage` callback; create a constant call `html` that its value will be the result of calling the `render` function of `Mustache` sending the `$locationMessageTemplate` value and the object with a `url` property

    ```js
    socket.on('locationMessage', (url) => {
        console.log(url);
        const html = Mustache.render($locationMessageTemplate, {
            url
        });
    });
    ```

- Then add the `html` content at the bottom of the `messages` div

    ```js
    socket.on('locationMessage', (url) => {
        console.log(url);
        const html = Mustache.render($locationMessageTemplate, {
            url
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Save both files
- Go to the browser and refresh the page
- Click the `send location` button
- After a little time you should see the `current location` link before the `form input`
- Click on the link
- A new tap should open with `google maps` and your `location`

## Working with time

We will continue integrating `time` into the application. Each time we see get a `message` on our application we also receive the `time` which it was sent so we will see how to generate a `timestamp`; how to transfer between client and server and how to format the `timestamp` on a useful way that we can show on the client.

We first; focus on how to build a `timestamp` and for this, we can use built-in `js` functionality. Let's test some of this functionality 

- Go to the browser and open the dev tools
- On the console; create a constant that its value will be the following

    `const now = new Date()`

    Calling the `Date` constructor will generate a new `Date` object that represents a point in time when we generate the code

- Click enter to create the `now` constant

Now we have access to all the functions that `Date` provide and store the moment of time that the `Date` constant was created. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a resume of the `Date` functions that you have available 

- Now call the `toString` function and click enter

    `now.toString()`

- A string representation of the current time and when are we in the world(We are not going to share all this information with the client we will format it)
- Use the `getDate` method and click enter

    `now.getDate()`

    The `getDate` method allows you to extract the day of the month. They are other functions that will allow extracting other parts of the `date`

- You should see the `day` of the current `date`
- Now use the `getTime` method and click enter

    `now.getTime()`

- You should see a big number

This number is a `timestamp` that is the representation of a point of time of the current `date` and actually is the number of milliseconds since `January 1st midnight of 1970`(This point of time is known as `Unix epoch`) so the number `0` represents that point of time; a negative number represents some point at the past of that date and a positive number represent the future of that point of time. The `timestamps` are great for transferring it between systems and are universally understood across all programming languages.

We will generate the `timestamp` of each `message` on the server then send it with the `message` to the client then when the client receives the `message` and `timestamp`(We will format it to be understandable for the `user`) it will render on the page.

At first; we will concentrate on the `message` event on the `src/index.js` file. As you see we use the `message` event multiple times and as mentioned we will send the `timestamp` with each `message` this means that we will have some duplicate code so we will build a new function that helps us to generate the `timestamp` and associate with the current `message` on an object. Why an object? Because will have all data related to a `message` on a single object instead of having multiple parameters on the `emit` functions.

- On your editor; create a new folder called `utils` inside of the `src` directory
- In this newly created directory; create a new file called `messages.js`
- On this new file; create a new function called `generateMessage` that receives a variable called `text`

    `const generateMessage = (text) => {}`

- Return an object with the `text` and a property called `createdAt` that its value will be the result of the `getTime` function of a new `Date` instance

    ```js
    const generateMessage = (text) => {
        return {
            text,
            createdAt: new Date().getTime()
        }
    }
    ```

- Export the `generateMessage` function

    ```js
    module.exports = {
        generateMessage
    }
    ```

- Get to the `index.js` file
- Import the `generateMessage` function below `Filter`

    `const { generateMessage } = require('./utils/messages');`

- Update each `message` event call to use the `generateMessage` function always sending the `message`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.emit('message', generateMessage('A new user has joined!'));

        socket.on('sendMessage', (message, callback) => {
            const filter = new Filter();

            if (filter.isProfane(message)) {...}

            io.emit('message', generateMessage(message));
            callback();
        });

        socket.on('sendLocation', ({latitude, longitude}, callback) => {...});

        socket.on('disconnect', () => {
            io.emit('message', generateMessage('A user has left!'));
        });
    });
    ```

- Get to `public/js/chat.js` file
- Update the object of the `render` function of the `message` event to use the new property

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {
            message: message.text
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Save all files
- On your terminal; get to the `chat-app` directory
- Run your local server using: `nom run dev`
- On your browser go to http://localhost:3000/
- You should see the `welcome` message

Now that we prove that the application works as before we can continue adding the `timestamp` of the `message`.

- Get to the `public/index.html`
- On the `message-template` template update the content of the `p` tag like this

    ```html
    <script id="message-template" type="text/html">
        <div>
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
    ```

    We don't send the `createdAt` value yet

- Go to the `chat.js` file
- On the `render` function of the `message` event; add a new property to the object called `created` that takes its value of the property of the same name of `message`

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {
            message: message.text,
            createdAt: message.createdAt
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Save the files
- Refresh the page
- You should see the `welcome` message with the `timestamp` value

The `timestamp` value is not useful for humans so we will need to format it and this is when the [moment.js](https://momentjs.com/) library will enter into action. `Js` does provide infrastructure for working with `dates` but is not very good on the format which is why we will use `moment.jS`. Like `mustache` we will use a `cdn` for `moment.js`

- Get to the `index.html` file
- On the `body` tag; add the following `script`

    ```html
    <body>
        Chat App

        <div id="messages"></div>

        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html">...</script>

        <script id="location-message-template" type="text/html">...</script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

In our case, we will use a very small part of the `moment.js` features in our case `display`.

- On your browser go to https://momentjs.com/docs/#/displaying/

You will see that `moment` provide a `format` function that can we use to send a `string` or not. This `string` will be a pattern of `tokens` that allows us to set how the `date` will show up. As you see on the table of `token` we have different ways that we can present each part of the `date`.

- Go to the `chat.js` file
- Remove the `createAt` value on the `message` event `render` function
- Add the `moment` function as it value sending the `message.createdAt` as it parameter

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {
            message: message.text,
            createdAt: moment(message.createdAt)
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Then call the `format` function sending the following string

    ```js
    socket.on('message', (message) => {
        console.log(message);
        const html = Mustache.render($messageTemplate, {
            message: message.text,
            createdAt: moment(message.createdAt).format('h:mm a')
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

    - `h`: This means that we will show the `hour` without padding on the front. This `hh` will add padding so we always have 2 characters
    - `:`: Is not a special `token` so it will show as it is
    - `mm`: Will show the `minute` with padding so we always have 2 characters
    - `a`: Will show `am/pm` on the lowercase version

- Save the file
- Go to http://localhost:3000/
- You should see the `welcome` message with the current hour

Now we are going to do the same with the `location` message.

- Go to the `src/utils/messages.js` file
- Below the `generateMessage` function; add a new function called `generateLocationMessage` that receive a `URL` and return an object with the `URL` and a `timestamp`

    ```js
    const generateLocationMessage = (url) => {
        return {
            url,
            createdAt: new Date().getTime()
        }
    }
    ```

- Export `generateLocationMessage`

    ```js
    module.exports = {
        generateMessage,
        generateLocationMessage
    }
    ```

- Go to `index.js`
- Import the `generateLocationMessage` function

    `const { generateMessage, generateLocationMessage } = require('./utils/messages');`

- Get to the `sendLocation` callback and use the `generateLocationMessage` sending the `url` on the `locationMessage` emit function

    ```js
    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${latitude},${longitude}`));
        callback();
    });
    ```

- Go to the `chat.js` file
- On the `locationMessage` callback; add the new properties as arguments of the function

    `socket.on('locationMessage', ({ url, createdAt }) => {...});`

- Change the log message to print the `url`
- On the `render` function; send an object with the `url` and a new property call `createdAt` that is value will be the format version of the `createdAt` argument using `moment`

    ```js
    socket.on('locationMessage', ({ url, createdAt }) => {
        console.log(url);
        const html = Mustache.render($locationMessageTemplate, {
            url,
            createdAt: moment(createdAt).format('h:mm a')
        });
        $messages.insertAdjacentHTML('beforeend', html);
    });
    ```

- Go to the `index.html` file
- Add the `createdAt` variable on the `location-message-template` on the `p` tag before the `anchor`

    ```html
    <script id="location-message-template" type="text/html">
        <div>
            <p>
                {{createdAt}} - <a href="{{url}}" target="_blank">My current location</a>
            </p>
        </div>
    </script>
    ```

- Save all the files
- On your browser refresh the page
- Click on the `send location` button
- After a few seconds you should see the `location` link with the `timestamp`

## Styling the Chap App

We will integrate some `styles` to the `chat-app` but will create all `styling` from zero; you will download the file on this repo then we change the `HTML` structure.

- Go to https://github.com/oscarpolanco/node-basics/tree/master/chat-app/public/css/style.css
- Copy all content
- On your editor; go to the `chat-app/public` directory
- Create a new folder called `CSS`
- On the newly created folder; create a new file called `style.css` and paste the content that you get before
- Now go to https://github.com/oscarpolanco/node-basics/tree/master/chat-app/public/image/
- Download the file
- On the `public` directory; create the new folder called `img`
- Put the `image` that you just download on the `img` folder
- Now get to the `index.html` file
- On the `head` tag; add a `title` tag with the page `title`

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Chat App</title>
        </head>
        <body>...</body>
    </html>
    ```

- Now `link` the `favicon` and `stylesheet`

    ```html
    <head>
        <title>Chat App</title>
        <link rel="icon" href="/img/favicon.png">
        <link rel="stylesheet" href="/css/styles.css">
    </head>
    ```

- Save the file
- On your terminal; go to the `chat-app`
- Run your local server using `npm run dev`
- Go to http://localhost:3000/
- You should see some `styling` on the page and the `title` with the `favicon`

We still need to change the structure of the page in order to have all the `styling` apply to all the elements and we will add some new elements that will need some re-ordering of the page.

- On the `body` tag; remove the `chat app` title

Now we will add some elements to create the `layout` that we want on which we will have a `sidebar` on one side of the page and the `messages` with the `form` on the other side.

- At the top of the `body` tag; add a new `div` with a `chat` class

    ```html
    <body>
        <div class="chat"></div>
        <div id="messages"></div>

        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html">...</script>

        <script id="location-message-template" type="text/html">...</script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

    This will be the container of the `app`(we don't need to include the `templates`)

- Inside of the `chat` div; add 2 new `div` one with a class called `chat__sidebar` and the other with a class called `chat__main`

    ```html
    <body>
        <div class="chat">
            <div class="chat__sidebar"></div>
            <div class="chat__main"></div>
        </div>
        <div id="messages"></div>

        <form id="message-form">...</form>
        <button id="send-location">Send location</button>

        <script id="message-template" type="text/html">...</script>

        <script id="location-message-template" type="text/html">...</script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

    These 2 `div` will contain the `sidebar` and all the `main` content of the page; for the moment the `sidebar` will be empty the moment

- Now cut all other elements except the `scripts` tags and paste them on the `main` div

    ```html
    <body>
        <div class="chat">
            <div class="chat__sidebar"></div>
            <div class="chat__main">
                <div id="messages"></div>

                <form id="message-form">...</form>
                <button id="send-location">Send location</button>
            </div>
        </div>

        <script id="message-template" type="text/html">...</script>

        <script id="location-message-template" type="text/html">...</script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
    ```

- Save the file
- Refresh the page
- You should see the `sidebar` and the other content a side

Now we will change the structure of the elements on the `main` div on which we will add the `form` to the bottom of the page and the `messages` take all the space left on the page.

- On the `messages` div; add a class called `chat__messages`

    ```html
    <div class="chat">
        <div class="chat__sidebar"></div>
        <div class="chat__main">
            <div id="messages" class="chat__messages"></div>

            <form id="message-form">...</form>
            <button id="send-location">Send location</button>
        </div>
    </div>
    ```

- Below the `messages` div; create a new `div` with a class called `compose`

    ```html
    <div class="chat">
        <div class="chat__sidebar"></div>
        <div class="chat__main">
            <div id="messages" class="chat__messages"></div>

            <div class="compose"></div>

            <form id="message-form">...</form>
            <button id="send-location">Send location</button>
        </div>
    </div>
    ```

    Is `compose` because we will have the `form` that `compose` new `messages`

- Cut the `form` and `send location` button and paste it on the `compose` div

    ```html
    <div class="chat">
        <div class="chat__sidebar"></div>
        <div class="chat__main">
            <div id="messages" class="chat__messages"></div>

            <div class="compose">
                <form id="message-form">...</form>
                <button id="send-location">Send location</button>
            </div>
        </div>
    </div>
    ```

- Save the file
- Refresh the page
- You should see that the `welcome message` is at the top of the page and the `form` at the bottom
- Type a `message` and submit
- You should see that the new `message` is below the `welcome message` at the top of the page

This will be all setup that we need for the page structure but we need to do more `styling` for the `messages` in the `templates`.

- On the `message-template`; add a class called `message` on the container div

    ```html
    <script id="message-template" type="text/html">
        <div class="message">
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
    ```

Now we will need to change a little bit the `p` tag content because now we will have the name of the `user` that sends the `message`(a placeholder for the moment) with the `timestamp` and below the actual `message`.

- Add a new `p` tag with 2 `span` tags at its content

    ```html
    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span></span>
                <span></span>
            </p>
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
    ```

- On the first `span`; add the `message__name` class with a placeholder for the name of the `user`

    ```html
    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some user name</span>
                <span></span>
            </p>
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
    ```

- On the second `span`; add a class called `message__meta` with the `createdAt` variable as the content of the `span`

    ```html
    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some user name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p>{{createdAt}} - {{message}}</p>
        </div>
    </script>
    ```

- Remove the `createdAt` on the `p` tag of the `message`

   ```html
    <script id="message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some user name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p>{{message}}</p>
        </div>
    </script>
    ```

- Now copy the `message` div with all its content
- Paste the `message` div at the top of the `location-message-template`
- Remove the `createdAt` on the `p` tag of the `anchor`

    ```html
    <script id="location-message-template" type="text/html">
        <div class="message">
            <p>
                <span class="message__name">Some user name</span>
                <span class="message__meta">{{createdAt}}</span>
            </p>
            <p>
                <a href="{{url}}" target="_blank">My current location</a>
            </p>
        </div>
    </script>
    ```

- Save the file
- Refresh the page
- You should see the `welcome message` with the new `style`
- Click on the `send location` button
- You should see the `location message` with the new `style`

## Join page

Now we are going to set the `join page` on the `chat` application. On this page, the `user` will need to provide their `username` and the `room` that they like to join then submit the information that will redirect it to the `room`. We will need to create a new `HTML` file in order to have the `chat` that the `user` will be redirected to because the `index.html` file will be the `join` page because it will be the first page that the `user` see.

- On your editor; go to the `chat-app/public`
- Create a new file called `chat.html`
- Get to the `index.html` page
- Copy all the content
- Go to the `chat.html` file and paste the content that you just copied
- Get to the `index.html` file
- Remove all content of the `body` tag

Now we can concentrate on creating all the `markup` of the `join` page.

- On the `body`; create a new `div` with a `centered-form` class

    ```html
    <body>
        <div class="centered-form"></div>
    </body>
    ```

- Inside of the newly created `div`; create another with a `centered-form__box` class

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box"></div>
        </div>
    </body>
    ```

- Inside of the `centered-form__box` div; add a `h1` with a title for the `join` page

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
            </div>
        </div>
    </body>
    ```

- Save all the files
- On your terminal; go to the `chat-app` directory
- Run your local server using `npm run dev`
- On your browser go to http://localhost:3000/
- You should see a square on the middle of the page with the `Join` title
- Get back to the `index.html` file
- Add a `form` tag below the `h1`

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
                <form></form>
            </div>
        </div>
    </body>
    ```

- Inside of the `form` tag; add a `label` with a `display name` message and an `input text` that will have `username` as `name`; the same message of the `label` on the `placeholder` and the `required` property

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
                <form>
                    <label>Display name</label>
                    <input type="text" name="username" placeholder="Display name" required />
                </form>
            </div>
        </div>
    </body>
    ```

    The `required` property will use some `HTML 5` form validation to make sure that a value is typed in

- Below the `username` input; add a `label` with a `room` message and an `input text` that will have `room` as `name`; the same message of the `label` on the `placeholder` and the `required` property

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
                <form>
                    <label>Display name</label>
                    <input type="text" name="username" placeholder="Display name" required />
                    <label>Room</label>
                    <input type="text" name="room" placeholder="Room" required />
                </form>
            </div>
        </div>
    </body>
    ```

- Then at the bottom of the `form` tag; add a button to `join` the `chat`

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
                <form>
                    <label>Display name</label>
                    <input type="text" name="username" placeholder="Display name" required />
                    <label>Room</label>
                    <input type="text" name="room" placeholder="Room" required />
                    <button>Join</button>
                </form>
            </div>
        </div>
    </body>
    ```

This `form` will help us to get all the information that we need from the `user` but we need to be redirected to the `chat` page when the `user` submit the `form` and to make this we will use the `action` property

- On the `form` tag; add the `action` property with the `chat.html` path

    ```html
    <body>
        <div class="centered-form">
            <div class="centered-form__box">
                <h1>Join</h1>
                <form action="/chat.html">
                    <label>Display name</label>
                    <input type="text" name="username" placeholder="Display name" required />
                    <label>Room</label>
                    <input type="text" name="room" placeholder="Room" required />
                    <button>Join</button>
                </form>
            </div>
        </div>
    </body>
    ```

- Save the file
- Refresh the page
- You should see the `form` with all the styling
- Fill out the `form` and submit
- You should be redirected to the `chat` page and the `form` data is place a `query param` on the `URL`

## Socket.io rooms

We have a `join` page that will provide us with the `username` and the `room` then of the current `user` but currently, that data is not been used at the moment. In this section, we will gain access to the data provided by the `join` page from our client-side `js` and will learn about `rooms` on `socket.io` that will allow us to send messages to emit events to a specific set of connections in order words just the `users` on the same run.

First; we will need to get the `query` string from the `URL` and we can access that information using the `location` object on the client.

- Go to your terminal and get to the `chat-app` directory
- Run your local server using: `npm run dev`
- On your browser go to http://localhost:3000/
- Add a `username` and a `room` name
- Submit the form
- You should be redirected to the `chat` page and the `URL` should have the `query` string
- Open the console of the dev tools
- Type `location.search`
- Click enter
- You should see a string with the current `query` string

From the client site `js` we will parse the `query` string to get every piece of data and then send it to the server. For this, we will use the [qs](https://github.com/ljharb/qs?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library) library that will help us to parse the `query` string.

- On your editor; go to the `chat-app/public/chat.html` file
- Add the following `script` below the `moment script`

    `<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>`

- Get to the `js/chat.js` file
- Below of the `$locationMessageTemplate` constant; destructure the `username` and `room` from the `parse` function of `Qs`

    `const { username, room } = Qs.parse();`

    Since we add the `qs` cdn on the `chat.html` file we will have available the `Qs` object on our script. The `parse` function will take the `query` string and returns an object

- Send the `query` string as an argument on the `parse` function

    `const { username, room } = Qs.parse(location.search);`

Now, this alone won't remove the `?` of the `query` string so we will need to add an option in order to eliminate it.

- Add the following object as the second argument of the `parse` function

    `const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });`

Now we will send the `username` and `room` to the server emitting a new event.

- At the bottom of the `chat.js` file; call the `emit` function of `socket` sending an event called `join` and the `username` and `room` in an object as a second parameter

    `socket.emit('join', { username, room });`

- Go to the `index.js` file
- Below the `message` broadcast; call the `on` function of `socket` for the `join` event that will have a function that receives the `username` and `room`

    ```js
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', generateMessage('Welcome!'));
            socket.broadcast.emit('message', generateMessage(`A new user has joined!`));

        socket.on('join', ({ username, room }) => {});

        socket.on('sendMessage', (message, callback) => {...});

        socket.on('sendLocation', ({latitude, longitude}, callback) => {...});

        socket.on('disconnect', () => {...});
    });
    ```

Now we will use the `socket.io` features that will allow us to `join` a determined `room`.

- On the function of the `join` event; call the `join` function of `socket` and send the `room` name as an argument

    ```js
    socket.on('join', ({ username, room }) => {
        socket.join(room);
    });
    ```

    The `join` function will allow us to `join` in a determined `room` that we specify; this will allow us to `emit` events in a different way where we specific `emit` events to a specific `room`.

To this moment we see 3 ways to `emit` events:

- `socket.emit`: Send an event on a specific client
- `io.emit`: Send an event to all connected clients
- `socket.broadcast.emit`: Send an event to all connected clients except the current one

With `rooms` we will have 2 new ways to `emit` events:

- `io.to.emit`: Will `emit` an event to all clients in a specific `room`
- `socket.broadcast.to.emit`: Will `emit` an event to all clients except for the current one on a specific `room`

A quick note is that `to` is actually a function; we will check how we will use it next.

Now we will implement the first 2 events that we `emit` on the `connection` callback

- Cut the `emit message` and `broadcast message` event at the top of the `connect` callback
- Paste the line that you just cut below the `join` function call

    ```js
    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.emit('message', generateMessage(`A new user has joined!`));
    });
    ```

    We will fire those events when a `user` join a `room`

The first event that we are emitting here is ready to use because we send the `welcome message` to the individual `user` but the second will emit the event to all `users` in all the `rooms` except the one that just joins the `room` and we just want to `broadcast` the event to all `users` in the same `room` that the current `user` join; for this, we will use the `to` function

- After the `broadcast` call; call the `to` function sending the `room` as an argument

    ```js
    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`A new user has joined!`));
    });
    ```

- Remove the `broadcast` message and add another one that uses the `username`

    ```js
    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));
    });
    ```

- Save all the files
- On the open browser go to http://localhost:3000/
- Open a second browser and go to http://localhost:3000/
- On the first browser; fill the `form` and submit(Remember the `room` that you put)
- You should be redirected to the `chat` page
- On the second browser; type another `username`(different than the one you just before) and the same `room` that you use before and submit
- You should see the `username` of the second `user` on the first browser
- Now on the second browser open a new tab and close the first one and go to http://localhost:3000/
- Fill the `form` using the `name` of the second `user` that you use before and a different `room` that the one that you use before
- Submit the `form`
- You should not see the `join` message on the first browser

All other events still are sent to all `rooms` so we will need to specify the `room` on all of them but we don't have access to the necessary data outside of the `join` callback so we will need to do some changes to get the correct behavior.

## Storing Users

In order to take advantage of the new `room` feature that we just use; we will need to keep track of which `users` are on each `room` with which `username`. We will add some functions that will help us to track them and access that data later. We will create a new file to store all the functions that we are going to use for tracking then import those functions on the `index.js` file.

- On your editor; go to the `chat-app/src/utils` directory
- Create a new file called `users.js`

We will store all the active `users` on an `array` and then perform operations using the data of this `array`.

- At the top of the newly created file; create a constant call `user` that its value will be an empty `array`

    `const users = [];`

- Below the `users` array; create a new function called `addUser` that receives an object that has an `id`, `username`, and `room`

    `const addUser = ({ id, username, room }) => {}`

    The `username` and `room` come from the client but the `id` will be something associated with the individual `socket` so every single connection to the server has a unique `id` generated for it. At first, we will test this with numbers until we implement the functions on the `index.js` file

Now we will `clean` the data that we receive on the function; in this case, the `username` and `room` are provided by the client and we are going to `clean` all the extra spaces and make it `lowercase`.

- At the top of the `addUser` function; update `username` and `room` values using the `trim` and `toLowerCase` functions

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();
    }
    ```

Now we will make sure that the `username` and `room` exists.

- Below the `room` update; create a new condition that checks if `username` and `room` have a value. If there is no `username` or `room`; return an object with an `error` message

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {
            return {
                error: 'Username and room are required!'
            }
        }
    }
    ```

At this moment we make sure that we have the `username` and `room` to continue with the function execution so now we will make sure that the `username` is not taken on for the `room` that the `user` is joining.

- Below the condition; create a new constant called `existingUser` that value will be the result of the `find` function used on the `users` array and as an argument of `find`; add a function that receives `user`

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {
            return {
                error: 'Username and room are required!'
            }
        }

        const existingUser = users.find((user) => {});
    }
    ```

- Now inside of the `find` callback; return the result of the following condition

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {
            return {
                error: 'Username and room are required!'
            }
        }

        const existingUser = users.find((user) => {
            return user.room === room && user.username === username;
        });
    }
    ```

    We will return `true` when the current `user` is in same `room` as the one that is currently evaluated the `find` function and the `username` of the current `user` is equal to the one that is evaluated

- Below the `existingUser` definition; create a condition that returns an object with an `error` message that represents that the `username` is in use

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {...}

        const existingUser = users.find((user) => {
            return user.room === room && user.username === username;
        });

        if (existingUser) {
            return {
                error: 'Username is in use!'
            }
        }
    }
    ```

At this moment we check everything we need from the `username` and `room` so we can `store` those values on the `users` array.

- Below the `existingUser` condition; create a new constant called `user` that will be an object that has the `id`, `username`, and `room`

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {...}

        const existingUser = users.find((user) => {...});

        if (existingUser) {...}

        const user = { id, username, room }
    }
    ```

- Now push the `user` constant to the `users` array

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {...}

        const existingUser = users.find((user) => {...});

        if (existingUser) {...}

        const user = { id, username, room }
        users.push(user);
    }
    ```

- Finally; return an object with the `user`

    ```js
    const addUser = ({ id, username, room }) => {
        username = username.trim().toLowerCase();
        room = room.trim().toLowerCase();

        if (!username || !room) {...}

        const existingUser = users.find((user) => {...});

        if (existingUser) {...}

        const user = { id, username, room }
        users.push(user);

        return { user }
    }
    ```

Let's test this function.

- At the bottom of the file; call the `addUser` function with the following values and log the `users`

    ```js
    addUser({
        id: 22,
        username: '   Test',
        room: 'Testing   '
    });

    console.log(users);
    ```

- Save the file
- On your terminal; go to the `chat-app` directory
- Run the `users.js` file using: `node /src/utils/users.js`
- You will see that the `users` array save the values `lowercase` and without spaces

Now we will test the `validation` on the function

- Below the `users` log; create a new constant called `res` that it value will be the following

    ```js
    const res = addUser({
        id: 33,
        username: '',
        room: ''
    });
    ```

- Log the `res` constant

    `console.log(res);`

- Save the file
- Run the `users.js` file
- You should see the `username and room require` error
- Add the same `username` on both `addUser` calls and the same `room`
- Save the file and run the `user.js` file
- You should see the `username in use` error

Now that we test the `addUser` we can continue with another function; in this case, will be the `remove user` function that will `remove` a `user` by its `id`.

- Below the `addUser` function; create another function call `removeUser` that receive an `id`

    `const removeUser = (id) => {}`

- On the newly created function; create a constant call `index` that its value will be the result of the `findIndex` function on the `users` array

    ```js
    const removeUser = (id) => {
        const index = users.findIndex();
    }
    ```

    The `findIndex` function will return the `index` of the array of values if there is a match and `-1` if we don't have a match

- Send a callback function that receives `user` as an argument of the `findIndex` function with the following condition

    ```js
    const removeUser = (id) => {
        const index = users.findIndex((user) => user.id === id);
    }
    ```

    This condition will check the current `user id` with each item on the `users` array and if is `true` will return the `index` on the `users` array that match the current `user` or will return `-1`

- Below the `index` definition; create a condition that checks if the `index` is not equal to `-1` and if is not return the following

    ```js
    const removeUser = (id) => {
        const index = users.findIndex((user) => user.id === id);

        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }
    ```

    We use the `splice` function on the `users` array that will allow us to remove items from the `users` array by their `index`. The first argument is the `starting index`; in this case, we want to remove the item on the position that we found and the second argument will be the `number of items` that we like to remove. The `splice` function will return an array of the removed items and since we only are going to remove one `user` at the time we return the first position of the array that will have our removed `user`

- Now remove the second `addUser` call
- Below the `user` log at the bottom of the file; create a constant called `removeUser` that value will be the result of the `removeUser` function sending the same `id` that you use on the `addUser` example

    `const removedUser = removeUser(22);`

- Now at the bottom of the file; log the `removedUser` constant and the `users` array
- Save the file
- Run the `users.js` script
- You should see that we have the data of the `user` that we `add` it then it data when we `remove` it and finally the empty `users` array because we eliminate the only `user` that we create

Now we are going to continue with the other functions that will help us to handle the `user` data in this case we will create a `getUser` and `getUserInRoom` functions where the first one will return a single `user` information by `id` and the other will return all `users` on a single `room`.

- Get to the `user.js` file
- At the bottom; create some other `addUser` calls to have multiple `users`(Add the call like this)

    ```js
    addUser({
    id: 22,
    username: 'Test   ',
    room: '  Testing'
    });

    addUser({
        id: 42,
        username: 'Test 2',
        room: 'Testing'
    });

    addUser({
        id: 32,
        username: 'TestTest',
        room: 'Other testing'
    });
    ```

- Below the `removeUser` function
- Create a new function; call `getUser` that receives an `id`

    `const getUser = (id) => ();`

    We use the `es6` immediately return syntax because we will just return a value on this function

- Inside of the `getUser` function; use the `filter` method on the `users` array and add a callback function as its argument that they receive a single `user` and inside of the callback return the result of checking if the `id` that you receive on the `getUser` function is equal to the `user id` on an item of the `users` array

    ```js
    const getUser = (id) => (
        users.find((user) => user.id === id)
    );
    ```

- Below the `addUser` call
- log the call of the `getUser` function sending one of the `ids`

    `console.log(getUser(22));`

- Save the file and get to your terminal
- Run the `user.js` script
- You should see the `user` data
- Get to the `user.js` file
- Below the `getUser` function add a new function call `getUsersInRoom` that receive a `room` name

    `const getUsersInRoom = (room) => ();`

- Inside of the `getUser` function; use the `filter` method on the `users` array and add a callback function as its argument that they receive a single `user` and inside of the callback return the result of checking if the `room` that you receive on the `getUsersInRoom` function is equal to the `user room` on an item of the `users` array

    ```js
    const getUsersInRoom = (room) => (
        users.filter((user) => user.room === room)
    );
    ```

- Get to the bottom of the file
- Log the `getUsersInRoom` function sending the `room` name that have 2 `users`

    `console.log(getUsersInRoom('testing'));`

- Save the file and get to the terminal
- Run the `user.js` script
- You should see an array with the 2 `users`
