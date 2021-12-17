# Weather-app

 The `web-server` app provide main goal is that the user send a `location` using our `app` and receive the current `forecast` information of that `location`. The `web-server` app is power by [express](https://expressjs.com/), [handlebars](https://handlebarsjs.com/), [mapbox](https://www.mapbox.com/) and [weatherstack](https://weatherstack.com/) APIs

## Requirements

- [NodeJs](https://nodejs.org/en/)

## Pages

- [Homepage](http://localhost:3000/)
- [About page](http://localhost:3000/about)
- [Help page](http://localhost:3000/help)
- [404 page](http://localhost:3000/test)

## Step to run the app

- On your editor; go to the `web-server/config` directory
- In this directory; create a new file call `keys.dev.js`
- On the newly created file add the following:

    ```js
    module.exports = {
        weatherstackAPIKey: 'weatherstack_api_key',
        mapboxAPIKey: 'mapbox_api_key'
    };
    ```

- Substitute `weatherstack_api_key` and `mapbox_api_key` with the corresponding `key` values
- On your terminal; go to the `web-server` directory
- Install all dependencies using: `npm install`
- Start your local server using: `npm run dev`
- On your browser go to http://localhost:3000/
