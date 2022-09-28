const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('sendMessage', e.target.elements.message.value);
});

// Goal: Share coordinates with other users
//
// 1. Have client emit "sendLocation" with an object as the data
//  - Object should contain latitude and longitude properties
// 2. Server should listen for "sendLocation"
//  - When fired, send a "message" to all connected clients: "Location: lat, long"
// 3. Test your work!!
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
