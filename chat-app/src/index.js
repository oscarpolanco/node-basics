// Goal: Create an Express web server
//
// 1. Initialize npm and install express
// 2. Setup a new Express server
//  - Server up the public directory
//  - Listen on port 3000
// 3. Create index.html and render "Chat App" to the screen
// 4. Test your work! Start the server and view the page in the browser
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
    console.log('New WebSocket connection');
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});

// Goal: Setup scripts in package.json
//
// 1. Create a "start" script to start the app using node
// 2. Install nodemon as a development dependency
// 3. Create a "dev" script to start the app using nodemon
// 4. Run both scripts to test your work!
