# Section 6: Web Servers(Weather App)

At this moment all the applications that we created are only accessible via the command line and that is not realistic for the common users it will be much better if the user types an `URL` on the browser to interact with our application. In this section we will see the `express` module that makes it extremely easy to create `web servers` with `node` and these `servers` will allow us to `serve` all the `assets` of our application(`html`, `css` and `js`) so we can set some features for user interactions also we will able to `serve` some `JSON` data that will allow us to get the `location` from the user; get the `forecast` then send the `forecast` back to the browser to render on the screen.

## Hello express!

In this section you will run your first `node.js` base `server`; this will give the user a new way to interact with your application because they won't need to interact with the terminal instead they will use the browser. With a `node server`, we can serve what our application needs like the `assets` will need to load; like the `HTML` documents, `css` files to style the page; client-side `js` or some images; or we can take the other approach that is to serve up an `HTTP JSON` based API similar to the `mapbox` or the `weatherstack` API that we exchange `JSON` data back and forward with the `server`. We are going to begin serving the `asset` that the browser needs.

The tool that we are going to use to create the `server` is one of the originals `npm` package call [express](http://expressjs.com/) that will help us to do easily a web `server` that functions as a `backend` of our applications.

Let's begin to create our first `server`!!!!

- On your editor; go to the root of the project and create a new directory call `web-server`
- In your terminal; go to this newly created directory
- Initialize the `package.json` using: `npm init -y`
- Now install `express` using: `npm install express`
- Go back to your editor and create a new folder call `src` on the `web-server` directory. As you see here we are going to begin to be more organized to we will have a new directory where we are going to put the files instead of put everything of the root directory to scale the application a little better as the application grows
- Inside of the newly created directory; create a new file call `app.js`. This file will be the starting point of the application
- On the `app.js` file; we will need to load the `express` function so create a constant call `express` and `require` the package

    `const express = require('express');`

    The `express` library exposes a single function and that is what we call to create a new `express` application

- Bellow the `require`; create a new constant call `app` that its value will be the returning object of the `express` function

    `const app = express();`

    The `express` function doesn't take any arguments instead we configure the `server` using the various methods provided on the `app` object itself

Now we need to tell what the `server` needs to do. Imagine that we have these `URLs`: 
- `app.com` 
- `app.com/help`
- `app.com/about`

Here we have a single domain that will be run on the `express server` with multiple `routes` in this case: '', '/help' and '/about'. We just need to set the `server` to set a `response` when it reaches one of the `routes` using one of the `apps` methods in this case `get`. The `get` method will help users to configure what the `server` will do when someone wants to get the resource of a specific `url`; like `html` or `JSON`.

- Bellow the `app` definition; call the `get` method

    `app.get();`

- The `get` method receives 2 arguments; the first one is the `route` or partial `URL` and the second is a `callback` that will run when the user reaches that `route`(In this case the `route` will be an empty `string` because we are trying to configure `app.com`)

    `app.get('', () => {});`

- The `callback` receive 2 parameters: `request`(Normally know as `req`) and `response`(Normally know as `res`)

    `app.get('', (req, res) => {});`

    - `req`: Object that has information of the incoming `request` to the `server`
    - `res`: Object that contains a lot of methods that will allow us to customize what we send back to the requester

- Now we will send a text message that will display on the browser

    ```js
    app.get('', (req, res) => {
        res.send('Hello express!!');
    });
    ```

    The `send` method will allow us to `send` something back to the requester. If the user is using something like the `request` or `Axios` library this text message is what it will get back or if they are using a browser this text message is what will be displayed on the window

- We will need to run our `server` and to do this we need to use the `listen` method(Bellow the `get` method):

    `app.listen();`

    The `listen` method will be using a single time on the application and this will start the `server` and listen on a specific `port`

- The `listen` method will receive 2 arguments: the `port` that the `server` will listen to and a `callback` function that will run when the `server` starts. We will use the `port` 3000 and put a message on the `callback` function

    ```js
    app.listen(3000, () => {
        console.log('Server is up on port 3000.'); 
    });
    ```

    The `port` 3000 is a common developer `port` and this is not a `port` that we use on real sites later we will see how to handle this for production sites. We put the message on the `callback` to let know the user that the `server` is running on the terminal

- On your terminal; go to the `web-server` directory
- Run the `app.js` script using: `node src/app.js`
- You should see immediately the message that we set on the `listen` method and will stay on that message because the `server` is running
- Get to your browser and go to `http://localhost:3000/`(This `URL` will only be accessible locally on your machine)
- You will see the `Hello express!!` message on the screen
- Let's do the `help` browser. Get back to the `src/app.js` file on the `web-server` directory
- Bellow the first `get` method that you define; add another one for the `/help` route with a message that represents the `help` page

    ```js
    app.get('/help', (req, res) => {
        res.send('Help page');
    });
    ```

- Go back to your terminal; we will need to restart the `server` for the changes to take effect so stop the `server` and restart it again(If you install `nodemon` use it and you will not need to restart the `server` every time you update something on the `server`)
- Get back to your browser and refresh the page
- Go to the `/help`: `http://localhost:3000/help`
- You should see the `help` page message
- Now if you go to a `route` that doesn't exist it will give you an `error` because we just set 2 `routes`(Late we will set a `404 route` for this kind of page)
- Get back to the `app.js` file on your editor and add `weather` and `about` routes

    ```js
    app.get('/about', (req, res) => {
        res.send('About page');
    });

    app.get('/weather', (req, res) => {
        res.send('Weather page');
    });
    ```

- Restart your `server` if you are not using `nodemon`
- Test the new `routes` on your browser and you should see the correct messages for each page

## Serving up HTML and JSON

At this moment we set our `express server` and `routes` and return a text message for each `route` but on a real application, we will return `HTML` design to render on the browser or `JSON` design to be consumed by an application. To do this we will need another functionality of the `send` function.

- On your editor; go to the `app.js` file on the `web-server/src` directory
- Update the first `route` like this:

    ```js
    app.get('', (req, res) => {
        res.send('<h1>Weather</h1>');
    });
    ```

    If we send valid `HTML` tags with the message; where `express` is going to detect that and send the `response` correctly

- Next, we can send `JSON`; on the `help route` update the value of the `send` function like this:

    ```js
    app.get('/help', (req, res) => {
        res.send({
            name: 'Test',
            age: 27
        });
    });
    ```

    If we send an object to the `send` function `express` will detect this; `stringify` de object and send a `JSON response` correctly

- On your terminal; get to the `weather-app` directory
- Run the `app.js` file: `nodemon src/app.js`
- On your browser; go to `http://localhost:3000/`
- You should see the `weather` message on the page(Use your browser inspector to see that it also is on an `h1` tag)
- Go to the `help` page and you should see the `JSON` on the page
- We can also send an `array` of objects to the `send` function that will send a `JSON response`

    ```js
    app.get('/help', (req, res) => {
        res.send([{
            name: 'Test',
            age: 27
        }, {
            name: 'Testing',
            age: 28
        }]);
    });
    ```

- Go to the `help` page and refresh the page
- You should see both objects on the `JSON`
- Now we will need to update the `about route` sending an `h1` tag with a message

    ```js
    app.get('/about', (req, res) => {
        res.send('<h1>About page</h1>');
    });
    ```

- Then change the `weather route` to return a `JSON` with 2 properties: `forecast` and `location`

    ```js
    app.get('/weather', (req, res) => {
        res.send({
            forecast: 'Is always sun in Philadelphia',
            location: 'Philadelphia'
        });
    });
    ```

- Refresh the page on your browser
- Go to the `about` page
- You should see the message that you put on the `about route`
- Go to the `weather` page
- You should see the object that you send on the `weather route`

## Serving up static assets

At this moment we are sending a `string` with the `HTML` that we need on `app.js` file for some of the pages but typing `HTML` on a `Js` file in a `string` will go out of hand quickly as we add more content that is why we will write the `HTML` on separate files and made `express` serve them up(Not only `HTML` files also `Js`, `images` and other statics assets that we need on the page). Let's begin with the process.

- On your editor; go to the `web-server` directory
- Inside of this directory create a new folder call `public`(This directory is where all the assets that we are going to serve up will live)
- On this newly created directory; create a new file call `index.html`. The `index.html` is a special file that the name means that will be serving up by default and the page that will be shown on the root of our website
- Let's create a basic `HTML` structure for this file. At the top of the file add a `DOCTYPE` tag that will specify the type of file; in this case `HTML`

    `<!DOCTYPE html>`

- Then add the `HTML` tag to create the document itself

    ```html
    <!DOCTYPE html>
    <html></html>
    ```

- Inside of the `HTML` tag; add a `head` tag(we will use the `head` tag to configure some things later like setting the `stylesheet` of this document)

    ```html
    <!DOCTYPE html>
    <html>
        <head></head>
    </html>
    ```

- Bellow the `head` tag but still inside of the `HTML` tag add a `body` tag(here we are going to put everything that is going to be shown on the screen)

    ```html
    <!DOCTYPE html>
    <html>
        <head></head>
        <body></body>
    </html>
    ```

- For the moment we are going to display one `h1` title with a message that helps us to identify that the content is served from this file

    ```html
    <!DOCTYPE html>
    <html>
        <head></head>
        <body>
            <h1>From a static file</h1>
        </body>
    </html>
    ```

Now our goal is to teach up `express` how to serve the content of the `public` directory. To do this we need an important piece of information that is the `path` to the `public` folder and can't be a `relative path` needs to be an `absolute path` from the root of your machine.

`Node` provide us with 2 variables that will help us to achieve our goal that are:
- `__dirname`
- `__filename`

Let's see what these variables provide to us by default:

- On your editor; go to the `app.js` file on the `web-server/src` directory
- Print the following variables below the `express require` definition

    ```js
    console.log(__direname);
    console.log(__filename);
    ```

- On your terminal; go to the `web-server` directory
- Run the `app.js` file with `nodemon src/app.js`
- You will see 2 paths on your terminal:
    - The first one from `__direname` is the path from the root of the `hard drive` to the directory that the current `script` live
    - The second one from `__filename` is the path from the root of the `hard drive` to the file itself

It's important to know that both of these values are provided by the wrapper function that we see before in the `debug` section. We will use the `__direname` to get the actual path that we need with some `string` manipulation using another `node` core module call [path](https://nodejs.org/dist/latest-v16.x/docs/api/path.html). The `path` core module will provide us with a lot of functions but we are going to use the `join` function. Let's get to it!!!

- On your editor; in the `app.js` file on the `web-server/src` directory `require` the `path` module at the top(We put the `node` core modules at the top as a convention)

    ```js
    const path = require('path');
    const express = require('express');
    ```

- Remove the `__filename` console
- Then print the result of using the `join` function of `path` below the `__direname` console

    ```js
    console.log(__direname);
    console.log(path.join());
    ```

- You need to provide some arguments to the `join` function; for now send the `__direname` variable

    ```js
    console.log(__direname);
    console.log(path.join(__direname));
    ```

- Save the file
- Check your terminal and you will see the same `path` for the `__direname` console and the `path` one since we are providing the same `path` as the `__direname` on the parameter of the `join` function
- Get back to the `app.js` file
- Add a second parameter to the `join` function; in this case `..`(The double dots mean that you will go up a folder)

    ```js
    console.log(__direname);
    console.log(path.join(__direname, '..'));
    ```

- Save the file and check the terminal
- You should see that `__direname` points to `src` and the `join` function point to the `web-server` directory
- Get back to the `app.js` file
- On the `join` second parameter complete the `path` to the `public` directory

    ```js
    console.log(__direname);
    console.log(path.join(__direname, '../public'));
    ```

- Save the file and check your terminal
- You will see that the `join path` will be a point to the `public` directory

Now we will need to configure `express` to serve the `public` directory

- On the `app.js` directory; below the consoles create a new constant call `publicDirectoryPath` that its value will be the result of the `join` function that you use before

    `const publicDirectoryPath = path.join(__dirname, '../public');`

- Remove the consoles
- Then we will need to call the `use` function of the `app` object

    ```js
    const publicDirectoryPath = path.join(__dirname, '../public');
    app.use();
    ```

    The `use` function is something that we are going to see in more detail on a future section for the moment just think of it as a way to customize your server in this case to serve the `public` directory

- As a parameter of the `use` function we will need to call an `express` function call `static`

    ```js
    const publicDirectoryPath = path.join(__dirname, '../public');
    app.use(express.static());
    ```

    The `static` function specify the root which to serve the `statics` assets

- Now send the `publicDirectoryPath` variable as a parameter of the `static` function

    ```js
    const publicDirectoryPath = path.join(__dirname, '../public');
    app.use(express.static(publicDirectoryPath));
    ```

- Save the file
- On your browser; go to http://localhost:3000/ or refresh the page if you already are in it
- You should see the `index.html` message
- You can also visit http://localhost:3000/index.html
- You should see the same result. Since `index.html` has a special meaning for the web servers it will also show as the root page as you see before
- Get back to the `app.js`
- Remove the empty `string route handler` because it will not work anymore. This is because `express` will go throw the application until it finds a match for a `route` and in the case of the `static` call it will find a match on `index.html` that is the root `route` so the empty `string route` will never going to run
- Now lets create 2 more `HTML` files: `help.html` and `about.html` in the `public` directory(Same content of the `index` page just change the `h1` content)
- Go to the `app.js` file and remove the `help` and `about` handlers
- Save the file
- On your browser; refresh the page and go to http://localhost:3000/help.html
- You should see the content of the `help.html` file
- Go to http://localhost:3000/about.html
- You should see the content of the `about.html` file

## Serving up CSS, JS, Images and more

We have set up the `express` server to serve up our `public` directory but we only serve the `HTML` files without any other `assets` so on this section we will serve some different `assets`; like `css`, `js` and `images`; before continue setting our `express` server.

- let's add some `CSS`; on your editor go to the `web-server/public` directory
- Create a new folder call `css`
- Inside of the newly created folder; create a new file call `style.css`
- On the `style.css` we are going to add our first rule in this case to change the only thing that we have on the pages that is the `h1` title

    ```css
    h1 {
        color: grey;
    }
    ```

    Here we add the element that we need to add the rule in this case the `h1` tag then we add the `color` property that will update the `h1` color to its value in this case `grey`. Create and save this file is not enough to actually see the result on the page; we need to do another step on our `HTML` files

- Go to the `index.html` file
- Inside of the `head` tag; add a `link` tag(The `link` tag is a self-closing tag; no need to put a closing tag like the others)

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <link>
        </head>
        <body>...</body>
    </html>
    ```

- Now we need to set some attributes on the `link` tag so it can be related to our `stylesheet`. Add the following on the `link` tag

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="">
        </head>
        <body>...</body>
    </html>
    ```

    - `rel="stylesheet"`: Is short for relationship and define what exactly are we linking it; in this case a `stylesheet`
    - `href=""`: The path of the file that we are trying to load. Is important to know that the path is `relative` to our current location and the `absolute` start is the `public` directory

- On the `href` property add the following:

    `<link rel="stylesheet" href="./css/styles.css">`

    The dot means that we stay on our current directory then we navigate to the `styles.css` file

- On your terminal; go to the `web-server` directory and run the `app.js` file: `nodemon src/app.js`
- On your browser go to `http://localhost:3000/`
- You should see that the title of the page is `grey`. This `style` is available using the `relative` path but we can use the `absolute` path to do the same
- Get back to the `index.html` file
- Update the `href` of the `link` tag like the following:

    `<link rel="stylesheet" href="/css/styles.css">`

    The `absolute` path starts with `/` and typically when you start a path with a `/` on your machine it means that it will bring you to the root of the hard drive but this is access by the browser and it doesn't have access to your hard drive; otherwise anyone can put files on your website that you don't want in your page so the `/` will be `relative` to the webserver root that we set up is the `public` folder. Finally, we navigate to the `styles` path normally and that is the path that we are going to use

- Save the file
- Go to your browser and refresh the page
- You should see the `style` still is on the title
- Go back to the `index.html` tag and copy it
- Go to the `about.html` and `help.html` files and paste the `link` tag inside of the `head` tag
- Go to your browser and refresh the page
- Navigate to the `about` and `help` page and you should see the correct `style` on the `h1` title

Now let's add some `client-side js`

- On the `public` directory; add a new folder call `js`
- Inside of the newly created folder; create a new file call `app.js`(Later we are going to add more functionality to this files)
- On the `app.js` file print a message

    `console.log('Client-side javascript file is loaded!');`

- Get to the `index.html` file
- We need to add the `app.js` file using a `script` tag. On the `head` tag add the following:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/css/styles.css">
            <script></script>
        </head>
        <body>...</body>
    </html>
    ```

- Now as we did with the `link` tag; we need to add the path of the `js` that we are going to need to load with the page and we do that with the `src` property of the `script` tag

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/css/styles.css">
            <script src="/js/app.js"></script>
        </head>
        <body>...</body>
    </html>
    ```

- Save the file
- Get to your browser and refresh the page
- Open the developer tools and get to the `console` tap
- You should see the message that we add on the `app.js` file

Finally, we will add an `image` on the page; in this case, it will be a profile `image` on the `about` page so get an image that you like on your profile.

- On the `public` directory; add a new folder call `img`
- Inside of this newly created folder add the `image` that you will use on your page
- Now get to the `about.html` page
- Below the `h1` tag add an `img` tag(Is a self-closing tag so no need to close it as the other tags)

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <h1>About</h1>
            <img />
        </body>
    </html>
    ```

- As the `script` tag we will need to add the `src` property with the path of the `image`(Remember you need to put the exact name and extension of the `image` in order to work)

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <h1>About</h1>
            <img src="/img/your_image_name.your_image_extension" />
        </body>
    </html>
    ```

- Save the file
- On your browser refresh the page
- Go to the `about` page
- You should see the `image` on the page
- The `image` has a size that may be too big or small so we will control this with the `stylesheet`. So get to the `style.css` file
- Below the `h1` rule add the following

    ```css
    h1 {...}

    img {}
    ```

    This will target all the `img` tags but we only have one on the `about` page

- Now we need to have a `250` pixel wide so we will use the `with` property for this

    ```css
    h1 {...}

    img {
        width: 250px;
    }
    ```

- Save the file
- On your browser refresh the page
- In the `about` page you should see that the `image` change it side

## Dynamic pages with templating

At this moment we set up `express` to serve our `statics` files of the `public` directory; the `js`, `image`, `css` and `HTML` files but as its name implies their content does not change when they serve. There are times that we need `static` pages but this not always is the case. In this section, we are going to set up a `template engine` using `express` to `render dynamic` pages and we will be using [handlebars](https://handlebarsjs.com/). `Handlebars` will allow us to create `dynamic` documents and easily create code that we can reuse between pages; like a `header` or `footer` that we can share with all pages instead of copy the same code on every page.

There are 2 `npm` modules:
- [handlebars](https://www.npmjs.com/package/handlebars): Is a low level library that implement `handlebars` in `js`.
- [hbs](https://www.npmjs.com/package/hbs): Module that uses `handlebars` behind the scenes and helps to integrate it with `express`

The `handlebars` module is not going to be enough because we are going to use `handlebars` with `express` that is why we will use the `hbs` module that we can think of a plugin for `express` that implement `handlebars`. Let's begin with the process

- On your terminal; go to the `web-server` directory
- Install the `hbs` module using: `npm install hbs`
- Now on your editor; go to the `app.js` file
- We will need to tell `express` which `template engine` we will use and for this, we use the `set` function of the `app` object. Below the `publicDirectoryPath` add the following:

    `app.set();`

- Then we will need to add the parameters for the `set` function that are: the setting name and the value

    `app.set('view engine', 'hbs');`

    The setting name will be `view engine`(Needs to be written like this with the spacing and letters in order to work) that will specify `express` that we are setting a `view engine` and the second parameter is the name of the module that we installed that is `hbs`. With this `express` will know that we are using `hbs` as our `template engine`

- When we are working with `express` it will expect that all our `views` in this case the `handlebars views` live in a specific folder on the root of the project call `views`. So on the `web-server` directory create a new folder call `views`
- Now in our case, we need to specify that we are targeting the `views` directory correctly and not the root of the repository so we will need to `set` the path of the `views` directory as we did with the `public` folder for the `statics`. Go to the `app.js` file
- Bellow the setting of the `view engine` add the following:

    ```js
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(publicDirectoryPath));
    ```

    This will tell `express` that the `views directory` that we are going to be using is the `views` folder inside of the `web-server` directory

- Now inside of the `views` directory; create a new file call `index.hbs`(`hbs` is the `handlebars` file extension)
- Then go to the `index.html` in the `public` directory and copy its content
- Paste the `index.html` content on the `index.hbs` file
- On the `index.hbs` update the `h1` to `Weather` to see the difference with the `index.html` file
- Since we have the `index.hbs` we don't need the `index.html` file anymore. Delete the `index.html` file on the `public` directory
- To actually serve the `index.hbs` file we need to create a `route` so go to the `app.js` file on the `src` directory
- Below of the `express.static` config; add a `route` for the default route

    `app.get('', (req, res) => {}):`

- To this moment every time we set a `route` we use the `send` function for the `response` but now we will need to use the `render` function that will allow us to `render` one of our `views`. On the newly created `route` add the following

    ```js
    app.get('', (req, res) => {
        res.render('index');
    }):
    ```

    It receives the exact name of the `view` that is on the `views` directory without the extension

- On your terminal; go to the `web-server`
- Run the `app.js` file using: `nodemon src/app.js`
- On your browser; go to http://localhost:3000/
- You should see the message that you set on the `index.hbs` file

By calling `res.render`; `express` go and get the `view` then convert it to `HTML` and make sure that the `HTML` gets back to the requester.

At this point, we still have a `static` document so let's pass value to it.

- The first thing we are going to do is update the `index.hbs` value sending it from `node` instead of having a fixed value. So get to the `app.js` file on the `src` directory
- We will need to pass a second parameter to the `render` function and this second parameter will be an object(This object contains all values that you need that the template have access to)

    ```js
    app.get('', (req, res) => {
        res.render('index', {});
    }):
    ```

- On the object add a `title` property with the `Weather app` value to see the difference that the actual page

    ```js
    app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather App',
        });
    }):
    ```

- Now get to the `index.hbs` file on the `views` directory
- Remove the content of the `h1` and add the following

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>... </head>
        <body>
            <h1>{{title}}</h1>
        </body>
    </html>
    ```

    If you need to inject a value on a `handlebars` file; you will need to put the name of the actual value; in this case `title`; and put `curly brackets around it

- Save all the files
- Get to the browser and refresh the page
- You should see the `title` that you specify on the `render` function
- Go to the `app.js` file and let's create a second parameter call `name`

    ```js
    app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: 'Testing'
        });
    }):
    ```

- Now get back to the `index.hbs` file
- Below the `h1` tag; add a `p` tag with the following content

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>... </head>
        <body>
            <h1>{{title}}</h1>
            <p>Created by {{name}}</p>
        </body>
    </html>
    ```

- Save all the files
- Get to your browser and refresh the page
- You should see the new content on the page
- Now let do the same with the `about` page. Go to the `about.html` and copy its content
- Then create a new file call `about.hbs` and paste the content of the `about.html` file
- Delete the `about.html` from the `public` directory
- In the `about.hbs` remove the content of the `h1` and add the `title` property

    ```hbs
    <!DOCTYPE html>
    <html lang="en">
        <head>...</head>
        <body>
            <h1>{{title}}</h1>
            <img src="/img/robot.png" />
        </body>
    </html>
    ```

- Below the `img` tag add a `p` tag with the following content

    ```hbs
    <!DOCTYPE html>
    <html lang="en">
        <head>...</head>
        <body>
            <h1>{{title}}</h1>
            <img src="/img/robot.png" />
            <p>Created by {{name}}</p>
        </body>
    </html>
    ```

- Get to the `app.js` in the `src` directory
- Below the default route add a new one for the `about` page injecting the following properties

    ```js
    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About Me',
            name: 'Testing'
        });
    });
    ```

- Save all the files
- Go to your browser and refresh the page
- Go to http://localhost:3000/about
- You should see the correct content on the page
- Now go to the `help.html` file on the `public` directory and copy its content
- On the `views` directory create a new file call `help.hbs`
- Below the `h1` tag add a `p` tag with the following content

    ```hbs
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <h1>Help</h1>
            <p>{{message}}</p>
        </body>
    </html>
    ```

- Go to the `app.js` file in the `src` directory
- Below the `about` route; create a route for the `help` page sending the `message` value that we are going to inject

    ```js
    app.get('/help', (req, res) => {
        res.render('help', {
            message: 'This is some helpful message'
        });
    });
    ```

- Save all the files
- Go to your browser and refresh the page
- Go to http://localhost:3000/help
- You should see the correct content of the page

## Customizing the views directory

We already see how to set that `express` know the path of the `views` directory but actually you can customize this some more and we will need it on the next section because we are going to work with `handlebars partials`. At this moment we mentioned that the `templates` need to be on the `views` directory and need to be on the root of the project but we can change these 2 things if we want it. Let's get on it!!!

- Rename the `views` directory to `templates` on the `web-server` directory
- On your terminal; go to the `web-server` directory
- Run the `app.js` script using: `nodemon src/app.js`
- In your browser; go to http://localhost:3000/
- You should see an `error`. This `error` is because `express` is trying to look for the `views` directory and we change the name to `template`
- On your editor; go to the `app.js` file in the `web-server/src` directory
- Below the `publicDirectoryPath` variable; create a new variable call `viewsPath` that will have the following value:

    ```js
    const publicDirectoryPath = path.join(__dirname, '../public');
    const viewsPath = path.join(__dirname, '../templates');
    ```

    Here we use the `__dirname` variable that has the `path` of the folder that the `app.js` live and `join` with the `templates` directory `paths`

- Now update the `views` set up on the `use` function that we set before using the `viewsPath` variable

    `app.set('views', viewsPath);`

- Save the file
- Get to your browser and refresh the page
- You should see that everything begin to work normally

## Advance templating

At this moment we are going to begin to work with `partials`. As it name subjects the `partials` are little `templates` that are part of a bigger web page in other words little `templates` that we can reuse on pages across the site like the `header` or `footer` that are things that you want exactly the same on every page. Now let's begin with the process of setup and using `partials`

- On your editor; go to the `app.js` file in the `web-server/src` directory
- The first thing we need to do is load the `hbs` module so `require` it below the `express` statement

    `const hbs = require('hbs');`

- Now we will need to organize a little bit our `template` directory so we have the files of the `views` separated from the `partials` so create 2 folders on the `templates` directory; one call `views` and the other call `partials`
- Then move the `index`, `about` and `help` files to the `views` directory
- Get back to the `app.js` file on the `src` directory
- Update the `viewsPath` value-adding `/views` at the end of the path that we are joining with the `__dirname`

    `const viewsPath = path.join(__dirname, '../templates/views');`

- Save the file
- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon src/app.js`
- On your browser; go to http://localhost:3000/
- You should see that the page works as expected
- Get back to the `app.js` file
- We need to create another variable that has the `partials` path so below the `viewsPath` variable; create a new constant call `partialsPath` that its value will be the result of the `join` function using the `__direname` variable and the path of the `views` directory

    `const partialsPath = path.join(__dirname, '../templates/partials');`

- Now we need to `register` the `partials` that we need and we do this with the `register` function of `hbs` that receive the `partials` path that we defined before so add the following below the setting of the `views` path

    `hbs.registerPartials(partialsPath);`

- Go to the `partials` directory on the `templates` folder and create a new file call `header.hbs`(This will be the `header` that we show on all pages)
- Inside the newly create file add the following `h1`

    `<h1>Static Header.hbs Text</h1>`

- Go to the `help.hbs` file
- Before the `h1` on the `body` tag; add the following

    ```hbs
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            {{>header}}
            <h1>Help</h1>
            <p>{{message}}</p>
        </body>
    </html>
    ```

    To add a `partial` on a `template` like the properties we use the `curly brackets` and in the content, we put `>` before the name of the file

- Save the files
- Go to your browser and refresh the page
- Go to the `help` page
- You should see an `error`. This is because `nodemon` at the moment just restart the `app` when a file that has a `js` extension change
- Go to your terminal and stop the `nodemon` process
- Now restart the server using the following:

    `nodemon src/app.js -e js,hbs`

    The `-e` flag is short for `extension` and this allows us to define a common set of `extensions` that `nodemon` should watch in this case `js` and `hbs`

- Get back to your browser and refresh the page
- On each page(`about`, `index` and `help`) remove the `h1` tag
- Then on the `index` and `about` files add the `header partial` as the first element inside of the `body` tag
- Go to the `app.js` file
- On the `help` route add the `title` and `name` properties

    ```js
    app.get('/help', (req, res) => {
        res.render('help', {
            message: 'This is some helpful message',
            title: 'Help',
            name: 'Testing'
        });
    });
    ```
- Get to the `header partial` file
- Remove the content of the `h1` tag and use the `title` property as we used before

    ```hbs
    <h1>{{title}}</h1>
    ```

- Save all the files
- Get to the browser and refresh the page
- You should see the correct title on the page
- Get back to the `header partial` file
- We now are going to add a `navigation` bar with links that will help us to navigate between the pages. Add a `div` element with the following content below the `h1` tag

    ```hbs
    <h1>{{title}}</h1>

    <div>
        <a href="/">Weather</a>
        <a href="/about">About</a>
        <a href="/help">Help</a>
    </div>
    ```

- Save the page
- Go to the browser and refresh the page
- You should see a `navigation` bar and you can navigate between all the current pages
- Now we will add a `footer` for all pages. On the `partials` directory; create a new file call `footer.hbs`
- On this newly created file add a `p` tag and use the `name` property like the following:

    ```hbs
    <p>Created by {{name}}</p>
    ```

- Go to the `index` and `about` files and eliminate the `p` tag
- Then on the `index`, `about` and `help` files use the `footer partial`
- Save all the files
- Go to your browser and refresh the page
- Navigate on all pages and you should see that the `footer` is on all pages

## 404 pages

In this section, we will build a `404` page for the application to show when we are not quite sure what page to show when the user uses a `URL` that is not part of the current `route handlers`.

- On your editor; go to the `app.js` file on the `web-server/src` directory
- The first thing we need to do in order to set a `404` page adds a new `route handler`. After the last `route handler` that we set add a new one(Need to be the last `route handler` in a bit we explain why)

    `app.get('', (req, res) => {});`

- Now we need to set the `string` that will match. Previously we put the actual `URL` that will match but this will bit different because it will be everything else that is not on the other `route handlers` and for this `express` give a `wild card` character that means; match everything that is not matched so far. Add the following:

    `app.get('*', (req, res) => {});`

- For the moment we will send a message with the `send` function

    ```js
    app.get('*', (req, res) => {
        app.send('My 404 page');
    });
    ```

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser go to http://localhost:3000/what
- You should see the message that you send on the `wild card route handler`

Is important to know why this is working without interfering with the `route handlers` that we set before? This is because we put the `wild card` last. When `express` receive an incoming request it tries to look for a match checking how you set the application in order. For example: 

Imagine that a user goes to http://localhost:3000/help

- The first thing `express` will see is there is a match on the `public` folder; because in this example I set this line first:

    `app.use(express.static(publicDirectoryPath));`

- Then will look for my first `route handler` that is the `root handler`

    `app.get('', (req, res) => {...});`

- Since it's not the `root` will check my next `route handler` that is the `about` page

    `app.get('/about', (req, res) => {...});`

- Is not the `about` page neither so will go to the next one that is the `help handler` and finally will find a match and `render` the `help` template

Imaging the same as before but the user go to http://localhost:3000/what

- The first thing `express` will see is there is a match on the `public` folder; because in this example I set this line first:

    `app.use(express.static(publicDirectoryPath));`

- Then will look for my first `route handler` that is the `root handler`

    `app.get('', (req, res) => {...});`

- Since it's not the `root` will check my next `route handler` that is the `about` page

    `app.get('/about', (req, res) => {...});`

- Is not the `about` page neither so will go to the next one that is the `help handler` and will not found a match so it will continue

    `app.get('/help', (req, res) => {...});`

- Look my next `handler` that is the `weather handler` and will not find a match so move to the next one

    `app.get('/weather', (req, res) => {...});`

- Finally, get to the `wild card handler` that will match anything that gets to it so will send the message that we set

The `wild card` could be not alone; you can combine it with some other `URL`. For example, imaging that we have a set of articles for the `help` page with a starting point is our current `help` page so we have:

- `/help`(current page)
- `/help/data`(example if a `data` article exists)
- `/help/test`(example that a `test` article doesn't exists)

For the moment we are going to add a `404` for everything that is an article of `help` because we don't have any `help` article but we are going to put a more specific message for the `help` articles.

- On your editor; go to the `app.js` file
- Before the `wild card` route handler add a new `route handler`

    `app.get('', (req, res) => {});`

- On the `string` to match we will use the `/help URL` combine it with the `wild card` character

    `app.get('/help/*', (req, res) => {});`

    This will match with everything that is not matched so far that begin with `/help/`

- For the moment we will use the `send` function to show a message

    ```js
    app.get('/help/*', (req, res) => {
        app.send('Help article is not found');
    });
    ```

- Save the file
- On your browser go to http://localhost:3000/help/test
- You should see the message that you send on the `help wild card handler`

Now we will add a `404` page to show on the `handlers` that are for the `not found pages`

- On the `views` directory; create a new file call `404.hbs`
- Add the following to this newly created file

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            {{>header}}
            {{>footer}}
        </body>
    </html>
    ```

- Add a new property between the `header` and `footer` to send a custom `error` message call `errorMessage` inside of a `p` tag

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            {{>header}}
            <p>{{errorMessage}}</p>
            {{>footer}}
        </body>
    </html>
    ```

- Go to the `app.js` file
- On the `help wild card handler`; use the `render` function to call the `404` template and send all the properties that it needs

    ```js
    app.get('/help/*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Testing',
            errorMessage: 'Help article not found'
        });
    });
    ```

- Now on the `wild card handler`; use the `render` function to call the `404` template and send all the properties that it needs

    ```js
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'Testing',
            errorMessage: 'Page not found'
        });
    });
    ```

- Save all the files
- On your browser; go to http://localhost:3000/what
- You should see the `404` page with the `wild card handler` message
- Now go to http://localhost:3000/help/test
- You should see the `404` page with the `wild card handler` message

## Styling the application: part I

In this section, we will add some style for the application but will not be a lot because we want to focus on the `backend` side of the application and we will walk throw every style that we add/

- On your editor; go to the `style.css` file on the `web-server/public` directory
- We will use the `index` page to test all the `styles` that we are adding. First, we will add some `style` for the `body` of the application so delete all the current content of the `style.css` file
- Then add a rule for the `body`

    `body {}`

    This rule will allow us to add `styles` for all the application

- We are going to start with some `font` related `styles` so on the `body` rule add the `color` property with the following value

    ```css
    body {
        color: red;
    }
    ```

    This will set the `color` of the entire site not just a single piece of text. We use the `red` color to test

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/
- You should see all text with a `red` color except the `links` because the `links` have their own custom `style` to handle the `color` of the text
- Get back to the `style.css`
- On the `color` property add the following `color`

    ```css
    body {
        color: #333333;
    }
    ```

    This is a `hex` representation of a `color`. You can use a tool to give you the `hex` representation of a `color` like `photoshop` then use it on your `stylesheet`. Using this `hex` you will have a pretty close `black` but not quite `black` as before

- Save the file
- Refresh your browser and you should see that the `title` and `footer` text update it `color`
- Now we are going to add `style` to the individual characters using `font-family`. In this case, we are going to use the `arial font` that is available by default

    ```css
    body {
        color: #333333;
        font-family: arial;
    }
    ```

- Save the file
- Refresh your browser and you should see that the letters of the text update it form
- Now we will `center` the content of the page and for this, we will use a different set of properties. First, we will set a `maximum width` of the content of the `body` in this case `650 pixels`

    ```css
    body {
        color: #333333;
        font-family: arial;
        max-width: 650px;
    }
    ```

    Now the content will not take all wide of the screen it will take just a portion of it

- We will evenly distribute the space at the left and the right of the `body` using the `margin` property

    ```css
    body {
        color: #333333;
        font-family: arial;
        max-width: 650px;
        margin: 0 auto;
    }
    ```

    The first value of the `margin` property has to do with the space at the `top` and `bottom` of the `body` and we don't want to add any space there and the second parameter is the space on the `left` and `right` and we use the `auto` value to evenly distribute the space

- Save the file
- Go to the browser and refresh the page
- You should see the content is in the middle of the page
- Now resize your browser left to right and you will see that the content will be stick to the left without space. To fix this we will add some space in the actual content of the `body`
- Get back to the `style.css` file
- Below the `margin` property add the `padding` property with the following value

    ```css
    body {
        color: #333333;
        font-family: arial;
        max-width: 650px;
        margin: 0 auto;
        padding: 0 16px;
    }
    ```

    Like the `margin` property the first value will represent the `top` and `bottom` of the content and we don't want to add any space there; then we will add `16 pixels` of space at each side of the content

- Save the file and refresh your browser
- Resizes again like you did before and you will see that have some space and will not stick the content at the size of the window
- Now we will add some `styles` to the `footer` but we need to make some changes on the `partial` file so get to the `footer.hbs` file on the `partials` directory
- `HTML` give us a `footer` tag that we can use to wrap the actual content of the `footer.hbs` file inside of the `footer` tag

    ```hbs
    <footer>
        <p>Created by {{name}}</p>
    </footer>
    ```

- Get back to the `style.css` file
- Below the `body` rule add a `footer` rule

    `footer {}`

Now we are going to address some of the differences of the `padding` and `margin` properties and the best way to do this is by adding a `background` so we can see the difference.

- Add the following `background` property to the `footer` rule

    ```css
    footer {
        background: blue;
    }
    ```

- Save the file
- Go to your browser and refresh the page
- You will see that the `footer` have a `blue background` and all the text inside it

The difference between the `padding` and `margin` is that the `padding` add space inside of the element and the `margin` add space outside of the element

- Get back to the `style.css` file
- On the `footer` rule add the `padding` property with the following value

    ```css
    footer {
        background: blue;
        padding: 16px;
    }
    ```

- Save the file
- Refresh the page and you will see that a space is added between the text of the `footer` and the edges of the box
- Get to the `style.css` file
- Add the `margin` property to the `footer` rule with the following value

    ```css
    footer {
        background: blue;
        padding: 16px;
        margin: 16px;
    }
    ```

- Save the file
- Refresh your browser
- You will see that a space is added outside of the box that separates the `header` and the content of the `footer` and each side in terms of the with of the `body`

Now let's continue to add the correct `style` for the `footer`

- Get back to the `style.css` file
- Remove the content of the `footer` rule
- Add the `color` property to the `footer` rule with the following value

    ```css
    footer {
        color: #888888;
    }
    ```

- Then we will add some `style` to the `top` border of the `footer` so it can be visible using the `border-top` property

    ```css
    footer {
        color: #888888;
        border-top: 1px solid #eeeeee;
    }
    ```

    The first value of the `border-top` property will be the `width` of the `border` in this case `1 pixel`; the second is the `type of border` that is `solid`(`solid` line but can be a `dash` line) and the `color` of the `border`

- Save the file
- Refresh the page and you will see a line on the `top` of the `footer`
- Now we will add some spacing; add some space to the `top` of the `footer` to separate it from the `header` using the `margin-top` property

    ```css
    footer {
        color: #888888;
        border-top: 1px solid #eeeeee;
        margin-top: 16px;
    }
    ```

- Then we will add some spacing ad the `top` and `bottom` inside of the `footer` content using the `padding` property

    ```css
    footer {
        color: #888888;
        border-top: 1px solid #eeeeee;
        margin-top: 16px;
        padding: 16px 0;
    }
    ```

- Save the file and refresh the page
- You should see correct spacing on the `footer`
- Now that we have the `footer` changes we will continue with the `header` but the `header` template need a couple of changes to go to the `header.hbs` file on the `partials` directory
- `HTML` give us a `header` tag that we can use to wrap all the content of the `header` file in a `header` tag

    ```hbs
    <header>
        <h1>{{title}}</h1>

        <a href="/">Weather</a>
        <a href="/about">About</a>
        <a href="/help">Help</a>
    </header>
    ```

- Now get to the `style.css` file
- Add a rule for the `header` below the `footer` rule

    `header {}`

- On the `header` rule we are going to add some spacing at the `top` and `bottom` so we can separate the `header` from the `top` of the window and the `footer`

    ```css
    header {
        margin-top: 16px;
        margin-bottom: 48px;
    }
    ```

- Save the file and refresh the page
- You should see that some space is added on the `header`
- Get to the `style.css` file
- Now we will target the `h1` element; adding some spacing and a bigger `font size`

    ```css
    h1 {
        font-size: 64px;
        margin-bottom: 16px;
    }
    ```

- Save the file and refresh the page
- You should see that the `title` of the page is bigger and have some spacing between the `links` and `title`
- Get back to the `style.css`
- We will update the `styles` of the `links` of the `header` but we need to be specific because we want to update just the `links` inside of the `header` no all `links` of the application so we will add the following specific rule

    `header a {}`

    This rule only will target the `anchors` tag on the `header` of the application

- Add the following properties

    ```css
    header a {
        color: #888888;
        margin-right: 16px;
        text-decoration: none;
    }
    ```

    We will update the `color` of the `links`, adding some space between each `link` at the `right` and eliminate the `underline` that is set by default for `links`

- Save the file and refresh the page
- You should see that the `links` of the `header` update it `color`, have some spacing between them, and don't have the `underline`

## Styling the application: Part II

We gonna continue styling our templates. Let's get on it!!!

- On your editor go to the `styles.css` file on the `web-server/public` directory

If you remember the `styles` before the previews section we control the `image` of the `about` page but we eliminate that so we will need to put some `style` again to control its size but we can't do as we did before creating an `img` rule because we will target all images to prevent this we will use a `class` so we target directly the element that we want.

- On the `styles.css` at the bottom; add a rule for a `portrait` class(We are assuming that is a `portrait image`)

    `.portrait {}`

    To set a class rule you will need to put a `dot` before the class name

- Add the `width` property with a `250 pixel` value on the `portrait` class

    ```css
    .portrait {
        width: 250px;
    }
    ```

- Now we will need to add the `portrait` class on the `about` template so go to the `about.hbs` file on the `templates/views` directory
- On the `img` tag add the following

    `<img class="portrait" src="/img/your_image_name.your_image_extension" />`

- On your terminal; go to the `web-server` directory
- Run your local server using: `nodemon web-server/src/app.js -e js,hbs`
- On your browser; go to http://localhost:3000/about
- You should see that the `image` get back to the size that it had before

At this moment we are going to focus on the `footer` that we want that stick to the bottom of the page no matter the size of the content on the page but for this, we need to make some changes to the `HTML` structure of the files combine with some `styles`

- Go to the `index.hbs` file
- Wrap the `header` in a `div` with a class called `main-content`(This class can be different but as a convention, we use class names that specify its purpose)

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
            </div>
            {{>footer}}
        </body>
    </html>
    ```

- For the moment we will add a `p` tag for some content on the homepage

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>...</head>
        <body>
            <div class="main-content">
                {{>header}}
                <p>Use this site to get your weather!</p>
            </div>
            {{>footer}}
        </body>
    </html>
    ```

- Now get to the `styles.css` file
- At the bottom of the properties of the `body` rule; we need to enable [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)(A different way to layout your items) using the `display` property

    ```css
    body {
        ...
        display: flex;
    }
    ```

- Save the file
- On your browser; go to http://localhost:3000/
- You will see that the `footer` gets to the right of the content of the page.
- Get back to the `styles.css` file
- Below the `display` property on the `body` rule; add the following

    ```css
    body {
        ...
        display: flex;
        flex-direction: column;
    }
    ```

    By default, the `flex-direction` value is `row` that means that everything goes from `left` to `right` but we actually want that the elements go `top` to `bottom` and we achieve that using the `column` value

- Save the file and refresh the page
- You should see that the `footer` get to the bottom
- Get back to the `styles.css` file
- Now we need to set that the `height` of the `body` has the entire browser sizes so we can push the `footer` to the bottom and we can do this set a `minumun height`

    ```css
    body {
        ...
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    ```

    Now the `body` can have a `minimum height` of `100 viewport height` that means `100%` of the `viewport`(The `viewport` is the size of the inner window of your browser not counting the bar at the top)

- Then below of the `body` rule add the following

    ```css
    .main-content {
        flex-grow: 1;
    }
    ```

    The `flex-grow` property allows a given element to take as much space as it needs and we set this to `1` that will tell `flexbox` all the leftover space

- Save the file and refresh the page
- You should see that the `footer` stick to the bottom of the page
- We need to add on the other pages the structure to make the `footer` stick to the bottom so wrap everything on every on the `body` of the page in a `main-content div` except the `footer`
- Test every page and should work like the `index` page
- Now let's add a `title` for the tab of each tab
- Go to the `index.hbs` file
- On the `head` tag; add a `title` tag with the following content

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>
            <title>Weather</title>
            <link rel="stylesheet" href="/css/styles.css">
            <script src="/js/app.js"></script>
        </head>
        <body>...</body>
    </html>
    ```

- Save the file
- On your browser go to http://localhost:3000/
- You should see the `title` that you use on the tab of the current page
- Now on each page add the `title` tag on the `head` tag with the following content

    ```
    404 page => 404
    about page => About
    help page => Help
    ```

- Save all the files
- Test on all the pages
- You should see all the `titles` that you add on the tab of each page
- This will be the last thing that we will add and is the `favicon` of the pages(Icon on the tab of the page). Grab an `image` that you like and put it on the `img` folder in the `web-server/public` directory
- Now go to the `index.hbs` file
- On the `head` tag below the `title` add a `link` tag

    ```hbs
    <!DOCTYPE html>
    <html>
        <head>
            <title>Weather</title>
            <link rel="" href="">
            <link rel="stylesheet" href="/css/styles.css">
            <script src="/js/app.js"></script>
        </head>
        <body>...</body>
    </html>
    ```

- On the `link` tag that you just added add `icon` for the `relationship`(`rel`) and the path of the `image` that you just add in the `href` property

    `<link rel="icon" href="/img/name_of_your_icon.extension_of_your_icon">`

- Save the file
- On your browser go to http://localhost:3000/
- You should see the `image` that you added on the tab of the current page
- Now copy the `link` tag that you just added on the `index.hbs` file
- Paste the `link` tag on every page
- Save all the files
- You should see that the `image` appear on the tab of each page
