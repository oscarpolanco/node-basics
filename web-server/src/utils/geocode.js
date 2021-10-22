const request = require('request');
const keys = require('../../keys');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+ keys.mapboxAPIKey + '&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service!');
        } else if(body.features.length === 0) {
            callback('Unable fo find location. Try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
