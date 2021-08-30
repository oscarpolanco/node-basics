const request = require('request');
const keys = require('./key');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=37.8267,-122.4233';

// Goal Print a small forecast to the user
//
// 1. Print: "Its is currently 9 degrees out. It feels like 5 degrees out."
// 2. Test your work!

request({ url: url, json: true }, (error, response) =>  {
    const currentWeather = response.body.current;
    console.log('Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
});
