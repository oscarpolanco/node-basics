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
