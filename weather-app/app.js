const request = require('request');
const keys = require('./keys');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=37.8267,-122.4233&units=f';
const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token='+ keys.mapboxAPIKey + '&limit=1';

// Goal Print a small forecast to the user
//
// 1. Print: "Its is currently 9 degrees out. It feels like 5 degrees out."
// 2. Test your work!

request({ url: url, json: true }, (error, response) =>  {
    const currentWeather = response.body.current;
    console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
});

// Geocoding
// Address -> Lat/Long -> Weather

// Goal: Print the lat/long for Los Angeles
//
// 1. Fire off a new request to the URL explored in browser
// 2. Have the request module parse it as JSON
// 3. Print both the latitude and longitude to the terminal
// 4. Test your work!

request({ url: geoCodeUrl, json: true }, (error, response) => {
    const coordinatesInfo = response.body.features[0].center;
    console.log('The latitude is ' + coordinatesInfo[1] + ' and the longitude is ' + coordinatesInfo[0]);
});
