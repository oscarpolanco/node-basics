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
