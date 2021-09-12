const request = require('request');
const keys = require('./keys');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=37.8267,-122.4233&units=f';
const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token='+ keys.mapboxAPIKey + '&limit=1';

// Goal Print a small forecast to the user
//
// 1. Print: "Its is currently 9 degrees out. It feels like 5 degrees out."
// 2. Test your work!

request({ url: url, json: true }, (error, response) =>  {
    if(error) {
        console.log('Unable to connect to weather service!');
    } else if(response.body.error) {
        console.log('Unable to find location');
    } else {
        const currentWeather = response.body.current;
        console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
    }
});

// Geocoding
// Address -> Lat/Long -> Weather

// Goal: Handle errors for geocoding request
//
// 1. Setup an error handler for low-level errors
// 2. Test by disabling network request and running the app
// 3. Setup error handling for no matching result
// 4. Test by altering the search term and running the app

request({ url: geoCodeUrl, json: true }, (error, response) => {
    if(error) {
        console.log('Unable to connect to location service!');
    } else if(response.body.features.length === 0) {
        console.log('Unable fo find location. Try another search.');
    } else {
        const coordinatesInfo = response.body.features[0].center;
        console.log('The latitude is ' + coordinatesInfo[1] + ' and the longitude is ' + coordinatesInfo[0]);   
    }
});
