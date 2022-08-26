const sgMail = require('@sendgrid/mail');
const sendGridAPIKey = 'your_api_key';

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'your_sender@email.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

// Goal: Send email to user on cancelation
//
// 1. Setup a new function for sending an email on cancelation
//  - email and name as args
// 2. Include their name in the email and ask why they canceled
// 3. Call it just after the account iis remove
// 4. Run the request and check your check your inbox!

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'your_sender@email.com',
        subject: 'Sorry to see you go',
        text:  `Goodbye, ${name}. I hope to see you back soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
