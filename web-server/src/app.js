const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// Goal: Create two more HTML files
//
// 1. Create a html page for about with "About" title
// 2. Create a html page for help with "Help" title
// 3. Remove the old route handlers for both
// 4. Visit both in the browser and test your work

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Is always sun in Philadelphia',
        location: 'Philadelphia'
    });
});

app.listen(3000, () => {
   console.log('Server is up on port 3000.'); 
});
