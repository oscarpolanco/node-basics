# Section 13: File Uploads(Task App)

At this moment we know how to send basic `JSON` data from the `client` to the `server` and vice versa but this section will be a little different because we are going to send a real `image` where the `client` will upload an `image file` to the `server` and this `image` will store to be able to serve it up so the `client` can access it using the app. In this case, we will allow the `user` to upload their `profile` picture for the `task app` in a specific format and we'll do some processing on our end to fill our needs and also store the `image` along side the `user profile` data and finally set a way that the `user` can access the `image` when it needs to.

## Adding support for file upload

In this section, we will add support for the file upload on our `express` application. At first, we don't worry about the `user authentication` or be sure that the `user upload` the correct file that we need; we just concentrate on the basics then we worry about all those things.

`Express` by default doesn't support file uploads but there is an `npm library` created by the team that supports `express` call [multer](https://www.npmjs.com/package/multer) that will help us to add the file support that we need. The name of this library is short for `multipart` which is the type of data that `multer` allow the application to accept. To this moment the only data that we send from the `client` to the `server` is `JSON` data where we provide the `JSON` on the request body and the `server` parse it into a `js` object to use it but for `file upload` we won't use `JSON` data instead we will use `form-data`. When you use `form-data` for `file upload` we will grab its `binary` data and send it to the `server`. Let's do a basic example.

- On your terminal; go to the `task-manager` directory
- Install `multer` using: `npm install multer`
- Run your local server using: `npm run dev`
- Go to your editor
- Get to the `task-manager/src/index.js` file
- Below the `port` constant; require `multer`(We added it here because is a basic example not part of the app)

    `const multer = require('multer');`

Now we will need to configure `multer` and sometimes we will need to configure it multiple times in our app because sometimes we will need to accept specific types of `files` on different parts of the application; in this case, we won't preform any validation.

- Below the `multer` require; create a constant call `upload` that its value will be an instance of `multer`

    `const upload = multer();`

- Send to the `multer` constructor an object with a property called `dest` and the property value will be a string `images`

    ```js
    const upload = multer({
        dest: 'images'
    });
    ```

    The `dest` property is short for `destination` and will have the name of the folder that will store our `files` in this case the `images` folder(If you don't have it on the `task-manager` directory create it)

Now we will create a new endpoint that will help the `user` to `upload` a `file`.

- Below the `upload` constant; add a `post` request that it path is `/upload` and return a `200` respond

    ```js
    app.post('/upload', (req, res) => {
        res.send();
    });
    ```

To add the `file` support for an endpoint `multer` provides us a `middleware` that we can use on our handler.

- Add the `upload` object and call the `single` method as a `middleware` on the `/upload` handler

    ```js
    app.post('/upload', upload.single(), (req, res) => {
        res.send();
    });
    ```

    The `single` method will return the `middleware` that we need

- Send the string `upload` as a `single` argument

    ```js
    app.post('/upload', upload.single('upload'), (req, res) => {
        res.send();
    });
    ```

    The string that we send for the `single` method is the name for the `upload` so you can pick whatever you want but need to use the same name that you place here on the request(shortly we will see more on this)

- Save the file
- Go to `postman`
- Create a new request(Don't need to be on the `task manage` collection)
- Add the `POST` type
- Add the URL of the request: `localhost:3000/upload`
- Click on the `Body` that is below the URL
- Click on the `form-data` check
- Hover the `key` input
- You should see that a dropdown appear
- Click on the dropdown and choose `File`
- On the `key` input write `upload`(This need to match with the string that you send to the `single` method)

    This will tell `multer` to look for `file` call `upload`(in this case) when the request comes in

- Now on the `value` input; click `Select files`
- Choose a `file` from your local machine(For this example choose a `jpg` image file)

At this moment we just need to send the request where first it will match the route that we create it; then `multer` will look for a `file` call `upload`(for this case) on the request; it going to find it and save it on the `images` directory(on this case) and finally, we will get our `200` response back

- Send the request
- Go to your editor
- You will see that on the `task-manage/images` directory is a `file`

Now you will notice that the `file` have as its name a bunch of characters and if you try to open it you will have some trouble; this is because the file name is a randomly generated series of characters(we will address this later) without a file extension so in order to see it we need to add the correct extension manually(We will address this later).

- Change the name of the `file`; but don't change any of the characters; just add `.jpg` at the end of the name
- Now open the `file`
- You should see that you have the same image that you uploaded on `postman`

Now that we can see the basics working; we can add this support for the `users` so they can `upload` their `profile picture`.

- At the `task-manager` directory; create a new folder called `avatars`
- Go to the `routes/user.js`
- Below the `express` require at the top of the file; require `multer`

    `const multer = require('multer');`

- Go to the bottom of the file
- Create a constant call `upload` that its value will be a `multer` instance

    `const upload = multer();`

- Send to the `multer` constructor; an object with a `dest` property that has the `avatars` value

    ```js
    const upload = multer({
        dest: 'avatars'
    });
    ```

- Create a new `post` route that path is `/users/me/avatar` that responds with a `200` status

    ```js
    router.post('/users/me/avatar', (req, res) => {
        res.send();
    });
    ```

- Add the `single` middleware on the newly created route sending `avatar` as the file name

    ```js
    router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
        res.send();
    });
    ```

- Save the file
- Go to `postman`
- Right-click on the `task app` collection
- Click on `Add request`
- Add the name of the new request using `upload avatar`
- Choose the `POST` method
- Add the URL of the request

    `{{url}}/users/me/avatar`

- Click on the `Body` tab below the URL
- Click on the `form-data` check
- Hover the `key` input
- You should see a dropdown
- Choose `File` on the dropdown
- Write `avatar` on the `key` input(Need to match exactly with the `middleware` value)
- On the `value` input; click `Select files`
- Choose a `file` from your machine(Make sure is a `jpg` image file)
- Send the request
- Get to your editor
- You should see that the `avatars` folder has a `file`
- Add `.jpg` at the end of the name of the `file`
- Open the `file`
- You should see the same image that you `upload` from `postman`

## Validating file upload

In this section, we will add `validation` for the files that we will upload to the server. There are 2 main things that we want to `validate`:

- The files sizes
- The file type

For the `file sizes` we want to restrict for some capacity because we don't want a large file uploaded to the server like a 2GB file for a simple thing like a `profile picture` that can be restricted to 1 or 2 MB. Then we will check the file type on the endpoints that we set in order to restrict what kind of file the `user` can upload like the `user profile` endpoint where we only one `image` file to be uploaded. Let's begin with the file size.

- On your editor; go to the `task-manager/src/index.js` file
- On the `multer` config object add the `limits` property and its value will be an object

    ```js
    const upload = multer({
        dest: 'images',
        limits: {},
    })
    ```

    The `limits` property is an object because there are multiple `limits` that we can set for a file in our case we will set the `file sizes limit`

- On the `limits` object add a `fileSize` property with the following value

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
    })
    ```

    The `fileSize` property allows us to set a maximum size of a file that we accept to upload and it receives a number in bytes so `1000000` bytes is the same as `1MB`. Set this is a good idea to prevent the `users` spam your server uploading huge files and they will cost us the store

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `upload` request tab that we create for testing
- Choose a new file that is less than `1MB` for the `upload` value on the `form-data` section
- Send the request
- Go to your editor
- You should see that the file was successfully uploaded to the `images` folder
- Get back to `postman` on the `upload` request tab
- Choose a new file bigger than `1MB` for the `upload` value on the `form-data` section
- Send the request
- You should see an `HTML` response with the `file to large error` in it(Later we will customize this error)

Now we can continue with the `file type` restriction in this case we will test with `PDF` and `word` documents; can be any file with any content just need to have those extensions.

- Get to the `index.js` file
- Below the `limits` property; add a function called `fileFilter`(shorthand syntax)

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter() {}
    })
    ```

    The `fileFilter` property receives a function that will help us to `filter` the files that we won't allow to upload. Here we use the `es6` shorthand syntax. This will be called internally by `multer`

- As arguments of the function add the following

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {}
    })
    ```

    - `req`: Contain the request been made
    - `file`: Contains information about the `file` that is been uploaded
    - `cb`: A callback function that we call when we did filtering the file

Before continuing we will check the 3 ways to use the `cb` argument. For `errors` we can call `cd` sending the actual `error` with a message like this:

`cb(new Error('File must be a PDF'));`

The other way is when things go well where we don't send the first argument then as the second one we send `true` which means that an upload is expected.

`cb(undefined, true);`

Finally, we can call `cb` without providing an `error` and with a `false` value as the second argument which will mean we silently reject the upload.

`cb(undefined, false);`

Now we can get back to the example and at this moment we will need to see the `file name` in order to get the extension. As you may remember we mentioned that the `file` parameter has information about the `file` that is been uploaded so this will help us to do the `filter` that we need. In this case, we first allow `PDF` files.

- On the `fileFilter` function; add a condition that uses the `file` object calling the `originalname` property then use on the `originalname` value the `endsWith` function to check if the string ends with `.pdf`(Since we allow `PDF` you will need to use the logical `not` operator on the condition)

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.endsWith('.pdf')) {}
        }
    })
    ```

- On the new condition return `cb` sending an `error` with a message

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.endsWith('.pdf')) {
                return cb(new Error('Please upload a PDF document'));
            }
        }
    })
    ```

- Below the condition; call `cb` providing `true` as the second argument and don't send an `error`

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.endsWith('.pdf')) {
                return cb(new Error('Please upload a PDF document'));
            }

            cb(undefined, true);
        }
    })
    ```

- Save the file
- Get to `postman`
- Go to the `upload` request tab
- Upload a `file` that is not a `PDF`
- Send the request
- You should see an `HTML` with the `error` message that you set
- Now upload a `PDF` file
- Send the request
- You should see a `200` status

Now we will change the endpoint to accept `word` files. For `word` files you will have some of them with `doc` and others with the `docx` extension so we will need to handle both of them for this, we will use a `regular expression` that is patterns used to match characters combinations in strings.

- On your browser; go to https://regex101.com/

This page will allow us to test our `regular expression` with their `UI`.

- Set the following on the `Test String` input

    `mydoc.doc`

- Now on the `Regular Expression` input add `\.`

    The `\` allow us to escape a character in other words we mean the character literally; in this case, the dot because on `regular expressions` the dot has a special meaning

- You should see that the dot is highlighted on the `Test String` input which means that the dot is considered a `match`
- On the `Regular Expression` input add the following to the `\.`:

    `\.doc$`

    Here we specify the word `doc` to be a `match` and can only be at the end of the string(The dollar sign with helping us with this)

- You will see that `.doc` is highlighted


In our case, we will need to `match` when there are `doc` or `docx` extensions so we will need to change a little bit the current `regular expression`

- On the `Regular Expression` input; add parenthesis on the `doc` word

    `\.(doc)$`

- Then add a vertical bar after `doc`

    `\.(doc|)$`

- Finally, add the word `docx` after the vertical bar

    `\.(doc|docx)$`

    This will tell that `doc` or `docx` is considered a `match` if one of them is position at the end of the string

- You should see that the `.doc` is highlighted
- Add `x` at the end of the test string

    `mydoc.docx`

- You should see that `docx` is highlighted

Now we can take our `regular expression` to our app.

- Copy the `regular expression`
- Get to the `index.js` file
- On the `fileFilter` function; remove the `endsWith` method and use the `match` method

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match()) {
                return cb(new Error('Please upload a PDF document'));
            }

            cb(undefined, true);
        }
    })
    ```

-  Paste the `regular expression` on the `match` function and enclose it between `/`

    ```js
    const upload = multer({
        dest: 'images',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(doc|docx)$/)) {
                return cb(new Error('Please upload a PDF document'));
            }

            cb(undefined, true);
        }
    })
    ```

- Change the `error` message to one that makes sense for `word` files
- Save the file
- Go to `postman`
- Get to the `upload` request tab
- Upload a `pdf` file
- Send the request
- You should see an `HTML` with the `error` message that you set
- Now upload a `doc` or `docx` file
- Send the request
- You should see a `200` status

Now we will do the same process with the `avatar upload` route.

- On your editor; go to the `routes/user.js` file
- On the `upload` constant, add the `limit` property and set the `fileSize` to be maximum of `1MB`

    ```js
    const upload = multer({
        dest: 'avatars',
        limits: {
            fileSize: 1000000
        }
    });
    ```

- Now we are going to allow just `.jpg`, `.jpeg` and `.png` extensions so add the `fileFilter` function reciving `req`, `file` and `cb` arguments

    ```js
    const upload = multer({
        dest: 'avatars',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {}
    });
    ```

- Add a condition that tests the `originalname` of the file to see if one of the extensions matches (Use the not logical operator)

    ```js
    const upload = multer({
        dest: 'avatars',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {}
        }
    });
    ```

- Inside of the condition; call `cb` sending an `error` message

    ```js
    const upload = multer({
        dest: 'avatars',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('The file should be an image'));
            }
        }
    });
    ```

- Finally; below the condition call `cb` without an `error` and `true` as the second parameter

    ```js
    const upload = multer({
        dest: 'avatars',
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('The file should be an image'));
            }

            cb(undefined, true);
        }
    });
    ```

- Save the file
- Go to `postman`
- Get to the `upload avatar` request tab
- Test with multiple files to check all the possibilities of upload

## Handling express errors

Now we will customize the `error` that is shown when the upload fails. At this moment we send an `HTML` with the `error` message that we set; we will change this to send a `JSON` with the message that we need.

- On your editor; go to the `task-manager/src/index.js` file
- On the `upload` route; remove the middleware

    `app.post('/upload', (req, res) => {...}`

- Then before the `upload` route; create a function called `errorMiddleware` that receives `req`, `res`, and `next`

    `const errorMiddleware = (req, res, next) => {}`

- Inside of the newly created function; throw an `error` with a message that mentions that it came from our new middleware

    ```js
    const errorMiddleware = (req, res, next) => {
        throw new Error('From my middleware');
    }
    ```

- Use the middleware on the `upload` route

    `app.post('/upload', errorMiddleware, (req, res) => {...}`

- Save the file
- On your terminal; run your local server using: `npm run dev`
- Go to `postman`
- Get to the `upload` request tab
- Upload any file and send the request
- You should see an `HTML` with the `error` message of the middleware

Now we see the `error` that we set on the new middleware but we still see the `HTML` so we will need to make an update to the `upload` route on which we will register a code to run when the middleware throws the `error`

- Go to the `index.js` file
- On the `upload` route; provide a new argument that will be a function that receives `error`, `req`, `res`, and `next`

    ```js
    app.post('/upload', errorMiddleware, (req, res) => {
        res.send();
    }, (error, req, res, next) => {});
    ```

    You need to specify all 4 arguments in order to `express` know that this function is for handling un-catch `errors`

- Now on the new function; response with a `400` value

    ```js
    app.post('/upload', errorMiddleware, (req, res) => {
        res.send();
    }, (error, req, res, next) => {
        res.status(400).send();
    });
    ```

- Save the file and go to `postman`
- Get to the `upload` request tab
- Send the request with the same file that you just send before
- You will see that you get a `400` status as a response
- Get back to the `index.js` file
- On the `upload` route last function; send an object with an `error` property that it value will be the `message` property of `error`

    ```js
    app.post('/upload', errorMiddleware, (req, res) => {
        res.send();
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });
    ```

- Save the file and go to `postman`
- Get to the `upload` request tab
- With the same file that you upload before; send the request
- You will see a status `400` and a `JSON` response with the `error` message of the middleware

Now we can change back to `multer` middleware on the `upload` route since we control the `error` on the new function of the route handler.

- Get to the `index.js` file
- Remove the `errorMiddleware` from the `upload` route and add the `upload.single` middleware that we use before

    ```js
    app.post('/upload', upload.single('upload'), (req, res) => {
        res.send();
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });
    ```

- Remove the `errorMiddleware` code
- Save the file
- Get to `postman`
- Go to the `upload` request tab
- Upload a file that doesn't have the `doc` or `docx` extensions
- Send the request
- You should see the `400` status with a `JSON` that has the `error` message that we sent before

Now we can do this with the `avatar` route.

- On your editor; go to the `routes/user.js`
- Get to the `avatar` route
- Add a new argument to the route that will be a function that receives `error`, `req`, `res`, and `next`

    ```js
    router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
    }, (error, req, res, next) => {});
    ```

- Inside of the new function; response with a `400` and a `JSON` that have an `error` property with a value that will be the `error.message`

    ```js
    router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
    }, (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });
    ```

- Save the file
- Go to `postman`
- Get to the `avatar` request tab
- Upload a file that is not an image( don't have `jpg`, `jpeg` or `png`)
- Send the request
- You should see the `JSON` with the `error` message and a `400` status

## Adding an image to the user profile

Now we will create a link with the file uploaded and the `user` that upload the file. At this moment the file is placed on a `avatars` directory and there is no link between the file and the `user` that uploads the file and the route doesn't have `authentication` so we will fix that thing by adding `authentication` to the `avatars` route then create a place on the `user` model to store the `image` data and finally we will create a separate route so the `users` can delete `images` uploaded before.

The first thing that we will do is to add `authentication` to the `avatars` route and this is a task that we did before on other routes using the `auth` middleware but as you may remember we already use a middleware on the `avatars` route to accept uploads using `multer` so we will have 2 middleware on this route handler and the first one should be the `auth` middleware because we won't accept any submissions.

- On your editor; go to the `task-manager/src/routes/user.js`
- Get to the `avatars` route
- After the path call the `auth` middleware

    `router.post('/users/me/avatar', auth, upload.single('avatar'), (req, res) => {...}`

The next step is to see where we are going to store the file that we upload because we are not going to use the `file system` and the reason behind that is that almost all deployment platforms require to take your code and push it to their server as we do with `Heroku` so the `file system` will be deleted every time that we deploy so the `images` that are already on the server will be deleted every time that we deploy our code so we will actually add a `field` on the `user` model to store the binary data of a file.

- Go to the `models/user.js` file
- Get to the `userSchema` definition
- Below the `tokens field`; add a new `field` called `avatar` that will have an object as its value

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{...}],
        avatar: {}
    }, {
        timestamps: true
    });
    ```

- On the `avatar` object; add a property called `type` and its value will be `Buffer`

    ```js
    const userSchema = new mongoose.Schema({
        name: {...},
        email: {...},
        password: {...},
        age: {...},
        tokens: [{...}],
        avatar: {
            type: Buffer
        }
    }, {
        timestamps: true
    });
    ```

    This is going to allow us to store the `buffer` with our `binary image` along with the `user` data on the database. We don't need to make this `field` require because this will be optional for the `user` and we won't need to add validation because `multer` manage the validation for us

Now we will need to access the `binary` data of the file on the `avatars` route and the current `user` data in order to store the file in the database. We already have an instance of the `user` on the request object provided by the `auth` middleware but we don't have the file data on the route because `multer` process the file first and save it to the `avatars` directory but `multer` give us a way to access the data on the route and we just need to delete the `dest` property on the `multer` configurations object.

- On the `upload` object; remove the `dest` property

    ```js
    const upload = multer({
        limits: {...},
        fileFilter(req, file, cb) {...}
    });
    ```

- Get to the `avatars` route
- Before sending a `200` response; call the `avatar` property of a `user` and set its value as the following

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), (req, res) => {
        req.user.avatar = req.file.buffer;
        res.send();
        }, (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });
    ```

    Here we set the `avatar` property of the current `user` provided by the `auth` middleware and use the `file` property which is an object that contains all the properties that we saw before on the `multer` configuration object that is provided by the `multer` middleware and use the `buffer` property that will have a `buffer` of all `binary` data for the uploaded file. At this moment we have the data that we need so we will need to save the new data of the `user`

- Before the `200` response; call the `save` method of the `user`(Remember to use `async/await`)

   ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        req.user.avatar = req.file.buffer;
        await req.user.save();

        res.send();
        }, (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });
    ```

- Save the files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `avatar` request tab(Make sure that you are logged in and at this phase of the example we only have one `user`)
- Upload a valid `image` file
- Send the request
- You should receive a `200` status
- Open `Robo 3T`
- Get to the `user` collection
- You should see that you have the `avatar field` with `binary` data

Now we will take the actual `binary` data and render it to the browser to see how we will need to serve this later.

- Right-click on the `avatar field`
- Click on `edit document`

You will see that the `avatar field` have an object with a `$binary` property and a large string value; we will copy this large value without the `quotes`.

- Highlight part of the beginning of the data
- Then use the scroll bar and get to the bottom
- Now press shift and click the last character before the final `quote`
- All the data should be selected
- Copy to the clipboard

We will go to one of the sites that allow us to write some markup and site at this case we will use https://jsbin.com/sisonajoho/edit?html,output

- Ge to the `jsbin` site
- Close the `js` tab
- On the `HTML`; inside of the `body` tag add the following

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>JS Bin</title>
    </head>
    <body>
        <img src="data:image/jpg;base64," />
    </body>
    </html>
    ```

    This will allow adding the `binary` data to render the `image` without an extra request. So the first thing that we set is what exactly we are providing it at this case is `data`(`data:`), not a `URL` then we specify the type of the data in this case a `jpg image`(`image/jpg;`) after that we tell the `encoding` in this case `base64`.

- After the `comma` paste the `binary` data that you copied before
- You should see the `image` that you uploaded in the `output` section

Now we can continue with the `delete avatar` route.

- Get to the `routes/user.js` file
- At the bottom of the file; add a new route that uses the `DELETE` method on the `/users/me/avatar` path; also use the `auth` middleware and have an `async` function

    `router.delete('/users/me/avatar', auth, async (req, res) => {});`

- On the `delete` route function; call the `avatar` property and set the value to `undefined`

    ```js
    router.delete('/users/me/avatar', auth, async (req, res) => {
        req.user.avatar = undefined;
    });
    ```

- Save the `user` data

    ```js
    router.delete('/users/me/avatar', auth, async (req, res) => {
        req.user.avatar = undefined;
        await req.user.save();
    });
    ```

- Response with a `200` status

    ```js
    router.delete('/users/me/avatar', auth, async (req, res) => {
        req.user.avatar = undefined;
        await req.user.save();

        res.send();
    });
    ```

- Save the file
- Go to `postman`
- Right-click on the `task manage` collection
- Click on `Add request`
- On the new request tab; add the `delete avatar` name
- Choose the `DELETE` method
- Add the `/users/me/avatar` path
- Save the request
- Send the request(Make sure that you are logged in on the `user` that you use before uploading the `binary` data)
- You should receive a `200` response
- Get to `Robo 3T`
- Go to the `user` collection
- Check the `user` data of the one that you use to upload the file
- You should see that don't have the `avatar field`

## Serving up files

Now we will serve the `user avatar`. As we see in the previous section we can use the `binary` data on an `image` tab to get the `profile image` of a `user` so we will just need to use the `read user` route to get the `avatar` information and place it on the tag but we will explore another way to serve the `image` that is constructing a `URL` that serve the `image`.

- On your editor; go to the `task-manager/src/routes/user.js`
- Get to the bottom of the file
- Create a new route that uses the `GET` method on the `/users/:id/avatar` path with an `async` function

    `router.get('/users/:id/avatar', async (req, res) => {}`

- Set a `try/catch` block on the function

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
        } catch (e) {}
    }
    ```

- On the `catch` block; return a `404` status

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

- On the `try` block we will use the `id` to get the `user` so create a new constant call `user` that its value will be the result of the `findById` method of the `User` model sending the `id` that we receive on the request

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

- Then we will need to check if we don't get a `user` or if the `user` that we get don't have an `avatar`

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.avatar) {}
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

- Inside of the condition throw an `error`

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.avatar) {
                throw new Error();
            }
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

    We don't need to add an `error` message here because we already return a `404` status on the `catch` block

- Now we need to set a `header` on the response; for this, we will use the `set` method to set the `Content-Type` header to `image/jpg`

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.avatar) {
                throw new Error();
            }

            res.set('Content-Type', 'image/jpg');
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

    We need to set this `header` to tell the requester what type of data they are getting back in this case a `jpg` image. The `header` should be always specified but you may ask that we don't specify before and this is because `express` set the `header` of the request for us for example for `JSON` responses it set the `Content-Type` to `application/json`

- Now we finally respond with the `avatar`

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.avatar) {
                throw new Error();
            }

            res.set('Content-Type', 'image/jpg');
            res.send(user.avatar);
        } catch (e) {
            res.status(404).send();
        }
    }
    ```

- Save the file
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `Robo 3T`
- Get to the `user` collection
- Edit the `user`
- Copied the `user _id`
- Get to `postman`
- Go to the `avatar` request tab
- Upload an `image` to for the `user` that you copied the `id`(We do this because we are using the same `user` that we use to test the `delete` route)
- Send the request
- You should receive a `200` status
- Go to your browser and go to the `get avatar` route using the `id` that you copied before

    `http://localhost:3000/users/id_of_the_user/avatar`

- You should see the `avatar` image on the browser

Now we have a `URL` that gets the `avatar` image of a `user` so we can use it on an `img` tag. Let's test this.

- Go to https://jsbin.com/sisonajoho/edit?html,output
- On the `body` add an `img` tab and on the `src` use the `get avatar URL`

    `<img src="http://localhost:3000/users/id_of_the_user/avatar" />`

- You should see the `avatar` image on the output section

## Auto-cropping and image formatting

In this section, we will use an `npm module` call [sharp](https://www.npmjs.com/package/sharp) to process the `images` before we save them to the database which will allow us to `resize` the `images` to prevent someone uploads a large `image` to store it and we will convert the `image` type in this case to `png` regarding the type of the `image`.

Before we continue let's do a little clean-up and add some things that we need.

- Delete the `avatar` and `image` directory from the `task-manager` folder
- Get to the `src/index.js` file
- Remove the `multer` example that we set
- Now go to the `models/user.js` file
- On the `toJSON` method; `delete` the `avatar` property of the `userObject`

    ```js
    userSchema.methods.toJSON = function() {
        const user = this;
        const userObject = user.toObject();

        delete userObject.password;
        delete userObject.tokens;
        delete userObject.avatar;

        return userObject;
    }
    ```

    This is because we don't want to return the `avatar` when we use the `read user profile` request

- Save the files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `red profile` request tab
- Send the request(Make sure that you are logged in)
- You should see the `user` data without the `avatar field`

Now we can begin to work with the processing of the `images` using `sharp`

- On your terminal; stop your local server
- Install `sharp` using: `npm install sharp`
- Re-start your local server using `npm run dev`
- Go to the `routes/user.js` file
- Below of the `multer` require at the top of the file; require `sharp`

    `const sharp = require('sharp');`

- Get to the `upload avatar` route and remove the `req.avatar` line
- Now create a new constant call `buffer` that its value will be the `sharp` object(use `await`) sending the `req.file.buffer` to its the constructor

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer);

        await req.user.save();

        res.send();
    }, (error, req, res, next) => {...});
    ```

- Now we will call the `resize` method sending an object with the `width` property set to `250` and `height` to `250`

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 });

        await req.user.save();

        res.send();
    }, (error, req, res, next) => {...});
    ```

    This method will help us to `resize` the `images` to a specific size that we set

- Then we will call the `png` method

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png();

        await req.user.save();

        res.send();
    }, (error, req, res, next) => {...});
    ```

    This method will convert the file to a `png` regarding the type of file that you send

- Finally, we call the `toBuffer` method

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

        await req.user.save();

        res.send();
    }, (error, req, res, next) => {...});
    ```

    This method will convert back to a `buffer` that we can access

- Save the `buffer` value to the `avatar field` of the `user`

    ```js
    router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

        req.user.avatar = buffer;
        await req.user.save();

        res.send();
    }, (error, req, res, next) => {...});
    ```

At this moment we are sure that we always going to have a `png` file so we can change the `header` that we set on the `get avatar` route to this type.

- Get to the `get avatar` route
- Update the `Content-Type` to `image/png`

    ```js
    router.get('/users/:id/avatar', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user || !user.avatar) {
                throw new Error();
            }

            res.set('Content-Type', 'image/png');
            res.send(user.avatar);
        } catch (e) {...}
    });
    ```

- Save the file
- Go to `postman`
- Get to the `upload avatar` request tab
- Upload the same `image` that you use before(Remember that we use a `jpg` file)
- Send the request
- You should get a `200` response
- Go to the `URL` that we get the `image` on the previews section and refresh the page
- You should see that the `image` have the size that we set on the `upload` route and if you try to save it to your machine you will see is a `png`
