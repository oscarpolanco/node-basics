const http = require('http');
const keys = require('./keys');

const url = 'http://api.weatherstack.com/current?access_key=' + keys.weatherstackAPIKey + '&query=40,-75&units=f';

const request = http.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();
