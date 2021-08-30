const request = require('request');
const keys = require('./key');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=37.8267,-122.4233';

request({ url: url }, (error, response) =>  {
    const data = JSON.parse(response.body);
    console.log(data.current);
});
