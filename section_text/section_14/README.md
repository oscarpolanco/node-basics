# Section 14: Sending Emails(Task App)

In this section we will set up `email notifications` on the `task app` and we will do this by just by calling a function providing the necessary data like who will be the recipient of the `email` or what the `body` and `subject` should be. For this, we will use the [sendGrid](https://sendgrid.com/) service that is a service designed for developers who want to send `emails` from applications(There are other applications like [postmark](https://postmarkapp.com/) and [mandrill](https://mailchimp.com/)) and `SendGrid` have an `npm module` that we can upload it to the application that will make easy to set everything to send the `email` that we need.

## Exploring SendGrid

We will begin this process by sending an `email` from `nodeJs` where we are going to explore the service that we help us to send the `email` then we write some code to actually send the `email`.

When it comes to picking a service to send `emails` you have a variety of options but for this example, we will use `SendGrid`. We will need to set this service before sending the `mail` from `node.Js`

- On your browser; go to https://sendgrid.com/

One of the reasons that we use `SendGrid` is that it has a nice free tear so you can begin integrating `email` into your app before you ever need to pay and it doesn't need a custom domain in order to set up.

- On the `SendGrid` page in your browser; click on the `Pricing` option on the top navigation bar
- You will see a page will all `SendGrid` plans to choose
- Choose the `Free` plan by clicking the `Start for free` button on the `Free` plan section
- Now fill out the form to `sign up` for an account(Use a valid `email` to create the account)
- Submit the form
- Then fill out the `Tell Us About Yourself` form(For the company-related info put `none` and for the `emails` per month choose `0 to 100,000`)
- Submit the form
- You should be redirected to your `dashboard`
- Go to the `mail` that you use to create the `SendGrid` account and verify your new account
- Get back to the `SendGrid` dashboard

Now we will need an additional step of verification because sending `emails` is a reputation base game which is why a lot of verification is required. You may think that we are just sending an `email` but something important that you need to take into consideration is the reputation of the `sender` of the `email` because this will determine if the `email` service will threaten that `sender` as `spam` and if the `sender` is a threat as a `spam` will make `SendGrid` look back so all the `SendGird` users will be affected.

- Click on the `settings` options at the left sidebar
- Choose `Sender Authentication`
- Between the `Authenticate your domain` and `Brand your links` you should see a `Single Sender verification`; on the `Single Sender verification` click `Get Started` or go to https://app.sendgrid.com/settings/sender_auth/senders
- Click on the `Create new Sender`
- Fill out the form(On the `From Email Address` and the `Reply To` need to be the same that you use on our code and make sure that is a real email because the `sender` need to be verified)
- Submit the form
- Go to the `email` that you use to create the `sender` and verify it
- Get back to https://app.sendgrid.com/settings/sender_auth/senders
- You should see the `sender` verify
- Click on your `username` at the top left
- Choose `Setup Guide`
- On the `Send your First Email` section; choose the `Integrate using our Web API or SMTP relay` by clicking the `start` button
- Now `choose` the `Web API` option

    We choose `Web API` to take advantage of the `SendGrid node module`

- Then `choose` the `NodeJs` section
- You will see a list of steps that will help us to send an `email` using `Node.js`

We can send an `email` anonymously so we will need to create an `API key` before continue

- Get to the `Create key` button
- Fill the input with a name for the `key`; in this case, we will use `Task App`
- Click the `Create key` button
- You will see a new `key` is created
- Copy the `key`

Now we will begin to code the example

- On your editor; get to the `task-manager/src` directory
- Create a new folder called `emails`
- Inside of this newly created folder; create a new file called `account.js`
- At the top of the newly created file; create a new constant call `sendGridAPIKey`
- Paste the `key` that you copied before as a string on the `sendGridAPIKey`

    `const sendGridAPIKey = 'my_api_key';`

- Get to your terminal
- On your terminal go to the `task-manager` directory
- Install the `SendGrid` module using: `npm install @sendgrid/mail`
- Get to the `account.js` file
- At the top of the file; require the `SendGrid` module(By convention is called `sgMail`)

    `const sgMail = require('@sendgrid/mail');`

Before we send the `email` we need to tell `SendGird` that we are going to use our `API key` so when we send the `email` it will know that is associated with our account.

- Use it `setApiKey` method from the `sgMail` object sending the `API key`

    `sgMail.setApiKey(sendGridAPIKey);`

- Call the `send` method of `sgMail`

    `sgMail.send();`

    The `send` method will allow us to send an individual `email` and we just need and in this method, we will only need to past an object with the `email` specification

- Past an object to the `send` method with the following values:

    ```js
    sgMail.send({
        to: 'email.that.you.will.send.the.email@test.com',
        from: 'email.of.your.sender',
        subject: 'This is my first creation!',
        text: 'I hope this one actually gets to you.'
    });
    ```

    - The `to` property is to set the `email` that you will receive your email
    - The `from` property is the `email` of your `sender`
    - The `subject` property is to specify the `subject` of the `email`
    - The `text` property is to specify the content of the `email`. There is an `HTML` property that also set the content of the `email` using `HTML` to style your content but for now, we won't use it

- Save the file
- Get to your terminal
- Use `node` to run the `account.js` script using: `node task-manage/src/email/account.js`
- Go back to the `SendGrid` step page
- Scroll to the bottom
- Check the `I've integrated the code above`
- Click on the `Next: Verify Integration` button
- On the next page click on the `Verify Integration`
- You should see the `It worked!` message
- Go to the `email` account that you send the `email`
- You should see the `email` that you send with the code

## Sending welcome and cancelation emails

Now that we can send `email` from `node.js` we can begin with the integration on our `task app`. In this case, we will send `emails` when the `user` create or delete an `account`.

- On your editor; go to the `task-manage/src/emails/account.js`
- Remove the call of the `send` method of `sgMail`

Instead of just sending an `email` on this file we will create functions that we can use on other files so we can send `email` in the place that is needed in this case on the `user routes`.

- At the bottom of the `account.js`; create a new function called `sendWelcomeEmail` that receives an `email` and `name` of a `user`

    `const sendWelcomeEmail = (email, name) => {}`

- On the newly created function; call the `send` method of `sgMail`

    ```js
    const sendWelcomeEmail = (email, name) => {
        sgMail.send();
    }
    ```

- Now set the `to` using the `email` parameter; `from` with the `sender email`; `subject` with a message that represents the `email` purpose on the `send` method configuration object

    ```js
    const sendWelcomeEmail = (email, name) => {
        sgMail.send({
            to: email,
            from: 'your_sender@email.com',
            subject: 'Thanks for joining in!',
        });
    }
    ```

- Now for the `text` property we will use `template` string to add the `name` of the `user` in the content message(You can put any message you want but for practice, we add the `name`)

    ```js
    const sendWelcomeEmail = (email, name) => {
        sgMail.send({
            to: email,
            from: 'your_sender@mail.com',
            subject: 'Thanks for joining in!',
            text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        });
    }
    ```

- Then at the bottom of the file; `export` the `sendWelcomeEmail` function

    ```js
    module.exports = {
        sendWelcomeEmail
    }
    ```

    We use an object because we will `export` more than one function from this file

- Get to the `routes/user.js` file
- Below the `auth` require at the top of the file; require the `sendWelcomeEmail` function

    `const { sendWelcomeEmail } = require('../emails/account');`

- Go to the `/users post` handler
- Below the `user.save()` line; call the `sendWelcomeEmail` sending the `email` and the `name` of the `user` that just saved on the handler

    ```js
    router.post('/users', async (req, res) => {
        const user = new User(req.body);

        try {
            await user.save();
            sendWelcomeEmail(user.email, user.name);
            const token = await user.generateAuthToken();

            res.status(201).send({ user, token });
        } catch (e) {...}
    });
    ```

- Save the files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- Go to `postman`
- Get to the `Create user` request tab
- Create a new `user` and make sure to use a valid `email` account that you can check
- Send the request
- The `user` should be created
- Go to the `user email` account
- You should see the `email` that you send from your app

In general, we will add all the `email` logic in one place and then export functions that we can use that logic wherever we want also you may ask if the send `email` process is `asynchronous` and is an `async` process but we don't need to wait that the `email` is sent to continue with the other code that is why we don't use `async/await`. Finally, on `SendGrid` we can set our custom domain to send `emails`.

Now we will continue with the `cancelation email`.

- Get to the `account.js` file
- Below the `sendWelcomeEmail` function; create a new function call `sendCancelationEmail` and receive `email` and `name`

    `const sendCancelationEmail = (email, name) => {}`

- Call the `send` method of `sgMail` with the necessary data to send the `email`

    ```js
    const sendCancelationEmail = (email, name) => {
        sgMail.send({
            to: email,
            from: 'your_sender@email.com',
            subject: 'Sorry to see you go',
            text:  `Goodbye, ${name}. I hope to see you back soon.`
        });
    }
    ```

- Export the `sendCancelationEmail` function

    ```js
    module.exports = {
        sendWelcomeEmail,
        sendCancelationEmail
    }
    ```

- Go to the `route/user.js` file
- Import the `sendCancelationEmail` function

    `const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');`

- Get to the `/user/me delete` handler
- Below the `remove` line; call the `sendCancelationEmail` function sending the `email` and `name` of the `user`

    ```js
    router.delete('/users/me', auth, async (req, res) => {
        try {
            await req.user.remove();
            sendCancelationEmail(req.user.email, req.user.name);

            res.send(req.user);
        } catch (e) {...}
    });
    ```

- Save the files
- Go to `postman`
- Get to the `delete` request tab(Remember; when we `create` a `user` it will log in that `user` so at this moment you are logged in with the `user` that you create before)
- Send the request
- The `user` should be `delete` it
- Go to the `user email` account
- You should see the `cancelation email` that you just set

## Environment variables

We are going to set `environment variables` for our `node` application. Our application is already using an `environment variable` on the `task-manager/src/index.js`; as you see we use `process.env` which is where the `environment variables` live and in this case we access `PORT` which is provided by `Heroku` when we deploy our application so on this section we will focus on providing `environment variables` to our `node` application when it runs locally on our machine. There are 2 reasons for using `environment variables`:

- Security reason
- Customizability

First, we are going to talk about customizability; on the `task-manager/src/db/mongoose.js` file you will see that we send a connection string of our local database so that means when our application run locally it will connect to our local database but that also mean when you deploy the app to `Heroku` it will try to connect to our local database which is not going to exists. We actually need another service that provides to set up a professional `MongoDB` database to use its connection string to production so we will have 2 values that we need on this file depending on the `environment` and the solution is to set an `environment variable` that we change the value depending the current `environment` of the moment.

When it comes to `security`, we have a lot of important information hardcoded on our application such as the `SendGrid` API key in the `task-manager/src/emails/account.js` file. If we leave the mentioned API key, we will push it up to `Github` and then to `Heroku` and this will increase the chances that someone gets access to this private information so we will add this private information to an `environment variable` and don't directly commit this kind of data so it never will be on the history of our application.

We are going, to begin with, the `port` value on the `task-manager/src/index.js` file where we are going to provide the `environment variable` value locally so we can remove the `port` hardcoded on the code and the first thing we are going to do is define the place on which every `environment variable` will be set.

- On your editor; go to the `task-manager` directory
- Create a new folder called `config`
- On this newly created directory; create a new file called `dev.env`
- Inside a new file; add the following

    `PORT=3000`

    This file will consist of a `key-value` pair on each line; in this case, we are adding the `PORT` variable and the value `3000`. Its important to don't add any extra formatting such as spaces or quotes because those things will be taken into concideraton as the `environment variable` value

- Go to the `src/index.js`
- Remove the `3000` value of the `port` constant

    `const port = process.env.PORT;`

- Save the files
- Get to your terminal; begin the `MongoDB` process using: `sudo mongod --dbpath /path_on_your_machine/mongodb/data/db`
- On the other tab of your terminal; run your local server using `npm run dev`
- You will see on the logs that the `port` is `undefined`

At this moment we are not setting the `environment variable` yet. To actually use the `environment variables` we will use an `npm` module called [env-cmd](https://www.npmjs.com/package/env-cmd) that will help us with these because every operating system has its own way to add `environment variables` and this module allows us to get this done on a compatible way.

- On your terminal; get to the one that is running your local server
- Shut down the local server
- Install the `env-cmd` module as a dev dependency using: `npm install --save-dev env-cmd`
- On your editor; get to the `package.json` file
- Go to the `dev` script

Now we are going to tell our application that use the `dev.env` file to set our `environment variables`. We are don't going to use it on the `start` script because `Heroku` will be in charge of setting those values on the `production` version.

- On the `dev` script; add the following

    `"dev": "env-cmd -f ./config/dev.env nodemon src/index.js"`

    We add the `env-cmd` then specify the `f` option that is us to set a `file` path and finally we send the actual path of the `environment variables` path. With this, our application will use this file to set the `environment variables`

- Get to your terminal and run your local server using `npm run dev`
- You should see that the `port` have the `3000` value

Something that we need to take into consideration is that the value of the `environment variable` will be available always that you added to the `dev.env` file because `env-cmd` just runs once so you will need to restart the server in order to take the new `environment variable` that you added.

Now we can continue with other values that we will add to the `dev.env` such as the `SendGrid` API key; the `JWT secret` and the `MongoDB` connection script.

- Get to the `src/emails/account.js`
- Copy the `SendGrid` API key(without the quotes)
- Remove the `sendGridAPIKey` constant and value
- Go to the `setApiKey` method and remove the `sendGridAPIKey`
- On the `setApiKey`; use the `environment variable` call `SENDGRID_API_KEY` to set the API key(is not created yet; we will set it in a moment)

    `sgMail.setApiKey(process.env.SENDGRID_API_KEY);`

    By convention, we set the `environment variables` in uppercase and separate the space with `underscore`

- Go to the `dev.env` file
- Add the `SENDGRID_API_KEY` variable and its value will be the API key that you copied before

    `SENDGRID_API_KEY=YOUR_API_KEY`

- Save both files
- On your terminal; restart your local server
- Go to `postman`
- Get to the `create user` request tab
- Create a `user` with the same credentials as the one we deleted in the last section(This is for using the same mail)
- Send the request
- The new `user` should be created
- Go to the `email` account of the `user`
- You should see the welcome `email`
- On your editor; go to the `src/db/mongoose.js`
- On the `connect` method; cut the `connection` string
- In the `connect` method; add the `connection` string using an `environment variable` called `MONGODB_URL`

    `mongoose.connect(process.env.MONGODB_URL);`

- Go to the `dev.env` file
- Add the `MONGODB_URL` variable and add the `connection` string that you cut before as its value

    `MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api`

- Now go to the `middleware/auth.js` file
- On the `decoded` constant; cut the `secret` value
- Then use a `JWT_SECRET` variable to add the secret on the `decoded` constant

    `const decoded = jwt.verify(token, process.env.JWT_SECRET);`

- Go to the `model/user.js` file
- Get to the `generateAuthToken` method
- Remove the `secret` on the `token` constant
- Use the `JWT_SECRET` variable to add the `secret` on the `token` constant

    `const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);`

- Get to the `dev.env` file
- Create a `JWT_SECRET` variable with the `secret` that you just cut before as its value

    `JWT_SECRET=thisisasecretformyapp`

- Save all the files
- Go to your terminal and restart your local server
- Go to `postman`
- Get to the `delete user` request tab
- Send the request
- The `user` should be deleted
- Go to the `email` account of the `user`
- You should see the `cancelation` mail
- Get to `postman`
- Go to the `create user` request tab
- Create the `user` that you just delete again
- Send the request
- Go to the `email` account of the `user`
- You should see the `welcome` mail
- Get to `postman`
- Go to the `read profile` request tab
- Send the request
- You should see the current `user` profile
