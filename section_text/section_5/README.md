# Section 5: Asynchronous node.js(Weather App)

If you check some information on what `node` is maybe you found some of this thing:
- Asynchronous
- Non-blocking
- Single-threaded
- Event-driven

All of those are correct when you are describing `node`. In this section, we will see all those terms and make an example that will help us to understand them. We will be working on a `weather` app that will have a `frontend` on the browser where the user will provide its `location` and begin the scenes we will have `node` communicating with third-party services to convert that `location` into a `forecast`; then we going to send the `forecast` to the browser so we can render the data for the user.

## Asynchronous basic

Now we are going to make our first `non-blocking` example that will mean that we are going to make a code that will continue running while waiting for an `I/O` process to complete. Let's begin

- On the root directory; create a new folder call `weather-app`
- Inside of this newly created directory; add a file called `app.js`
- Open to the `app.js` file
- Add 2 consoles with the following messages
    ```js
    console.log('Staring');

    console.log('Stopping');
    ```
    As you may know, we have a synchronous program where one line run after the other regardless of how long each line take to execute
- Now we will use one of the basic `asynchronous` functions that `node` provides which is the `setTimeout`(it allow us to run some code after a specific amount of time). Use the `setTimeout` between the consoles like this:
    ```js
    console.log('Staring');

    setTimeout(() => {
        console.log('2 second timer');
    }, 2000);

    console.log('Stopping');
    ```
    The first argument of the `setTimeout` function is a function and the second is a number that represents the amount of time in milliseconds that will pass to run the function that we send as a first argument(`2000` ms === `2`s)
- On your terminal; go to the `weather-app` directory
- Use `node` to run the `app.js` file: `node app.js`
- You will see the following:
    ```bash
    Staring
    Stopping
    2 second timer
    ```
    The `Staring` and `Stopping` logs appear immediately then the program hangs for `2` seconds and finally print the `2 second timer` message. This means our `node` app is a `no-blocking` because it can do other things when you run an `asynchronous function 
- Now let's add another `setTimeout` with `0` ms
    ```js
    console.log('Staring');

    setTimeout(() => {
        console.log('2 second timer');
    }, 2000);

    setTimeout(() => {
        console.log('0 second timer');
    }, 0);

    console.log('Stopping');
    ```
- Get to the terminal and run one more time the `app.js` script
- You will get the following
    ```bash
    Staring
    Stopping
    0 second timer
    2 second timer
    ```
You may ask why the `0 second timer` print after the 2 other consoles if it does not wait to run the function? The answer will be in the next section.

## Call Stack, callback Queue, event loop

In the last example we see strange behavior when we run an `asynchronous` function; that behavior will be address in this section where we are going to explore how `node` and `v8` run the `asynchronous` functions.

On the example we will have a piece of code; the output of the terminal and a visual representation of what is happening behind the scenes on both `node` and `v8`(`Call Stack`, `Node APIs`, `Event Loop` and `Callback Queue`)

But first, let define some terms:

- `Call Stack`: This is a simple data structure provided by the `v8` engine and its job is to track the execution of the program and is does that keeping track of all the functions that are currently running. We actually saw a `call stack` before on the `error` section where we saw 2 things: the actual `error` message and bellow that we saw all the functions that are running that get to the point of the one that has the `error` on the program and that is a `call stack`. The `call stack` works by adding a function one on top of another so to get to the first one that you added you will need to remove the one above it.

- `Node APIs`: Is the API that has some function implementation on `C++` that we can use on our `node` script 

- `Callback Queue`: Maintain all the `callback` functions that are ready to get executed

- `Event loop`: It looks at the `call stack` and the `callback queue`. If the `call stack` is empty it will run items on the `callback queue`


Lets begin running the following `synchronous` example:

```js
const x = 1;
const y = x + 2;
console.log('Sum is ' + y);
```

The first thing that is going to happen is that our script will be wrap in a `main` function that `nodeJs` provide and that is the first function that is pushed to the `call stack`

```
--- Call Stack ---
|     main()     |
--- Call Stack ---
```

When something is pushed to the `call stack` this means that the function that is pushed will be executed. This means that the `main` function will be excuted at this moment and will begin to run the script.

The `const x = 1;` will create the constant with the value of `1`; then the `y` constant is created with the `3` value finally we call the `console.log('Sum is ' + y);` but remember if you call a function this will be added to the `call stack`.

```
---- Call Stack ----
|  log('Sum is 3') |
|     main()       |
---- Call Stack ----
```

When the `log` run we actually are going to see the output

```
---- Call Stack ----         --- output ---
|  log('Sum is 3') |    =>   |  Sum is 3  |
|     main()       |         --- output ---
---- Call Stack ----
```

When a function finishes or returns a value will be removed from the `call stack`. Since the `log` function finish it will be removed

```
---- Call Stack ----
|     main()       |
---- Call Stack ----
```

Now that we run the last line of the script the `main` function will also be removed from the `call stack` and the program is done.

For the next example we still have a `synchronous` function but a little more complex:

```js
const listLocations = (locations) => {
    locations.forEach((location) => {
        console.log(location);
    });
}

const myLocations = ['Philly', `NYC`];
listLocations(myLocations);
```

Now let's begin to run our script and as you may know the first thing that will happen is that the `main` function is pushed to the `call stack`

```
---- Call Stack ----
|     main()       |
---- Call Stack ----
```

This will begin the execution of the script and on the first line we will create the `listLocations` constant and create a function as its value but we are not calling this function just yet; then we move to the `myLocations` line where we create that constant and give an array of strings as its value; finally we get to the last line of the script where we call the `listLocations` function sending the `myLocations` array; since this is a function it will be added to the `call stack`

```
------ Call Stack ------
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Now the `listLocations` function will begin to run and the only thing on this function is a loop on the `locations` parameter using `forEach` and `forEach` is a function so it will be added to the `call stack`

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `forEach` will run and for each `location` will run a function; since a function will run will be added to the `call stack`(The function don't have a name so it will be an `anonymous` function)

```
------ Call Stack ------
|  anonymous('Philly') |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Inside of the `anonymous` function is the `log` function so it will be added to the `call stack` too. After the `log` run will be output a value

```
------ Call Stack ------      --- output ---
| console.log('Philly') |     |   Philly   |
|  anonymous('Philly')  |     --- output ---
|     forEach(...)      | => 
| listLocations([...])  |
|      main()           |
------ Call Stack ------
```

Since `log` finish will remove it from the `call stack`

```
------ Call Stack ------
|  anonymous('Philly') |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `anonymous` finish after the `log` so it will also remove it from the `call stack`

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

The `forEach` function will run again another `anonymous` function will the next value of the array and that will be added to the `call stack`

```
------ Call Stack ------
|   anonymous('NYC')   |
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Inside of the `anonymous` function is the `log` function so it will be added to the `call stack` too. After the `log` run will be output a value

```
------ Call Stack ------     --- output ---
| console.log('NYC')   |     |   Philly   |
|  anonymous('NYC')    |     |    NYC     |
|     forEach(...)     | =>  --- output ---
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

Since the `log` finish we pop up from the `call stack` and it was the only thing that is on the `anonymous` function so it will remove it as well

```
------ Call Stack ------
|     forEach(...)     |
| listLocations([...]) |
|      main()          |
------ Call Stack ------
```

At this point the `forEach` is done with all items on the array so it will remove it from the `call stack` and since is the only thing that is running on the `listLocations` function it will remove it as well

```
------ Call Stack ------
|      main()          |
------ Call Stack ------
```

Now we are back to the script the last line so this means that the `main` function finishes its execution and will be removed from the `call stack`

This is a little long but it will help us to understand the process that we follow when we execute a script with `node`. Now we will add our final example that is the `asynchronous` code that we saw in the previews section:

```js
console.log('Staring');

setTimeout(() => {
    console.log('2 second timer');
}, 2000);

setTimeout(() => {
    console.log('0 second timer');
}, 0);

console.log('Stopping');
```

Like the other examples the first thing that is added to the `call stack` is the `main` function

```
------ Call Stack ------
|       main()         |
------ Call Stack ------
```

The first line of the script is run and that is a `log` function that will output the first message

```
------- Call Stack -------     --- output ---
| console.log('Staring') |  => |  Staring   |
|         main()         |     --- output ---
------- Call Stack -------
```

Since the `log` finish its execution it will pull out of the `call stack`

```
------ Call Stack ------
|       main()         |
------ Call Stack ------
```

Now the execution moves to the first `setTimeout` and it will push to the `call stack`

```
------ Call Stack ------
| setTimeout(..., 2000) |
|        main()         |
------ Call Stack ------
```

Now `setTimeout` is not part of the `javascript` programing language instead is `node` that create an implementation on `C++` and provide it to your `nodeJs` script to use so when we call `setTimeout` we are registering an event with `nodeJs` API

```
------ Call Stack ------     ---- Node APIs ----
|        main()        |  => | setTimeout(2sec) |
------ Call Stack ------     ---- Node APIs ----
```

At this part of the process, the `2 seconds` clock starts to count and while we are waiting we can continue using the `call stack`. As we mentioned before `javascript` is `single threaded` and the `call stack` enforce that but `node` use some other `threats` in `C++` to begin the scenes to manage events and that is what allows us to continue to run our application while we are waiting those `2 seconds`. So we continue running our script and will get to the other `setTimeout` line

```
------ Call Stack ------     ---- Node APIs ----
|   setTimeout(..., 0) |     | setTimeout(2sec) |
|        main()        |  => ---- Node APIs ----
------ Call Stack ------
```

When we run the `setTimeout` it will register another event

```
------ Call Stack ------     ---- Node APIs ----
|        main()        |     | setTimeout(2sec) |
------ Call Stack ------  => | setTimeout(0sec) |
                             ---- Node APIs ----
```

Since the clock of the `setTimeout` begin at the moment that we register the event and one of them already finish because is `0 seconds` we actually need to run the function associate with that `setTimeout` and here is when the `event loop` and `callback queue` enter in action. The `callback queue` will add a `callback` function when a given event is done in this case the `0 seconds` timer. Here we will execute the functions top throw bottom

```
------ Call Stack ------     ---- Node APIs ----      --- Callback Queue ---
|        main()        |     | setTimeout(2sec) |     |    callback(0sec)   |
------ Call Stack ------  => ---- Node APIs ----  =>  --- Callback Queue ---
           ^                                                    ˅
| ------------------------------ Event loop ------------------------------- |
```

Before executing the `0 seconds` timer function we will need to add it on the `call stack` and that is where the `event loop` enters to action. It will look at the `call stack` and will see that is not empty so we can't run the `o seconds` timer function so `main` continue with its execution and it will run the last `log` of the script

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
| console.log('Stopping') |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
|         main()          | =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `log` finish it will pull out from the `call stack`

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|         main()          |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `main` function get to the last line of the script it will consider that its finish it execution

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|                         |     |  Staring   |    | setTimeout(2sec) |     |    callback(0sec)   |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

On a regular `synchronous` script this will mean that the execution finishes but this is not the case on our `asynchronous` program because now the `event loop` can do its job because it seems that the `call stack` is empty. It will move the `callback` to the ` call stack` to run

```
------- Call Stack -------      --- output ---    ---- Node APIs ----      --- Callback Queue ---
|      callback(0sec)     |     |  Staring   |    | setTimeout(2sec) |     |                     |
------- Call Stack -------  =>  |  Stopping  | => ---- Node APIs ----  =>  --- Callback Queue ---
                                --- output ---
           ^                                                                        ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The only thing on the `callback` is a `log` function and that will be added to the `call stack` too

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|     console.log('0...') |     |    Staring     |    | setTimeout(2sec) |     |                     |
|      callback(0sec)     | =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Because the `event loop` doesn't send the `callback` function before the `main` function end is the reason for seeing the `0 second timer` message after the other `logs`. Since the `log` finish and is the only thing on the `callback` both pull out of the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|                         |     |    Staring     |    | setTimeout(2sec) |     |                     |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

But the program is not finished yet but the `call stack` and `callback queue` are empty so it will sit there until the `2 seconds` are done. When the `2 seconds` are done it will add the function of the timer to the `callback queue`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|                         |     |    Staring     |    |                  |     |   callback(2sec)   |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The `event loop` will see that the `call stack` is empty so will take the `callback` to the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|      callback(2sec)    |      |    Staring     |    |                  |     |                     |
------- Call Stack -------  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
                                | 0 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

The only thing on the `callback` is a `log` so it will be added to the `call stack`

```
------- Call Stack -------      ----- output -----    ---- Node APIs ----      --- Callback Queue ---
|   console.log('2...')  |      |    Staring     |    |                  |     |                     |
|      callback(2sec)    |  =>  |    Stopping    | => ---- Node APIs ----  =>  --- Callback Queue ---
------- Call Stack -------      | 0 second timer |
                                | 2 second timer |
                                ----- output -----
           ^                                                                              ˅
| --------------------------------------- Event loop ------------------------------------------ |
```

Since the `log` finishes and was the only thing on the `callback` both are removed from the `call stack` and the program will finish its execution.

## Making HTTP requests

Now we will make an `HTTP` request from our `node` application and this is an important milestone for us because this will be the way that our application will be able to communicate with the outside world in the case of this section; if we need real-time `weather` data we will need to make an `HTTP` request.

In this section we will have an application making `HTTP` request to another company servers to get some task done in other words that somewhere on our code you will specify the URL that we wanna make the request to(provided by the API documentation); we are to fire that request; sending some data possibly and getting a response back. In our case, we will send a `location` and will get back a `weather` information that I can use.

### Weather API

For our application, we will use the [weatherstack](https://weatherstack.com/) API to get the real-time `weather` data that we need. You can use the free trial that gives us 1000 requests a month that is more than enough for our example app.

- On your browser go to [weatherstack](https://weatherstack.com/)
- Click on the `sign up free` button at the top right
- Click `Sign up` on the `Free` option
- Fill the form and submit the data
- You will be redirected to a quick start guide
- Choose a copy of your `API` key(This is a randomly generated `string` that will help us to authenticate to make a request to `weatherstack`). DO NOT SHARE THIS API KEY
- Below you will see some endpoints docs that are worth checkout
- Now we will make our first request in order to get real-time `weather` data. Open a new tab on your browser
- Add the base URL of `weatherstack` that is `http://api.weatherstack.com/`
- To access the current `weather` data we need to add `current` on the base URL: `http://api.weatherstack.com/current`
- Now we need to provide the `API key` so we can get access to our `weatherstack` account. To provide the key we will send a `query` string with a key/value pair with the following format: `?access_key=my_access_key_number`(Change `my_access_key_number` with your `API key` number). So the URL is this to this moment:

    `http://api.weatherstack.com/current?access_key=my_access_key_number`

- Then we need to add the location that we want to obtain the `weather` information and for this, we need to add another `query` param and for this, we first need to add `&` before adding the second param

    `http://api.weatherstack.com/current?access_key=my_access_key_number&`

- Add a param call `query` that will have the coordinate of `Alcatraz; San Francisco`(The value is the `longitude` and `latitude`)

    `http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233`

- Click enter and you should see a `JSON` response with a lot of information

As you see we make a request to an API and get a `JSON` as a response and when we got that response `JSON` on our code we can take it; parse it and get access to all the information that it provides.

### Make the weather API request from our code

Now we will make the same request that we did before on the browser from our code. Let's get into it:

- On your editor; go to the `weather-app` directory and open the `app.js`
- Remove all content of that file

To make an `HTTP` request they are a few different things that we can do. We can use the `node` core modules(We will covert later), but these are a very low level and require making a lot of unnecessary code to get everything working together. There are a lot of `npm modules` that are wrappers around that core module making it easier to make an `HTTP` request and that is what we are using for this example. We will use the [request](https://www.npmjs.com/package/request) package(This package is deprecated and will remove it later; you can follow the example that we will remove it later).

- Now get to your terminal and go to the `weather-app` directory
- Initialize the project with `npm init -y`(The `-y` allow us to answer `yes` to every question)
- Install the `request` module using: `npm install request`
- On your editor; go to the `app.js` file on the `weather-app` directory
- Require the `request` module

    `const request = require('request');`

- Store the URL that you use on your browser to access the `weatherstack` API information

    `const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233';`

- Now use the `request` module sending an object as a first value and an `arrow` function as the second one

    `request({}, () =>  {});`

    - The first parameter is an optional object that outlines what we like to do; that is where we provide the URL and other information
    - The second argument is a function to run when we actually got a response

- Set a `URL` property on the options object with the `weatherstack` URL as it value

    `request({ url: url }, () =>  {});`

- Add the `error` and `response` parameters to the function argument of the request. The `error` parameter will tell us if we got some kind of `error` when we do the request and the `response` will have all sources of information including the actual data return by the API

     `request({ url: url }, (error, response) =>  {});`

- Console the `response` on the function

    ```js
    request({ url: url }, (error, response) =>  {
        console.log(response);
    });`
    ```

- Go to your terminal and run the `app.js` file using: `node app.js`
- You will see a lot of information output on your terminal. You will see a large string on green color and that is our `JSON` data on the `body` property
- Let parse the `body` property. So get back to the `app.js` file
- Add a constant call `data` and use `JSON.parse` on the `body` property as it value

    ```js
    request({ url: url }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data);
    });
    ```

- Get back to your terminal and run the `app.js` script
- You will see a lot of data output to the terminal related to the `weather`
- For the moment we just have interest in the `current` property so let's log just this property

    ```js
    request({ url: url }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data.current);
    });
    ```

- On your terminal run the `app.js` script again
- You will see the `current weather` information of the `location` that we provide

## Customizing HTTP request

Now we will explore some options to customize the request so we can have some more information from the API and make us easier handle the response data on our code. First, we will automatically `parse` the response.

- On your editor; go to the `app.js` and get on the `weather-app` directory
- On the configuration object of the `request` function add the `json` property and set it to `true`

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const data = JSON.parse(response.body);
        console.log(data.current);
    });
    ```

    The `JSON` property when is set to `true` will automatically `parse` the response of the request to an object. By default is `false`

- Now we can remove the `JSON.parse` from the function because is already an object and print the `body` property of the `response`

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        console.log(response.body);
    });
    ```

- On your terminal go to the `weather` directory and run the `app.js` script with `node app.js`
- You should see the same response as before
- Now we will need to use some more information to use it on our code and for this will be easier for us to check it on the browser instead of the terminal. So go to the browser and put the same URL that we use before to get a response
- But is difficult to see so you will need an extension to have a better view of the data in my case; on `chrome`; I use [JSON formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en). Install one extension of your choosing on the browser that you are using to continue

    As you see on the response we will have: 
    - A `request` property with contains information about the request that `weatherstack` process
    - A `location` property that tells us information from the `location` that we are viewing the `weather` data
    - A `current` property that contains the `current weather` data

    We will use the `weather_description`; the `temperature on Fahrenheit` and the `feels like temperature on Fahrenheit` 

- Now get back to the `app.js` file
- Remove the console
- Add a new variable call `currentWeather` that its value will be the `current` property of the response

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;
    });
    ```
- Now we will need a console to add the message that we need. The first thing that we will add if the `weather_descriptions` property and that property as you see on the response in the browser is an `array` and we will need to put the first position

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0]);
    });
    ```
- Then we will need to access the current `temperature` with the following message 

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out.');
    });
    ```

- At this moment we just missing to add the `feels like temperature` that will be on the `feelslike` property

    ```js
     request({ url: url, json: true }, (error, response) =>  {
        const currentWeather = response.body.current;

        console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
    });
    ```

- Finally, we need to change the `temperature` from `celsius` to `Fahrenheit`. For this, we will need to check the `weatherstack` documentation. On your browser open a new tab and go to this [url](https://weatherstack.com/documentation)
- On the left sidebar search for the `units` option and click on it
- You will see all the information of the `units query param` that we can use
- Get back to the `app.js` file on the
- At the end of the `url` value add the following: `&units=f`
- On your terminal re-run the `app.js` script
- You should see the message that we set

## Using mapbox api

Now we will use the [mapbox](https://www.mapbox.com/) API that will provide a `geocoding` service. The `geocoding` service is the process to take an `address` and covert it into a `latitude` and `longitude`. When we have those coordinates we can combine them with the `weatherstack` API to get the `weather` from a determined location but for the moment we will do the request separate to test.

- On your browser; go to the [mapbox page](https://www.mapbox.com/). `Mapbox` have a lot of services but we will be using the `geocode` service
- Click on the `sign in` button at the top right
- Fill the form and submit it
- You will be redirected to a getting start page
- Copy the `public token` and store it for later
- Search for the `Mapbox services` link and click on it. This will let you the request documentation of `mapbox`
- On the left sidebar click on the `Search service` dropdown
- Then click on `Geocoding`

    You will see that we have to type of `geocoding`:
    - `Forward geocoding`: We provide an `address` and get back the `latitude` and the `longitude`(This is what we are going to use)
    - `Reverse geocoding`: We provide a `latitude` and `longitude` and get back an `address`

- Scroll down to the `endpoint` section. Get to the `forward geocoding` section

    As you see in the table we will have 2 required parameters:
    - `endpoint`: `Mapbox` type of service and we have `mapbox.places` that is the main one or `mapbox.places-permanent` that is for enterprises and customers
    - `search_text`: This is where we provide the `address`

- Continue scrolling until you get to the `Example request: Forward geocoding` example
- Copy the URL without the quotes(Already have your access token)
- Open a new browser tab
- Paste the URL that you just copy

    As you see on the browser you will get a `JSON` response with 4 properties: `type`, `query`, `features`, and `attribution`. The `query` property will let us know what we provide via the URL. The `features` contain an array with the data that we want. By default the `features` array will have the 5 more relevant results for your `search term` and the most relevant one is the first one. You can see that each item on the features array is an object and for use, the `place_name`(Contains the name of the location) and the `centers`(Contains the `longitude` and `latitude`) properties are the ones that we are interested

- Now get back to the documentation tab
- Get to the optional parameters of the `forward geocoding`
- Search for `limit`

    As you see the `limit` parameter will help us to specify the maximum of results that returns the `api`. In our case, we will specify that return just the most relevant one

- Get back to the tap that we see the `JSON` result
- At the end of the URL add the following: `&limit=1`
- Click enter
- You should see that the `features` array just have one item

### Using request with mapbox

- On your editor get to the `app.js` file on the `weather-app` directory
- Bellow the `URL` constant; add a new constant call `geoCodeUrl` that its value will be the URL that you use before to see the `JSON` response of `mapbox`
- Now at the button use the `request` method sending the configuration object(URL and JSON parse option) and a callback function

    ```js
    request({ url: url, json: true }, (error, response) =>  {});
    ```

- On the callback function; create a new constant call `coordinatesInfo` that its value will be the coordinates of the location(`latitude` and `longitude`)

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        const coordinatesInfo = response.body.features[0].center;
    });
    ```

- Print the `latitude` and `longitude`

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        const coordinatesInfo = response.body.features[0].center;
        console.log('The latitude is ' + coordinatesInfo[1] + ' and the longitude is ' + coordinatesInfo[0]);
    });
    ```
- On your terminal; go to the `weather-app` directory
- Run the `app.js` script using: `node app.js`
- You should see the correct `latitude` and `longitude` print on the console
## Handling Errors

We need to think that not always we are going to have the best-case scenario when we do a request to an `API` because plenty of things can go wrong so in this section we will check how to handle a couple of those` errors` that can happen.

One of the most common things that can happen is when we don't have any network available. Let's check how to handle this

- On your editor go to the `app.js` file on the `weather-app` directory
- Comment the `geocoding` code
- On your computer turn off your internet connection
- On your terminal; go to the `weather-app` directory
- Run the `app.js` script with:` node app.js`
- You should see a big `error` message
- Now get back to the `app.js` file
- On the `weatherstack` request callback; console the `error` parameter and comment on the other code

    ```js
    request ({url: url, json: true}, (error, response) => {
        console.log (error);
        // const currentWeather = response.body.current;
        // console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```
- Go back to your terminal and run the `app.js` script
- You should see an object print on the console

    This object contains some information about the `error` that happen but still, we don't have a lot of understandable things to show

- Go back to the `app.js` file
- Delete de console of the `error` and uncomment the other code block
- Add a new condition that checks if the `error` exits

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {}
        const currentWeather = response.body.current;
        console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```

- Add the following message if we got an `error`

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            console.log ('Unable to connect to weather service!')
        }
        const currentWeather = response.body.current;
        console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
    }
    ```

- Add the other code to an `else` statement

    ```js
    request ({url: url, json: true}, (error, response) => {
        if (error) {
            console.log ('Unable to connect to weather service!')
        } else {
            const currentWeather = response.body.current;
            console.log (currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
        }
    }
    ```

- On your terminal; run the `app.js` script again
- You should see the `error` message that you put on the log
- Turn on your internet connection
- Run the `app.js` script again
- You should see that work correctly
- We got 2 types of `error` for this request; one is from our local machine like the one we see before and the other is for `user` input so instead of having the `error` parameter we actually will have a `response` so we need to handle it. Go to your browser
- Get the complete `weatherstack` URL to get the `JSON` response and use it on the browser
- Remove the value of `query` on the URL
- You will get a `response` but with an `error` message
- Go back to the `app.js` file
- On the `weatherstack` request callback add an `else if` statement that checks if we got an `error` property on the `body`

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        if(error) {
            console.log('Unable to connect to weather service!')
        }  else if(response.body.error) {

        } else {
            const currentWeather = response.body.current;
            console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    }
    ```

- On the `else if` block add the following message

    ```js
    request({ url: url, json: true }, (error, response) =>  {
        if(error) {
            console.log('Unable to connect to weather service!')
        }  else if(response.body.error) {
            console.log('Unable to find location');
        } else {
            const currentWeather = response.body.current;
            console.log(currentWeather.weather_descriptions[0] + '. Its is currently ' + currentWeather.temperature + ' degrees out. Its feels like ' + currentWeather.feelslike + ' degrees out.');
        }
    }
    ```

- On the `url` constant break the `url` as you did before on the browser
- On your terminal; run the `app.js` script
- You should see the error message that you just add
- Now we will do the same to the `geocoding` block. Uncomment the `geocoding` block
- Add the following conditions and messages to the `geocoding` request

    ```js
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
    ```

    To test the `geocoding error` we need to mess with the URL that we did before changing the text after the `place/` and before of `.json`(In the case of the example `Los%20Angeles`) with some random text. You will see that the `features` array is empty that is why we check if the `features` array have `length`

- Test the `error` cases and if the correct request continue working

## Callback functions

In this section, we will explore a little bit about `callback` functions where we are going to see how they work and how can we use them. This is important because is part of the core of the `nodeJs asynchronous` development.

- On your editor; go to the `playground` directory
- Create a new file call `4-callback.js`
- On this newly created file we will use a `callback` function with an old friend call `setTimeout`(Put a 2 seconds time)

    `setTimeout(() => {}, 2000);`

    The first parameter of the `setTimeout` is the `callback` function and it will run to the after the time we put on the second parameter

- Add a log on the `callback` function

    ```js
    setTimeout(() => {
        console.log('Two seconds are up');
    }, 2000);
    ```

    The `callback` function is a function that provides an argument to another function with the intention that runs it later. In this case, we are using the `callback` pattern in an `asynchronous` way but this is not the rule you can use the `callback` pattern on a `synchronous` functions; for example `array's filter`

- Create a constant call `names` with the following values

    `const names = ['Andrew', 'Jen', 'Jess'];`

- Then create a new variable call `shortNames` that it value will be the `filter` result of the `name` that have less or equal `4` letters

    ```js
    const shortNames = names.filter((name) => {
        return name.length <= 4;
    });
    ```

    The `callback` function is the parameter that we sent to the `filter` function and will run for each item on the `array` of names. In this case, we use the `callback` function on a `synchronous` function. To this moment we use the `callback` functions on functions that we don't define such as `filter` and `setTimeout` but we can define our custom function and still use the `callback` pattern if we need to

- Create a constant that will be called `geocode` with a function as its value. The function we will receive an `address` and a `callback`

    `const geocode = (address, callback) => {}`

    Here we will intend to reproduce the `geocode` functionality but use it in different places that is why we create a new function that will contain the request block and run a function when we have the data

- On the `geocode` function define a `data` constant that will have some example `longitude` and `latitude`

    ```js
    const geocode = (address, callback) => {
        const data = {
            latitude: 0,
            longitude: 0
        };
    }
    ```

    There are 2 ways that we can receive the data from the `geocode` function; one is that we return the value from the function and the other is to provide the `callback` and use the data there. Since we already have the data like we have to this moment the choice will be easy; just return the value

- Return `data` on the `geocode` function

    ```js
    const geocode = (address, callback) => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        return data;
    }
    ```

- Below the `geocode` function create a new `data` constant that it value will be the return value of the `geocode` function sending `Philadelphia` as an argument and log the value

    ```js
    const data = geocode('Philadelphia');
    console.log(data);
    ```

- On your terminal; go to the `playground` directory and run the `4-callback.js` script: `node 4-callback.js`
- You should see the `data` value on the logs. As you see this is a `synchronous` function but later we will need to add the `geocode` request that we already know is `asynchronous` so let use a `setTimeout` to simulate an `asynchronous` code
- Put all the code inside of the `geocode` function and put it inside of a 2 seconds `setTimeout`

    ```js
    const geocode = (address, callback) => {
        setTimeout(() => {
            const data = {
                latitude: 0,
                longitude: 0
            };

            return data;
        }, 2000);
    }
    ```

- Get back to your terminal and run the `4-callback.js` again
- You should see `undefined` instead of the `data` value. The problem here is that we don't return anything on the function because the actual return statement is inside of the `callback` function of the `setTimeout`; the same thing will happen with the `geocode` request. Let's fix this
- Remove the `data` constant below of the `geocode` function(Leave the `geocode` call) and log

    `geocode('Philadelphia');`

- Add a second parameter to the `geocode` call that will be a `callback` function

    `geocode('Philadelphia', () => {});`

- Now eliminate the return statement on the `setTimeout` and call the `callback` function sending the piece of data that we need; in this case `data`

```js
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };

        callback(data);
    }, 2000);
}
```

- Get back to the `gecode` call and now that we know the piece of that that we are going to use let's finish the `callback` function

    ```js
    geocode('Philadelphia', (data) => {
        console.log(data);
    });
    ```

- Get back to your terminal and run the `4-callback.js` script
- You should see the `data` value after the 2 seconds

## Callback Abstraction

At this moment we can improve a little bit the code of the `weather-app` using the `callback` pattern where we will have a reusable code and easy to maintain in other words we will have some functions that we can call multiple times and make it easy for us do one thing before another and we will need this to send the `geocode` result to the `weatherstack` API so we can have the `weather` of a specific place. Let's begin the process

- On your editor; go to the `app.js` on the `weather-app` directory
- Now comment all the code of the `app.js` file
- At the bottom of the file add a `geocode` constant that its value is a function

    `const geocode = () => {}`

- Now we will add what we need to trigger the request; in our case the `address` and the `callback` that we want to run after the request finish

    `const geocode = (address, callback) => {}`

- Now below the `geocode` constant; call the function sending the following parameters

    `geocode('Boston', () => {});`

- Then on the callback function we will need to add the parameters that we need. As you can see before we will receive an `error` and the `data` of the `response` and that is what we will add as parameters of the `callback`

    `geocode('Boston', (error, data) => {});`

- At this moment we will need to make sure that the `callback` is called with the correct parameters so copy the `geocode` URL that you use before
- On the `geocode` function add a new constant call `url` and paste the `geocode` URL as its value

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=your_access_key&limit=1';
    }
    ```

- Now remove the `address` part of the URL and use the `address` parameter on it

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=your_access_key&limit=1';
    }
    ```

- Since is a URL we will need to `encode` the value that we receive from the `address` parameter to handle the special characters and for this, we will use the `encodeURIComponent` function

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';
    }
    ```

- Now that we have a dynamic URL we can fire the request. So add the `request` method with its corresponding parameters

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {});
    }
    ```

- Then we need to add the conditions to handle the `errors`

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
             } else if(response.body.features.length === 0) {
             } else {
             }
        });
    }
    ```

- To show the message we need to use a reusable function so the user can use the message as it wants; so we will use the `callback` function to send the correct arguments. First for the first condition using the same message as before

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
             } else {
             }
        });
    }
    ```

    Since is an `error` we actually don't want to send a value for `data` so we don't send any value that will be equal to `undefined`

- Then we add the second message to the second condition as we use before

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
                 callback('Unable fo find location. Try another search.');
             } else {
             }
        });
    }
    ```

- Get to the `geocode` function call and log the `error` and `data` parameters

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);
    });
    ```

- Now we can test the functions. Turn off your internet connection
- Get to your terminal and go to the `weather-app` directory
- Run the `app.js` script using: `node app.js`
- You should see the correct `error` message
- Turn on your internet connection
- Now get to the `app.js` file on the `weather-app` directory
- Change the string of the address to another that you know doesn't exist
- Get back to your terminal and run the `app.js` script
- You should see the correct `error` message
- Now get back to the `app.js` file on your editor and add the correct `address` on the `geocode` function call
- On the `else` clause of the `geocode` function add the following

    ```js
    const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=your_access_key&limit=1';

        request({ url: url, json: true }, (error, response) => {
             if(error) {
                 callback('Unable to connect to location service!');
             } else if(response.body.features.length === 0) {
                 callback('Unable fo find location. Try another search.');
             } else {
                 callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                });
             }
        });
    }
    ```

    Here we send `undefined` to the first parameter because we don't have an `error` then we choose the information that we will send to the user in this case the `longitude`; `latitude` and the `place name`

- Go to your terminal and run the `app.js` script again
- You should see the correct information of the `location`
- Now we will move the code that we just made to its own file. On the `weather` add directory create a new folder call `utils`
- On the newly created directory; create a new file call `geocode.js`
- In the new file; require `request`

    `const request = require('request');`

- Go to the `app.js` file and cut the `geocode` function(Do not remove the function call)
- Get to the `geocode.js` file and paste the function
- Bellow the function export it

    `module.exports = geocode;`

- Get back to the `app.js` file and `require` the `geocode` function

    `const geocode = require('./utils/geocode');`

- Now go to your terminal and run the `app.js` file
- You should see the correct output
- Remember to remove the old `geocode` block that you comment on at the beginning of this section

### Callback abstraction (weatherstack function)

Now we are going to do the same abstraction that we did with the `geocode` functions. Let's begin with the process.

- On your editor; go to the `app.js` file on the` weather-app` directory
- Comment the `weatherstack` code
- Now on the `weather-app` directory create a new file call` forecast.js`
- On this newly created file; require the `request` module

    `const request = require ('request');`

- Then create a function call `forecast` that receive` latitude`, `longitude`, and` callback` as a parameter

    `const forecast = (latitude, longitude, callback) => {}`

- On the `forecast` function create a constant call` URL` and add the `weatherstack` URL that you use on the` app.js` file

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number&query=37.8267,-122.4233';
    }
    ```

- Now we will need to add the `latitude` and` longitude` so we can have a dynamic `URL` for our function

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f';
    }
    ```

- Then we can use the `request` function sending the` callback` and the correct parameters

    `request ({url: url, json: true}, (error, response) => {});`

- Get the same conditions that are on the `app.js` file relate to the` weatherstack` code and add it to the `request` function

    ```js
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f';

        request ({url: url, json: true}, (error, response) => {
            if (error) {
                callback ('Unable to connect to weather service!');
            } else if (response.body.error) {
                callback ('Unable to find location');
            } else {
                const currentWeather = response.body.current;
                callback (undefined, currentWeather.weather_descriptions [0] + '. Its is currently' + currentWeather.temperature + 'degrees out. Its feels like' + currentWeather.feelslike + 'degrees out.');
            }
        });
    }
    ```

- Export the `forecast` function

    `module.exports = forecast;`

- Go to the `app.js` file and import the` forecast` function

    `const forecast = require ('./ utils / forecast');`

- Add the following example call of the `forecast` function at the end of the file

    ```js
    forecast (44.1545, -75.7088, (error, data) => {
        console.log ('Error', error);
        console.log ('Data', data);
    });
    ```

- Test the different types of errors and if everything goes well as we did with the `geocode` function
- You should have the correct results
- Remove all code comment at the old `weatherstack` code and the` request` require at the top

## Callback chaining

Now we will use the `callback chaining` pattern to combine the 2 functions that operate independently from each other but we actually want to use the result of one of the functions in the other one. Let's begin with the process!!

- On your editor; go to the `app.js` file in the `weather-app` directory
- Take the `forecast` function and put it inside of the `callback` of the `geocode` function

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);

        forecast(44.1545, -75.7088, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

    Here we will start calling `geocode` that start an `asynchronous I/O` operation and when its done the `event loop` will make sure that the `callback` is a call from there we are going to trigger another `asynchronous I/O` operation then we are going to wait for that `callback` to finish and inside of that last `callback` we will have access to the complete `data` and that is `callback changing`
- We need to make sure that the `data` that `geocode` sends to the `callback` is used by the `forecast` function. So remove the parameters of the `forecast` function and replace it with the `longitude` and `latitude` that is on the `data` object

    ```js
    geocode('Boston', (error, data) => {
        console.log('Error', error);
        console.log('Data', data);

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

- Now on the terminal; get to the `weather-app` directory and run the `app.js` file
- You should see the `data` from the `geocode` function and the result of the `forecast` of `Boston`
- We need to still handle `errors` in case that `geocode` fails and does not run the `forecast` function. Remove the consoles that are before the `forecast` function and add a condition that checks if we got any `data` on the `error` parameter

    ```js
    geocode('Boston', (error, data) => {
        if(error) {}

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```
- Then we need to make sure that we don't run the `forecast` function so we will add a `return` inside of the `error` condition printing the `error`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });
    });
    ```

- Now we need to do the same `error` handling on the `forecast` function

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, data) => {
            if(error) {
                return console.log(error);
            }
        });
    });
    ```

- At this moment we need to do the code that will run when the `forecast` doesn't have an `error`. We will print de `name` of the place that we receive from `geocode` and the `forecast` that we get for that place but as you may notice we can't use the result from one function in the other because both of them place it on the `data` variable so we need to replace the name of one of than to do what we want. Change the `data` from the `callback` of the `forecast` function to `forecastData`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }
        });
    });
    ```

- Now print the `location` of the `data` parameter and the `forecastData`

    ```js
    geocode('Boston', (error, data) => {
        if(error) {
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }

            console.log(data.location);
            console.log(forecastData);
        });
    });
    ```

- Go to your terminal and run the `app.js` file
- You should see the `location` name and it `forecast`
- Finally, we will use the command line to change the static `location` that we use as a parameter of the `geocode` function. first, create a constant call `address` that contains one parameter of the `argv` array

    `const address = process.argv[2];`

- Now create a condition to check if the `address` exists

    ```js
    const address = process.argv[2];
    if(address) {}
    ```

- Inside of the condition add the functions

    ```js
    const address = process.argv[2];
    if(address) {
        geocode('Boston', (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    }
    ```

- Add the `address` as a parameter of `geocode`

    ```js
    const address = process.argv[2];
    if(address) {
        geocode(address, (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    }
    ```

- Add an `else` clause that prints a message when the user doesn't provide the `address`

    ```js
    const address = process.argv[2];
    if(address) {
        geocode(address, (error, data) => {
            if(error) {...}

            forecast(data.latitude, data.longitude, (error, forecastData) => {...});
        });
    } else {
        console.log('Please provide a location');
    }
    ```

- Test on the terminal; sending a location like `Boston` or `"New York"`(Need to use quotes when you have space)
- You should see the correct output

## ES6 Aside: Object property shorthand and destructuring

Here we are going to check some features of `es6` that will make us the life easy when we are using objects. Here we will see:

- The object property shorthand syntax: This will allow us to add values on to an object with a shorthand syntax in certain conditions
- Object destructuring:

### Examples:

- On your editor; go to the `playground` directory
- Create a new file call `5-es6-object.js`
- Inside of this newly created file add 2 constants: `name` and `userAge`(with a `string` for the `name` and a number for `userAge`)

    ```js
    const name = 'test';
    const userAge = 27;
    ```

- Now define an `user` object with an `name` and `age` properties(Use the `name` and `userAge` to define the values of the properties)

    ```js
    const user = {
        name: name,
        age: userAge,
        location: 'Philadelphia'
    };
    ```

- Print the object using `console.log`
- On your terminal go to the `playground` directory and run the `5-es6-object.js` file
- You should see the object with the correct values on it properties
- Now we will use the `object property shorthand syntax`. Add the following changes to the `user` object

    ```js
    const user = {
        name,
        age: userAge,
        location: 'Philadelphia'
    };
    ```

    As you see we change from `name: name` to just `name` and this will have the same effect than before thanks to the `object property shorthand syntax` that came to play when we set a property that it value came from a variable from the same name(The name need to match exatcly)

- Go back to your terminal and run the `5-es6-object.js` file again
- You should see the correct values of the `user` object
- Now remove the `userAge` variable from the `user` object

    ```js
    const user = {
        name,
        age,
        location: 'Philadelphia'
    };
    ```

- Go to your terminal and re run the `5-es6-object.js` file
- You should see an error because we don't have an `age` variable that it can use to define the `age` property
- Now we are going to test the `object destructuring`. Remove the code on the `5-es6-object.js`
- Then create a new object call `product` with the following properties and values

    ```js
    const product = {
        label: 'Red notebook',
        price: 3,
        stock: 201,
        salePrice: undefined
    };
    ```

- If we need to have individual values of the properties of those objects like the following

    ```js
    const label = product.label;
    const stock = product.stock;
    ```

- Print the values of `label` and `stock` using `console.log`
- Go to your terminal and run the `5-es6-object.js` file
- You should see the correct values for the `label` and `stock` variables
- We can do it a different way to get variables of the `product` object property but first eliminate the `label` and `stock` variables
- Now add the following bellow the `product` object

    `const {} = product;`

    We are trying to pull properties of the `product` object and we are going to put it on the brackets
- Inside of the `brackets` add `label` and `stock`

    `const {label, stock} = product;`

    This will create 2 variable call `label` and `stock` variables with the value of the properties with the same name of the `product` object

- Print the `label` and `stock` property
- On your terminal run the `5-es6-object.js` file
- You should see the correct value of the `label` and `stock` properties
- You also can put variable of properties that doesn't exist on the object but it value will be `undefined`. Add a `rating` variable

    `const {label, stock, rating} = product;`

- Print the `rating` value
- On your terminal run the `5-es6-object.js` file
- You should see `undefined` for the `rating`
- We can also rename the variable if we need it. Add the following to change the `label` variable name

    `const {label:productLabel, stock, rating} = product;`

    Now you can use a variable call `productLabel` and have the same value that the `product.label` property
- Sustitude the `label` variable on the console with the `productLabel`
- On your terminal run the `5-es6-object.js` file
- You should see the correct value for the `productLabel` variable
- You can add default values in the case that we define a variable of a property that doesn't exist. Add the following to the `rating` variable

    `const {label:productLabel, stock, rating = 5} = product;`

- On your terminal run the `5-es6-object.js` file
- You should see the default values for the `rating`
- Also you can use destructuring on a function. Now create a function call `transaction` that recive `type` and `product` as it parameters

    `const transaction = (type, product) => {}`

- Add the `transaction` call bellow

    `transaction('order', product);`

- We can us destructuring like we see before but we are going to do it on the `parameters` in this case `product`

    `const transaction = (type, { label, stock }) => {}`

- Now print the variables

    ```js
    const transaction = (type, { label, stock }) => {
        console.log(type, label, stock);
    }
    ```

- On your terminal run the `5-es6-object.js` file

## Using destructuring and property shorthand on the weather-app

- On your editor go to the `app.js` on the `weather-app` directory
- First; we need to update the `data` variable that we receive on the `geocode` callback to use destructuring with the variables that we need

    `geocode(address, (error, { latitude, longitude, location }) => {...});`

- The previews update will not be enough because we can have an `error` return by the `geocode` request in other words the `callback` will be called with the `error` property and will try to destructure an `undefined` object that will break the app for this we will need to provide a default value for those variables

    `geocode(address, (error, { latitude, longitude, location } = {}}) => {...});`

- Now we can use the new variables on the `geocode` and `forecast` functions

    ```js
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {...}

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }

            console.log(location);
            console.log(forecastData);
        });
    });
    ```

- On your editor; go to the `geocode.js` file on the `weather-app` directory
- Since we have a `url` constant that we use on the `request` function; we can the `shorthand` syntax on the configuration object of `request`

    `request({ url, json: true }, (error, response) => {...}`

- Now we are using the `body` property on all the code of the `callback` function so we can use destructuring on the `response` object

    `request({ url, json: true }, (error, { body }) => {...}`

- Then we need to replace the `response` object and use `body`

    ```js
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
    ```

- On your editor; go to the `forecast.js` file
- This file is very similar to the `geocode` function so we will do the same as we see here

    ```js
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
    ```

- Finally on your terminal run the `app.js` file and test the `weather-app` application
- You should see the same output without any issue

## HTTP requests without a library

Like it mentioned before when we start to use the `request` library; we will check how to perform a request without an `npm` module. We see in this section that we can do the task that we need; like take commands from the terminal; without a library but the libraries make what you need easier to do. Let's get to it!!!

- On your editor; go to the `playground` directory and create a new file call `6-raw-http.js`
- Now get to the browser and get to the [node.js](https://nodejs.org/en/) page
- Click on the `docs` option at the top
- On the sidebar choose your `node` version(In the case of the example is the `16`)
- Scroll down until you see `HTTP` and `HTTPS`. As you see here we got 2 libraries for each protocol that you are using and where you'll see an advantage to use an `npm` module because it will make it easy to switch between protocols without using a separate library and behind the scenes
- Click on the [HTTP](https://nodejs.org/dist/latest-v16.x/docs/api/http.html) module. As you can see we can use this module to create a `server`(We gonna address this in a later section) and to do requests
- Scroll down until you see the `http.request` function and that is what we are going to use to make the `request`. If you see the `HTTPS` module will see the same type of function but for that protocol. Since the `weatherstack` API use the `HTTP` protocol on it the free version that is the protocol that we are going to use
- On your editor; go to the `6-raw-http.js` file
- Since `HTTP` module is from `node`; you can `require` without installing anything because is already there. On the first line `require` it

    `const http = require('http');`

- Then; go to the `forecast.js` file and copy the entire `url` constant
- Paste the `url` constant after the `HTTP` require

    ```js
    const http = require('http');
    const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =' + latitude + ',' + longitude + '& units = f'; 
    ```

- Since we don't have the `latitude` and `longitude`; remove those variables and replace them with a `40,-75`

    ```js
    const http = require('http');
    const url = 'http://api.weatherstack.com/current?access_key=my_access_key_number' + '& query =40,-75& units = f'; 
    ```

- Now use the `request` function of the `HTTP` module sending `URL` and a `callback` that have a `response` parameter

    ```js
    http.request(url, (response) => {});
    ```

     On the `request` callback we don't have access to the complete `request` body instead we can catch the individual `chunks` that comes throw because the `HTTP` data could be `stream` on multiple parts so we will need to listen to the individual `chunks` to come in and we need to listen when all `chunk` has arrived that means the request is done

- Since we are using a `node` core module we will need to work something on a very low level so on the `callback` so add the following

    ```js
    http.request(url, (response) => {
        response.on();
    });
    ```

    The `on` is a function that allows us to `register` a handle for an `event`

- To register a handle we need to specify the `event` then add the `callback` that will trigger when the `event` happens. In this case, we will listen to the `data` event

    ```js
    http.request(url, (response) => {
        response.on('data', (chunk) => {});
    });
    ```

    The `callback` will be trigger when new `data` comes in and we access this `data` via the first argument of the `callback` commonly call `chunk` that will be a part of the complete response depending on how the `server` is setup

- The other thing that we need to do is know when the `response` finish and we will do this listening to the `end` event and as the `data` event will trigger a `callback`

    ```js
    http.request(url, (response) => {
        response.on('data', (chunk) => {});

        response.on('end', () => {});
    });
    ```

- As mentioned before the `data` event can be trigger multiple or one time so we will need to store it in a place to concatenate the different `chunks` of `data` or use it when only have a single `chunk` to create a `let` variable call `data` that have an empty `string` as it a default value

    ```js
    http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {});

        response.on('end', () => {});
    });
    ```

- Now on the `data` handler `console.log` the `chunk`

    ```js
    http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            console.log(chunk)
        });

        response.on('end', () => {});
    });
    ```

- On your terminal; go to the `playground` directory and run the `6-raw-http.js` file
- You will see that the program doesn't finish. This is because we to complete the `request`
- Get back to the `6-raw-http.js` file
- We need the value of the actual request so create a constant call `request` that its value will be the return value of the `http.request` function

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            console.log(chunk)
        });

        response.on('end', () => {});
    });
    ```

- Bellow of the `request` definition call the `end` function

    ```js
    const request = http.request(url, (response) => {...});

    request.end();
    ```

- Now get to the terminal and run the `6-raw-http.js` file
- You will see that multiple `chunks` of `data` are print on the terminal and all of them are `buffers`
- Get back to the `6-raw-http.js` on your editor
- We will need to store each `chunk` on the `data` variable and turn every `chunk buffer` into a `string`

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {});
    });

    request.end();
    ```

    Now we have the complete `body` of the `response` on the `data` variable

- Now we can access the `response` on the `end` handler. So print the `data` variable

    ```js
    const request = http.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            console.log(data);
        });
    });

    request.end();
    ```

- Get back to your terminal and run the `6-raw-http.js` file
- You will see a large `string` print on the terminal
- Get back to the `6-raw-http.js` on your editor
- Now we will need to turn into a `json` data that we actually can use so on the `end` handle create a constant call `body` that its value will be the `JSON.parse` of `data` and print the result

    ```js
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

    request.end();
    ```

- Get back to your terminal and run the `6-raw-http.js` file
- You will see the actual object that you can pull values from
- We still need to handle the errors so get back to the `6-raw-http.js` file on your editor
- Bellow of the `request` definition create a new listener for the event `error` and print the result

    ```js
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
    ```
- Now produce an `error` like turn off your wi-fi
- Get back to your terminal and run the `6-raw-http.js` file
- You should see an `error` object print

You may ask yourself; why does `node` make these `core` modules easier to use? The reason is that the `node core` modules are supposed to provide this low-level implementation and `node` comes bundled with `npm` because you are suppose to use these modules to build your application.
