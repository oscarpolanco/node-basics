const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
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

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful message',
        title: 'Help',
        name: 'Testing'
    });
});

// Goal: Update the weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//      - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    res.send({
        forecast: 'Is always sun in Philadelphia',
        location: 'Philadelphia',
        address: req.query.address
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Testing',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Testing',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
   console.log('Server is up on port 3000.'); 
});
