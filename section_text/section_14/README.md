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

## Creating a production MongoDB database

Before we deploy our application to production; we will need a service that provides us with a `MongoDB` database that `Heroku` can have access so for this we will use [Mongo Atlas](https://www.mongodb.com/atlas/database). We are using this option because is created by the `MongoDB` organization and will allow us to create a `free` account that stays that way until you decide to upgrade to a payment plan. Here we will assume that you don't have an account created yet.

- On your browser; go to the [Mongo Atlas](https://www.mongodb.com/atlas/database) page
- Click on the `Try free` button
- Fill out the form(Or log in with a `Gmail` account)
- Submit the form

By default, all the options will be `free`.

- Choose an `Organization` name
- Also choose a `project name` like `Task App`
- Choose `Js` as the default language

Or just `skip` and stay with the default options.

- Now click on the `create` button on the `Free` section

For the future, if you want to choose the other options; the `Serverless` option will only charge you for the operations that you run and scaling is automatic depending on your workload; the `Dedicated` option is for production applications with advanced configuration need and also have `multi-region` and `cloud` support but for us, we always are `free` for this example.

We will see the `cluster` word in the next steps so let's defined it. A `cluster` is a `MongoDB` database with multiple servers that will allow us to have a nice low latency around the globe.

- Now choose the region where the `cluster` should be deployed. We choose `Virginia`
- Then click on the `create cluster` button
- You should be redirected to your dashboard and the `cluster` is in the creation process(could take a couple of minutes)
- When the `cluster` is created; click on the `connect` button in the `cluster`
- A modal should pop up
- On the `Whitelist your connection IP address` step; click on the `Add a Different IP Address` button
- On the `IP Address` input add the following: `0.0.0.0/0`

    This is going to whitelist all the `IP address` so we can connect from our local machine and from `Heroku` also is important to know that `Heroku` change the `IP address` over time and we want to make sure that always connect. In terms of security we will have a `username` and `password` so not everyone can connect even if all `IP address` are allowed

- Click on `Add IP address`
- On the `Create MongoDB User` step; add the `Username` like `taskapp`
- On the `Password` input on the same step; add the `MongoDB password` that the `user` will use to connect(You can use the `Autogenerate Secure Password` button to generate a `password`)
- Copy the new `password` and store it in a temp place(We are going to use it later)
- Click on the `Create MongoDB User`
- Now click on the `Choose a connection method` button at the bottom of the modal

As you see we have some options; for the moment we will choose the `Connect with MongoDB Compass`. The `MongoDB Compass` is the official `MongoDB GUI` so is similar to `Robo 3T` but maintain by the `MongoDB` team unfortunately for the moment `Robo 3T` can connect to `Mongo Atlas` so we will begin to use `MongoDB Compass`

- Click on the `Connect with MongoDB Compass` option(We will assume that you don't have `Mongo Compass` installed on your machine)
- Click on the `I do not have MongoDB Compass` button
- Choose your operating system
- Click on the download button
- Use the installer to install `MongoDB Compass` on your machine
- Open `MongoDB Compass`
- Accept the `license` agreement
- Close the help modal
- You should be on a `new connection`
- Click on the `favorite` tag on the top
- Choose a name like `Localhost MongoDB Database`
- Then click the `save` button
- Now click `connect`(Make sure that you have `MongoDB` running locally)
- You should see the `task-manager-api` database
- Now on the `MongoDB compass` menu at the top; click on `Connect`
- Choose `Disconnect`
- Now on `New Connection`
- Click on the `Fill in connection fields individually` link
- You should see a form

Some of the information that we need is on the connection string that we have on the `Mongo Atlas` page that we use before on the connection string.

- Get back to the `Mongo Atlas` page
- You should still be on the modal
- Click on the `I am using Compass 1.12 or later`
- Now you will see the `connection string`
- Copy the part of the string that is after the `@` to the `/`(Don't include those characters)
- Get back to `Mongo Compass`
- You should still be on the form
- On the `Hostname`; paste the string that you just copied
- Enable the `SRV Record`
- Click on the `authentication` dropdown
- You should see the `Username` and `Password` inputs
- Add the `Username` that you added before when you create the `MongoDB` user on `Mongo Atlas`. In the case of the example, I use `taskapp`
- Get the `password` that you store before on a temp place and use it on the `Password` input on `Mongo Compass`
- Remove this temp place for the `password`
- Click on the `connect` button
- You should see that we are connected to the `Mongo Atlas` but we don't have any data yet
- Click `disconnect` on the `Connect` menu at the top

As you may remember we enable an `SRV record` on `Mongo Compass`; this option came from the `DNS` world and this is not specific to `MongoDB`. This is used to map the `host` to the correct `IP` and `port`.

- Now came back to `Mongo Atlas` and close the modal(With the close button at the top)

## Heroku deployment

Now that we set our production database we can deploy to `Heroku` and connect the app with the mentioned database. In this case, we will see to cases to `deploy` our app:

- Single project deployment
- Multiple projects deployment

### Single project deployment

Here we will set the repository on the `task-manager` directory so on `Github` only this app file will live and we will get those files to a new app on `Heroku`. Let's begin with the process.

- On your terminal; go to the `task-manager` directory
- Initialize a `git` repository using: `git init`
- Get to your editor; and check the `task-manager` directory
- You will see that `vs code`(or the editor that you are using); mark the files with a color(green on `vs code`) meaning that the repository is set

Now we will need to ignore the `node_modules` directory and the `config` directory because these are things that we don't want to commit and push to `Github`.

- On the `task-manager` directory; create a new file called `.gitignore`
- Inside of this newly created file; add `node_modules` and the `config` directory

    ```bash
    node_modules
    config
    ```

- Save the file
- You should see on your editor that the folders(`node_modules` and `config`) change color this means that we are not tracking those folders anymore
- Get to your terminal
- Add the files to the `staging` area using: `git add .`
- Now lets `commit` the changes using: `git commit -m"My message"`

    By convention the first `commit` on a repository we use `first commit`

- On your browser; go to https://github.com/
- Create a new `repository`(could be `private` or `public`) with the same name of the folder in this case `task-manager`
- Grab the `git remote add origin ...` command that is shown on the new `repository` page
- Get to your terminal and use the command that you just copied
- Now push the code to the new `repository` using: `git push -u origin main`
- Get to your browser and refresh the `repository` page
- You should see all the files that you just uploaded

Now we can deploy our app to `Heroku` and this will be a similar process that the one we did before but we have one change. Remember that the app use `environment variables` in order to work so we will need to add those `environment variables` to `Heroku` in order to work and luckily `Heroku` provide us a way to do this.

- On your editor; create an app on `Heroku` using `heroku create name-of-the-new-app`

    This name should be unique across all `Heroku` applications, not just your applications and for convention prefix with your name for personal projects and company name for a client

- You will see the `URL` of our application and the remote `URL` of the `Heroku` repository

    Remember that the `remote` is automatically added with the name `heroku`

Now we have the `origin` remote to push our code to `Github` and the `heroku` remote to push our code to `Heroku` but we don't finish with the setup phase because we need to add the app `environment variables` to `Heroku` and we are going to do it from the terminal.

- On your terminal; use the following command: `heroku config:set key:value`

    We can use the `config` command to set `environment variables`; read our existing `environment variables` or delete values. The `config` command uses the `set` to create the `environment variables` and after the space receives a `key/value` pair so in this case, you will be creating an `environment variable` called `key` with `value` as it value

- Use the `config` command without `set` and no `key/value` pair: `heroku config`
- You should see that you have an `environment variable` called `key` with `value` as its content
- Now use the `unset` option with the name of the `environment variable` that we just set before:

    `heroku config:unset key:value`

- The `environment variable` should be deleted
- Now add the `JWT_SECRET` with its value and the `SENDGRID_API_KEY`

    `heroku config:set JWT_SECRET:my_random_set_of_characters SENDGRID_API_KEY:my_secret_key_value`

    Remember that when you write `JWT_SECRET` and `SENDGRID_API_KEY` it needs to match perfectly with the one that you have on the `dev.env` config also as you can see we can add multiple `environment variables` at the same time just need to add a space between each `key/value` pair

The last `environment variable` is the `MONGODB_URL` but not the one that we set on the `dev.env` file; we actually need the `connection string` that `Mongo Atlas` provide us for our production database.

- Get to the `Mongo Atlas` dashboard on your browser
- Make sure you are on the `Database` option of the sidebar
- Click the `Connect` button of the `cluster`
- A modal should pop up
- Click on the `Connect your application` option
- Make sure that the `dropdown` options have `Node.js` and `4.1 or later`
- Copy the `connection string` on the second step
- Get to your editor
- Go to `dev.env`
- Paste the connection string at the end(We do this because we will edit the `connection string`)
- Grab your `user password` that you set for the database on `Mongo Atlas`
- On the `connection string` at the bottom of `dev.env`; remove the `<password>` placeholder and paste your `password` in his place
- Before the `?`; add the database name like the one that we use locally; in our case `task-app-api`

    `mongodb+srv://<username>:<password>.mongodb.net/task-app-api?retryWrites=true&w=majority`

- Cut the `connection string`

When we have special characters you will need to use `single quotes` for Linux and mac or `double quotes` for windows.

- Use `set` to create `MONGODB_URL` and paste the `connection string` as it value

    `heroku config:set MONGODB_URL:'my_connection_string'`

- Now use `config` to check the `environment variables`
- You should see all the `environment variables` that we added

We don't need to add `PORT` to the `environment variables` because this is already added and managed by `Heroku`. At this moment we just need to push our code to `Heroku`

- Push the code to `Heroku` using: `git push heroku master`
- After using the previous command you will see `Heroku` logs; this means that your app is been deployed. In the end, you will see the `Heroku URL` of your app
- Copy your `Heroku URL`

As you may remember we create `environments` on `postman` to have `dev` and `prod` versions and on those `environments` we set a `URL` variable but we set its value just for `dev`; now we will add it value for the `prod` version

- Go to `postman`
- Search for the `dropdown` that has the `Task Manager API(dev)` chosen at the right
- Click on it and choose the `Task Manager API(prod)`
- Click the `eye` button at the right of the `dropdown`
- A menu should popup
- Click the `edit` link at the top right
- Paste the `Heroku URL` that you copied before on the `current value` input

    The `initial value` input is used when you are collaborating with teammates

- Click on the save button
- Now get to the `read profile` request tab
- Send the request
- You will see the `need authentication` error

    We are not creating a `user` yet but this is a good indication that we deployed correctly our application

- Get to the `create user` request tab
- Create a `user` that has a valid `user`
- Send the request
- You should see the `user` data response
- Get to the `user` email account
- You should see the `welcome` message
- Get to `postman`
- Go to the `read profile` request tab
- Send the request
- You should see the `user` profile data
- Get to `Mongo DB Compass`
- Connect to the `prod` database
- You should see the `task-manage-api` database
- Click on it
- You should see our `collections`
- Click on the `user collection`
- You should see the `user` that you just created
- Get back to `postman`
- Go to the `create task` request tab
- Create a new `task`
- Send the request
- You should see the `task` data on the response
- Get back to `Mongo Compass`
- Click on the `refresh` icon on the left
- Go to the `task collection`
- You should see the `task` data that you just created

Now we have the `task-manager` app live on production!!!

### Multiple projects deployment

Here we will have multiple projects on the same repository in other words we will set the repository in a root directory above the `task-manager` folder like the following:

```bash
main-directory/
-| web-server/
-| task-manager/
```

Then we will `deploy` only the `task-manager` files to a new app on `Heroku`. Here we are assuming that the `main-directory` has already initialized a `git` repository; a repository is created on `Github`; also the `web-server` files are committed and pushed to `Github` and finally, the `web-server` directory files are deployed to `Heroku` so you have an existing app.

- On your terminal; go to the `main-directory`
- Check the current untracked files using: `git status`
- You should see only the `task-manager` files

We will need to ignore a couple of folders on the `task-manager` directory that we don't want to be part of our `commit` history.

- On the `main-directory` folder; create a `.gitignore` file(If there is an existing one you can use it)
- Inside of the `gitignore` file; add `node_modules` and the `config` directory

    ```bash
    node_modules
    task-manager/config
    ```

- Save the file
- You should see that the `node_modules` and `config` folders on the `task-manager` directory change colors because they are not being tracked anymore
- Now get to your terminal
- Add the new files to the `staging` area using: `git add .`
- Now `commit` your changes using: `git commit -m"My commit message"`

    Since we are assuming that the `repository` was created before and has some files; this is not the `first commit` so you will need to add a message that represents that you are uploading the new app

- Then push your changes to `Github` using: `git push origin main`
- Get to the `repository` page on your browser
- You should see the `task-manager` directory with all its files

Now we will deploy the app to `Heroku` but the difference at this time is that we don't have the code at the root directory instead is on a subdirectory and we have already deployed another app to `Heroku` so we already have a remote defined for that app called `heroku` so we will need to specify the app that we want to configure each step of the way.

- On your editor; create an app on `Heroku` using `heroku create name-of-the-new-app`

    This name should be unique across all `Heroku` applications, not just your applications, and for convention prefix with your name for personal projects and company name for a client

- You will see the `URL` of our application and the remote `URL` of the `Heroku` repository

    Since you already have a `remote` called `heroku` the actual `remote` of your new app is not added so you will need to add it manually

- Copy the new `remote URL`(the second one)
- Add the new `remote` pasting the one that you just copied on this command:

    `git remote add name-of-the-remote url-of-my-remote`

    For this example, we added `task-manager` as a remote name

Now we 3 have `remotes`; `origin` to push to `Github`; `heroku` to push to the first project that we push to `Heroku` and `task-manager` to push our `task-manager` app but we can't push `task-manager` yet to `Heroku` because this app needs `environment variables` so we need to set those on `Heroku` and we will do this from the terminal.

- On your terminal; use the following command: `heroku config:set key:value -a your-app-name`

    We can use the `config` command to set `environment variables` so it will help us to read our existing `environment variables` or delete values. The `config` command uses the `set` to create the `environment variables` and after the space receives a `key/value` pair so in this case, you will be creating an `environment variable` called `key` with `value` as it values and since we have multiple `remotes` for `Heroku` we will need to use the `-a`(app) option follow by your app name in order to create the `environment variable` on the correct place

- Use the `config` command without `set` and no `key/value` pair(always remember to specify your app)

    `heroku config -a your-app-name`

- You should see that you have an `environment variable` called `key` with `value` as its content
- Now use the `unset` option with the name of the `environment variable` that we just set before:

    `heroku config:unset key:value -a your-app-name`

- The `environment variable` should be deleted
- Now add the `JWT_SECRET` with its value and the `SENDGRID_API_KEY`

    `heroku config:set JWT_SECRET:my_random_set_of_characters SENDGRID_API_KEY:my_secret_key_value -a your-app-name`

    Remember that when you write `JWT_SECRET` and `SENDGRID_API_KEY` it needs to match perfectly with the one that you have on the `dev.env` config also as you can see we can add multiple `environment variables` at the same time just need to add a space between each `key/value` pair

The last `environment variable` is the `MONGODB_URL` but not the one that we set on the `dev.env` file; we actually need the `connection string` that `Mongo Atlas` provide us for our production database.

- Get to the `Mongo Atlas` dashboard on your browser
- Make sure you are on the `Database` option of the sidebar
- Click the `Connect` button of the `cluster`
- A modal should pop up
- Click on the `Connect your application` option
- Make sure that the `dropdown` options have `Node.js` and `4.1 or later`
- Copy the `connection string` on the second step
- Get to your editor
- Go to `dev.env`
- Paste the connection string at the end(We do this because we will edit the `connection string`)
- Grab your `user password` that you set for the database on `Mongo Atlas`
- On the `connection string` at the bottom of `dev.env`; remove the `<password>` placeholder and paste your `password` in his place
- Before the `?`; add the database name like the one that we use locally; in our case `task-app-api`

    `mongodb+srv://<username>:<password>.mongodb.net/task-app-api?retryWrites=true&w=majority`

- Cut the `connection string`

When we have special characters you will need to use `single quotes` for Linux and mac or `double quotes` for windows.

- Use `set` to create `MONGODB_URL` and paste the `connection string` as it value

    `heroku config:set MONGODB_URL:'my_connection_string' -a your-app-name`

- Now use `config` to check the `environment variables`
- You should see all the `environment variables` that we added

We don't need to add `PORT` to the `environment variables` because this is already added and managed by `Heroku`. At this moment we just need to push our code to `Heroku` but at this time we will need to push just a subdirectory of the root, not the entire root directory so we will use the `git subtree` command with the `prefix` option

- Get to your terminal
- On the root directory; use the following command

    `git subtree push --prefix path/of/my/subdirectory my-heroku-remote master`

    The `subtree` command let you nest one repository inside of another, in other words, will tread as a complete repository in your subdirectory. After the `subtree` command you will need to specify the action that you will do like `push`; `add`; etc. Then you will need to use the `prefix` option to specify the path of the subdirectory and finally, you will use the `Heroku` remote that you need for a push in this case we set `task-manager`

- After using the previous command you will see `Heroku` logs; this means that your app is been deployed. At the end, you will see the `Heroku URL` of your app
- Copy your `Heroku URL`

As you may remember we create `environments` on `postman` to have `dev` and `prod` versions and on those `environments` we set a `URL` variable but we set its value just for `dev`; now we will add it value for the `prod` version

- Go to `postman`
- Search for the `dropdown` that has the `Task Manager API(dev)` chosen at the right
- Click on it and choose the `Task Manager API(prod)`
- Click the `eye` button at the right of the `dropdown`
- A menu should popup
- Click the `edit` link at the top right
- Paste the `Heroku URL` that you copied before on the `current value` input

    The `initial value` input is used when you are collaborating with teammates

- Click on the save button
- Now get to the `read profile` request tab
- Send the request
- You will see the `need authentication` error

    We are not creating a `user` yet but this is a good indication that we deployed correctly our application

- Get to the `create user` request tab
- Create a `user` that has a valid `user`
- Send the request
- You should see the `user` data response
- Get to the `user` email account
- You should see the `welcome` message
- Get to `postman`
- Go to the `read profile` request tab
- Send the request
- You should see the `user` profile data
- Get to `Mongo DB Compass`
- Connect to the `prod` database
- You should see the `task-manage-api` database
- Click on it
- You should see our `collections`
- Click on the `user collection`
- You should see the `user` that you just created
- Get back to `postman`
- Go to the `create task` request tab
- Create a new `task`
- Send the request
- You should see the `task` data on the response
- Get back to `Mongo Compass`
- Click on the `refresh` icon on the left
- Go to the `task collection`
- You should see the `task` data that you just created

Now we have the `task-manager` app live on production!!!
