# Section 14: Sending Emails(Task App)

In this section we will set up `email notifications` on the `task app` and we will do this by just by calling a function providing the necessary data like who will be the recipient of the `email` or what the `body` and `subject` should be. For this, we will use the [sendGrid](https://sendgrid.com/) service that is a service designed for developers who want to send `emails` from applications(There are other applications like [postmark](https://postmarkapp.com/) and [mandrill](https://mailchimp.com/)) and `SendGrid` have an `npm module` that we can upload it to the application that will make easy to set everything to send the `email` that we need.

## Exploring SendGrid

We will begin this process by sending an `email` from `nodeJs` where we are going to explore the service that we help us to send the `email` then we write some code to actually send the `email`.

When it comes to picking a service to send `emails` you have a variety of options but for this example, we will use `SendGrid`. We will need to set this service before sending the `mail` from `node.Js`

- On your browser; go to https://sendgrid.com/

One of the reasons that we use `SendGrid` is that it has a nice free tear so you can begin integrating `email` into your app before you ever need to pay and it doesn't need a custom domain in order to set up.

- On the `SendGrid` page in your browser; click on the `Pricing` option on the top navigation bar
- You will see a page will all `SendGrid` plans to choose
- Choose the `Free` plan by clicking the `Start for free button on the `Free` plan section
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
