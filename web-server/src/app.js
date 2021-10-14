const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Testing'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Testing'
    });
});

// Goal: Create a template for help page
//
// 1. Setup a help template to render a help message
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful message'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Is always sun in Philadelphia',
        location: 'Philadelphia'
    });
});

app.listen(3000, () => {
   console.log('Server is up on port 3000.'); 
});
