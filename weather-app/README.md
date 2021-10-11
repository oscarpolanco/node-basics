# Weather-app

The `weather-app` is an application the provides you on your `terminal` with the current `weather` information of a valid `location` on the world and is power by [mapbox](https://www.mapbox.com/) and [weatherstack](https://weatherstack.com/) APIs.

## Requirements

- [NodeJs](https://nodejs.org/en/)
- [Mapbox](https://www.mapbox.com/) account key
- [Weatherstack](https://weatherstack.com/) account key

## Step to run the app

- On your editor; go to the `weather-app` directory
- In this directory; create a new file call `keys.js`
- On the newly created file add the following:

    ```js
    module.exports = {
        weatherstackAPIKey: 'weatherstack_api_key',
        mapboxAPIKey: 'mapbox_api_key'
    };
    ```

- Substitute `weatherstack_api_key` and `mapbox_api_key` with the corresponding `key` values
- On your terminal; go to the `weather-app` directory
- Install all dependencies using: `npm install`
- Run the application using(check the `valid location` section before running the command): `node app.js valid_location`

## Valid location

The `valid location` is a `location` know by the [mapbox](https://www.mapbox.com/) and [weatherstack](https://weatherstack.com/) APIs and can be put like the following:

    ```bash
    node app.js Boston
    ```

But if you have spaces you will need to add `quotes`

    ```bash
    node app.js "New York"
    ```
