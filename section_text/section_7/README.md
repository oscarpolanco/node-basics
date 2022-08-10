# Section 7: Accessing API from the browser(Weather App)

In this section; we will see how to create our own `API` endpoints and access them from the browser. At this moment we have 2 distinct applications on the side is the `frontend` and the other is the `backend` but we don't have much interaction between then just the rendering part but we will need that the browser passes an `address` to the server then the server needs to convert that `address` into a `forecast` and past it back to the browser so the browser can render that data and that is what we are going to work across these sections.

## The query string

Before we continue with all the topics that we are going to address is good for us to have the big picture for these sections. The goal will be to the user give a `location` and fetch a `forecast` on the `weather` website so the user will go into a `URL` on the browser; fill a form; click a button and in a couple of seconds the `weather` information will show up. To get our goal done we need to actually fill the `weather route` that we previously did; as you remember when we get to the `/weather` URL it will return a `JSON`. The code inside of this `route handler` will be in charge to call the `geocode` and `weatherstack` API then return the data that we need in form of a `JSON`.

Before adding anything else we need to talk about how the browser will send data to the server so the `weather router` know which `location` need to work with and we will do this using a `query string`; where the browser will provide a `query string` as part of a `url` then the server will read the `query string` value to get the `address` information. Let's do an example to get on the correct track.

- On your editor; go to the `app.js` file on the `web-server/src` directory
- Below the `weather route handler`; add a new `route handler` for `/products`

    `app.get('/products', (req, res) => {});`

- For the moment send the following `JSON` on the `products route`

    ```js
    app.get('/products', (req, res) => {
        res.send({
            products: []
        });
    });
    ```

- On your terminal; get to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/products/
- You should see the `JSON` that you just set for `products`

As you remember the `query string` are defined at the end of the `URL` starting with a `question mark` then adding `key value` pairs to pass additional information to the server; for example, imaging that we are `searching` for a specific `product` in this case `games` will be like this:

`http://localhost:3000/products?search=games`

Since we are setting our `backend`; we can set as many or few `query params` that we like. If you need to add another `param` you will separate one for the other using `&`. Imagine that on the `search` of the `product` we don't only want the `games`; we want the `games` for a determined `rating`. for example(the number in the `rating` will be the number of stars and 5 will be the biggest):

`http://localhost:3000/products?search=games&rating=5`

Now the question will be how the server will receive the data sent via the `query params`. Since we are using an `express` server we already have these values available when we call the `route` on the `request` object(`req`). Let see this in action

- Get back to the `app.js` file
- On the `products route handler` add print the following

    ```js
    app.get('/products', (req, res) => {
        console.log(req.query);

        res.send({
            products: []
        });
    });
    ```

    The `query` property has an object that contains all the `query string` information

- Save the file
- On your browser; go to http://localhost:3000/products?search=games&rating=5
- On the terminal, you will see an object with the `query param` information

This will be the way to get the data on our server but imaging that we need always need to provide at least one of the `query params` of the `url`; we will need to add some extra logic to handle this case. For this example, the `search param` will be obligatory and the `rating` will be optional.

- Get back to the `app.js` file
- Go to the `products handler` and add an `if` statement asking `if` the `search param` exits

    ```js
    app.get('/products', (req, res) => {
        if(!req.query.search) {}

        res.send({
            products: []
        });
    });
    ```

- Use the `send` function on the condition to let know the user that needs to provide the `param` like this

    ```js
    app.get('/products', (req, res) => {
        if(!req.query.search) {
            res.send({
                error: 'You must provide a search term'
            });
        }

        res.send({
            products: []
        });
    });
    ```

- Save the file
- On your browser; go to http://localhost:3000/products
- You should see the `JSON` with the `error`
- Get to your terminal and you should see an `error`. This `error` is because we are using the `send` function twice in the `products` handler and we can't do that so we will need to prevent this to happen
- Get to the `app.js` file
- On the `products route handler` on the `search param` condition `return` the `send` function

    ```js
    app.get('/products', (req, res) => {
        if(!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            });
        }

        res.send({
            products: []
        });
    });
    ```

    This is a common pattern of `express` to prevent this type of `errors` happen

- Save the file
- Refresh the page
- Get to your terminal and you should not see the `error`
- Go back to your browser and get to http://localhost:3000/products?search=games&rating=5
- You should see that continue working as expected

Now we will work with the `weather route handler` where we are going to send an `address query param` that have the `location` that we want the `forecast` and this `param` will be `require` and we will return it as part of the `JSON` that we send to the user

- Go to the `app.js` file
- Update the `weather handler` like the following

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address!'
            });
        }

        res.send({
            forecast: 'Is always sun in Philadelphia',
            location: 'Philadelphia',
            address: req.query.address
        });
    });
    ```

- Save the file
- On your browser; go to http://localhost:3000/weather?address=philadelphia
- You should see the `JSON` now with the `address` included

## Building a JSON HTTP endpoint

At this moment you have the `weather` endpoint created and we already `geocode` and `forecast` functions in the `weather-app` in the past so in this section, we will put together all that code to have a functional endpoint that converts an `address` send via `query param` and return the `forecast` data of that `address`.

- On your editor; go to the `weather-app` directory
- Copy the `utils` folder
- Now get to the `web-server/src` directory
- Paste the `utils` folder on the `src` directory
- Since we are using `request`; we will need to install it for the new app. On your terminal; go to the `web-server` directory
- Install `request` using: `npm install request`
- Get to the `app.js` file on the `web-server/src` directory
- Require the `geocode` and the `forecast` functions below the `hbs` require

    ```js
    const geocode = require('./utils/geocode');
    const forecast = require('./utils/forecast');
    ```

- Now get to the `weather route handler`
- Below the `address` condition call the `geocode` function with all its parameters except that the `address` will be the one that we receive from the `req` object the others are equal than before

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {...}

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {});

        res.send({...});
    });
    ```

- Now add a condition in case an `error` happen on the `geocode` function and on the condition send a `JSON` respond that have the `error` that you get from `geocode` as its value

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {...}

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error });
            }
        });

        res.send({...});
    });
    ```

- Now let's call the `forecast` function inside of `geocode` with all it parameters(Like the one that we did before)

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {...}

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {}
        });

        res.send({...});
    });
    ```

- Like the `geocode` function; add an `error` condition in the case the `forecast` function fail sending a `JSON` response

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {...}

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error });
                }
            }
        });

        res.send({...});
    });
    ```

- Cut the last `res.send` and paste it below the `error` condition on the `forecast` function

    ```js
    app.get('/weather', (req, res) => {
        if (!req.query.address) {...}

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            }
        });
    });
    ```

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/weather?address=philadelphia
- You should see the `JSON` with the correct `forecast` of `Philadelphia`

## ES6 Aside: Default functions parameters

We talk about this before but let's take a minute to check this out.

- On your editor; go to the `playground` directory
- Create a new file call `7-default-params.js`
- On this newly created file; create a function call `greeter` that receive a name and will print a message

    ```js
    const greeter = (name) => {
        console.log('Hello ' + name);
    }
    ```

- Below the function add 2 calls to the `greeter` function like this

    ```js
    greeter('Test');
    greeter();
    ```

- On your terminal; get to the `playground` directory
- Run the `7-default-params.js` file using: `nodemon 7-default-params.js`
- You should see `Hello Test` then `Hello undefined`

The `undefined` that we see is because we don't pass any value to the function and the `name` variable will get an `undefined` value; to fix this we will use a `default value` for the `name` parameter.

- Get back to `7-default-params.js` file
- After the `name` parameter on the `greeter`; function add the following

    ```js
    const greeter = (name = 'user') => {
        console.log('Hello ' + name);
    }
    ```

    This will mean that the `name` variable will have `user` as it value when the `greeter` function is called without sending any parameter

- Save the file
- Get to your terminal and you will see `Hello Test` then `Hello user`
- Now get back to the `7-default-params.js`
- Below the `greeter` calls; add the following object

    ```js
    const product = {
        label: 'Red notebook',
        price: 3,
        stock: 201,
        salePrice: undefined
    };
    ```

- Then add the following function; below the `product` object

    ```js
    const transaction = (type, { label, stock }) => {
        console.log(type, label, stock);
    }
    ```

    Here we have the `transaction` function that will print the `type` of `transaction` and the `label` and the amount of a `product` that it has on `stock` and we obtain the `label` and `stock` destructuring the `product` object

- Add the following calls below the `transaction` function

    ```js
    transaction('order');
    transaction('order 2', product);
    ```

- Save the file
- Get to your terminal and you will see an `error` because on the first `transaction` call we don't send the `product` object and it trying to destructure an `undefined` value
- To fix the `error` let's add a `default value` to the object of the `transaction` function

   ```js
    const transaction = (type, { label, stock } = {}) => {
        console.log(type, label, stock);
    }
    ```

- Save the file
- Get to your terminal and you will see `order undefined undefined` and `order 2 Red notebook 201`

Now you are destructuring an empty object so the `label` and `stock` don't exist that is why you obtain the `undefined` value and don't break the script. You can also add a `default value` to prevent that the `label` or `stock` is `undefined`.

- Get back to `7-default-params.js` file
- On the `stock` param; add a value of `0` if we don't have any of that `product` on `stock`

   ```js
    const transaction = (type, { label, stock = 0 } = {}) => {
        console.log(type, label, stock);
    }
    ```

- Save the file
- Get to your terminal and you will see `order undefined 0` and `order 2 Red notebook 201`

Now on the `transaction` function, you are destructuring an empty object if you don't send the `product` and since the empty object doesn't have any `stock` property it will take `0` as a `default value` of that property.

## Browser HTTP request with fetch

Now that we have the `JSON HTTP` endpoint we can begin the process of getting data on the browser using `client-side JS`. Let's start the process

- On your editor; go to the `app.js` file in the `js` folder of the `web-server/public` directory

As you may notice the `app.js` file is only call on the `index` page and this is the only page that we will get the `forecast` functionality and we will do the first example where we get the information of the `weather` endpoint with a fixed `url` on other section we will send values from the browser to the server.

- On the `app.js` file; below the `console.log` add the following

    `fetch('');`

    The `fetch` is not part of `js`; is a browser-based `API` which mean that we can use it on all modern browsers but is not accessible on `node.js` and this function receive an `URL`

- On the `fetch` function add the `weather URL`

    `fetch('/weather?address=Boston');`

    You can put the complete `URL` but if you put it this way will take the base `URL` of the current page that is `http://localhost:3000/`

- Now add the following after the `fetch` function

    ```js
    fetch('/weather?address=Boston').then((response) => {});
    ```

    Trigger the `fetch` function will kick off an `asynchronous` I/O` operation like `request` on the `backend` this means that we don't have the `response` right away instead we provide a function that will run sometime in the future when the data available and to provide the function we use the `then` method and the first and only parameter will be the `response`. The `then` method is part of a much bigger `API` call `promises` that we will see in future sections

- Now we will turn it into an object using the `json` method that is part of the `response` object

    ```js
    fetch('/weather?address=Boston').then((response) => {
        response.json();
    });
    ```

- The `json` function is also design to use with the `then` method so add it and send a callback

    ```js
    fetch('/weather?address=Boston').then((response) => {
        response.json().then((data) => {});
    });
    ```

- Now we will handle if the `data` object has an `error` property using a condition and print the `error`

    ```js
    fetch('/weather?address=Boston').then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return console.log('Error:', data.error);
            }
        });
    });
    ```

- Finally, we will print the `location` and `forecast`

    ```js
    fetch('/weather?address=Boston').then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return console.log('Error:', data.error);
            }

            console.log('Location:', data.location);
            console.log('Forecast:', data.forecast);
        });
    });
    ```

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/
- Open the `dev tools`
- Choose the `console` tab
- You should see the correct `forecast` data for the `Boston`
- Get back to the `app.js` file
- Change the `url` of the `fetch` function to `/weather?address=!`
- Save the file
- Refresh the page
- You should see an `error` message on the console
- Get back to the `app.js` file and put `/weather?address=Boston` on the `fetch` function

## Creating a search form

Now we are in a good shape to build our `search form` so the user can send to the `backend` the `location` so it can retrieve the `forecast`. Let's get to it

- On your editor go to the `index.hbs` file in the `web-server/templates` directory
- Below the `p` tag; add a `form` tag

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
                <p>Use this site to get your weather!</p>

                <form></form>
            </div>
            {{>footer}}

            <script src="/js/app.js"></script>
        </body>
    </html>
    ```

- Inside of the `form` tab add an `input` and `button` element

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
                <p>Use this site to get your weather!</p>

                <form>
                    <input />
                    <button></button>
                </form>
            </div>
            {{>footer}}
        </body>
    </html>
    ```

- Inside of the `button` tab; add the following text

    `<button>Search</button>`

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to `http://localhost:3000/`
- You should see an `input` and a `button` on the page
- Get back to the `index.hbs` file
- On the `input` element; add a `placeholder` property with the following value

    `<input placeholder="Location" />`

At this moment if you click the `button` of the `form` nothing happen so we will need to add some more code to actually make the `form` works as expected and we will use `js` functions to do it and the place that we can add `js` for our `client side` is the `app.js` file that we add before on the `public` directory that already loads on the `index` page

- On your editor; go to the `app.js` file on the `public/js` directory
- Now we need to select the element from our `HTML` document that we are trying to work with and the element will be the `form` that we add before. So bellow of the  `fetch` function add the following

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    document.querySelector();
    ```

    The `document` object is a representation of the `HTML` document that have some functions that we can use like `querySelector` that will select an element that we need from the `HTML` document

- Pass a string with the name of the element that you need to select in this case the `form` element

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    document.querySelector('form');
    ```

    What comes back from the `querySelector` function is a `JS` representation of the element and we can use that to manipulate the element or to things when the user interacts with the element

- Catch the `querySelector` return value on a constant call `weatherForm`

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');
    ```
Now we are going to run a code when someone `submits` the `form` because that code is going to be responsible for `fetching` the `weather`; to do this we are going to use an `event listener`. The `event listener` subscribe you to an `event` that happens on an element in the `HTML` document such as `click` an element, `hover` an element, or `submit` a `form`

- Below the `weatherForm` add the following

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');

    weatherForm.addEventListener();
    ```

- The `addEventListener` receive 2 arguments; a string with the name of the `event`(in this case `submit`) and a `callback`. Add the parameters to the function

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');

    weatherForm.addEventListener('submit', () => {});
    ```

    The `callback` function will run every time that the `event` happen

- Now print a message to test inside of the `callback` function

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');

    weatherForm.addEventListener('submit', () => {
        console.log('testing!!');
    });
    ```

- Save the file
- Refresh the page
- Open the `dev tools`
- You should see an `error`

The `error` is not produced by the `JS` code in fact the `error` is produced by the position of the `script` on the `index.hbs` this is because the `script` loads before the actual element render on the page so the `script` will not found the element with the `querySelector` function then we are trying to subscribe to an `event` on an `undefined` value.

- Get to the `index.hbs` file
- Cut the `script` tag and add it at the bottom of the `body`

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
                <p>Use this site to get your weather!</p>

                <form>
                    <input placeholder="Location" />
                    <button>Search</button>
                </form>
            </div>
            {{>footer}}

            <script src="/js/app.js"></script>
        </body>
    </html>
    ```

    Now the `script` will run after all the elements render on the page

- Save the file
- Refresh the page
- Check on the console of the `dev tools` and you should not see an `error`
- Click on the `search` button(take a look in the `dev tools` console at the same time you click on the button)
- You will see the `testing!!` message for a second on the console. This is because the browser refresh completely when you `submit` the `form` that is the default behavior of the browser(That make sense a long time ago before you access to `client site js`)
- Get to the `app.js` file
- On the `addEventListener` in the `callback` function; add the parameter that send us by default `addEventListener` that is a `JS` representation of the `event`

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');

    weatherForm.addEventListener('submit', (e) => {
        console.log('testing!!');
    });
    ```

    Normally we name the `event` object `e`

- Before the console; call the `preventDefault` method of the `e` object

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('testing!!');
    });
    ```

    The `preventDefault` method will prevent the default behavior of the browser

- Save the file
- Refresh the browser
- Click the `search` button
- Check the console of the `dev tools` and you should see the `testing!!` message
- Get back to the `app.js` file
- Now we need to grab the value of the `input` so we will select the element with the `querySelector` function and store the value on a constant call `search`

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('testing!!');
    });
    ```

- Inside of the `addEventListener callback`; get the `value` of the `input` using the `value` property of the `search` object and store that value on a constant call `location` and print it value

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;

        console.log('testing!!');
        console.log(location);
    });
    ```

- Save the file
- Refresh the page
- Type something on the `input` and click the `search` button
- You should see the `input` value on the console of the `dev tools`
- Get back to the `app.js` file
- Cut all the `fetch` code
- Inside of the `addEventListener callback`; delete the console
- On the same `callback` function paste the `fetch` function

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;

        fetch('/weather?address=Boston').then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    return console.log('Error:', data.error);
                }

                console.log('Location:', data.location);
                console.log('Forecast:', data.forecast);
            });
        });
    });
    ```

- Change the `url` of the `fetch` function to use the `location` value

    ```js
    console.log('Client side javascript file is loaded!');
    fetch('/weather?address=' + location).then((response) => {...});
    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    return console.log('Error:', data.error);
                }

                console.log('Location:', data.location);
                console.log('Forecast:', data.forecast);
            });
        });
    });
    ```

- Save the file
- Refresh the page
- Type a valid `location` on the `input` and click the `search` button
- You should see the `forecast` of the `location` that you type in the console of the `dev tools`

## Wiring up the user interface

In this section, we will take the messages that we are printing on the console and have them show up on the browser also some styling to the page.

The first thing that we are going to do is give someplace to render the messages. So let's get into it!!

- On your editor; go to the `index.hbs` in the `web-server/templates` directory
- Below the `form` tag; add 2 `p` tags

    ```hbs
     <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
                <p>Use this site to get your weather!</p>

                <form>... </form>

                <p></p>
                <p></p>
            </div>
            {{>footer}}

            <script src="/js/app.js"></script>
        </body>
    </html>
    ```

    In those `p` tags we will render both messages when we successfully get the `forecast` information from a `location` and if we got an `error` only the first `p` tag will have the `error` message

Now our goal is to select the `p` tags on our `js` code and manipulate them so they show the correct value depending on the `forecast` result but as you may remember we use the `querySelector` function to choose an element from the browser on our `js` code sending a `string` of the `element` that we want to select but in this case, we have 2 `p` tags because the `querySelector` function just match the first `element` that it finds and we have 2 of them so we will need to be more specific adding a unique `id` on each `p` tag so we can select the specific `element` that we want.

- On the `p` tags that you just added; put a unique `id` to each of then

    ```hbs
    <p id="message-1"></p>
    <p id="message-2"></p>
    ```

- Now get to the `app.js` file on the `public/js` directory
- Below the `search` constant; add 2 constant calls `messageOne` and `messageTwo` that its value will be the result of the `querySelector` function using the `id` of each `p` tag

    ```js
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');
    ```

Now we need to change the content of each `p` tag dependinng the moment on each step of the `request` to get the `forecast`:

- Before doing the `request`; we will put `loading...` on the `p` tag and the second one will be empty
- If we got an `error` of the `request`; we will put the `error` message on the first `p` tag and the second will be empty
- If the `request` goes as expected; we will put the `location` on the first `p` and the `forecast` on the second

Using these conditions we will add the logic that we need on the `callback` function of the `event listener`

- Below the `location` constant definition add the following:

    ```js
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';

        fetch('/weather?address=' + location).then((response) => {...});
    });
    ```

    The `textContent` property will represent the content of our element so we are substituting this value with the `loading` message for the first `p` tag and empty for the second `p` tag

- Now  on the `fetch` function in the `error` condition; remove the console and update the first `p` tag message with the `error` message

    ```js
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error;
                    return;
                }
                ...
            });
        });
    });
    ```

- Then remove the 2 consoles below of the `error` condition and update the content of both `p` tags using the `location` and `forecast` information

    ```js
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error;
                    return;
                }

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            });
        });
    });
    ```

- Save the files
- On your terminal; get to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/
- On the input put an invalid `location` like `!` and click the `submit` button
- You should see the `error` message
- Now put a valid `location` on the `input` like `Boston` and click the `submit` button
- You should see the `location` and `forecast` on the browser

Finally, we will add some more styling for the application

- Go to the `styles.css` file on the `public` directory
- At the bottom of the file add a rule for an `input`

    `input {}`

- Set the `border` property with the following value

    ```css
    input {
        border: 1px solid #cccccc;
    }
    ```

- Now we will add some space inside the `input` with the `padding` property

    ```css
    input {
        border: 1px solid #cccccc;
        padding: 8px;
    }
    ```

- Then add a rule for a `button` below the `input` rule

    `button {}`

- The first thing that we are going to set is the `cursor` property that will help us to style the `cursor` when you `hover` the `button`

    ```css
    button {
        cursor: pointer;
    }
    ```

- Now add the following style for the `border`

    ```css
    button {
        cursor: pointer;
        border: 1px solid #888888;
    }
    ```

- Then we need to change the `background` to the same color of the `border`

    ```css
    button {
        cursor: pointer;
        border: 1px solid #888888;
        background: #888888;
    }
    ```

- For that `background` we will need to update the `color` of the text

    ```css
    button {
        cursor: pointer;
        border: 1px solid #888888;
        background: #888888;
        color: white;
    }
    ```

- Finally; we will need to add the same space that we added on the `input` using `padding`

    ```css
    button {
        cursor: pointer;
        border: 1px solid #888888;
        background: #888888;
        color: white;
        padding: 8px;
    }
    ```

- Save the file
- Get to your browser and refresh the page
- You should see that the `button` and `input` update their styles
