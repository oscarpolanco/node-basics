const request = require('request');
const keys = require('../../config/keys');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=' + latitude + ',' + longitude + '&units=f';
    
    request({ url, json: true }, (error, { body }) =>  {
        if(error) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback('Unable to find location');
        } else {
            const currentWeather = body.current;
            callback(undefined, currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    });
}

module.exports = forecast;
