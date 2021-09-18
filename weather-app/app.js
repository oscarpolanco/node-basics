const keys = require('./keys');
const geocode = require('./utils/geocode');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=37.8267,-122.4233&units=f';

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

geocode('Boston', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
});
