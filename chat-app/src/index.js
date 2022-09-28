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

// Goal: Send a welcome message to new users
//
// 1. Have server emit "message" when client connects
//  - Send "Welcome!" as the event data
// 2. Have client listen for "message" event and print the message to console
// 3. Test your work!

// Goal: Allow Clients to send messages
//
// 1. Create a form with an input and button
//  - Similar to the weather form
// 2. Setup event listener for from submissions
//  - Emit "sendMessage" with input string as message data
// 3. Have server listen for "SendMessage"
//  - Send message to all connected clients
// 4. Test your work!

io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('sendLocation', ({latitude, longitude}) => {
        io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
